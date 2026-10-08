package com.nooralislam.app.service

import android.content.Context
import android.hardware.GeomagneticField
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.os.Build
import android.os.SystemClock
import android.util.Log
import android.view.Surface
import android.view.WindowManager
import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.sqrt

data class CompassData(
    val magneticHeading: Float,
    val trueHeading: Float,
    val declination: Float,
    val qiblaBearing: Float,
    val relativeQiblaAngle: Float,
    val distanceKm: Double,
    val cardinal: String,
    val sensorAccuracy: Int,
    val sensorAccuracyDesc: String,
    val isCalibrated: Boolean,
    val magneticInterference: Boolean,
    val magneticFieldStrengthUt: Float,
    val gpsAccuracy: Float,
    val latitude: Double,
    val longitude: Double,
    val sensorType: String,
    val isAligned: Boolean
)

data class QiblaCalculationResult(
    val bearing: Float,
    val distanceKm: Double,
    val cardinal: String
)

/**
 * High-Precision Qibla Compass Sensor Engine
 *
 * Architecture:
 * 1. Primary: Sensor.TYPE_ROTATION_VECTOR (9-axis hardware sensor fusion: Gyro + Accel + Mag)
 * 2. Fallback 1: Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR (6-axis fusion without gyro)
 * 3. Fallback 2: Sensor.TYPE_ACCELEROMETER + Sensor.TYPE_MAGNETIC_FIELD
 * 4. Coordinate remapping: adjusts for portrait, landscape, and inverted display rotations.
 * 5. True Geographic Heading: compensated with Android's GeomagneticField (WMM declination).
 * 6. Spherical Great-Circle forward azimuth to Holy Kaaba (21.422487, 39.826206).
 * 7. Adaptive circular vector smoothing with stationary deadband (eliminates jitter and rapid spinning).
 * 8. Sensor accuracy and magnetic interference monitoring.
 */
class QiblaCompassManager(private val context: Context) : SensorEventListener {

    companion object {
        private const val TAG = "QiblaCompassManager"

        // Holy Kaaba center coordinates at Masjid al-Haram, Mecca
        const val KAABA_LATITUDE = 21.422487
        const val KAABA_LONGITUDE = 39.826206
        private const val EARTH_RADIUS_KM = 6371.0

        // Earth's expected magnetic field range in microteslas (µT)
        private const val MIN_NORMAL_MAG_UT = 18.0f
        private const val MAX_NORMAL_MAG_UT = 75.0f

        // Minimum time between UI dispatches in milliseconds (~25 FPS for smooth WebView IPC)
        private const val DISPATCH_THROTTLE_MS = 40L

        // Significant movement threshold in meters to recalculate bearing & declination
        private const val SIGNIFICANT_MOVE_DISTANCE_M = 50.0f
    }

    private val sensorManager: SensorManager? =
        context.getSystemService(Context.SENSOR_SERVICE) as? SensorManager

