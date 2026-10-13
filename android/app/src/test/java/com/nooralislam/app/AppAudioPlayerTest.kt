package com.nooralislam.app

import com.nooralislam.app.service.AppAudioPlayer
import org.junit.Assert.*
import org.junit.Test

class AppAudioPlayerTest {

    @Test
    fun testAppAudioPlayerInitialState() {
        assertFalse("AppAudioPlayer should not be playing initially", AppAudioPlayer.isPlaying())
        assertNull("Current track id should be null initially", AppAudioPlayer.getCurrentTrackId())
    }

    @Test
    fun testAppAudioPlayerStopDoesNotThrow() {
        AppAudioPlayer.stop()
        assertFalse(AppAudioPlayer.isPlaying())
    }
}
