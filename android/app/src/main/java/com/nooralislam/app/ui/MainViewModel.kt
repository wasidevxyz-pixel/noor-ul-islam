package com.nooralislam.app.ui

import android.content.Context
import android.location.Location
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.nooralislam.app.data.local.datastore.UserSettings
import com.nooralislam.app.data.local.entity.MosqueEntity
import com.nooralislam.app.data.repository.HomeLocationRepository
import com.nooralislam.app.data.repository.LocationRepository
import com.nooralislam.app.data.repository.MosqueRepository
import com.nooralislam.app.data.repository.PrayerTimesRepository
import com.nooralislam.app.data.repository.SettingsRepository
import com.nooralislam.app.service.AzanAudioPlayer
import com.nooralislam.app.service.PrayerAlarmScheduler
import com.nooralislam.app.service.PrayerSchedule
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.ZoneId

class MainViewModel(
    private val locationRepository: LocationRepository,
    private val homeLocationRepository: HomeLocationRepository,
    private val prayerTimesRepository: PrayerTimesRepository,
    private val prayerAlarmScheduler: PrayerAlarmScheduler,
    private val mosqueRepository: MosqueRepository,
    private val settingsRepository: SettingsRepository
) : ViewModel() {

    companion object {
        private const val TAG = "MainViewModel"
    }

    private val _userSettings = MutableStateFlow<UserSettings?>(null)
    val userSettings: StateFlow<UserSettings?> = _userSettings.asStateFlow()

    private val _currentLocation = MutableStateFlow<Location?>(null)
    val currentLocation: StateFlow<Location?> = _currentLocation.asStateFlow()

    private val _prayerSchedule = MutableStateFlow<PrayerSchedule?>(null)
    val prayerSchedule: StateFlow<PrayerSchedule?> = _prayerSchedule.asStateFlow()

    private val _nearbyMosques = MutableStateFlow<List<MosqueEntity>>(emptyList())
    val nearbyMosques: StateFlow<List<MosqueEntity>> = _nearbyMosques.asStateFlow()

    private val _isLoadingMosques = MutableStateFlow(false)
    val isLoadingMosques: StateFlow<Boolean> = _isLoadingMosques.asStateFlow()

    private val _isDetectingLocation = MutableStateFlow(false)
    val isDetectingLocation: StateFlow<Boolean> = _isDetectingLocation.asStateFlow()

    init {
        // Collect user settings and trigger prayer calculation / alarm scheduling
        viewModelScope.launch {
            settingsRepository.userSettings.collectLatest { settings ->
                _userSettings.value = settings
                val lat = if (settings.hasHomeLocation && settings.homeLatitude != 0.0) settings.homeLatitude else 33.6844
                val lng = if (settings.hasHomeLocation && settings.homeLongitude != 0.0) settings.homeLongitude else 73.0479
                recalculatePrayerTimes(lat, lng, settings)
                prayerAlarmScheduler.scheduleAlarms(
                    latitude = lat,
                    longitude = lng,
                    settings = settings
                )
            }
        }

        // Collect cached mosques from Room
        viewModelScope.launch {
            mosqueRepository.cachedMosques.collectLatest { list ->
                if (_nearbyMosques.value.isEmpty() && list.isNotEmpty()) {
                    _nearbyMosques.value = list
                }
            }
        }
    }

    fun refreshLocation(onLocationResolved: ((Location, String) -> Unit)? = null) {
        viewModelScope.launch {
            _isDetectingLocation.value = true
            try {
                val loc = locationRepository.getCurrentLocation()
                if (loc != null) {
                    _currentLocation.value = loc
                    val locationName = mosqueRepository.reverseGeocode(loc.latitude, loc.longitude)

                    // Persist home location in DataStore
                    settingsRepository.saveLocation(
                        latitude = loc.latitude,
                        longitude = loc.longitude,
                        name = locationName,
                        accuracy = loc.accuracy
                    )

                    val currentSettings = _userSettings.value
                    if (currentSettings != null) {
                        recalculatePrayerTimes(loc.latitude, loc.longitude, currentSettings)
                        prayerAlarmScheduler.scheduleAlarms(
                            latitude = loc.latitude,
                            longitude = loc.longitude,
                            settings = currentSettings
                        )
                    }

                    // Refresh nearby mosques from exact coordinates
                    loadNearbyMosques(loc.latitude, loc.longitude, forceRefresh = true)

                    onLocationResolved?.invoke(loc, locationName)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error refreshing location: ${e.message}", e)
            } finally {
                _isDetectingLocation.value = false
            }
        }
    }

    fun recalculatePrayerTimes(lat: Double, lng: Double, settings: UserSettings) {
        try {
            val schedule = prayerTimesRepository.calculatePrayerTimes(
                latitude = lat,
                longitude = lng,
                date = LocalDate.now(),
                method = settings.calculationMethod,
                madhab = settings.madhab,
                zoneId = ZoneId.systemDefault()
            )
            _prayerSchedule.value = schedule
        } catch (e: Exception) {
            Log.e(TAG, "Failed to calculate prayer times: ${e.message}", e)
        }
    }

    fun loadNearbyMosques(lat: Double, lng: Double, forceRefresh: Boolean = false) {
        viewModelScope.launch {
            _isLoadingMosques.value = true
            try {
                val mosques = mosqueRepository.getNearbyMosques(
                    userLat = lat,
                    userLng = lng,
                    radiusMeters = 5000,
                    forceRefresh = forceRefresh
                )
                _nearbyMosques.value = mosques
            } catch (e: Exception) {
                Log.e(TAG, "Failed to load mosques: ${e.message}", e)
            } finally {
                _isLoadingMosques.value = false
            }
        }
    }

    fun setCalculationMethod(method: String) {
        viewModelScope.launch {
            settingsRepository.setCalculationMethod(method)
        }
    }

    fun setMadhab(madhab: String) {
        viewModelScope.launch {
            settingsRepository.setMadhab(madhab)
        }
    }

    fun setAzanSound(sound: String) {
        viewModelScope.launch {
            settingsRepository.setAzanSound(sound)
        }
    }

    fun togglePrayerAzan(prayer: String, enabled: Boolean) {
        viewModelScope.launch {
            settingsRepository.togglePrayerAzan(prayer, enabled)
        }
    }

    fun updateAllSettings(
        method: String,
        madhab: String,
        sound: String,
        fajr: Boolean,
        dhuhr: Boolean,
        asr: Boolean,
        maghrib: Boolean,
        isha: Boolean
    ) {
        viewModelScope.launch {
            settingsRepository.updateAllSettings(method, madhab, sound, fajr, dhuhr, asr, maghrib, isha)
        }
    }

    fun playAzan(context: Context, soundKey: String) {
        AzanAudioPlayer.play(context, soundKey)
    }

    fun stopAzan() {
        AzanAudioPlayer.stop()
    }
}

class MainViewModelFactory(
    private val locationRepository: LocationRepository,
    private val homeLocationRepository: HomeLocationRepository,
    private val prayerTimesRepository: PrayerTimesRepository,
    private val prayerAlarmScheduler: PrayerAlarmScheduler,
    private val mosqueRepository: MosqueRepository,
    private val settingsRepository: SettingsRepository
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return MainViewModel(
            locationRepository,
            homeLocationRepository,
            prayerTimesRepository,
            prayerAlarmScheduler,
            mosqueRepository,
            settingsRepository
        ) as T
    }
}
