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
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Locale

class NamazBarWidgetProvider : AppWidgetProvider() {

    companion object {
        const val ACTION_UPDATE_NAMAZ_WIDGET = "com.nooralislam.app.ACTION_UPDATE_NAMAZ_WIDGET"

        fun triggerUpdate(context: Context) {
            val intent = Intent(context, NamazBarWidgetProvider::class.java).apply {
                action = ACTION_UPDATE_NAMAZ_WIDGET
            }
            context.sendBroadcast(intent)
        }
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_UPDATE_NAMAZ_WIDGET || intent.action == AppWidgetManager.ACTION_APPWIDGET_UPDATE) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, NamazBarWidgetProvider::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
            for (id in appWidgetIds) {
                updateAppWidget(context, appWidgetManager, id)
            }
        }
    }

    private fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
        val views = RemoteViews(context.packageName, R.layout.widget_namaz_bar)

        val appIntent = Intent(context, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            appIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)

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

                views.setTextViewText(R.id.widget_location_text, locName)
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

                appWidgetManager.updateAppWidget(appWidgetId, views)
            } catch (e: Exception) {
                appWidgetManager.updateAppWidget(appWidgetId, views)
            }
        }

        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
}
