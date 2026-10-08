package com.nooralislam.app

import android.app.Application
import com.nooralislam.app.data.local.AppDatabase
import com.nooralislam.app.data.local.datastore.UserSettingsDataStore
import com.nooralislam.app.data.repository.HomeLocationRepository
import com.nooralislam.app.data.repository.LocationRepository
import com.nooralislam.app.data.repository.MosqueRepository
import com.nooralislam.app.data.repository.PrayerTimesRepository
import com.nooralislam.app.data.repository.SettingsRepository
import com.nooralislam.app.service.AzanNotificationManager
import com.nooralislam.app.service.MosqueSearchService
import com.nooralislam.app.service.PrayerAlarmScheduler
import com.nooralislam.app.service.PrayerCalculationService

class NoorApp : Application() {

    lateinit var database: AppDatabase
        private set

    lateinit var userSettingsDataStore: UserSettingsDataStore
        private set

    lateinit var locationRepository: LocationRepository
        private set

    lateinit var homeLocationRepository: HomeLocationRepository
        private set

    lateinit var prayerTimesRepository: PrayerTimesRepository
        private set

    lateinit var prayerCalculationService: PrayerCalculationService
        private set

    lateinit var prayerAlarmScheduler: PrayerAlarmScheduler
        private set

    lateinit var mosqueRepository: MosqueRepository
        private set

    lateinit var settingsRepository: SettingsRepository
        private set

    override fun onCreate() {
        super.onCreate()
        try {
            // Initialize Notification Channels
            AzanNotificationManager.createNotificationChannel(this)

            // Initialize Local Storage
            database = AppDatabase.getInstance(this)
            userSettingsDataStore = UserSettingsDataStore(this)

            // Initialize Services & Repositories
            locationRepository = LocationRepository(this)
            homeLocationRepository = HomeLocationRepository(userSettingsDataStore)
            prayerCalculationService = PrayerCalculationService()
            prayerTimesRepository = PrayerTimesRepository(prayerCalculationService)
            prayerAlarmScheduler = PrayerAlarmScheduler(this)

            val mosqueSearchService = MosqueSearchService(this)
            mosqueRepository = MosqueRepository(mosqueSearchService, database.mosqueDao())
            settingsRepository = SettingsRepository(userSettingsDataStore)
        } catch (e: Exception) {
            android.util.Log.e("NoorApp", "Initialization notice: ${e.message}", e)
        }
    }
}
