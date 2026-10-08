package com.nooralislam.app.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.nooralislam.app.data.local.datastore.UserSettingsDataStore
import com.nooralislam.app.service.AzanAudioPlayer
import com.nooralislam.app.service.AzanNotificationManager
import com.nooralislam.app.service.AzanPlaybackService
import com.nooralislam.app.service.PrayerAlarmScheduler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import java.time.LocalDate

class AzanAlarmReceiver : BroadcastReceiver() {

    companion object {
        private const val TAG = "AzanAlarmReceiver"
        const val ACTION_PRAYER_ALARM = "com.nooralislam.app.ACTION_PRAYER_ALARM"
        const val ACTION_STOP_AZAN = "com.nooralislam.app.ACTION_STOP_AZAN"

        const val ACTION_DAILY_AYAT = "com.nooralislam.app.ACTION_DAILY_AYAT"
        const val ACTION_DAILY_HADITH = "com.nooralislam.app.ACTION_DAILY_HADITH"
        const val ACTION_DAILY_TASBIH = "com.nooralislam.app.ACTION_DAILY_TASBIH"

        const val EXTRA_PRAYER_NAME = "EXTRA_PRAYER_NAME"
        const val EXTRA_PRAYER_TIME = "EXTRA_PRAYER_TIME"
        const val EXTRA_AZAN_SOUND = "EXTRA_AZAN_SOUND"

        private val DAILY_AYATS = listOf(
            Triple(
                "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
                "اور صبر اور نماز کے ساتھ مدد چاہو اور بیشک یہ ضرور بھاری ہے مگر ان پر جو عاجزی کرنے والے ہیں",
                "[Al-Baqarah 2:45] And seek help through patience and prayer."
            ),
            Triple(
                "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
                "سن لو! اللہ کی یاد ہی سے دلوں کو اطمینان حاصل ہوتا ہے",
                "[Ar-Rad 13:28] Unquestionably, by the remembrance of Allah hearts are assured."
            ),
            Triple(
                "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
                "بیشک تنگی کے ساتھ آسانی ہے",
                "[Ash-Sharh 94:6] Indeed, with hardship comes ease."
            ),
            Triple(
                "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ",
                "اور اس ہمیشہ زندہ رہنے والے پر بھروسہ رکھو جسے موت نہیں آنی",
                "[Al-Furqan 25:58] And put your trust in the Living One Who does not die."
            ),
            Triple(
                "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
                "اور جب آپ سے میرے بندے میرے متعلق پوچھیں تو میں تو قریب ہی ہوں، دعا مانگنے والے کی دعا قبول کرتا ہوں جب وہ مجھ سے مانگے",
                "[Al-Baqarah 2:186] And when My servants ask you concerning Me, indeed I am near. I respond to the call of the caller when he calls upon Me."
            ),
            Triple(
                "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
                "کہہ دیجیے: اے میرے وہ بندو جنہوں نے اپنی جانوں پر زیادتی کی ہے! اللہ کی رحمت سے ناامید نہ ہو، بیشک اللہ تمام گناہوں کو بخش دیتا ہے",
                "[Az-Zumar 39:53] Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.'"
            ),
            Triple(
                "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
                "اے ہمارے پروردگار! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں دوزخ کے عذاب سے بچا",
                "[Al-Baqarah 2:201] Our Lord, give us in this world that which is good and in the Hereafter that which is good and save us from the punishment of the Fire."
            ),
            Triple(
                "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
                "پس تم مجھے یاد کرو میں تمہیں یاد رکھوں گا، اور میرا شکر ادا کرو اور میری ناشکری نہ کرو",
                "[Al-Baqarah 2:152] So remember Me; I will remember you. And be grateful to Me and do not deny Me."
            ),
            Triple(
                "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
                "ہمیں اللہ ہی کافی ہے اور وہ بہترین کارساز ہے",
                "[Al-Imran 3:173] Sufficient for us is Allah, and [He is] the best Disposer of affairs."
            ),
            Triple(
                "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
                "بیشک اللہ صبر کرنے والوں کے ساتھ ہے",
                "[Al-Baqarah 2:153] Indeed, Allah is with the patient."
            )
        )

        private val DAILY_HADITHS = listOf(
            Triple(
                "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
                "اعمال کا دارومدار نیتوں پر ہے اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی",
                "[Sahih Al-Bukhari #1] Actions are but by intention, and every person shall have only that which he intended."
            ),
            Triple(
                "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا",
                "تم میں سب سے بہتر وہ ہے جس کے اخلاق سب سے اچھے ہیں",
                "[Sahih Al-Bukhari #6035] The best among you are those who have the best manners and character."
            ),
            Triple(
                "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
                "تم میں سب سے بہترین شخص وہ ہے جس نے قرآن سیکھا اور سکھایا",
                "[Sahih Al-Bukhari #5027] The best of you are those who learn the Quran and teach it."
            ),
            Triple(
                "الطُّهُورُ شَطْرُ الإِيمَانِ وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ",
                "پاکیزگی اور طہارت نصف ایمان ہے، اور الحمد للہ کہنا میزان کو بھر دیتا ہے",
                "[Sahih Muslim #223] Purity is half of faith, and 'Alhamdulillah' fills the scales."
            ),
            Triple(
                "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ ثَقِيلَتَانِ فِي الْمِيزَانِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
                "دو کلمے زبان پر بہت ہلکے اور میزان میں بہت بھاری ہیں: سبحان اللہ وبحمدہ، سبحان اللہ العظیم",
                "[Sahih Al-Bukhari #6407] Two phrases are light on the tongue and heavy on the scale: Subhan Allahi wa bihamdihi, Subhan Allahil Azeem."
            ),
            Triple(
                "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
                "جو شخص علم کی تلاش کے راستے پر چلا اللہ اس کے لیے جنت کا راستہ آسان فرما دیتا ہے",
                "[Sahih Muslim #2699] Whoever treads a path seeking knowledge, Allah makes easy for him a path to Paradise."
            ),
            Triple(
                "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
                "اپنے بھائی کے سامنے تمہارا مسکرانا بھی صدقہ ہے",
                "[Jami At-Tirmidhi #1956] Smiling in the face of your brother is charity for you."
            ),
            Triple(
                "الدُّعَاءُ هُوَ الْعِبَادَةُ",
                "دعا ہی اصل عبادت ہے",
                "[Sunan Abi Dawud #1479] Supplication is the essence of worship."
            ),
            Triple(
                "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
                "صدقہ دینے سے مال میں کوئی کمی واقع نہیں ہوتی",
                "[Sahih Muslim #2588] Charity does not decrease wealth."
            ),
            Triple(
                "سَيِّدُ الِاسْتِغْفَارِ: اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ...",
                "سید الاستغفار: اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا بندہ ہوں...",
                "[Sahih Al-Bukhari #6306] The Chief Prayer for Forgiveness: O Allah, You are my Lord; none has the right to be worshipped but You..."
            )
        )
    }

    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action ?: return
        Log.d(TAG, "Received broadcast action: $action")