    // Available hardware sensors
    private val rotationVectorSensor: Sensor? =
        sensorManager?.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    private val geomagneticRotationVectorSensor: Sensor? =
        sensorManager?.getDefaultSensor(Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR)
    private val accelerometerSensor: Sensor? =
        sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    private val magneticSensor: Sensor? =
        sensorManager?.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)

    // Active sensor state
    private var activeSensorType = "NONE"
    private var isListening = false

    // Sensor buffers for Fallback 2 (Accel + Mag)
    private val accelValues = FloatArray(3)
    private val magValues = FloatArray(3)
    private var hasAccelSample = false
    private var hasMagSample = false

    // Coordinate rotation matrices
    private val rawRotationMatrix = FloatArray(9)
    private val remappedRotationMatrix = FloatArray(9)
    private val orientationAngles = FloatArray(3)

    // Sensor accuracy & diagnostics
    private var currentSensorAccuracy = SensorManager.SENSOR_STATUS_ACCURACY_HIGH
    private var currentMagneticFieldUt = 45.0f
    private var hasMagneticInterference = false

    // Location & Declination state
    private var currentLocation: Location? = null
    private var currentDeclination: Float = 0.0f
    private var currentQiblaBearing: Float = 255.6f
    private var currentKaabaDistanceKm: Double = 3620.0
    private var currentCardinal: String = "WSW"

    // Adaptive Circular Vector Filter
    private var smoothTrueX = 0.0
    private var smoothTrueY = 1.0
    private var smoothMagX = 0.0
    private var smoothMagY = 1.0
    private var isFilterInitialized = false

    // Output caching & throttling
    private var lastDispatchTimeMs = 0L
    private var lastDispatchedTrueHeading = -999f

    // Callback listener
    var onCompassUpdate: ((CompassData) -> Unit)? = null

    init {
        // Initial fallback bearing calculation with default initial coordinates
        updateLocation(33.6844, 73.0479, 1000f, true)
    }

    /**
     * Start sensor tracking with lifecycle safety.
     * Selects primary sensor (Rotation Vector) or falls back gracefully.
     */
    @Synchronized
    fun start() {
        if (isListening || sensorManager == null) return

        hasAccelSample = false
        hasMagSample = false
        isFilterInitialized = false

        var registered = false

        // 1. Try Primary: TYPE_ROTATION_VECTOR
        if (rotationVectorSensor != null) {
            registered = sensorManager.registerListener(
                this,
                rotationVectorSensor,
                SensorManager.SENSOR_DELAY_GAME
            )
            if (registered) {
                activeSensorType = "ROTATION_VECTOR"
                Log.d(TAG, "Primary sensor TYPE_ROTATION_VECTOR registered successfully.")
            }
        }

        // 2. Try Fallback 1: TYPE_GEOMAGNETIC_ROTATION_VECTOR
        if (!registered && geomagneticRotationVectorSensor != null) {
            registered = sensorManager.registerListener(
                this,
                geomagneticRotationVectorSensor,
                SensorManager.SENSOR_DELAY_GAME
            )
            if (registered) {
                activeSensorType = "GEOMAGNETIC_ROTATION_VECTOR"
                Log.d(TAG, "Fallback 1 TYPE_GEOMAGNETIC_ROTATION_VECTOR registered.")
            }
        }

        // 3. Try Fallback 2: ACCELEROMETER + MAGNETIC_FIELD
        if (!registered && accelerometerSensor != null && magneticSensor != null) {
            val accOk = sensorManager.registerListener(
                this,
                accelerometerSensor,
                SensorManager.SENSOR_DELAY_GAME
            )
            val magOk = sensorManager.registerListener(
                this,
                magneticSensor,
                SensorManager.SENSOR_DELAY_GAME
            )
            if (accOk && magOk) {
                registered = true
                activeSensorType = "ACCEL_MAGNETIC_FALLBACK"
                Log.d(TAG, "Fallback 2 ACCELEROMETER + MAGNETIC_FIELD registered.")
            }
        }

        // Also register magnetic field sensor if available for interference monitoring
        if (activeSensorType == "ROTATION_VECTOR" && magneticSensor != null) {
            sensorManager.registerListener(
                this,
                magneticSensor,
                SensorManager.SENSOR_DELAY_NORMAL
            )
        }

        if (!registered) {
            activeSensorType = "HARDWARE_UNAVAILABLE"
            Log.e(TAG, "No suitable orientation sensors found on this device!")
        }

        isListening = registered
    }

    /**
     * Stop all sensor tracking to guarantee zero battery drain when inactive.
     */
    @Synchronized
    fun stop() {
        if (!isListening) return
        try {
            sensorManager?.unregisterListener(this)
        } catch (e: Exception) {
            Log.w(TAG, "Error unregistering sensors: ${e.message}")
        }
        isListening = false
        Log.d(TAG, "QiblaCompassManager stopped.")
    }

    /**
     * Updates the user's location.
     * Recalculates exact Great-Circle Qibla bearing and magnetic declination.
     */
    fun updateLocation(loc: Location) {
        val prev = currentLocation
        if (prev != null && prev.distanceTo(loc) < SIGNIFICANT_MOVE_DISTANCE_M && prev.accuracy <= loc.accuracy) {
            currentLocation = loc
            return
        }
        currentLocation = loc
        recalculateQiblaAndDeclination(loc.latitude, loc.longitude, loc.altitude, loc.accuracy)
    }

    fun updateLocation(lat: Double, lng: Double, accuracy: Float = 10f, isInitial: Boolean = false) {
        val dummy = Location("manual").apply {
            latitude = lat
            longitude = lng
            this.accuracy = accuracy
            time = System.currentTimeMillis()
        }
        if (!isInitial && currentLocation != null && currentLocation!!.distanceTo(dummy) < SIGNIFICANT_MOVE_DISTANCE_M) {
            currentLocation = dummy
            return
        }
        currentLocation = dummy
        recalculateQiblaAndDeclination(lat, lng, 0.0, accuracy)
    }

    private fun recalculateQiblaAndDeclination(lat: Double, lng: Double, altitude: Double, accuracy: Float) {
        // 1. Calculate Great-Circle True Bearing to Kaaba
        val qiblaResult = calculateTrueQiblaBearing(lat, lng)
        currentQiblaBearing = qiblaResult.bearing
        currentKaabaDistanceKm = qiblaResult.distanceKm
        currentCardinal = qiblaResult.cardinal

        // 2. Calculate Geomagnetic Declination using Android's World Magnetic Model
        try {
            val geoField = GeomagneticField(
                lat.toFloat(),
                lng.toFloat(),
                altitude.toFloat(),
                System.currentTimeMillis()
            )
            currentDeclination = geoField.declination
        } catch (e: Exception) {
            Log.w(TAG, "GeomagneticField calculation exception: ${e.message}")
            currentDeclination = 0.0f
        }

        Log.d(
            TAG,
            "Location updated: ($lat, $lng), QiblaBearing=${currentQiblaBearing}°, Declination=${currentDeclination}°, Distance=${currentKaabaDistanceKm}km"
        )
    }

    override fun onSensorChanged(event: SensorEvent) {
        val now = SystemClock.uptimeMillis()

        when (event.sensor.type) {
            Sensor.TYPE_ROTATION_VECTOR, Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR -> {
                SensorManager.getRotationMatrixFromVector(rawRotationMatrix, event.values)
                processRotationMatrix(now)
            }
            Sensor.TYPE_ACCELEROMETER -> {
                System.arraycopy(event.values, 0, accelValues, 0, 3)
                hasAccelSample = true
                if (hasMagSample && activeSensorType == "ACCEL_MAGNETIC_FALLBACK") {
                    if (SensorManager.getRotationMatrix(rawRotationMatrix, null, accelValues, magValues)) {
                        processRotationMatrix(now)
                    }
                }
            }
            Sensor.TYPE_MAGNETIC_FIELD -> {
                System.arraycopy(event.values, 0, magValues, 0, 3)
                hasMagSample = true

                // Calculate total magnetic field magnitude: B = sqrt(x^2 + y^2 + z^2)
                val bx = event.values[0]
                val by = event.values[1]
                val bz = event.values[2]
                val magnitude = sqrt((bx * bx + by * by + bz * bz).toDouble()).toFloat()
                currentMagneticFieldUt = magnitude

                // Normal terrestrial magnetic field is roughly 20 to 70 µT
                hasMagneticInterference = (magnitude < MIN_NORMAL_MAG_UT || magnitude > MAX_NORMAL_MAG_UT)

                if (hasAccelSample && activeSensorType == "ACCEL_MAGNETIC_FALLBACK") {
                    if (SensorManager.getRotationMatrix(rawRotationMatrix, null, accelValues, magValues)) {
                        processRotationMatrix(now)
                    }
                }
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        if (sensor?.type == Sensor.TYPE_ROTATION_VECTOR ||
            sensor?.type == Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR ||
            sensor?.type == Sensor.TYPE_MAGNETIC_FIELD
        ) {
            currentSensorAccuracy = accuracy
            Log.d(TAG, "Sensor ${sensor.name} accuracy changed: $accuracy")
        }
    }

    /**
     * Remaps rotation matrix based on current display orientation and extracts Azimuth.
     */
    private fun processRotationMatrix(now: Long) {
        // Remap device axes to match screen rotation
        remapForDisplayRotation(rawRotationMatrix, remappedRotationMatrix)

        // Extract orientation angles: [0]=Azimuth (yaw), [1]=Pitch, [2]=Roll
        SensorManager.getOrientation(remappedRotationMatrix, orientationAngles)

        // Convert azimuth from radians [-π, π] to degrees [0°, 360°)
        var rawMagneticHeading = Math.toDegrees(orientationAngles[0].toDouble()).toFloat()
        rawMagneticHeading = (rawMagneticHeading + 360.0f) % 360.0f

        // Calculate True Geographic Heading using Magnetic Declination
        var rawTrueHeading = (rawMagneticHeading + currentDeclination + 360.0f) % 360.0f

        // Apply Adaptive Circular Vector Smoothing with stationary deadband
        val smoothedTrueHeading = applyCircularFilter(rawTrueHeading, isTrueHeading = true)
        val smoothedMagneticHeading = applyCircularFilter(rawMagneticHeading, isTrueHeading = false)

        // Relative Qibla angle from device top reticle
        val relativeQibla = (currentQiblaBearing - smoothedTrueHeading + 360.0f) % 360.0f

        // Alignment check (within ±3.5 degrees of Holy Kaaba)
        var diff = relativeQibla
        if (diff > 180f) diff = 360f - diff
        val isAligned = diff <= 3.5f

        // Enforce dispatch throttle to preserve 25-30 FPS smoothness without overwhelming WebView IPC
        val timePassed = now - lastDispatchTimeMs
        val headingDelta = Math.abs(smoothedTrueHeading - lastDispatchedTrueHeading)

        if (timePassed >= DISPATCH_THROTTLE_MS || (timePassed >= 25L && headingDelta > 1.2f)) {
            lastDispatchTimeMs = now
            lastDispatchedTrueHeading = smoothedTrueHeading

            val isCalibrated = (currentSensorAccuracy >= SensorManager.SENSOR_STATUS_ACCURACY_MEDIUM) && !hasMagneticInterference

            val accuracyDesc = when {
                hasMagneticInterference -> "Interference Detected"
                currentSensorAccuracy == SensorManager.SENSOR_STATUS_ACCURACY_HIGH -> "High (Calibrated)"
                currentSensorAccuracy == SensorManager.SENSOR_STATUS_ACCURACY_MEDIUM -> "Medium (Normal)"
                currentSensorAccuracy == SensorManager.SENSOR_STATUS_ACCURACY_LOW -> "Low (Needs Calibration)"
                else -> "Unreliable (Calibrate)"
            }

            val loc = currentLocation
            val data = CompassData(
                magneticHeading = smoothedMagneticHeading,
                trueHeading = smoothedTrueHeading,
                declination = currentDeclination,
                qiblaBearing = currentQiblaBearing,
                relativeQiblaAngle = relativeQibla,
                distanceKm = currentKaabaDistanceKm,
                cardinal = currentCardinal,
                sensorAccuracy = currentSensorAccuracy,
                sensorAccuracyDesc = accuracyDesc,
                isCalibrated = isCalibrated,
                magneticInterference = hasMagneticInterference,
                magneticFieldStrengthUt = currentMagneticFieldUt,
                gpsAccuracy = loc?.accuracy ?: -1.0f,
                latitude = loc?.latitude ?: 0.0,
                longitude = loc?.longitude ?: 0.0,
                sensorType = activeSensorType,
                isAligned = isAligned
            )

            onCompassUpdate?.invoke(data)
        }
    }

    /**
     * Remaps device coordinate axes to display coordinates.
     */
    private fun remapForDisplayRotation(inMatrix: FloatArray, outMatrix: FloatArray) {
        val rotation = getDisplayRotation()

        var axisX = SensorManager.AXIS_X
        var axisY = SensorManager.AXIS_Y

        when (rotation) {
            Surface.ROTATION_0 -> {
                axisX = SensorManager.AXIS_X
                axisY = SensorManager.AXIS_Y
            }
            Surface.ROTATION_90 -> {
                axisX = SensorManager.AXIS_Y
                axisY = SensorManager.AXIS_MINUS_X
            }
            Surface.ROTATION_180 -> {
                axisX = SensorManager.AXIS_MINUS_X
                axisY = SensorManager.AXIS_MINUS_Y
            }
            Surface.ROTATION_270 -> {
                axisX = SensorManager.AXIS_MINUS_Y
                axisY = SensorManager.AXIS_X
            }
        }

        SensorManager.remapCoordinateSystem(inMatrix, axisX, axisY, outMatrix)
    }

    private fun getDisplayRotation(): Int {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                context.display?.rotation ?: Surface.ROTATION_0
            } else {
                @Suppress("DEPRECATION")
                val wm = context.getSystemService(Context.WINDOW_SERVICE) as? WindowManager
                wm?.defaultDisplay?.rotation ?: Surface.ROTATION_0
            }
        } catch (e: Exception) {
            Surface.ROTATION_0
        }
    }

    /**
     * Adaptive circular vector low-pass filter with stationary deadband.
     * Decomposes angles into (cos, sin) unit vectors, completely eliminating
     * 0°/360° jump discontinuities and jitter while responding smoothly to user rotation.
     */
    private fun applyCircularFilter(targetAngleDeg: Float, isTrueHeading: Boolean): Float {
        val targetRad = Math.toRadians(targetAngleDeg.toDouble())
        val targetX = cos(targetRad)
        val targetY = sin(targetRad)

        if (!isFilterInitialized) {
            smoothTrueX = targetX
            smoothTrueY = targetY
            smoothMagX = targetX
            smoothMagY = targetY
            isFilterInitialized = true
            return targetAngleDeg
        }

        val prevX = if (isTrueHeading) smoothTrueX else smoothMagX
        val prevY = if (isTrueHeading) smoothTrueY else smoothMagY

        val prevRad = atan2(prevY, prevX)
        var delta = targetRad - prevRad
        while (delta < -Math.PI) delta += 2.0 * Math.PI
        while (delta > Math.PI) delta -= 2.0 * Math.PI
        val deltaDeg = Math.abs(Math.toDegrees(delta))

        // Deadband: If change is less than 0.35°, ignore to prevent hand-tremor micro-jitter
        if (deltaDeg < 0.35) {
            val currentDeg = Math.toDegrees(atan2(prevY, prevX)).toFloat()
            return (currentDeg + 360.0f) % 360.0f
        }

        // Dynamic smoothing weight alpha:
        // - Rapid rotation: 0.32 (smooth, responsive tracking without sudden jumps)
        // - Moderate rotation: 0.20
        // - Gentle movement: 0.12
        val alpha = when {
            deltaDeg > 15.0 -> 0.32
            deltaDeg > 5.0 -> 0.20
            else -> 0.12
        }

        val newX = (1.0 - alpha) * prevX + alpha * targetX
        val newY = (1.0 - alpha) * prevY + alpha * targetY

        if (isTrueHeading) {
            smoothTrueX = newX
            smoothTrueY = newY
        } else {
            smoothMagX = newX
            smoothMagY = newY
        }

        var smoothedDeg = Math.toDegrees(atan2(newY, newX)).toFloat()
        smoothedDeg = (smoothedDeg + 360.0f) % 360.0f
        return smoothedDeg
    }

    /**
     * Great-Circle Forward Azimuth (True Bearing) to Holy Kaaba.
     */
    fun calculateTrueQiblaBearing(userLat: Double, userLng: Double): QiblaCalculationResult {
        val phi1 = Math.toRadians(userLat)
        val phi2 = Math.toRadians(KAABA_LATITUDE)
        val deltaLambda = Math.toRadians(KAABA_LONGITUDE - userLng)

        val y = sin(deltaLambda) * cos(phi2)
        val x = cos(phi1) * sin(phi2) - sin(phi1) * cos(phi2) * cos(deltaLambda)

        var bearing = Math.toDegrees(atan2(y, x))
        bearing = (bearing + 360.0) % 360.0

        // Haversine formula for exact spherical distance
        val dLat = phi2 - phi1
        val a = sin(dLat / 2.0) * sin(dLat / 2.0) +
                cos(phi1) * cos(phi2) *
                sin(deltaLambda / 2.0) * sin(deltaLambda / 2.0)
        val c = 2.0 * atan2(sqrt(a), sqrt(1.0 - a))
        val distanceKm = EARTH_RADIUS_KM * c

        val cardinals = arrayOf(
            "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
        )
        val cardIdx = (((bearing + 11.25) / 22.5).toInt()) % 16
        val cardinal = cardinals[cardIdx]

        return QiblaCalculationResult(
            bearing = bearing.toFloat(),
            distanceKm = distanceKm,
            cardinal = cardinal
        )
    }
}
