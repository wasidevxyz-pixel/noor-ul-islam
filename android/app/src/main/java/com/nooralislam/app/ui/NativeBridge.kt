package com.nooralislam.app.ui

import android.webkit.JavascriptInterface
import android.widget.Toast
import com.nooralislam.app.MainActivity
import com.nooralislam.app.NoorApp
import com.nooralislam.app.service.AzanAudioPlayer
import com.nooralislam.app.service.AppAudioPlayer
import com.nooralislam.app.service.PrayerCalculationService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Locale

class NativeBridge(
    private val activity: MainActivity
) {
    private val viewModel: MainViewModel? get() = activity.viewModel
    private val prayerCalculationService = PrayerCalculationService()

    @JavascriptInterface
    fun showToast(msg: String) {
        activity.runOnUiThread {
            Toast.makeText(activity, msg, Toast.LENGTH_SHORT).show()
        }
    }

    @JavascriptInterface
    fun exitApp() {
        activity.runOnUiThread {
            activity.finish()
        }
    }

    @JavascriptInterface
    fun getDeviceGpsLocation(): String {
        val vm = viewModel
        val loc = vm?.currentLocation?.value
        val settings = vm?.userSettings?.value

        if (loc != null) {
            val json = JSONObject().apply {
                put("latitude", loc.latitude)
                put("longitude", loc.longitude)
                put("accuracy", loc.accuracy)
                put("provider", loc.provider ?: "fused")
                put("time", loc.time)
                put("locationName", settings?.locationName ?: "")
            }
            return json.toString()
        }

        if (settings != null && settings.hasHomeLocation && settings.homeLatitude != 0.0) {
            val json = JSONObject().apply {
                put("latitude", settings.homeLatitude)
                put("longitude", settings.homeLongitude)
                put("accuracy", settings.lastAccuracy)
                put("provider", "stored_home")
                put("locationName", settings.locationName)
            }
            return json.toString()
        }

        // Trigger asynchronous location refresh
        activity.runOnUiThread {
            vm?.refreshLocation { resolvedLoc, resolvedName ->
                activity.notifyWebviewLocation(resolvedLoc, resolvedName)
            }
        }

        return "{}"
    }

    @JavascriptInterface
    fun requestExactLocation() {
        activity.runOnUiThread {
            viewModel?.refreshLocation { resolvedLoc, resolvedName ->
                activity.notifyWebviewLocation(resolvedLoc, resolvedName)
            }
        }
    }

    @JavascriptInterface
    fun getPrayerTimes(
        latitude: Double,
        longitude: Double,
        method: String,
        madhab: String
    ): String {
        return try {
            val zoneId = ZoneId.systemDefault()
            val schedule = prayerCalculationService.calculate(
                latitude = latitude,
                longitude = longitude,
                date = LocalDate.now(),
                methodName = method,
                madhabName = madhab,
                zoneId = zoneId
            )

            val timeFormatter = DateTimeFormatter.ofPattern("hh:mm a", Locale.US)
            val json = JSONObject().apply {
                put("fajr", schedule.fajr.format(timeFormatter))
                put("sunrise", schedule.sunrise.format(timeFormatter))
                put("dhuhr", schedule.dhuhr.format(timeFormatter))
                put("asr", schedule.asr.format(timeFormatter))
                put("maghrib", schedule.maghrib.format(timeFormatter))
                put("isha", schedule.isha.format(timeFormatter))
                put("currentPrayer", schedule.currentPrayerName)
                put("nextPrayer", schedule.nextPrayerName)
                put("nextPrayerTime", schedule.nextPrayerTime.format(timeFormatter))
                put("remainingMillis", schedule.timeRemainingMillis)
                put("timezone", zoneId.id)
            }
            json.toString()
        } catch (e: Exception) {
            JSONObject().put("error", e.message ?: "Failed to calculate").toString()
        }
    }

    @JavascriptInterface
    fun fetchNearbyMosques(lat: Double, lng: Double, radiusMeters: Int) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val app = activity.application as? NoorApp
                val mosques = app?.mosqueRepository?.getNearbyMosques(
                    userLat = lat,
                    userLng = lng,
                    radiusMeters = radiusMeters,
                    forceRefresh = true
                ) ?: emptyList()

                val jsonArray = JSONArray()
                for (m in mosques) {
                    val obj = JSONObject().apply {
                        put("id", m.osmId)
                        put("name", m.name)
                        put("lat", m.latitude)
                        put("lng", m.longitude)
                        put("distanceMeters", m.distanceMeters)
                        put("address", m.address)
                    }
                    jsonArray.put(obj)
                }

                activity.runOnUiThread {
                    activity.notifyWebviewMosques(jsonArray.toString())
                }
            } catch (e: Exception) {
                activity.runOnUiThread {
                    activity.notifyWebviewMosques("[]")
                }
            }
        }
    }

    @JavascriptInterface
    fun updateSettings(
        method: String,
        madhab: String,
        sound: String,
        fajr: Boolean,
        dhuhr: Boolean,
        asr: Boolean,
        maghrib: Boolean,
        isha: Boolean
    ) {
        val vm = viewModel ?: return
        vm.updateAllSettings(method, madhab, sound, fajr, dhuhr, asr, maghrib, isha)
        try {
            com.nooralislam.app.widget.PrayerAppWidgetProvider.triggerUpdate(activity)
        } catch (e: Exception) {}
    }

    @JavascriptInterface
    fun setManualLocation(lat: Double, lng: Double, name: String) {
        activity.runOnUiThread {
            viewModel?.setManualLocation(lat, lng, name)
            try {
                com.nooralislam.app.widget.PrayerAppWidgetProvider.triggerUpdate(activity)
            } catch (e: Exception) {}
        }
    }

    @JavascriptInterface
    fun setStatusBarColor(colorHex: String) {
        activity.runOnUiThread {
            try {
                activity.window.statusBarColor = android.graphics.Color.parseColor(colorHex)
            } catch (e: Exception) {}
        }
    }

    @JavascriptInterface
    fun triggerHaptic(type: String) {
        activity.runOnUiThread {
            try {
                val vibrator = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                    val vibratorManager = activity.getSystemService(android.content.Context.VIBRATOR_MANAGER_SERVICE) as? android.os.VibratorManager
                    vibratorManager?.defaultVibrator
                } else {
                    @Suppress("DEPRECATION")
                    activity.getSystemService(android.content.Context.VIBRATOR_SERVICE) as? android.os.Vibrator
                }

                if (vibrator != null && vibrator.hasVibrator()) {
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                        val effect = when (type) {
                            "bead" -> android.os.VibrationEffect.createOneShot(18, android.os.VibrationEffect.DEFAULT_AMPLITUDE)
                            "milestone" -> android.os.VibrationEffect.createWaveform(longArrayOf(0, 40, 50, 70), -1)
                            "qibla_align" -> android.os.VibrationEffect.createOneShot(60, 220)
                            "success" -> android.os.VibrationEffect.createWaveform(longArrayOf(0, 30, 40, 50), -1)
                            else -> android.os.VibrationEffect.createOneShot(25, android.os.VibrationEffect.DEFAULT_AMPLITUDE)
                        }
                        vibrator.vibrate(effect)
                    } else {
                        @Suppress("DEPRECATION")
                        vibrator.vibrate(when (type) {
                            "milestone", "success" -> 80L
                            "qibla_align" -> 60L
                            else -> 20L
                        })
                    }
                }
            } catch (e: Exception) {}
        }
    }

    @JavascriptInterface
    fun openExternalUrl(urlStr: String) {
        activity.runOnUiThread {
            try {
                val intent = android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(urlStr))
                activity.startActivity(intent)
            } catch (e: Exception) {
                Toast.makeText(activity, "Cannot open link", Toast.LENGTH_SHORT).show()
            }
        }
    }

    @JavascriptInterface
    fun playAzanAudio(soundKey: String) {
        AzanAudioPlayer.play(activity, soundKey, isAlarm = false) {
            activity.runOnUiThread {
                activity.notifyWebviewAzanEnded()
            }
        }
    }

    @JavascriptInterface
    fun stopAzanAudio() {
        AzanAudioPlayer.stop()
    }

    @JavascriptInterface
    fun isAzanPlaying(): Boolean {
        return AzanAudioPlayer.isPlaying()
    }

    @JavascriptInterface
    fun playAssetAudio(relativePath: String, trackId: String) {
        activity.runOnUiThread {
            AppAudioPlayer.playAsset(
                activity,
                relativePath,
                trackId,
                onCompletion = {
                    activity.runOnUiThread {
                        activity.notifyWebviewAudioEnded(trackId)
                    }
                },
                onError = {
                    activity.runOnUiThread {
                        activity.notifyWebviewAudioError(trackId)
                    }
                }
            )
        }
    }

    @JavascriptInterface
    fun stopAssetAudio() {
        activity.runOnUiThread {
            AppAudioPlayer.stop()
        }
    }

    @JavascriptInterface
    fun isAssetAudioPlaying(): Boolean {
        return AppAudioPlayer.isPlaying()
    }

    @JavascriptInterface
    fun triggerDailyNotification(title: String, arabic: String, urdu: String, english: String) {
        activity.runOnUiThread {
            com.nooralislam.app.service.AzanNotificationManager.showInspirationNotification(
                activity, title, arabic, urdu, english
            )
        }
    }

    @JavascriptInterface
    fun triggerTasbihNotification(dhikrText: String) {
        activity.runOnUiThread {
            com.nooralislam.app.service.AzanNotificationManager.showTasbihNotification(
                activity, dhikrText
            )
        }
    }

    @JavascriptInterface
    fun playNotificationSound() {
        activity.runOnUiThread {
            try {
                val soundUri = android.media.RingtoneManager.getDefaultUri(android.media.RingtoneManager.TYPE_NOTIFICATION)
                val r = android.media.RingtoneManager.getRingtone(activity.applicationContext, soundUri)
                r?.play()
            } catch (e: Exception) {
                android.util.Log.e("NativeBridge", "Error playing ringtone: ${e.message}")
            }
        }
    }

    @JavascriptInterface
    fun startCompass() {
        activity.runOnUiThread {
            activity.startQiblaCompass()
        }
    }

    @JavascriptInterface
    fun stopCompass() {
        activity.runOnUiThread {
            activity.stopQiblaCompass()
        }
    }

    @JavascriptInterface
    fun calibrateCompass() {
        activity.runOnUiThread {
            activity.calibrateCompass()
        }
    }

    // =========================================================================
    // NATIVE TEXT-TO-SPEECH (BILINGUAL ARABIC & URDU VOICE ENGINE)
    // =========================================================================
    private var tts: android.speech.tts.TextToSpeech? = null
    private var isTtsInitialized = false
    private var nextUrduSpeech: String? = null

    init {
        try {
            tts = android.speech.tts.TextToSpeech(activity.applicationContext) { status ->
                if (status == android.speech.tts.TextToSpeech.SUCCESS) {
                    isTtsInitialized = true
                    tts?.setOnUtteranceProgressListener(object : android.speech.tts.UtteranceProgressListener() {
                        override fun onStart(utteranceId: String?) {}
                        override fun onDone(utteranceId: String?) {
                            if (utteranceId == "ARABIC_RECITE" && !nextUrduSpeech.isNullOrBlank()) {
                                val urduToSpeak = nextUrduSpeech ?: return
                                nextUrduSpeech = null
                                activity.runOnUiThread {
                                    speakUrduInternal(urduToSpeak)
                                }
                            } else {
                                activity.runOnUiThread {
                                    activity.notifyWebviewSpeechEnded()
                                }
                            }
                        }
                        override fun onError(utteranceId: String?) {
                            if (utteranceId == "ARABIC_RECITE" && !nextUrduSpeech.isNullOrBlank()) {
                                val urduToSpeak = nextUrduSpeech ?: return
                                nextUrduSpeech = null
                                activity.runOnUiThread {
                                    speakUrduInternal(urduToSpeak)
                                }
                            } else {
                                activity.runOnUiThread {
                                    activity.notifyWebviewSpeechEnded()
                                }
                            }
                        }
                    })
                }
            }
        } catch (e: Exception) {
            android.util.Log.e("NativeBridge", "Error initializing native TTS: ${e.message}")
        }
    }

    private fun speakUrduInternal(urduText: String) {
        try {
            val cleanUrdu = urduText
                .replace("\uFDFA", "")
                .replace("ﷺ", "")
                .replace("«", "")
                .replace("»", "")
                .replace("\"", "")
                .replace("'", "")
                .trim()

            val urLocale = Locale.forLanguageTag("ur-PK")
            val avail = tts?.isLanguageAvailable(urLocale) ?: -1
            if (avail == android.speech.tts.TextToSpeech.LANG_AVAILABLE || avail == android.speech.tts.TextToSpeech.LANG_COUNTRY_AVAILABLE) {
                tts?.language = urLocale
            } else {
                tts?.language = Locale("ur")
            }

            // Strictly select MALE Urdu voice (avoid female / girl voice)
            try {
                val voices = tts?.voices
                val maleUrVoice = voices?.firstOrNull { v ->
                    (v.locale.language == "ur" || v.locale.language == "hi") &&
                    !v.name.contains("female", ignoreCase = true) &&
                    !v.name.contains("-a-", ignoreCase = true) &&
                    !v.name.contains("-c-", ignoreCase = true) &&
                    !v.name.contains("-e-", ignoreCase = true) &&
                    !v.name.endsWith("-a") &&
                    !v.name.endsWith("-c") &&
                    !v.name.endsWith("-e") &&
                    (v.name.contains("male", ignoreCase = true) ||
                     v.name.contains("-b-", ignoreCase = true) ||
                     v.name.contains("-d-", ignoreCase = true) ||
                     v.name.endsWith("-b") ||
                     v.name.endsWith("-d"))
                }
                if (maleUrVoice != null) {
                    tts?.voice = maleUrVoice
                }
            } catch (_: Exception) {}

            tts?.setPitch(0.72f) // Deep masculine respectful tone
            tts?.setSpeechRate(0.88f)
            val res = tts?.speak(cleanUrdu, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null, "URDU_TRANSLATION")
            if (res != android.speech.tts.TextToSpeech.SUCCESS) {
                activity.notifyWebviewSpeechEnded()
            }
        } catch (e: Exception) {
            activity.notifyWebviewSpeechEnded()
        }
    }

    @JavascriptInterface
    fun speakBilingualText(arabicText: String, urduText: String) {
        activity.runOnUiThread {
            if (tts == null || !isTtsInitialized) {
                Toast.makeText(activity, "Audio engine initializing...", Toast.LENGTH_SHORT).show()
                return@runOnUiThread
            }
            try {
                // Sanitize Arabic and Urdu text (strip ligatures, special quotes & brackets that crash TTS)
                val cleanArabic = arabicText
                    .replace("\uFDFA", "")
                    .replace("ﷺ", "")
                    .replace("«", "")
                    .replace("»", "")
                    .replace("\"", "")
                    .replace("'", "")
                    .replace(":", " ")
                    .replace("؛", " ")
                    .trim()
                val cleanUrdu = urduText
                    .replace("\uFDFA", "")
                    .replace("ﷺ", "")
                    .replace("«", "")
                    .replace("»", "")
                    .replace("\"", "")
                    .replace("'", "")
                    .trim()

                nextUrduSpeech = cleanUrdu

                val arLocale = Locale.forLanguageTag("ar-SA")
                val arAvail = tts?.isLanguageAvailable(arLocale) ?: -1
                var canSpeakArabic = false

                if (arAvail >= android.speech.tts.TextToSpeech.LANG_AVAILABLE) {
                    tts?.language = arLocale
                    canSpeakArabic = true
                } else {
                    val genericAr = Locale("ar")
                    val genAvail = tts?.isLanguageAvailable(genericAr) ?: -1
                    if (genAvail >= android.speech.tts.TextToSpeech.LANG_AVAILABLE) {
                        tts?.language = genericAr
                        canSpeakArabic = true
                    }
                }

                // Strictly select MALE Arabic voice (strictly filter out female/girl voices)
                try {
                    val voices = tts?.voices
                    val maleArVoice = voices?.firstOrNull { v ->
                        v.locale.language == "ar" &&
                        !v.name.contains("female", ignoreCase = true) &&
                        !v.name.contains("-a-", ignoreCase = true) &&
                        !v.name.contains("-c-", ignoreCase = true) &&
                        !v.name.contains("-e-", ignoreCase = true) &&
                        !v.name.endsWith("-a") &&
                        !v.name.endsWith("-c") &&
                        !v.name.endsWith("-e") &&
                        (v.name.contains("male", ignoreCase = true) ||
                         v.name.contains("-b-", ignoreCase = true) ||
                         v.name.contains("-d-", ignoreCase = true) ||
                         v.name.endsWith("-b") ||
                         v.name.endsWith("-d"))
                    }
                    if (maleArVoice != null) {
                        tts?.voice = maleArVoice
                    }
                } catch (_: Exception) {}

                tts?.setPitch(0.72f) // Deep, respectful, masculine Quran/Hadith reciting tone
                tts?.setSpeechRate(0.82f)

                if (canSpeakArabic && cleanArabic.isNotBlank()) {
                    val res = tts?.speak(cleanArabic, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null, "ARABIC_RECITE")
                    if (res != android.speech.tts.TextToSpeech.SUCCESS) {
                        // If Arabic recitation fails, smoothly play Urdu translation directly
                        speakUrduInternal(cleanUrdu)
                    }
                } else {
                    // If Arabic TTS voice pack is not installed on device, speak Urdu translation smoothly
                    speakUrduInternal(cleanUrdu)
                }
            } catch (e: Exception) {
                try {
                    speakUrduInternal(urduText)
                } catch (_: Exception) {
                    activity.notifyWebviewSpeechEnded()
                }
            }
        }
    }

    @JavascriptInterface
    fun stopSpeech() {
        activity.runOnUiThread {
            nextUrduSpeech = null
            tts?.stop()
            activity.notifyWebviewSpeechEnded()
        }
    }

    @JavascriptInterface
    fun stopSpeaking() {
        stopSpeech()
    }

    @JavascriptInterface
    fun isSpeechActive(): Boolean {
        return tts?.isSpeaking == true || nextUrduSpeech != null
    }

    // =========================================================================
    // NATIVE HOURLY WEATHER ENGINE (OPEN-METEO VIA OKHTTP - 100% RELIABLE)
    // =========================================================================
    private val httpClient by lazy {
        okhttp3.OkHttpClient.Builder()
            .connectTimeout(6, java.util.concurrent.TimeUnit.SECONDS)
            .readTimeout(6, java.util.concurrent.TimeUnit.SECONDS)
            .build()
    }

    @JavascriptInterface
    fun getLiveWeather(lat: Double, lng: Double): String {
        val prefs = activity.getSharedPreferences("noor_weather_store", android.content.Context.MODE_PRIVATE)
        val cached = prefs.getString("full_weather_json", null)
        val cachedTime = prefs.getLong("full_weather_time", 0L)
        val now = System.currentTimeMillis()

        if (cached != null && (now - cachedTime < 15 * 60 * 1000)) {
            return cached
        }

        return try {
            val resolvedLat = if (lat != 0.0) lat else 24.8607
            val resolvedLng = if (lng != 0.0) lng else 67.0011
            val url = "https://api.open-meteo.com/v1/forecast?latitude=$resolvedLat&longitude=$resolvedLng&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m&timezone=auto&forecast_days=2"
            val req = okhttp3.Request.Builder().url(url).build()
            val resp = httpClient.newCall(req).execute()
            if (resp.isSuccessful) {
                val body = resp.body?.string() ?: ""
                prefs.edit()
                    .putString("full_weather_json", body)
                    .putLong("full_weather_time", now)
                    .apply()
                body
            } else {
                cached ?: "{}"
            }
        } catch (e: Exception) {
            cached ?: "{}"
        }
    }

    // =========================================================================
    // ADVANCED NATIVE DISK CACHE ENGINE (100% PERSISTENT ACROSS SESSIONS)
    // =========================================================================
    @JavascriptInterface
    fun saveToDiskCache(key: String, value: String) {
        try {
            val prefs = activity.getSharedPreferences("noor_advance_cache", android.content.Context.MODE_PRIVATE)
            prefs.edit().putString(key, value).putLong("${key}_timestamp", System.currentTimeMillis()).apply()
        } catch (e: Exception) {
            android.util.Log.e("NativeBridge", "Cache save error: ${e.message}")
        }
    }

    @JavascriptInterface
    fun getFromDiskCache(key: String): String {
        return try {
            val prefs = activity.getSharedPreferences("noor_advance_cache", android.content.Context.MODE_PRIVATE)
            prefs.getString(key, "") ?: ""
        } catch (e: Exception) {
            ""
        }
    }

    @JavascriptInterface
    fun clearDiskCache() {
        try {
            val prefs = activity.getSharedPreferences("noor_advance_cache", android.content.Context.MODE_PRIVATE)
            prefs.edit().clear().apply()
            activity.clearAppWebCache()
        } catch (e: Exception) {
            android.util.Log.e("NativeBridge", "Cache clear error: ${e.message}")
        }
    }

    // =========================================================================
    // GALLERY SAVER & WHATSAPP STATUS SHARER
    // =========================================================================
    @JavascriptInterface
    fun saveImageToGallery(base64Data: String, filename: String): Boolean {
        return try {
            val cleanBase64 = if (base64Data.contains(",")) {
                base64Data.substringAfter(",")
            } else {
                base64Data
            }
            val imageBytes = android.util.Base64.decode(cleanBase64, android.util.Base64.DEFAULT)
            val bitmap = android.graphics.BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)
                ?: return false

            val resolver = activity.contentResolver
            val displayName = if (filename.endsWith(".png")) filename else "$filename.png"

            val contentValues = android.content.ContentValues().apply {
                put(android.provider.MediaStore.MediaColumns.DISPLAY_NAME, displayName)
                put(android.provider.MediaStore.MediaColumns.MIME_TYPE, "image/png")
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
                    put(android.provider.MediaStore.MediaColumns.RELATIVE_PATH, android.os.Environment.DIRECTORY_PICTURES + "/NoorAlIslam")
                    put(android.provider.MediaStore.MediaColumns.IS_PENDING, 1)
                }
            }

            val imageUri = resolver.insert(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
            if (imageUri != null) {
                resolver.openOutputStream(imageUri)?.use { out ->
                    bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, out)
                }
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
                    contentValues.clear()
                    contentValues.put(android.provider.MediaStore.MediaColumns.IS_PENDING, 0)
                    resolver.update(imageUri, contentValues, null, null)
                } else {
                    android.media.MediaScannerConnection.scanFile(
                        activity,
                        arrayOf(imageUri.path),
                        arrayOf("image/png"),
                        null
                    )
                }
                activity.runOnUiThread {
                    Toast.makeText(activity, "تصویر گیلری میں محفوظ ہو گئی ہے! ✓", Toast.LENGTH_LONG).show()
                }
                true
            } else {
                false
            }
        } catch (e: Exception) {
            android.util.Log.e("NativeBridge", "Save image error: ${e.message}")
            activity.runOnUiThread {
                Toast.makeText(activity, "گیلری میں محفوظ نہ ہو سکی: ${e.message}", Toast.LENGTH_SHORT).show()
            }
            false
        }
    }

    @JavascriptInterface
    fun shareImageToWhatsApp(base64Data: String, captionText: String) {
        activity.runOnUiThread {
            try {
                val cleanBase64 = if (base64Data.contains(",")) {
                    base64Data.substringAfter(",")
                } else {
                    base64Data
                }
                val imageBytes = android.util.Base64.decode(cleanBase64, android.util.Base64.DEFAULT)
                val imagesDir = java.io.File(activity.cacheDir, "shared_images").apply { mkdirs() }
                val imageFile = java.io.File(imagesDir, "NoorAlIslam_Status_${System.currentTimeMillis()}.png")
                java.io.FileOutputStream(imageFile).use { it.write(imageBytes) }

                val uri = androidx.core.content.FileProvider.getUriForFile(
                    activity,
                    "${activity.packageName}.fileprovider",
                    imageFile
                )

                val shareIntent = android.content.Intent(android.content.Intent.ACTION_SEND).apply {
                    type = "image/png"
                    putExtra(android.content.Intent.EXTRA_STREAM, uri)
                    putExtra(android.content.Intent.EXTRA_TEXT, captionText)
                    addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION)
                }
                activity.startActivity(android.content.Intent.createChooser(shareIntent, "Share Islamic Status / واٹس ایپ پر شیئر کریں"))
            } catch (e: Exception) {
                android.util.Log.e("NativeBridge", "Share image error: ${e.message}")
                Toast.makeText(activity, "شیئر نہ ہو سکی: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun destroy() {
        try {
            tts?.stop()
            tts?.shutdown()
        } catch (e: Exception) {}
    }
}
