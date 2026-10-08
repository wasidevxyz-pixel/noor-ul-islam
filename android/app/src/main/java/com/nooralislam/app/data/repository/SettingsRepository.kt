package com.nooralislam.app.data.repository

import com.nooralislam.app.data.local.datastore.UserSettings
import com.nooralislam.app.data.local.datastore.UserSettingsDataStore
import kotlinx.coroutines.flow.Flow

class SettingsRepository(private val dataStore: UserSettingsDataStore) {

    val userSettings: Flow<UserSettings> = dataStore.userSettingsFlow

    suspend fun saveLocation(latitude: Double, longitude: Double, name: String, accuracy: Float) {
        dataStore.saveLocation(latitude, longitude, name, accuracy)
    }

    suspend fun setCalculationMethod(method: String) {
        dataStore.updateCalculationMethod(method)
    }

    suspend fun setMadhab(madhab: String) {
        dataStore.updateMadhab(madhab)
    }

    suspend fun setAzanSound(sound: String) {
        dataStore.updateAzanSound(sound)
    }

    suspend fun togglePrayerAzan(prayer: String, enabled: Boolean) {
        dataStore.togglePrayerAzan(prayer, enabled)
    }

    suspend fun updateAllSettings(
        method: String,
        madhab: String,
        sound: String,
        fajr: Boolean,
        dhuhr: Boolean,
        asr: Boolean,
        maghrib: Boolean,
        isha: Boolean
    ) {
        dataStore.updateAllSettings(method, madhab, sound, fajr, dhuhr, asr, maghrib, isha)
    }
}
