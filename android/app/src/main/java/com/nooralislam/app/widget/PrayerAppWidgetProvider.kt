package com.nooralislam.app.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.view.View
import android.widget.RemoteViews
import com.nooralislam.app.MainActivity
import com.nooralislam.app.R
import com.nooralislam.app.data.local.datastore.UserSettingsDataStore
import com.nooralislam.app.service.PrayerCalculationService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject
import java.time.LocalDate
import java.time.ZoneId
import java.time.chrono.HijrahDate
import java.time.format.DateTimeFormatter
import java.time.format.TextStyle
import java.time.temporal.ChronoField
import java.util.Locale
import java.util.concurrent.TimeUnit

class PrayerAppWidgetProvider : AppWidgetProvider() {

    companion object {
        const val ACTION_UPDATE_WIDGET = "com.nooralislam.app.ACTION_UPDATE_WIDGET"

        private val okHttpClient by lazy {
            OkHttpClient.Builder()
                .connectTimeout(5, TimeUnit.SECONDS)
                .readTimeout(5, TimeUnit.SECONDS)
                .build()
        }

        fun triggerUpdate(context: Context) {
            val intent1 = Intent(context, PrayerAppWidgetProvider::class.java).apply {
                action = ACTION_UPDATE_WIDGET
            }
            context.sendBroadcast(intent1)

            NamazBarWidgetProvider.triggerUpdate(context)
            IslamicClockWidgetProvider.triggerUpdate(context)
        }
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_UPDATE_WIDGET || intent.action == AppWidgetManager.ACTION_APPWIDGET_UPDATE) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, PrayerAppWidgetProvider::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
            for (id in appWidgetIds) {
                updateAppWidget(context, appWidgetManager, id)
            }
        }
    }

    private fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
        val views = RemoteViews(context.packageName, R.layout.widget_prayer_times)

        // Set tap intent to open MainActivity
        val appIntent = Intent(context, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            appIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)

        // Compute Hijri Islamic Calendar date
        try {
            val now = LocalDate.now()
            val dayOfWeek = now.dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
            val hijrahDate = HijrahDate.now()
            val day = hijrahDate.get(ChronoField.DAY_OF_MONTH)
            val month = hijrahDate.get(ChronoField.MONTH_OF_YEAR)
            val year = hijrahDate.get(ChronoField.YEAR)
            val islamicMonths = arrayOf(
                "Muharram", "Safar", "Rabi-ul-Awwal", "Rabi-us-Sani",
                "Jumada-al-Awwal", "Jumada-as-Sani", "Rajab", "Shaban",
                "Ramadan", "Shawwal", "Dhul-Qadah", "Dhul-Hijjah"
            )
            val monthName = if (month in 1..12) islamicMonths[month - 1] else "Hijri"
            views.setTextViewText(R.id.widget_hijri_date, "$dayOfWeek, $day $monthName $year AH")
        } catch (e: Exception) {
            views.setTextViewText(R.id.widget_hijri_date, "Sat, 29 Rabi-us-Sani 1448 AH")
        }

        // Run calculation and weather fetch in background
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val dataStore = UserSettingsDataStore(context)
                val settings = runCatching { dataStore.userSettingsFlow.first() }.getOrNull()

                val lat = if (settings != null && settings.homeLatitude != 0.0) settings.homeLatitude else 24.8607
                val lng = if (settings != null && settings.homeLongitude != 0.0) settings.homeLongitude else 67.0011
                val locName = if (!settings?.locationName.isNullOrBlank()) settings!!.locationName else "Ghauri Town, Islamabad"
                val method = settings?.calculationMethod ?: "KARACHI"
                val madhab = settings?.madhab ?: "HANAFI"

                val calcService = PrayerCalculationService()
                val schedule = calcService.calculate(
                    latitude = lat,
                    longitude = lng,
                    date = LocalDate.now(),
                    methodName = method,
                    madhabName = madhab,
                    zoneId = ZoneId.systemDefault()
                )

                val timeFmt = DateTimeFormatter.ofPattern("hh:mm a", Locale.US)
                val fajrStr = schedule.fajr.format(timeFmt)
                val dhuhrStr = schedule.dhuhr.format(timeFmt)
                val asrStr = schedule.asr.format(timeFmt)
                val maghribStr = schedule.maghrib.format(timeFmt)
                val ishaStr = schedule.isha.format(timeFmt)

                // Location parse: Area and City
                val parts = locName.split(",").map { it.trim() }
                val area = if (parts.size > 1) {
                    val clean0 = parts[0].replace(Regex("^[A-Z0-9+]+\\s*"), "")
                    if (clean0.isNotBlank()) clean0 else parts[1]
                } else {
                    parts[0]
                }
                val city = if (parts.size > 1) parts.last() else "Pakistan"

                views.setTextViewText(R.id.widget_location_area, area)
                views.setTextViewText(R.id.widget_location_city, city)

                // Next prayer banner
                views.setTextViewText(R.id.widget_next_name, schedule.nextPrayerName)
                views.setTextViewText(R.id.widget_next_time, schedule.nextPrayerTime.format(timeFmt))

                // Normal prayer cards times
                views.setTextViewText(R.id.widget_fajr_time, fajrStr)
                views.setTextViewText(R.id.widget_dhuhr_time, dhuhrStr)
                views.setTextViewText(R.id.widget_asr_time, asrStr)
                views.setTextViewText(R.id.widget_maghrib_time, maghribStr)
                views.setTextViewText(R.id.widget_isha_time, ishaStr)

                // Active prayer cards times
                views.setTextViewText(R.id.widget_fajr_time_active, fajrStr)
                views.setTextViewText(R.id.widget_dhuhr_time_active, dhuhrStr)
                views.setTextViewText(R.id.widget_asr_time_active, asrStr)
                views.setTextViewText(R.id.widget_maghrib_time_active, maghribStr)
                views.setTextViewText(R.id.widget_isha_time_active, ishaStr)

                // Toggle which card glows with active gold border
                val next = schedule.nextPrayerName
                views.setViewVisibility(R.id.card_fajr_active, if (next == "Fajr") View.VISIBLE else View.GONE)
                views.setViewVisibility(R.id.card_fajr_normal, if (next == "Fajr") View.GONE else View.VISIBLE)

                views.setViewVisibility(R.id.card_dhuhr_active, if (next == "Dhuhr") View.VISIBLE else View.GONE)
                views.setViewVisibility(R.id.card_dhuhr_normal, if (next == "Dhuhr") View.GONE else View.VISIBLE)

                views.setViewVisibility(R.id.card_asr_active, if (next == "Asr") View.VISIBLE else View.GONE)
                views.setViewVisibility(R.id.card_asr_normal, if (next == "Asr") View.GONE else View.VISIBLE)

                views.setViewVisibility(R.id.card_maghrib_active, if (next == "Maghrib") View.VISIBLE else View.GONE)
                views.setViewVisibility(R.id.card_maghrib_normal, if (next == "Maghrib") View.GONE else View.VISIBLE)

                views.setViewVisibility(R.id.card_isha_active, if (next == "Isha") View.VISIBLE else View.GONE)
                views.setViewVisibility(R.id.card_isha_normal, if (next == "Isha") View.GONE else View.VISIBLE)

                // Live Weather Update from Open-Meteo
                val (tempStr, descStr) = fetchLiveWeather(context, lat, lng)
                views.setTextViewText(R.id.widget_weather_temp, tempStr)
                views.setTextViewText(R.id.widget_weather_desc, descStr)

                appWidgetManager.updateAppWidget(appWidgetId, views)
            } catch (e: Exception) {
                appWidgetManager.updateAppWidget(appWidgetId, views)
            }
        }

        appWidgetManager.updateAppWidget(appWidgetId, views)
    }

    private fun fetchLiveWeather(context: Context, lat: Double, lng: Double): Pair<String, String> {
        val prefs = context.getSharedPreferences("noor_widget_prefs", Context.MODE_PRIVATE)
        val cachedTemp = prefs.getString("cached_weather_temp", null)
        val cachedDesc = prefs.getString("cached_weather_desc", null)
        val cachedTime = prefs.getLong("cached_weather_time", 0L)
        val now = System.currentTimeMillis()

        if (cachedTemp != null && cachedDesc != null && (now - cachedTime < 30 * 60 * 1000)) {
            return Pair(cachedTemp, cachedDesc)
        }

        return try {
            val url = "https://api.open-meteo.com/v1/forecast?latitude=$lat&longitude=$lng&current_weather=true"
            val request = Request.Builder().url(url).build()
            val response = okHttpClient.newCall(request).execute()
            if (response.isSuccessful) {
                val body = response.body?.string() ?: ""
                val json = JSONObject(body)
                val cur = json.getJSONObject("current_weather")
                val temp = cur.getDouble("temperature").toInt()
                val code = cur.getInt("weathercode")

                val desc = when (code) {
                    0 -> "Clear"
                    1, 2 -> "Partly Cloudy"
                    3 -> "Overcast"
                    45, 48 -> "Fog"
                    51, 53, 55 -> "Drizzle"
                    61, 63, 65 -> "Rain"
                    71, 73, 75 -> "Snow"
                    80, 81, 82 -> "Showers"
                    95, 96, 99 -> "Thunderstorm"
                    else -> "Clear"
                }

                val tempStr = "$temp°C"
                prefs.edit()
                    .putString("cached_weather_temp", tempStr)
                    .putString("cached_weather_desc", desc)
                    .putLong("cached_weather_time", now)
                    .apply()
                Pair(tempStr, desc)
            } else {
                Pair(cachedTemp ?: "28°C", cachedDesc ?: "Partly Cloudy")
            }
        } catch (e: Exception) {
            Pair(cachedTemp ?: "28°C", cachedDesc ?: "Partly Cloudy")
        }
    }
}
