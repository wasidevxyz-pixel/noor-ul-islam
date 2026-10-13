package com.nooralislam.app

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.WindowManager
import android.webkit.ConsoleMessage
import android.webkit.GeolocationPermissions
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.webkit.WebViewAssetLoader
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.nooralislam.app.service.AzanAudioPlayer
import com.nooralislam.app.service.PrayerAlarmScheduler
import com.nooralislam.app.ui.MainViewModel
import com.nooralislam.app.ui.MainViewModelFactory
import com.nooralislam.app.service.CompassData
import com.nooralislam.app.service.QiblaCompassManager
import com.nooralislam.app.ui.NativeBridge
import org.json.JSONObject
import java.util.Locale

class MainActivity : AppCompatActivity() {

    companion object {
        private const val TAG = "MainActivity"
    }

    private lateinit var webView: WebView
    var viewModel: MainViewModel? = null
        private set

    lateinit var qiblaCompassManager: QiblaCompassManager
        private set
    private var isCompassActive: Boolean = false
    private var nativeBridge: NativeBridge? = null

    private var lastBackPressTime: Long = 0

    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val fineLocationGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
        val coarseLocationGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true

        if (fineLocationGranted || coarseLocationGranted) {
            viewModel?.refreshLocation { loc, name ->
                notifyWebviewLocation(loc, name)
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set status bar and navigation bar background
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
            window.statusBarColor = 0xFF04140E.toInt()
            window.navigationBarColor = 0xFF04140E.toInt()
        }

        setContentView(R.layout.activity_main)
        webView = findViewById(R.id.webView)

        // Initialize ViewModel safely from Application
        val app = application as? NoorApp
        if (app != null) {
            try {
                val factory = MainViewModelFactory(
                    app.locationRepository,
                    app.homeLocationRepository,
                    app.prayerTimesRepository,
                    app.prayerAlarmScheduler,
                    app.mosqueRepository,
                    app.settingsRepository
                )
                viewModel = ViewModelProvider(this, factory)[MainViewModel::class.java]
            } catch (e: Exception) {
                Log.e(TAG, "ViewModel initialization notice: ${e.message}", e)
            }
        }

        qiblaCompassManager = QiblaCompassManager(this).apply {
            onCompassUpdate = { data ->
                notifyWebviewCompass(data)
            }
        }

        configureWebSettings()
        requestAppPermissions()
        PrayerAlarmScheduler(this).scheduleDailyInspirations()

        webView.loadUrl("file:///android_asset/index.html")

        // Initial location trigger if permission already granted
        app?.locationRepository?.let { repo ->
            if (repo.hasLocationPermission()) {
                viewModel?.refreshLocation { loc, name ->
                    notifyWebviewLocation(loc, name)
                }
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebSettings() {
        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.setGeolocationEnabled(true)
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        @Suppress("DEPRECATION")
        settings.allowFileAccessFromFileURLs = true
        @Suppress("DEPRECATION")
        settings.allowUniversalAccessFromFileURLs = true
        settings.mediaPlaybackRequiresUserGesture = false
        settings.builtInZoomControls = false
        settings.displayZoomControls = false
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.databaseEnabled = true
        val connectivityManager = getSystemService(android.content.Context.CONNECTIVITY_SERVICE) as? android.net.ConnectivityManager
        settings.cacheMode = WebSettings.LOAD_NO_CACHE

        webView.isHorizontalScrollBarEnabled = false
        webView.overScrollMode = View.OVER_SCROLL_NEVER

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        // Register NativeBridge as AndroidApp
        val bridge = NativeBridge(this)
        nativeBridge = bridge
        webView.addJavascriptInterface(bridge, "AndroidApp")

        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView?,
                request: WebResourceRequest?
            ): WebResourceResponse? {
                val requestUrl = request?.url ?: return null
                return assetLoader.shouldInterceptRequest(requestUrl)
            }

            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                if (url.startsWith("file:///android_asset/") || url.startsWith("https://appassets.androidplatform.net/")) {
                    return false
                }
                return try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    startActivity(intent)
                    true
                } catch (e: Exception) {
                    false
                }
            }

            override fun onReceivedError(
                view: WebView?,
                errorCode: Int,
                description: String?,
                failingUrl: String?
            ) {
                Log.e(TAG, "WebView error: $errorCode: $description (URL: $failingUrl)")
            }

            override fun onReceivedSslError(
                view: WebView?,
                handler: android.webkit.SslErrorHandler?,
                error: android.net.http.SslError?
            ) {
                handler?.proceed()
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                val loc = viewModel?.currentLocation?.value
                val name = viewModel?.userSettings?.value?.locationName ?: ""
                if (loc != null) {
                    notifyWebviewLocation(loc, name)
                } else {
                    viewModel?.refreshLocation { resolvedLoc, resolvedName ->
                        notifyWebviewLocation(resolvedLoc, resolvedName)
                    }
                }
                handleIntentNavigation(intent)
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                Log.d("WebViewConsole", "${consoleMessage?.message()} -- line ${consoleMessage?.lineNumber()} of ${consoleMessage?.sourceId()}")
                return true
            }

            override fun onGeolocationPermissionsShowPrompt(
                origin: String,
                callback: GeolocationPermissions.Callback
            ) {
                callback.invoke(origin, true, false)
            }

            override fun onPermissionRequest(request: PermissionRequest) {
                request.grant(request.resources)
            }
        }
    }

    private fun requestAppPermissions() {
        val permissions = mutableListOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        )

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.POST_NOTIFICATIONS)
        }

        val needed = permissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (needed.isNotEmpty()) {
            permissionLauncher.launch(needed.toTypedArray())
        }

        checkBatteryOptimization()
    }

    private fun checkBatteryOptimization() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            try {
                val powerManager = getSystemService(POWER_SERVICE) as? android.os.PowerManager
                if (powerManager != null && !powerManager.isIgnoringBatteryOptimizations(packageName)) {
                    val intent = Intent(android.provider.Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS).apply {
                        data = Uri.parse("package:$packageName")
                    }
                    startActivity(intent)
                }
            } catch (e: Exception) {
                Log.w(TAG, "Battery optimization notice: ${e.message}")
            }
        }
    }

    fun notifyWebviewLocation(loc: Location, locationName: String = "") {
        qiblaCompassManager.updateLocation(loc)
        val js = String.format(
            Locale.US,
            "if(window.onNativeGpsReceived){ window.onNativeGpsReceived(%f, %f, %f, '%s'); }",
            loc.latitude, loc.longitude, loc.accuracy.toDouble(), locationName.replace("'", "\\'")
        )
        webView.post { webView.evaluateJavascript(js, null) }
    }

    fun notifyWebviewCompass(data: CompassData) {
        val json = JSONObject().apply {
            put("magneticHeading", data.magneticHeading)
            put("trueHeading", data.trueHeading)
            put("declination", data.declination)
            put("qiblaBearing", data.qiblaBearing)
            put("relativeQiblaAngle", data.relativeQiblaAngle)
            put("relativeQibla", data.relativeQiblaAngle)
            put("distanceKm", data.distanceKm)
            put("cardinal", data.cardinal)
            put("sensorAccuracy", data.sensorAccuracy)
            put("sensorAccuracyDesc", data.sensorAccuracyDesc)
            put("isCalibrated", data.isCalibrated)
            put("magneticInterference", data.magneticInterference)
            put("magneticFieldStrengthUt", data.magneticFieldStrengthUt)
            put("gpsAccuracy", data.gpsAccuracy)
            put("latitude", data.latitude)
            put("longitude", data.longitude)
            put("sensorType", data.sensorType)
            put("isAligned", data.isAligned)
        }
        val js = "if(window.onNativeCompassUpdate){ window.onNativeCompassUpdate($json); }"
        webView.post { webView.evaluateJavascript(js, null) }
    }

    fun notifyWebviewAzanEnded() {
        webView.post {
            webView.evaluateJavascript("if(window.onAzanPlaybackEnded){ window.onAzanPlaybackEnded(); }", null)
        }
    }

    fun notifyWebviewAudioEnded(trackId: String) {
        webView.post {
            webView.evaluateJavascript("if(window.onNativeAudioEnded){ window.onNativeAudioEnded('$trackId'); }", null)
        }
    }

    fun notifyWebviewAudioError(trackId: String) {
        webView.post {
            webView.evaluateJavascript("if(window.onNativeAudioError){ window.onNativeAudioError('$trackId'); }", null)
        }
    }

    fun startQiblaCompass() {
        isCompassActive = true
        val loc = viewModel?.currentLocation?.value
        if (loc != null) {
            qiblaCompassManager.updateLocation(loc)
        }
        qiblaCompassManager.start()
    }

    fun stopQiblaCompass() {
        isCompassActive = false
        qiblaCompassManager.stop()
    }

    fun calibrateCompass() {
        Toast.makeText(this, "Wave phone slowly in a figure-8 motion away from metals to calibrate", Toast.LENGTH_LONG).show()
    }

    fun notifyWebviewMosques(jsonArrayStr: String) {
        val escaped = jsonArrayStr.replace("\\", "\\\\").replace("'", "\\'")
        val js = "if(window.onNativeMosquesReceived){ window.onNativeMosquesReceived(JSON.parse('$escaped')); }"
        webView.post { webView.evaluateJavascript(js, null) }
    }

    fun notifyWebviewHalal(jsonArrayStr: String) {
        val safeJson = if (jsonArrayStr.isBlank()) "[]" else jsonArrayStr.replace("\r", " ").replace("\n", " ")
        val escaped = safeJson.replace("\\", "\\\\").replace("'", "\\'")
        val js = "if(window.onNativeHalalReceived){ try { window.onNativeHalalReceived(JSON.parse('$escaped')); } catch(e){ window.onNativeHalalReceived($safeJson); } }"
        webView.post { webView.evaluateJavascript(js, null) }
    }

    override fun onBackPressed() {
        webView.evaluateJavascript("window.handleAndroidBackButton ? window.handleAndroidBackButton() : false;") { value ->
            val handledByJs = "true".equals(value, ignoreCase = true)
            if (!handledByJs) {
                if (System.currentTimeMillis() - lastBackPressTime < 2000) {
                    finish()
                } else {
                    lastBackPressTime = System.currentTimeMillis()
                    Toast.makeText(this, "Press back again to exit Noor Al Islam", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onPause() {
        super.onPause()
        qiblaCompassManager.stop()
        webView.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        if (isCompassActive) {
            qiblaCompassManager.start()
        }
    }

    fun notifyWebviewSpeechEnded() {
        webView.post {
            webView.evaluateJavascript("if(typeof onNativeSpeechEnded === 'function') onNativeSpeechEnded();", null)
        }
    }

    fun clearAppWebCache() {
        runOnUiThread {
            webView.clearCache(true)
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleIntentNavigation(intent)
    }

    private fun handleIntentNavigation(intent: Intent?) {
        val targetScreen = intent?.getStringExtra("EXTRA_TARGET_SCREEN") ?: return
        intent.removeExtra("EXTRA_TARGET_SCREEN")
        val js = "if(typeof navigateTo === 'function'){ navigateTo('$targetScreen'); }"
        webView.postDelayed({ webView.evaluateJavascript(js, null) }, 350)
    }

    override fun onDestroy() {
        qiblaCompassManager.stop()
        AzanAudioPlayer.stop()
        nativeBridge?.destroy()
        webView.destroy()
        super.onDestroy()
    }
}
