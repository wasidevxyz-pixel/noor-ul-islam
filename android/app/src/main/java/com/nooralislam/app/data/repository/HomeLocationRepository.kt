package com.nooralislam.app.data.repository

import com.nooralislam.app.data.local.datastore.UserSettingsDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

data class HomeLocation(
    val latitude: Double,
    val longitude: Double,
    val locationName: String,
    val accuracy: Float,
    val isSet: Boolean
)

class HomeLocationRepository(private val userSettingsDataStore: UserSettingsDataStore) {

    val homeLocation: Flow<HomeLocation> = userSettingsDataStore.userSettingsFlow.map { settings ->
        HomeLocation(
            latitude = settings.homeLatitude,
            longitude = settings.homeLongitude,
            locationName = settings.locationName,
            accuracy = settings.lastAccuracy,
            isSet = settings.hasHomeLocation
        )
    }

    suspend fun saveHomeLocation(
        latitude: Double,
        longitude: Double,
        name: String,
        accuracy: Float
    ) {
        userSettingsDataStore.saveLocation(
            latitude = latitude,
            longitude = longitude,
            name = name,
            accuracy = accuracy
        )
    }
}
