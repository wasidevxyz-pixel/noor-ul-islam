package com.nooralislam.app.service

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import com.nooralislam.app.MainActivity
import com.nooralislam.app.data.local.datastore.UserSettings
import com.nooralislam.app.receiver.AzanAlarmReceiver
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

class PrayerAlarmScheduler(private val context: Context) {

    companion object {
        private const val TAG = "PrayerAlarmScheduler"
        const val REQUEST_CODE_FAJR = 101
        const val REQUEST_CODE_SUNRISE = 102
        const val REQUEST_CODE_DHUHR = 103
        const val REQUEST_CODE_ASR = 104
        const val REQUEST_CODE_MAGHRIB = 105
        const val REQUEST_CODE_ISHA = 106

        const val REQUEST_CODE_DAILY_AYAT = 201
        const val REQUEST_CODE_DAILY_HADITH = 202
        const val REQUEST_CODE_DAILY_TASBIH = 203

        fun getRequestCode(prayerName: String, dayOffset: Int = 0): Int {
            val base = when (prayerName.lowercase()) {
                "fajr" -> REQUEST_CODE_FAJR
                "sunrise" -> REQUEST_CODE_SUNRISE
                "dhuhr" -> REQUEST_CODE_DHUHR
                "asr" -> REQUEST_CODE_ASR
                "maghrib" -> REQUEST_CODE_MAGHRIB
                "isha" -> REQUEST_CODE_ISHA
                else -> 100
            }
            return base + (dayOffset * 1000)
        }
    }

    private val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    private val prayerCalculationService = PrayerCalculationService()

    fun scheduleAlarms(
        latitude: Double,
        longitude: Double,
        settings: UserSettings,
        zoneId: ZoneId = ZoneId.systemDefault()
    ) {
        // Also schedule daily inspiration alerts (Ayat, Hadith, Tasbih)
        scheduleDailyInspirations(zoneId)

        val effLat = if (latitude == 0.0 && longitude == 0.0) 33.6844 else latitude
        val effLng = if (latitude == 0.0 && longitude == 0.0) 73.0479 else longitude

        val now = ZonedDateTime.now(zoneId)
        val nowMillis = now.toInstant().toEpochMilli()

        // Check prayers for today and tomorrow without overriding request codes
        val daysToSchedule = listOf(0 to LocalDate.now(), 1 to LocalDate.now().plusDays(1))

        for ((dayOffset, date) in daysToSchedule) {
            val prayerTimes = prayerCalculationService.getPrayerTimesForDate(
                latitude = effLat,
                longitude = effLng,
                date = date,
                methodName = settings.calculationMethod,
                madhabName = settings.madhab,
                zoneId = zoneId
            )

            for ((name, zonedDateTime) in prayerTimes) {
                if (name == "Sunrise") continue // Sunrise has no Azan audio

                val isEnabled = when (name.lowercase()) {
                    "fajr" -> settings.azanFajr
                    "dhuhr" -> settings.azanDhuhr
                    "asr" -> settings.azanAsr
                    "maghrib" -> settings.azanMaghrib
                    "isha" -> settings.azanIsha
                    else -> true
                }

                if (!isEnabled) continue

                val triggerMillis = zonedDateTime.toInstant().toEpochMilli()

                if (triggerMillis > nowMillis) {
                    val timeStr = zonedDateTime.format(DateTimeFormatter.ofPattern("hh:mm a"))
                    scheduleExactAlarm(name, timeStr, triggerMillis, settings.azanSound, dayOffset)
                }
            }
        }
    }

    fun scheduleDailyInspirations(zoneId: ZoneId = ZoneId.systemDefault()) {
        val now = ZonedDateTime.now(zoneId)

        // 1. Daily Ayat at 08:30 AM
        val ayatTime = LocalTime.of(8, 30)
        var ayatDateTime = ZonedDateTime.of(now.toLocalDate(), ayatTime, zoneId)
        if (ayatDateTime.isBefore(now)) {
            ayatDateTime = ayatDateTime.plusDays(1)
        }
        scheduleInspirationAlarm(
            AzanAlarmReceiver.ACTION_DAILY_AYAT,
            REQUEST_CODE_DAILY_AYAT,
            ayatDateTime.toInstant().toEpochMilli()
        )

        // 2. Daily Hadith at 01:30 PM (13:30)
        val hadithTime = LocalTime.of(13, 30)
        var hadithDateTime = ZonedDateTime.of(now.toLocalDate(), hadithTime, zoneId)
        if (hadithDateTime.isBefore(now)) {
            hadithDateTime = hadithDateTime.plusDays(1)
        }
        scheduleInspirationAlarm(
            AzanAlarmReceiver.ACTION_DAILY_HADITH,
            REQUEST_CODE_DAILY_HADITH,
            hadithDateTime.toInstant().toEpochMilli()
        )

        // 3. Daily Tasbih at 08:30 PM (20:30)
        val tasbihTime = LocalTime.of(20, 30)
        var tasbihDateTime = ZonedDateTime.of(now.toLocalDate(), tasbihTime, zoneId)
        if (tasbihDateTime.isBefore(now)) {
            tasbihDateTime = tasbihDateTime.plusDays(1)
        }
        scheduleInspirationAlarm(
            AzanAlarmReceiver.ACTION_DAILY_TASBIH,
            REQUEST_CODE_DAILY_TASBIH,
            tasbihDateTime.toInstant().toEpochMilli()
        )
    }

