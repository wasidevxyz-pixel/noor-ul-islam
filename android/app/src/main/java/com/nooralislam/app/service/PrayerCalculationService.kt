package com.nooralislam.app.service

import com.batoulapps.adhan.CalculationMethod
import com.batoulapps.adhan.CalculationParameters
import com.batoulapps.adhan.Coordinates
import com.batoulapps.adhan.Madhab
import com.batoulapps.adhan.Prayer
import com.batoulapps.adhan.PrayerTimes
import com.batoulapps.adhan.data.DateComponents
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.ZonedDateTime
import java.util.Date

data class PrayerSchedule(
    val fajr: ZonedDateTime,
    val sunrise: ZonedDateTime,
    val dhuhr: ZonedDateTime,
    val asr: ZonedDateTime,
    val maghrib: ZonedDateTime,
    val isha: ZonedDateTime,
    val currentPrayerName: String,
    val nextPrayerName: String,
    val nextPrayerTime: ZonedDateTime,
    val timeRemainingMillis: Long
)

class PrayerCalculationService {

    fun getCalculationParameters(methodName: String, madhabName: String): CalculationParameters {
        val method = when (methodName.uppercase()) {
            "KARACHI" -> CalculationMethod.KARACHI
            "MAKKAH", "UMM_AL_QURA" -> CalculationMethod.UMM_AL_QURA
            "MWL", "MUSLIM_WORLD_LEAGUE" -> CalculationMethod.MUSLIM_WORLD_LEAGUE
            "EGYPT", "EGYPTIAN" -> CalculationMethod.EGYPTIAN
            "ISNA", "NORTH_AMERICA" -> CalculationMethod.NORTH_AMERICA
            "DUBAI" -> CalculationMethod.DUBAI
            "QATAR" -> CalculationMethod.QATAR
            "KUWAIT" -> CalculationMethod.KUWAIT
            "SINGAPORE" -> CalculationMethod.SINGAPORE
            "MOON_SIGHTING", "MOONSIGHTING" -> CalculationMethod.MOON_SIGHTING_COMMITTEE
            else -> CalculationMethod.KARACHI
        }

        val parameters = method.parameters
        parameters.madhab = when (madhabName.uppercase()) {
            "SHAFI", "STANDARD" -> Madhab.SHAFI
            else -> Madhab.HANAFI
        }
        return parameters
    }

    fun calculate(
        latitude: Double,
        longitude: Double,
        date: LocalDate = LocalDate.now(),
        methodName: String = "KARACHI",
        madhabName: String = "HANAFI",
        zoneId: ZoneId = ZoneId.systemDefault()
    ): PrayerSchedule {
        val coordinates = Coordinates(latitude, longitude)
        val dateComponents = DateComponents(date.year, date.monthValue, date.dayOfMonth)
        val parameters = getCalculationParameters(methodName, madhabName)

        val prayerTimes = PrayerTimes(coordinates, dateComponents, parameters)

        fun Date.toZoned(): ZonedDateTime =
            Instant.ofEpochMilli(this.time).atZone(zoneId)

        val fajrZoned = prayerTimes.fajr.toZoned()
        val sunriseZoned = prayerTimes.sunrise.toZoned()
        val dhuhrZoned = prayerTimes.dhuhr.toZoned()
        val asrZoned = prayerTimes.asr.toZoned()
        val maghribZoned = prayerTimes.maghrib.toZoned()
        val ishaZoned = prayerTimes.isha.toZoned()

        val nowZoned = ZonedDateTime.now(zoneId)
        val nowMillis = nowZoned.toInstant().toEpochMilli()

        // Determine next prayer and time remaining
        val prayers = listOf(
            "Fajr" to fajrZoned,
            "Sunrise" to sunriseZoned,
            "Dhuhr" to dhuhrZoned,
            "Asr" to asrZoned,
            "Maghrib" to maghribZoned,
            "Isha" to ishaZoned
        )

        var nextName = "Fajr"
        var nextTime = fajrZoned
        var currentName = "Isha"

        val upcoming = prayers.firstOrNull { it.second.toInstant().toEpochMilli() > nowMillis }
        if (upcoming != null) {
            nextName = upcoming.first
            nextTime = upcoming.second

            // Find current prayer
            val pastIndex = prayers.indexOf(upcoming) - 1
            currentName = if (pastIndex >= 0) prayers[pastIndex].first else "Isha"
        } else {
            // All prayers for today have passed. Next prayer is tomorrow's Fajr
            val tomorrow = date.plusDays(1)
            val tomorrowComponents = DateComponents(tomorrow.year, tomorrow.monthValue, tomorrow.dayOfMonth)
            val tomorrowTimes = PrayerTimes(coordinates, tomorrowComponents, parameters)
            nextName = "Fajr"
            nextTime = tomorrowTimes.fajr.toZoned()
            currentName = "Isha"
        }

        val remainingMillis = (nextTime.toInstant().toEpochMilli() - nowMillis).coerceAtLeast(0L)

        return PrayerSchedule(
            fajr = fajrZoned,
            sunrise = sunriseZoned,
            dhuhr = dhuhrZoned,
            asr = asrZoned,
            maghrib = maghribZoned,
            isha = ishaZoned,
            currentPrayerName = currentName,
            nextPrayerName = nextName,
            nextPrayerTime = nextTime,
            timeRemainingMillis = remainingMillis
        )
    }

    /**
     * Get specific prayer time for scheduling alarms
     */
    fun getPrayerTimesForDate(
        latitude: Double,
        longitude: Double,
        date: LocalDate,
        methodName: String,
        madhabName: String,
        zoneId: ZoneId = ZoneId.systemDefault()
    ): Map<String, ZonedDateTime> {
        val schedule = calculate(latitude, longitude, date, methodName, madhabName, zoneId)
        return mapOf(
            "Fajr" to schedule.fajr,
            "Sunrise" to schedule.sunrise,
            "Dhuhr" to schedule.dhuhr,
            "Asr" to schedule.asr,
            "Maghrib" to schedule.maghrib,
            "Isha" to schedule.isha
        )
    }
}
