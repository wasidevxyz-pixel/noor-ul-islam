package com.nooralislam.app.data.repository

import com.nooralislam.app.service.PrayerCalculationService
import com.nooralislam.app.service.PrayerSchedule
import java.time.LocalDate
import java.time.ZoneId

class PrayerTimesRepository(
    private val calculationService: PrayerCalculationService = PrayerCalculationService()
) {
    fun calculatePrayerTimes(
        latitude: Double,
        longitude: Double,
        date: LocalDate = LocalDate.now(),
        method: String = "KARACHI",
        madhab: String = "HANAFI",
        zoneId: ZoneId = ZoneId.systemDefault()
    ): PrayerSchedule {
        return calculationService.calculate(
            latitude = latitude,
            longitude = longitude,
            date = date,
            methodName = method,
            madhabName = madhab,
            zoneId = zoneId
        )
    }
}