    private fun scheduleInspirationAlarm(action: String, requestCode: Int, triggerAtMillis: Long) {
        val intent = Intent(context, AzanAlarmReceiver::class.java).apply {
            this.action = action
        }
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            requestCode,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        setAlarmWithHighPriority(triggerAtMillis, pendingIntent, "Inspiration($action)")
    }

    private fun scheduleExactAlarm(
        prayerName: String,
        timeStr: String,
        triggerAtMillis: Long,
        soundName: String,
        dayOffset: Int
    ) {
        val intent = Intent(context, AzanAlarmReceiver::class.java).apply {
            action = AzanAlarmReceiver.ACTION_PRAYER_ALARM
            putExtra(AzanAlarmReceiver.EXTRA_PRAYER_NAME, prayerName)
            putExtra(AzanAlarmReceiver.EXTRA_PRAYER_TIME, timeStr)
            putExtra(AzanAlarmReceiver.EXTRA_AZAN_SOUND, soundName)
        }

        val requestCode = getRequestCode(prayerName, dayOffset)
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            requestCode,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        setAlarmWithHighPriority(triggerAtMillis, pendingIntent, "Prayer($prayerName,day+$dayOffset)")
    }

    private fun setAlarmWithHighPriority(
        triggerAtMillis: Long,
        pendingIntent: PendingIntent,
        tag: String
    ) {
        // Use setAlarmClock if possible (highest priority alarm clock API on Android, wakes phone even in Doze)
        val showIntent = Intent(context, MainActivity::class.java)
        val showPendingIntent = PendingIntent.getActivity(
            context,
            0,
            showIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        try {
            alarmManager.setAlarmClock(
                AlarmManager.AlarmClockInfo(triggerAtMillis, showPendingIntent),
                pendingIntent
            )
            Log.d(TAG, "setAlarmClock succeeded for $tag at $triggerAtMillis")
            return
        } catch (e: Exception) {
            Log.w(TAG, "setAlarmClock not available, falling back to setExactAndAllowWhileIdle: ${e.message}")
        }

        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                if (alarmManager.canScheduleExactAlarms()) {
                    alarmManager.setExactAndAllowWhileIdle(
                        AlarmManager.RTC_WAKEUP,
                        triggerAtMillis,
                        pendingIntent
                    )
                    Log.d(TAG, "setExactAndAllowWhileIdle scheduled for $tag")
                } else {
                    alarmManager.setAndAllowWhileIdle(
                        AlarmManager.RTC_WAKEUP,
                        triggerAtMillis,
                        pendingIntent
                    )
                    Log.d(TAG, "setAndAllowWhileIdle fallback scheduled for $tag")
                }
            } else {
                alarmManager.setExactAndAllowWhileIdle(
                    AlarmManager.RTC_WAKEUP,
                    triggerAtMillis,
                    pendingIntent
                )
                Log.d(TAG, "Pre-S exact alarm scheduled for $tag")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to schedule alarm for $tag: ${e.message}", e)
        }
    }

    fun cancelAlarms() {
        val prayerNames = listOf("Fajr", "Dhuhr", "Asr", "Maghrib", "Isha")
        for (dayOffset in listOf(0, 1)) {
            for (name in prayerNames) {
                val intent = Intent(context, AzanAlarmReceiver::class.java).apply {
                    action = AzanAlarmReceiver.ACTION_PRAYER_ALARM
                }
                val pendingIntent = PendingIntent.getBroadcast(
                    context,
                    getRequestCode(name, dayOffset),
                    intent,
                    PendingIntent.FLAG_NO_CREATE or PendingIntent.FLAG_IMMUTABLE
                )
                if (pendingIntent != null) {
                    alarmManager.cancel(pendingIntent)
                    pendingIntent.cancel()
                }
            }
        }
        Log.d(TAG, "All prayer alarms cancelled.")
    }
}
