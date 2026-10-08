package com.nooralislam.app.service

import android.app.Notification
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import com.nooralislam.app.MainActivity
import com.nooralislam.app.R

class AzanPlaybackService : Service() {

    companion object {
        private const val TAG = "AzanPlaybackService"
        const val ACTION_PLAY_AZAN = "com.nooralislam.app.service.ACTION_PLAY_AZAN"
        const val ACTION_STOP_AZAN = "com.nooralislam.app.service.ACTION_STOP_AZAN"

        const val EXTRA_PRAYER_NAME = "EXTRA_PRAYER_NAME"
        const val EXTRA_PRAYER_TIME = "EXTRA_PRAYER_TIME"
        const val EXTRA_AZAN_SOUND = "EXTRA_AZAN_SOUND"

        fun start(context: Context, prayerName: String, prayerTime: String, soundName: String) {
            val intent = Intent(context, AzanPlaybackService::class.java).apply {
                action = ACTION_PLAY_AZAN
                putExtra(EXTRA_PRAYER_NAME, prayerName)
                putExtra(EXTRA_PRAYER_TIME, prayerTime)
                putExtra(EXTRA_AZAN_SOUND, soundName)
            }
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    context.startForegroundService(intent)
                } else {
                    context.startService(intent)
                }
            } catch (e: Exception) {
                Log.e(TAG, "startForegroundService failed (${e.message}), executing direct Azan audio fallback", e)
                AzanAudioPlayer.play(context, soundName)
            }
        }

        fun stop(context: Context) {
            try {
                val intent = Intent(context, AzanPlaybackService::class.java).apply {
                    action = ACTION_STOP_AZAN
                }
                context.startService(intent)
            } catch (e: Exception) {
                Log.w(TAG, "Error stopping AzanPlaybackService: ${e.message}")
            }
        }
    }

    private var wakeLock: PowerManager.WakeLock? = null

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action ?: return START_NOT_STICKY
        Log.d(TAG, "AzanPlaybackService onStartCommand action: $action")

        if (action == ACTION_STOP_AZAN) {
            stopAzan()
            return START_NOT_STICKY
        }

        if (action == ACTION_PLAY_AZAN) {
            val prayerName = intent.getStringExtra(EXTRA_PRAYER_NAME) ?: "Prayer"
            val prayerTime = intent.getStringExtra(EXTRA_PRAYER_TIME) ?: ""
            val soundName = intent.getStringExtra(EXTRA_AZAN_SOUND) ?: "makkah"

            // 1. Acquire wake lock immediately
            acquireWakeLock()

            // 2. Build foreground notification
            val notification = buildForegroundNotification(prayerName, prayerTime)

            // 3. Promote to foreground service
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    startForeground(
                        AzanNotificationManager.NOTIFICATION_ID,
                        notification,
                        ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
                    )
                } else {
                    startForeground(AzanNotificationManager.NOTIFICATION_ID, notification)
                }
            } catch (e: Exception) {
                Log.w(TAG, "startForeground fallback: ${e.message}")
                startForeground(AzanNotificationManager.NOTIFICATION_ID, notification)
            }

            // 4. Play Azan audio
            AzanAudioPlayer.play(this, soundName) {
                Log.d(TAG, "Azan playback finished in service.")
                stopAzan()
            }
        }

        return START_NOT_STICKY
    }

    private fun buildForegroundNotification(prayerName: String, timeStr: String): Notification {
        AzanNotificationManager.createNotificationChannel(this)

        val openAppIntent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        val openPendingIntent = PendingIntent.getActivity(
            this,
            0,
            openAppIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val stopIntent = Intent(this, AzanPlaybackService::class.java).apply {
            action = ACTION_STOP_AZAN
        }
        val stopPendingIntent = PendingIntent.getService(
            this,
            1,
            stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        return NotificationCompat.Builder(this, AzanNotificationManager.CHANNEL_ID)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle("🕌 Time for $prayerName Prayer ($timeStr)")
            .setContentText("حی على الصلاة — Come to prayer. Azan is reciting now.")
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .setOngoing(true)
            .setContentIntent(openPendingIntent)
            .addAction(android.R.drawable.ic_media_pause, "Stop Azan", stopPendingIntent)
            .setVibrate(longArrayOf(0, 500, 250, 500))
            .build()
    }

    private fun acquireWakeLock() {
        try {
            if (wakeLock == null) {
                val pm = getSystemService(Context.POWER_SERVICE) as? PowerManager
                wakeLock = pm?.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "NoorAlIslam:AzanPlaybackServiceWakeLock")
            }
            wakeLock?.acquire(5 * 60 * 1000L) // 5 minutes max
        } catch (e: Exception) {
            Log.w(TAG, "Could not acquire WakeLock: ${e.message}")
        }
    }

    private fun stopAzan() {
        AzanAudioPlayer.stop()
        try {
            if (wakeLock?.isHeld == true) {
                wakeLock?.release()
            }
        } catch (e: Exception) {}
        wakeLock = null

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            stopForeground(STOP_FOREGROUND_REMOVE)
        } else {
            @Suppress("DEPRECATION")
            stopForeground(true)
        }
        stopSelf()
    }

    override fun onDestroy() {
        stopAzan()
        super.onDestroy()
    }
}
