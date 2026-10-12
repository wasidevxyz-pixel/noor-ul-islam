package com.nooralislam.app.service

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioManager
import android.media.MediaPlayer
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.util.Log
import java.io.File
import java.io.FileOutputStream

object AppAudioPlayer {
    private const val TAG = "AppAudioPlayer"
    private var mediaPlayer: MediaPlayer? = null
    private var currentTrackId: String? = null
    private val mainHandler by lazy { Handler(Looper.getMainLooper()) }

    private fun stopInternal() {
        try {
            mediaPlayer?.let { player ->
                if (player.isPlaying) {
                    player.stop()
                }
                player.reset()
                player.release()
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error releasing MediaPlayer: ${e.message}")
        } finally {
            mediaPlayer = null
            currentTrackId = null
        }
    }

    fun play(
        context: Context,
        source: String,
        trackId: String,
        onCompletion: (() -> Unit)? = null,
        onError: (() -> Unit)? = null
    ) {
        mainHandler.post {
            stopInternal()
            currentTrackId = trackId

            try {
                // Ensure device media volume is audible
                val audioManager = context.getSystemService(Context.AUDIO_SERVICE) as? AudioManager
                if (audioManager != null) {
                    val currentVol = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
                    val maxVol = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
                    if (currentVol == 0 && maxVol > 0) {
                        try {
                            audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, (maxVol * 0.85).toInt(), 0)
                            Log.d(TAG, "Unmuted STREAM_MUSIC to 85% for $trackId")
                        } catch (eVolSet: Exception) {
                            Log.w(TAG, "Volume set note: ${eVolSet.message}")
                        }
                    }
                }
            } catch (eVol: Exception) {
                Log.w(TAG, "Notice setting volume: ${eVol.message}")
            }

            try {
                val clean = source.trim()
                val candidatePaths = mutableListOf<String>()

                if (clean.startsWith("http://") || clean.startsWith("https://")) {
                    candidatePaths.add(clean)
                } else {
                    val withoutAssets = clean.removePrefix("/").removePrefix("assets/").removePrefix("/")
                    candidatePaths.add(withoutAssets)
                    candidatePaths.add("assets/$withoutAssets")
                    candidatePaths.add(clean)
                }

                playWithCandidatePaths(context, candidatePaths, 0, trackId, onCompletion, onError)
            } catch (e: Exception) {
                Log.e(TAG, "Failed to start audio playback for $source: ${e.message}", e)
                stopInternal()
                onError?.invoke()
            }
        }
    }

    // Alias for compatibility with NativeBridge
    fun playAsset(
        context: Context,
        relativePath: String,
        trackId: String,
        onCompletion: (() -> Unit)? = null,
        onError: (() -> Unit)? = null
    ) {
        play(context, relativePath, trackId, onCompletion, onError)
    }

    private fun playWithCandidatePaths(
        context: Context,
        paths: List<String>,
        index: Int,
        trackId: String,
        onCompletion: (() -> Unit)? = null,
        onError: (() -> Unit)? = null
    ) {
        if (index >= paths.size) {
            Log.e(TAG, "All candidate audio paths failed for track: $trackId")
            stopInternal()
            onError?.invoke()
            return
        }

        val targetPath = paths[index]
        Log.d(TAG, "Attempting playback with path/URL: $targetPath (attempt ${index + 1}/${paths.size})")

        try {
            val mp = MediaPlayer().apply {
                setAudioAttributes(
                    AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                        .build()
                )
            }
            mediaPlayer = mp

            var prepared = false

            if (targetPath.startsWith("http://") || targetPath.startsWith("https://")) {
                mp.setDataSource(context, Uri.parse(targetPath))
                prepared = true
            } else {
                // Asset path: try openFd, then cache stream copy (prevents compressed asset failures)
                try {
                    val afd = context.assets.openFd(targetPath)
                    mp.setDataSource(afd.fileDescriptor, afd.startOffset, afd.length)
                    afd.close()
                    prepared = true
                } catch (eAfd: Exception) {
                    try {
                        val fileName = File(targetPath).name
                        val cacheFile = File(context.cacheDir, "audio_$fileName")
                        if (!cacheFile.exists() || cacheFile.length() == 0L) {
                            context.assets.open(targetPath).use { input ->
                                FileOutputStream(cacheFile).use { output ->
                                    input.copyTo(output)
                                }
                            }
                        }
                        mp.setDataSource(cacheFile.absolutePath)
                        prepared = true
                    } catch (eCopy: Exception) {
                        Log.w(TAG, "Failed to stream asset $targetPath to cache: ${eCopy.message}")
                    }
                }
            }

            if (!prepared) {
                stopInternal()
                mainHandler.post {
                    playWithCandidatePaths(context, paths, index + 1, trackId, onCompletion, onError)
                }
                return
            }

            mp.setOnCompletionListener {
                Log.d(TAG, "Audio playback completed for track: $trackId")
                stopInternal()
                onCompletion?.invoke()
            }

            mp.setOnErrorListener { _, what, extra ->
                Log.w(TAG, "MediaPlayer error ($what, $extra) for $targetPath, trying next candidate")
                stopInternal()
                mainHandler.post {
                    playWithCandidatePaths(context, paths, index + 1, trackId, onCompletion, onError)
                }
                true
            }

            mp.prepareAsync()
            mp.setOnPreparedListener {
                try {
                    it.start()
                    Log.d(TAG, "MediaPlayer started successfully for track: $trackId")
                } catch (eStart: Exception) {
                    Log.w(TAG, "Failed to start prepared MediaPlayer: ${eStart.message}")
                    stopInternal()
                    mainHandler.post {
                        playWithCandidatePaths(context, paths, index + 1, trackId, onCompletion, onError)
                    }
                }
            }
        } catch (e: Exception) {
            Log.w(TAG, "Failed to initialize player on $targetPath: ${e.message}")
            stopInternal()
            mainHandler.post {
                playWithCandidatePaths(context, paths, index + 1, trackId, onCompletion, onError)
            }
        }
    }

    fun stop() {
        mainHandler.post {
            stopInternal()
        }
    }

    fun isPlaying(): Boolean = mediaPlayer?.isPlaying == true

    fun getCurrentTrackId(): String? = currentTrackId
}
