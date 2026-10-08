package com.nooralislam.app.service

import android.content.Context
import android.location.Geocoder
import android.location.Location
import android.util.Log
import com.nooralislam.app.data.local.entity.MosqueEntity
import com.nooralislam.app.data.remote.ApiClient
import java.util.Locale

class MosqueSearchService(private val context: Context? = null) {

    companion object {
        private const val TAG = "MosqueSearchService"
    }

    suspend fun searchNearbyMosques(
        userLat: Double,
        userLng: Double,
        radiusMeters: Int = 5000
    ): List<MosqueEntity> {
        val query = String.format(
            Locale.US,
            """
            [out:json][timeout:25];
            (
              node["amenity"="place_of_worship"]["religion"="muslim"](around:%d,%f,%f);
              way["amenity"="place_of_worship"]["religion"="muslim"](around:%d,%f,%f);
              relation["amenity"="place_of_worship"]["religion"="muslim"](around:%d,%f,%f);
            );
            out center body;
            """.trimIndent(),
            radiusMeters, userLat, userLng,
            radiusMeters, userLat, userLng,
            radiusMeters, userLat, userLng
        )

        return try {
            val response = ApiClient.overpassApi.searchMosques(query)
            val elements = response.elements ?: emptyList()
            val list = mutableListOf<MosqueEntity>()

            for (elem in elements) {
                val lat = elem.lat ?: elem.center?.lat ?: continue
                val lon = elem.lon ?: elem.center?.lon ?: continue

                val tags = elem.tags ?: emptyMap()
                val rawName = tags["name"] ?: tags["name:en"] ?: tags["name:ur"] ?: tags["name:ar"]
                val cleanName = if (rawName.isNullOrBlank() || rawName.trim().equals("mosque", ignoreCase = true) || rawName.trim().equals("masjid", ignoreCase = true)) {
                    "Jamia Masjid"
                } else {
                    rawName.trim()
                }

                val street = tags["addr:street"] ?: ""
                val suburb = tags["addr:suburb"] ?: tags["addr:district"] ?: tags["addr:city"] ?: ""
                val address = listOf(street, suburb).filter { it.isNotBlank() }.joinToString(", ")
                    .ifBlank { "Near coordinates (%.4f, %.4f)".format(Locale.US, lat, lon) }

                val distResults = FloatArray(1)
                Location.distanceBetween(userLat, userLng, lat, lon, distResults)
                val distanceMeters = distResults[0].toDouble()

                list.add(
                    MosqueEntity(
                        osmId = elem.id,
                        name = cleanName,
                        latitude = lat,
                        longitude = lon,
                        distanceMeters = distanceMeters,
                        address = address,
                        cachedTimestamp = System.currentTimeMillis()
                    )
                )
            }

            // Strictly ascending by distance from actual user coordinates
            list.sortedBy { it.distanceMeters }
        } catch (e: Exception) {
            Log.e(TAG, "Overpass mosque query error: ${e.message}", e)
            emptyList()
        }
    }

