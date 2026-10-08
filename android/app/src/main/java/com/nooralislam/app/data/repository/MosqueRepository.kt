package com.nooralislam.app.data.repository

import android.location.Location
import android.util.Log
import com.nooralislam.app.data.local.dao.MosqueDao
import com.nooralislam.app.data.local.entity.MosqueEntity
import com.nooralislam.app.service.MosqueSearchService
import kotlinx.coroutines.flow.Flow

class MosqueRepository(
    private val mosqueSearchService: MosqueSearchService,
    private val mosqueDao: MosqueDao
) {
    companion object {
        private const val TAG = "MosqueRepository"
        private const val CACHE_VALIDITY_MILLIS = 24 * 60 * 60 * 1000L // 24 hours
    }

    val cachedMosques: Flow<List<MosqueEntity>> = mosqueDao.getAllMosques()

    suspend fun getNearbyMosques(
        userLat: Double,
        userLng: Double,
        radiusMeters: Int = 5000,
        forceRefresh: Boolean = false
    ): List<MosqueEntity> {
        // If not force refresh, check if local cache has recent results
        if (!forceRefresh) {
            val cached = mosqueDao.getMosquesList()
            if (cached.isNotEmpty()) {
                val age = System.currentTimeMillis() - cached.first().cachedTimestamp
                if (age < CACHE_VALIDITY_MILLIS) {
                    Log.d(TAG, "Returning ${cached.size} mosques from local Room cache")
                    // Recalculate distance from user's current coordinates
                    return cached.map { m ->
                        val distResults = FloatArray(1)
                        Location.distanceBetween(userLat, userLng, m.latitude, m.longitude, distResults)
                        m.copy(distanceMeters = distResults[0].toDouble())
                    }.sortedBy { it.distanceMeters }
                }
            }
        }

        // Fetch fresh from Overpass API
        Log.d(TAG, "Fetching mosques from OpenStreetMap Overpass API for ($userLat, $userLng)")
        val remoteMosques = mosqueSearchService.searchNearbyMosques(userLat, userLng, radiusMeters)

        if (remoteMosques.isNotEmpty()) {
            try {
                mosqueDao.deleteAllMosques()
                mosqueDao.insertMosques(remoteMosques)
                Log.d(TAG, "Cached ${remoteMosques.size} mosques in Room database")
            } catch (e: Exception) {
                Log.e(TAG, "Error caching mosques in Room: ${e.message}", e)
            }
            return remoteMosques
        }

        // Fallback to local Room cache if network fails
        val fallback = mosqueDao.getMosquesList()
        Log.d(TAG, "Overpass search returned empty or failed. Fallback to ${fallback.size} cached mosques")
        return fallback.map { m ->
            val distResults = FloatArray(1)
            Location.distanceBetween(userLat, userLng, m.latitude, m.longitude, distResults)
            m.copy(distanceMeters = distResults[0].toDouble())
        }.sortedBy { it.distanceMeters }
    }

    suspend fun reverseGeocode(lat: Double, lng: Double): String {
        return mosqueSearchService.reverseGeocode(lat, lng)
    }
}
