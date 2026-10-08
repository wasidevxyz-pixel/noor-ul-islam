package com.nooralislam.app.data.local.datastore

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import java.io.IOException

val Context.userDataStore: DataStore<Preferences> by preferencesDataStore(name = "user_settings")

data class UserSettings(
    val homeLatitude: Double,
    val homeLongitude: Double,
    val locationName: String,
    val lastAccuracy: Float,
    val hasHomeLocation: Boolean,
    val calculationMethod: String,
    val madhab: String,
    val azanSound: String,
    val azanFajr: Boolean,
    val azanDhuhr: Boolean,
    val azanAsr: Boolean,
    val azanMaghrib: Boolean,
    val azanIsha: Boolean
)

class UserSettingsDataStore(private val context: Context) {

    companion object {
        val KEY_HOME_LAT = doublePreferencesKey("home_latitude")
        val KEY_HOME_LNG = doublePreferencesKey("home_longitude")
        val KEY_LOCATION_NAME = stringPreferencesKey("location_name")
        val KEY_LAST_ACCURACY = floatPreferencesKey("last_accuracy")
        val KEY_HAS_HOME_LOCATION = booleanPreferencesKey("has_home_location")
        val KEY_CALCULATION_METHOD = stringPreferencesKey("calculation_method")
        val KEY_MADHAB = stringPreferencesKey("madhab")
        val KEY_AZAN_SOUND = stringPreferencesKey("azan_sound")
        val KEY_AZAN_FAJR = booleanPreferencesKey("azan_fajr")
        val KEY_AZAN_DHUHR = booleanPreferencesKey("azan_dhuhr")
        val KEY_AZAN_ASR = booleanPreferencesKey("azan_asr")
        val KEY_AZAN_MAGHRIB = booleanPreferencesKey("azan_maghrib")
        val KEY_AZAN_ISHA = booleanPreferencesKey("azan_isha")
    }

    val userSettingsFlow: Flow<UserSettings> = context.userDataStore.data
        .catch { exception ->
            if (exception is IOException) {
                emit(emptyPreferences())
            } else {
                throw exception
            }
        }
        .map { preferences ->
            UserSettings(
                homeLatitude = preferences[KEY_HOME_LAT] ?: 0.0,
                homeLongitude = preferences[KEY_HOME_LNG] ?: 0.0,
                locationName = preferences[KEY_LOCATION_NAME] ?: "",
                lastAccuracy = preferences[KEY_LAST_ACCURACY] ?: 0.0f,
                hasHomeLocation = preferences[KEY_HAS_HOME_LOCATION] ?: false,
                calculationMethod = preferences[KEY_CALCULATION_METHOD] ?: "KARACHI",
                madhab = preferences[KEY_MADHAB] ?: "HANAFI",
                azanSound = preferences[KEY_AZAN_SOUND] ?: "makkah",
                azanFajr = preferences[KEY_AZAN_FAJR] ?: true,
                azanDhuhr = preferences[KEY_AZAN_DHUHR] ?: true,
                azanAsr = preferences[KEY_AZAN_ASR] ?: true,
                azanMaghrib = preferences[KEY_AZAN_MAGHRIB] ?: true,
                azanIsha = preferences[KEY_AZAN_ISHA] ?: true
            )
        }

    suspend fun saveLocation(latitude: Double, longitude: Double, name: String, accuracy: Float) {
        context.userDataStore.edit { preferences ->
            preferences[KEY_HOME_LAT] = latitude
            preferences[KEY_HOME_LNG] = longitude
            preferences[KEY_LOCATION_NAME] = name
            preferences[KEY_LAST_ACCURACY] = accuracy
            preferences[KEY_HAS_HOME_LOCATION] = true
        }
    }

    suspend fun updateCalculationMethod(method: String) {
        context.userDataStore.edit { preferences ->
            preferences[KEY_CALCULATION_METHOD] = method
        }
    }

    suspend fun updateMadhab(madhab: String) {
        context.userDataStore.edit { preferences ->
            preferences[KEY_MADHAB] = madhab
        }
    }

    suspend fun updateAzanSound(sound: String) {
        context.userDataStore.edit { preferences ->
            preferences[KEY_AZAN_SOUND] = sound
        }
    }

    suspend fun togglePrayerAzan(prayer: String, enabled: Boolean) {
        context.userDataStore.edit { preferences ->
            when (prayer.lowercase()) {
                "fajr" -> preferences[KEY_AZAN_FAJR] = enabled
                "dhuhr" -> preferences[KEY_AZAN_DHUHR] = enabled
                "asr" -> preferences[KEY_AZAN_ASR] = enabled
                "maghrib" -> preferences[KEY_AZAN_MAGHRIB] = enabled
                "isha" -> preferences[KEY_AZAN_ISHA] = enabled
            }
        }
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
        context.userDataStore.edit { preferences ->
            preferences[KEY_CALCULATION_METHOD] = method
            preferences[KEY_MADHAB] = madhab
            preferences[KEY_AZAN_SOUND] = sound
            preferences[KEY_AZAN_FAJR] = fajr
            preferences[KEY_AZAN_DHUHR] = dhuhr
            preferences[KEY_AZAN_ASR] = asr
            preferences[KEY_AZAN_MAGHRIB] = maghrib
            preferences[KEY_AZAN_ISHA] = isha
        }
    }
}