    suspend fun reverseGeocode(lat: Double, lng: Double): String {
        // 1. First priority: Android Native Geocoder (Uses Google on-device framework geocoder for 100% free)
        if (context != null && Geocoder.isPresent()) {
            try {
                val geocoder = Geocoder(context, Locale.getDefault())
                @Suppress("DEPRECATION")
                val addresses = geocoder.getFromLocation(lat, lng, 1)
                if (!addresses.isNullOrEmpty()) {
                    val addr = addresses[0]
                    val parts = mutableListOf<String>()

                    val premises = addr.premises
                    val feature = addr.featureName
                    val subThoroughfare = addr.subThoroughfare
                    val street = addr.thoroughfare

                    // 1. Precise building, shop, plaza, or premises deduction
                    val buildingOrShop = when {
                        !premises.isNullOrBlank() -> premises
                        !feature.isNullOrBlank() && feature != street && !street.orEmpty().contains(feature) -> feature
                        else -> null
                    }

                    if (!buildingOrShop.isNullOrBlank()) {
                        if (!subThoroughfare.isNullOrBlank() && buildingOrShop != subThoroughfare) {
                            parts.add("$buildingOrShop, $subThoroughfare")
                        } else {
                            parts.add(buildingOrShop)
                        }
                    } else if (!subThoroughfare.isNullOrBlank()) {
                        parts.add(subThoroughfare)
                    }

                    if (!street.isNullOrBlank() && !parts.any { it.contains(street, ignoreCase = true) }) {
                        parts.add(street)
                    }

                    val subLocality = addr.subLocality ?: addr.subAdminArea
                    if (!subLocality.isNullOrBlank() && !parts.any { it.contains(subLocality, ignoreCase = true) }) {
                        parts.add(subLocality)
                    }

                    val locality = addr.locality ?: addr.adminArea
                    if (!locality.isNullOrBlank() && !parts.any { it.contains(locality, ignoreCase = true) }) {
                        parts.add(locality)
                    }

                    if (parts.isNotEmpty()) {
                        val nativeAddress = parts.joinToString(", ")
                        Log.d(TAG, "Android native Geocoder resolved: $nativeAddress")
                        return nativeAddress
                    }

                    val line = addr.getAddressLine(0)
                    if (!line.isNullOrBlank()) {
                        return line.split(",").take(3).joinToString(",").trim()
                    }
                }
            } catch (e: Exception) {
                Log.w(TAG, "Native Geocoder notice: ${e.message}")
            }
        }

        // 2. High-precision Nominatim reverse geocoding with deep POI/building/society hierarchy (zoom=18)
        return try {
            val response = ApiClient.nominatimApi.reverseGeocode(lat = lat, lon = lng, zoom = 18)
            val addr = response.address
            val parts = mutableListOf<String>()

            // Specific named place/building/shop (e.g. D-Watson Pharmacy)
            val placeName = if (!response.name.isNullOrBlank() && response.name != addr?.city && response.name != addr?.state) {
                response.name
            } else null

            val poi = placeName ?: addr?.commercial ?: addr?.pharmacy ?: addr?.building ?: addr?.shop ?: addr?.amenity ?: addr?.office
            if (!poi.isNullOrBlank()) {
                parts.add(poi)
            }

            // House/Building number
            if (!addr?.houseNumber.isNullOrBlank() && !parts.any { it.contains(addr?.houseNumber!!, ignoreCase = true) }) {
                parts.add(addr?.houseNumber!!)
            }

            // Road / Street
            val road = addr?.road ?: addr?.street ?: addr?.pedestrian
            if (!road.isNullOrBlank() && !parts.any { it.contains(road, ignoreCase = true) }) {
                parts.add(road)
            }

            // Residential Society / Colony / Block / Suburb
            val sector = addr?.residential ?: addr?.neighbourhood ?: addr?.suburb
            if (!sector.isNullOrBlank() && !parts.any { it.contains(sector, ignoreCase = true) }) {
                parts.add(sector)
            }

            // City (Disambiguate Islamabad vs Rawalpindi for federal capital zones)
            val detectedCity = addr?.city ?: addr?.town ?: addr?.cityDistrict
            val city = if (addr?.state?.contains("Islamabad", ignoreCase = true) == true || (lat in 33.5..33.78 && lng in 72.85..73.25)) {
                "Islamabad"
            } else {
                detectedCity ?: addr?.state
            }
            if (!city.isNullOrBlank() && !parts.any { it.contains(city, ignoreCase = true) }) {
                parts.add(city)
            }

            if (parts.isNotEmpty()) {
                parts.joinToString(", ")
            } else if (response.displayName != null) {
                response.displayName.split(",").take(3).joinToString(",").trim()
            } else {
                "%.5f, %.5f".format(Locale.US, lat, lng)
            }
        } catch (e: Exception) {
            Log.w(TAG, "Nominatim reverse geocode notice: ${e.message}")
            "%.5f, %.5f".format(Locale.US, lat, lng)
        }
    }
}
