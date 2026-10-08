package com.nooralislam.app.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.nooralislam.app.data.local.datastore.UserSettingsDataStore
import com.nooralislam.app.service.PrayerAlarmScheduler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import java.time.ZoneId

class BootReceiver : BroadcastReceiver() {

    companion object {
        private const val TAG = "BootReceiver"
    }

    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action
        Log.d(TAG, "Device broadcast received: $action")

        if (action == Intent.ACTION_BOOT_COMPLETED ||
            action == Intent.ACTION_MY_PACKAGE_REPLACED ||
            action == Intent.ACTION_TIMEZONE_CHANGED ||
            action == Intent.ACTION_TIME_CHANGED
        ) {
            val pendingResult = goAsync()
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val dataStore = UserSettingsDataStore(context)
                    val settings = dataStore.userSettingsFlow.first()

                    val scheduler = PrayerAlarmScheduler(context)
                    val effLat = if (settings.hasHomeLocation && settings.homeLatitude != 0.0) settings.homeLatitude else 33.6844
                    val effLng = if (settings.hasHomeLocation && settings.homeLongitude != 0.0) settings.homeLongitude else 73.0479

                    Log.d(TAG, "Rescheduling prayer alarms for device event $action at ($effLat, $effLng) with timezone: ${ZoneId.systemDefault()}")
                    scheduler.scheduleAlarms(
                        latitude = effLat,
                        longitude = effLng,
                        settings = settings,
                        zoneId = ZoneId.systemDefault()
                    )
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to reschedule prayer alarms after boot/timezone change: ${e.message}", e)
                } finally {
                    pendingResult.finish()
                }
            }
        }
    }
}
