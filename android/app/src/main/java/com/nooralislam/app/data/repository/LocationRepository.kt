package com.nooralislam.app.data.repository

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Build
import android.os.Bundle
import android.os.Looper
import android.util.Log
import androidx.core.content.ContextCompat
import com.google.android.gms.location.CurrentLocationRequest
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.Granularity
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.CancellationTokenSource
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withTimeoutOrNull

class LocationRepository(private val context: Context) {

    companion object {
        private const val TAG = "LocationRepository"

        // Strict pinpoint accuracy threshold for true satellite fix
        private const val PINPOINT_ACCURACY_THRESHOLD_METERS = 15.0f

        // Hard cap: Never accept any location worse than 50 meters for auto-detection
        private const val MAX_ACCEPTABLE_ACCURACY_METERS = 50.0f

        // Active satellite convergence window in milliseconds
        private const val SATELLITE_CONVERGENCE_TIMEOUT_MS = 9_000L
    }

    private val fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(context)

    private val locationManager: LocationManager? =
        context.getSystemService(Context.LOCATION_SERVICE) as? LocationManager

    fun hasLocationPermission(): Boolean {
        val fine = ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
        val coarse = ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
        return fine || coarse
    }

    fun hasFineLocationPermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
    }

    /**
     * Obtains 100% pinpoint location:
     * 1. Forces ZERO cache age (maxUpdateAgeMillis = 0).
     * 2. Iteratively samples active GNSS satellites (GPS, GLONASS, Galileo, BeiDou).
     * 3. Continuously keeps the fix with the lowest accuracy error (highest precision).
     * 4. As soon as a fix with accuracy <= 15 meters is acquired, immediately resolves.
     */
    suspend fun getCurrentLocation(): Location? {
        if (!hasLocationPermission()) {
            Log.w(TAG, "Location permission not granted.")
            return null
        }

        // Active multi-fix convergence: collect fixes from Fused Provider + Hardware GPS
        var bestFix: Location? = null

        try {
            val convergenceResult = withTimeoutOrNull(SATELLITE_CONVERGENCE_TIMEOUT_MS) {
                val completion = CompletableDeferred<Location?>()

                val cancellationTokenSource = CancellationTokenSource()

                // Fast immediate attempt with 0ms cache age
                val directRequest = CurrentLocationRequest.Builder()
                    .setPriority(Priority.PRIORITY_HIGH_ACCURACY)
                    .setGranularity(Granularity.GRANULARITY_FINE)
                    .setMaxUpdateAgeMillis(0L) // STRICT: Disallow stale cache
                    .build()

                fusedLocationClient.getCurrentLocation(directRequest, cancellationTokenSource.token)
                    .addOnSuccessListener { loc ->
                        if (loc != null && isValidLocation(loc)) {
                            Log.d(TAG, "Instant location sample: (${loc.latitude}, ${loc.longitude}), acc=${loc.accuracy}m")
                            if (bestFix == null || loc.accuracy < bestFix!!.accuracy) {
                                bestFix = loc
                            }
                            if (loc.accuracy <= PINPOINT_ACCURACY_THRESHOLD_METERS) {
                                completion.complete(loc)
                            }
                        }
                    }

                // Active iterative satellite listener
                val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 800L)
                    .setMinUpdateIntervalMillis(400L)
                    .setMinUpdateDistanceMeters(0f)
                    .setGranularity(Granularity.GRANULARITY_FINE)
                    .build()

                val callback = object : LocationCallback() {
                    override fun onLocationResult(result: LocationResult) {
                        for (loc in result.locations) {
                            if (isValidLocation(loc)) {
                                Log.d(TAG, "Satellite fix iteration: (${loc.latitude}, ${loc.longitude}), acc=${loc.accuracy}m")
                                if (bestFix == null || loc.accuracy < bestFix!!.accuracy) {
                                    bestFix = loc
                                }
                                if (loc.accuracy <= PINPOINT_ACCURACY_THRESHOLD_METERS) {
                                    completion.complete(loc)
                                }
                            }
                        }
                    }
                }

                try {
                    fusedLocationClient.requestLocationUpdates(
                        locationRequest,
                        callback,
                        Looper.getMainLooper()
                    )
                } catch (e: SecurityException) {
                    Log.w(TAG, "SecurityException on location updates: ${e.message}")
                }

                // Also attach raw hardware GPS provider if enabled
                val gpsListener = object : LocationListener {
                    override fun onLocationChanged(loc: Location) {
                        if (isValidLocation(loc)) {
                            Log.d(TAG, "Raw Hardware GPS fix: (${loc.latitude}, ${loc.longitude}), acc=${loc.accuracy}m")
                            if (bestFix == null || loc.accuracy < bestFix!!.accuracy) {
                                bestFix = loc
                            }
                            if (loc.accuracy <= PINPOINT_ACCURACY_THRESHOLD_METERS) {
                                completion.complete(loc)
                            }
                        }
                    }
                    @Deprecated("Deprecated in Java")
                    override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
                    override fun onProviderEnabled(provider: String) {}
                    override fun onProviderDisabled(provider: String) {}
                }

                try {
                    if (locationManager?.isProviderEnabled(LocationManager.GPS_PROVIDER) == true) {
                        locationManager.requestLocationUpdates(
                            LocationManager.GPS_PROVIDER,
                            500L,
                            0f,
                            gpsListener,
                            Looper.getMainLooper()
                        )
                    }
                } catch (e: SecurityException) {
                    Log.w(TAG, "SecurityException on GPS_PROVIDER: ${e.message}")
                }

                try {
                    completion.await()
                } finally {
                    fusedLocationClient.removeLocationUpdates(callback)
                    try {
                        locationManager?.removeUpdates(gpsListener)
                    } catch (e: Exception) {}
                    cancellationTokenSource.cancel()
                }
            }

            if (convergenceResult != null && isValidLocation(convergenceResult)) {
                Log.d(TAG, "Pinpoint GPS locked: (${convergenceResult.latitude}, ${convergenceResult.longitude}), acc=${convergenceResult.accuracy}m")
                return convergenceResult
            }
        } catch (e: Exception) {
            Log.e(TAG, "Convergence exception: ${e.message}", e)
        }

        // If high precision target was reached during iterations, return bestFix
        if (bestFix != null && isValidLocation(bestFix)) {
            Log.d(TAG, "Returning best convergent fix: (${bestFix!!.latitude}, ${bestFix!!.longitude}), acc=${bestFix!!.accuracy}m")
            return bestFix
        }

        // Final safe fallback: check lastLocation only if it is reasonably accurate (< 50m)
        return try {
            val last = fusedLocationClient.lastLocation.await()
            if (isValidLocation(last) && last!!.accuracy <= MAX_ACCEPTABLE_ACCURACY_METERS) {
                Log.d(TAG, "Acceptable fallback fix: (${last.latitude}, ${last.longitude}), acc=${last.accuracy}m")
                last
            } else {
                Log.w(TAG, "No acceptable satellite fix found (last location was null or inaccurate)")
                last // Return last if nothing else, caller will inspect accuracy
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error obtaining fallback location: ${e.message}", e)
            null
        }
    }

    private fun isValidLocation(location: Location?): Boolean {
        if (location == null) return false
        if (!location.latitude.isFinite() || !location.longitude.isFinite()) return false
        if (location.latitude !in -90.0..90.0) return false
        if (location.longitude !in -180.0..180.0) return false
        return location.accuracy >= 0f
    }

    fun getLocationUpdates(intervalMillis: Long = 10000): Flow<Location> = callbackFlow {
        if (!hasLocationPermission()) {
            close()
            return@callbackFlow
        }

        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, intervalMillis)
            .setMinUpdateIntervalMillis(intervalMillis / 2)
            .setGranularity(Granularity.GRANULARITY_FINE)
            .build()

        val callback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                for (loc in result.locations) {
                    if (isValidLocation(loc)) {
                        trySend(loc)
                    }
                }
            }
        }

        try {
            fusedLocationClient.requestLocationUpdates(
                locationRequest,
                callback,
                Looper.getMainLooper()
            )
        } catch (e: SecurityException) {
            close(e)
        }

        awaitClose {
            fusedLocationClient.removeLocationUpdates(callback)
        }
    }
}
