package com.nooralislam.app.ui

import android.webkit.JavascriptInterface
import android.widget.Toast
import com.nooralislam.app.MainActivity
import com.nooralislam.app.NoorApp
import com.nooralislam.app.service.AzanAudioPlayer
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
}
