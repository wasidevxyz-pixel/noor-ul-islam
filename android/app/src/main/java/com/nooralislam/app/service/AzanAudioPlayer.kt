package com.nooralislam.app.service

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioManager
import android.media.MediaPlayer
import android.os.Handler
import android.os.Looper
import android.os.PowerManager
import android.util.Log
import java.io.File
import java.io.FileOutputStream

object AzanAudioPlayer {
    private const val TAG = "AzanAudioPlayer"
    private var mediaPlayer: MediaPlayer? = null
    private var wakeLock: PowerManager.WakeLock? = null
    private val mainHandler = Handler(Looper.getMainLooper())

    /**
     * Internal synchronous stop to prevent race conditions when starting a new track.
     */
    private fun stopInternal() {
        try {
            mediaPlayer?.let { mp ->
                if (mp.isPlaying) {
                    try { mp.stop() } catch (e: Exception) {}
                }
                mp.reset()
                mp.release()
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error releasing MediaPlayer: ${e.message}")
        } finally {
            mediaPlayer = null
            releaseWakeLock()
        }
    }

    /**
     * Plays the specified Azan recitation.
     * @param context Application/Activity context
     * @param soundKey "makkah", "madinah", "alaqsa", "alafasy"
     * @param isAlarm true for scheduled prayer notification alarms, false for in-app audio previews
     * @param onCompletion optional callback when playback completes
     */
    fun play(
        context: Context,
        soundKey: String,
        isAlarm: Boolean = false,
        onCompletion: (() -> Unit)? = null
    ) {
        val runnable = Runnable {
            try {
                // Synchronously release previous player without asynchronous looper race conditions
                stopInternal()

                // Acquire WakeLock if triggered as alarm or preview
                try {
                    val pm = context.getSystemService(Context.POWER_SERVICE) as? PowerManager
                    wakeLock = pm?.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "NoorAlIslam:AzanWakeLock")
                    wakeLock?.acquire(4 * 60 * 1000L) // 4 minutes max
                } catch (e: Exception) {
                    Log.w(TAG, "Could not acquire WakeLock: ${e.message}")
                }

                // Select appropriate audio usage and stream
                val audioUsage = if (isAlarm) AudioAttributes.USAGE_ALARM else AudioAttributes.USAGE_MEDIA
                val audioContentType = if (isAlarm) AudioAttributes.CONTENT_TYPE_SONIFICATION else AudioAttributes.CONTENT_TYPE_MUSIC
                val streamType = if (isAlarm) AudioManager.STREAM_ALARM else AudioManager.STREAM_MUSIC

                // Ensure volume is audible
                try {
                    val audioManager = context.getSystemService(Context.AUDIO_SERVICE) as? AudioManager
                    if (audioManager != null) {
                        val currentVol = audioManager.getStreamVolume(streamType)
                        val maxVol = audioManager.getStreamMaxVolume(streamType)
                        if (currentVol == 0 && maxVol > 0) {
                            try {
                                audioManager.setStreamVolume(streamType, (maxVol * 0.75).toInt(), 0)
                                Log.d(TAG, "Unmuted volume stream $streamType to 75% for Azan")
                            } catch (eVolSet: Exception) {
                                Log.w(TAG, "Volume set notice: ${eVolSet.message}")
                            }
                        }
                    }
                } catch (eVol: Exception) {
                    Log.w(TAG, "Notice checking audio volume: ${eVol.message}")
                }

                val fileName = when (soundKey.lowercase().trim()) {
                    "madinah" -> "azan_madinah.mp3"
                    "alaqsa", "al-aqsa" -> "azan_alaqsa.mp3"
                    "alafasy", "afasy" -> "azan_alafasy.mp3"
                    else -> "azan_makkah.mp3"
                }

                val candidatePaths = listOf(
                    "assets/audio/$fileName",
                    "audio/$fileName",
                    fileName
                )

                val mp = MediaPlayer()
                mp.setAudioAttributes(
                    AudioAttributes.Builder()
                        .setUsage(audioUsage)
                        .setContentType(audioContentType)
                        .build()
                )

                var dataSourceSet = false

                // 1. First attempt: Direct openFd on candidate asset paths
                for (path in candidatePaths) {
                    try {
                        val afd = context.assets.openFd(path)
                        mp.setDataSource(afd.fileDescriptor, afd.startOffset, afd.length)
                        afd.close()
                        dataSourceSet = true
                        Log.d(TAG, "MediaPlayer configured via openFd: $path")
                        break
                    } catch (eAfd: Exception) {
                        // May fail if asset is compressed or path variant differs
                    }
                }

                // 2. Second attempt: Stream asset to app cache directory (100% reliable fallback)
                if (!dataSourceSet) {
                    mp.reset()
                    for (path in candidatePaths) {
                        try {
                            val cacheFile = File(context.cacheDir, fileName)
                            if (!cacheFile.exists() || cacheFile.length() == 0L) {
                                context.assets.open(path).use { input ->
                                    FileOutputStream(cacheFile).use { output ->
                                        input.copyTo(output)
                                    }
                                }
                            }
                            mp.setDataSource(cacheFile.absolutePath)
                            dataSourceSet = true
                            Log.d(TAG, "MediaPlayer configured via cache file: ${cacheFile.absolutePath} from $path")
                            break
                        } catch (eCache: Exception) {
                            // Continue to next candidate
                        }
                    }
                }

                if (!dataSourceSet) {
                    Log.e(TAG, "Could not set data source for Azan audio for $soundKey ($fileName)!")
                    releaseWakeLock()
                    return@Runnable
                }

                mp.setVolume(1.0f, 1.0f)
                mp.setOnCompletionListener {
                    Log.d(TAG, "Azan playback finished.")
                    stopInternal()
                    onCompletion?.invoke()
                }
                mp.setOnErrorListener { _, what, extra ->
                    Log.e(TAG, "MediaPlayer error during Azan playback: what=$what, extra=$extra")
                    stopInternal()
                    true
                }

                mp.prepare()
                mp.start()
                mediaPlayer = mp
                Log.d(TAG, "Azan audio started successfully: $fileName (isAlarm=$isAlarm)")

            } catch (e: Exception) {
                Log.e(TAG, "Error starting Azan audio: ${e.message}", e)
                stopInternal()
            }
        }

        if (Looper.myLooper() == Looper.getMainLooper()) {
            runnable.run()
        } else {
            mainHandler.post(runnable)
        }
    }

    /**
     * Stops current Azan playback immediately.
     */
    fun stop() {
        if (Looper.myLooper() == Looper.getMainLooper()) {
            stopInternal()
        } else {
            mainHandler.post { stopInternal() }
        }
    }

    private fun releaseWakeLock() {
        try {
            if (wakeLock?.isHeld == true) {
                wakeLock?.release()
            }
        } catch (e: Exception) {
            Log.w(TAG, "Error releasing WakeLock: ${e.message}")
        } finally {
            wakeLock = null
        }
    }

    fun isPlaying(): Boolean = (mediaPlayer?.isPlaying == true)
}
