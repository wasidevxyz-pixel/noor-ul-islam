package com.nooralislam.app

import com.nooralislam.app.service.PrayerCalculationService
import org.junit.Assert.*
import org.junit.Test
import java.time.LocalDate
import java.time.ZoneId

class PrayerCalculationServiceTest {

    private val service = PrayerCalculationService()

    @Test
    fun testPrayerTimesInMakkah() {
        val lat = 21.4225
        val lng = 39.8262
        val date = LocalDate.of(2026, 10, 8)
        val zoneId = ZoneId.of("Asia/Riyadh")

        val schedule = service.calculate(
            latitude = lat,
            longitude = lng,
            date = date,
            methodName = "MAKKAH",
            madhabName = "SHAFI",
            zoneId = zoneId
        )

        assertNotNull(schedule.fajr)
        assertNotNull(schedule.sunrise)
        assertNotNull(schedule.dhuhr)
        assertNotNull(schedule.asr)
        assertNotNull(schedule.maghrib)
        assertNotNull(schedule.isha)

        assertEquals("Asia/Riyadh", schedule.fajr.zone.id)

        // Chronological order verification
        assertTrue("Fajr should be before Sunrise", schedule.fajr.isBefore(schedule.sunrise))
        assertTrue("Sunrise should be before Dhuhr", schedule.sunrise.isBefore(schedule.dhuhr))
        assertTrue("Dhuhr should be before Asr", schedule.dhuhr.isBefore(schedule.asr))
        assertTrue("Asr should be before Maghrib", schedule.asr.isBefore(schedule.maghrib))
        assertTrue("Maghrib should be before Isha", schedule.maghrib.isBefore(schedule.isha))
    }

    @Test
    fun testPrayerTimesLondonMWL() {
        val lat = 51.5074
        val lng = -0.1278
        val date = LocalDate.of(2026, 10, 8)
        val zoneId = ZoneId.of("Europe/London")

        val schedule = service.calculate(
            latitude = lat,
            longitude = lng,
            date = date,
            methodName = "MWL",
            madhabName = "HANAFI",
            zoneId = zoneId
        )

        assertEquals("Europe/London", schedule.fajr.zone.id)
        assertTrue(schedule.fajr.isBefore(schedule.dhuhr))
        assertTrue(schedule.dhuhr.isBefore(schedule.maghrib))
    }

    @Test
    fun testHanafiVsShafiAsrDifference() {
        val lat = 24.8607
        val lng = 67.0011
        val date = LocalDate.of(2026, 10, 8)
        val zoneId = ZoneId.of("Asia/Karachi")

        val hanafiSchedule = service.calculate(
            latitude = lat,
            longitude = lng,
            date = date,
            methodName = "KARACHI",
            madhabName = "HANAFI",
            zoneId = zoneId
        )

        val shafiSchedule = service.calculate(
            latitude = lat,
            longitude = lng,
            date = date,
            methodName = "KARACHI",
            madhabName = "SHAFI",
            zoneId = zoneId
        )

        // In Hanafi jurisprudence, Asr begins when the shadow is twice the length, which is later than Shafi (ratio 1)
        assertTrue(
            "Hanafi Asr must be later than Shafi Asr",
            hanafiSchedule.asr.isAfter(shafiSchedule.asr)
        )
    }

    @Test
    fun testDynamicTimezonesWithoutHardcoding() {
        val lat = 40.7128
        val lng = -74.0060
        val date = LocalDate.of(2026, 10, 8)

        val nyZone = ZoneId.of("America/New_York")
        val nySchedule = service.calculate(
            latitude = lat,
            longitude = lng,
            date = date,
            methodName = "ISNA",
            madhabName = "STANDARD",
            zoneId = nyZone
        )

        assertEquals("America/New_York", nySchedule.fajr.zone.id)
        assertEquals(nyZone, nySchedule.maghrib.zone)

        val tokyoZone = ZoneId.of("Asia/Tokyo")
        val tokyoSchedule = service.calculate(
            latitude = 35.6762,
            longitude = 139.6503,
            date = date,
            methodName = "MWL",
            madhabName = "SHAFI",
            zoneId = tokyoZone
        )
        assertEquals("Asia/Tokyo", tokyoSchedule.fajr.zone.id)
    }
}