        when (action) {
            ACTION_PRAYER_ALARM -> {
                val prayerName = intent.getStringExtra(EXTRA_PRAYER_NAME) ?: "Prayer"
                val prayerTime = intent.getStringExtra(EXTRA_PRAYER_TIME) ?: ""
                val soundName = intent.getStringExtra(EXTRA_AZAN_SOUND) ?: "makkah"

                Log.d(TAG, "Triggering Azan notification and audio for $prayerName ($prayerTime)")

                // 1. Immediately show high-priority heads-up notification (works even if service is delayed)
                AzanNotificationManager.showPrayerNotification(context, prayerName, prayerTime)

                // 2. Launch Foreground Service for rock-solid audio playback even when app is killed
                AzanPlaybackService.start(context, prayerName, prayerTime, soundName)

                // 3. Reschedule prayer alarms
                val pendingResult = goAsync()
                CoroutineScope(Dispatchers.IO).launch {
                    try {
                        val dataStore = UserSettingsDataStore(context)
                        val settings = dataStore.userSettingsFlow.first()
                        val scheduler = PrayerAlarmScheduler(context)
                        val effLat = if (settings.hasHomeLocation && settings.homeLatitude != 0.0) settings.homeLatitude else 33.6844
                        val effLng = if (settings.hasHomeLocation && settings.homeLongitude != 0.0) settings.homeLongitude else 73.0479

                        scheduler.scheduleAlarms(
                            latitude = effLat,
                            longitude = effLng,
                            settings = settings
                        )
                    } catch (e: Exception) {
                        Log.e(TAG, "Error rescheduling alarms after azan: ${e.message}", e)
                    } finally {
                        pendingResult.finish()
                    }
                }
            }

            ACTION_STOP_AZAN -> {
                Log.d(TAG, "Stopping Azan playback by user action")
                AzanPlaybackService.stop(context)
                AzanAudioPlayer.stop()
                AzanNotificationManager.cancelNotification(context)
            }

            ACTION_DAILY_AYAT -> {
                Log.d(TAG, "Triggering scheduled Daily Ayat notification")
                val dayIndex = LocalDate.now().dayOfYear % DAILY_AYATS.size
                val (ar, ur, en) = DAILY_AYATS[dayIndex]
                AzanNotificationManager.showInspirationNotification(
                    context,
                    "Ayat of the Day (آج کی آیت)",
                    ar,
                    ur,
                    en
                )
                PrayerAlarmScheduler(context).scheduleDailyInspirations()
            }

            ACTION_DAILY_HADITH -> {
                Log.d(TAG, "Triggering scheduled Daily Hadith notification")
                val dayIndex = LocalDate.now().dayOfYear % DAILY_HADITHS.size
                val (ar, ur, en) = DAILY_HADITHS[dayIndex]
                AzanNotificationManager.showInspirationNotification(
                    context,
                    "Hadith of the Day (آج کی حدیث)",
                    ar,
                    ur,
                    en
                )
                PrayerAlarmScheduler(context).scheduleDailyInspirations()
            }

            ACTION_DAILY_TASBIH -> {
                Log.d(TAG, "Triggering scheduled Daily Tasbih notification")
                AzanNotificationManager.showTasbihNotification(
                    context,
                    "سُبْحَانَ اللَّهِ • Complete your evening 33x Tasbih Dhikr"
                )
                PrayerAlarmScheduler(context).scheduleDailyInspirations()
            }
        }
    }
}
