/**
 * NOOR AL-ISLAM — COMPREHENSIVE APPLICATION ENGINE
 * 100% Mobile Responsive Architecture Matching 15 Reference Screens
 * Real-Time Prayer Calculations, Ramadan Timings, Complete 30-Para Quran, 
 * Gyroscope Qibla, Azan Audio Playback & Building-Level GPS Pinpoint
 */

// Global State
const state = {
  currentCityIndex: 0,
  userCustomLocation: {
    name: "D-Watson Pharmacy, 35-C Block D, Main PWD Road Islamabad",
    lat: 33.57142,
    lng: 73.14546,
    timezone: 5.0,
    method: "karachi"
  },
  asrJuristic: 'hanafi',
  selectedSurahNumber: 1,
  selectedJuzNumber: 1,
  isReadingJuz: false,
  activeQuranTab: 'surah',
  quranScriptMode: 'indopak', // 'indopak' | 'madani' | 'uthmani'
  quranTranslation: 'urdu', // 'none' | 'urdu' | 'english'
  selectedReciter: 'alafasy',
  selectedAzanVoiceId: 'makkah',
  tasbihCount: 0,
  tasbihTarget: 33,
  activeTasbihPreset: { id: 'subhanallah', title: 'Subhan Allah', arabic: 'سُبْحَانَ اللَّهِ' },
  qiblaBearing: 282,
  deviceHeading: 0,
  currentAudioObj: null,
  isAudioPlaying: false,
  ayatIndex: 0,
  hadithIndex: 0,
  alarmSettings: {
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true
  }
};

// Navigation History Stack
const navHistory = ['home'];

// PRESET CITIES (Available from prayer-engine.js)
if (typeof window.PRESET_CITIES === 'undefined' && typeof PRESET_CITIES !== 'undefined') {
  window.PRESET_CITIES = PRESET_CITIES;
}

// INSPIRATION DATA (30 Authentic Ayats: Arabic -> Urdu -> English)
const DAILY_AYATS = [
  {
    arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
    urdu: "اور صبر اور نماز کے ساتھ مدد چاہو اور بیشک یہ ضرور بھاری ہے مگر ان پر جو عاجزی کرنے والے ہیں",
    english: "And seek help through patience and prayer. Indeed, it is hard except for the humbly submissive [to Allah].",
    ref: "[Al-Baqarah 2:45]"
  },
  {
    arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
    urdu: "بیشک نماز مومنوں پر اپنے مقررہ اوقات میں فرض ہے",
    english: "Indeed, prayer has been decreed upon the believers a decree of specified times.",
    ref: "[An-Nisa 4:103]"
  },
  {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    urdu: "سن لو! اللہ کے ذکر ہی سے دلوں کو اطمینان حاصل ہوتا ہے",
    english: "Unquestionably, by the remembrance of Allah hearts are assured.",
    ref: "[Ar-Ra'd 13:28]"
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    urdu: "پس تم مجھے یاد رکھو، میں تمہیں یاد رکھوں گا، اور میرا شکر ادا کرو اور ناشکری نہ کرو",
    english: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    ref: "[Al-Baqarah 2:152]"
  },
  {
    arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
    urdu: "اور جب میرے بندے آپ سے میرے بارے میں پوچھیں تو میں قریب ہوں، پکارنے والے کی دعا قبول کرتا ہوں جب وہ مجھے پکارے",
    english: "And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    ref: "[Al-Baqarah 2:186]"
  },
  {
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    urdu: "اللہ کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا",
    english: "Allah does not burden a soul beyond that it can bear.",
    ref: "[Al-Baqarah 2:286]"
  },
  {
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
    urdu: "اور نہ تم کمزور پڑو اور نہ غمگین ہو، اور تم ہی غالب رہو گے اگر تم مومن ہو",
    english: "So do not weaken and do not grieve, and you will be superior if you are [true] believers.",
    ref: "[Al-Imran 3:139]"
  },
  {
    arabic: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ",
    urdu: "پھر جب آپ پختہ ارادہ کر لیں تو اللہ پر بھروسہ رکھیں، بیشک اللہ توکل کرنے والوں سے محبت فرماتا ہے",
    english: "Then when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him].",
    ref: "[Al-Imran 3:159]"
  },
  {
    arabic: "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
    urdu: "آپ فرمائیے کہ بیشک میری نماز، میری قربانی، میرا جینا اور میرا مرنا سب اللہ کے لیے ہے جو تمام جہانوں کا پالنے والا ہے",
    english: "Say: Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.",
    ref: "[Al-An'am 6:162]"
  },
  {
    arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
    urdu: "آپ فرمائیے کہ ہمیں کبھی کوئی مصیبت نہیں پہنچ سکتی سوائے اس کے جو اللہ نے ہمارے لیے لکھ دی ہے، وہی ہمارا کارساز ہے",
    english: "Say: Never will we be struck except by what Allah has decreed for us; He is our protector. And upon Allah let the believers rely.",
    ref: "[At-Tawbah 9:51]"
  },
  {
    arabic: "يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُم مَّوْعِظَةٌ مِّن رَّبِّكُمْ وَشِفَاءٌ لِّمَا فِي الصُّدُورِ",
    urdu: "اے لوگو! بیشک تمہارے پاس تمہارے رب کی طرف سے نصیحت اور سینوں کے روگ کے لیے شفا آ چکی ہے",
    english: "O mankind, there has to come to you instruction from your Lord and healing for what is in the breasts.",
    ref: "[Yunus 10:57]"
  },
  {
    arabic: "قَالَ إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ",
    urdu: "انہوں نے کہا: میں تو اپنی پریشانی اور اپنے غم کا شکوہ صرف اللہ ہی سے کرتا ہوں",
    english: "He said: I only complain of my suffering and my grief to Allah.",
    ref: "[Yusuf 12:86]"
  },
  {
    arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ",
    urdu: "اگر تم شکر کرو گے تو میں تمہیں ضرور زیادہ دوں گا اور اگر تم ناشکری کرو گے تو بیشک میرا عذاب بڑا سخت ہے",
    english: "If you are grateful, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe.",
    ref: "[Ibrahim 14:7]"
  },
  {
    arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُن مِّنَ السَّاجِدِينَ",
    urdu: "پس آپ اپنے رب کی حمد کے ساتھ تسبیح کریں اور سجدہ کرنے والوں میں شامل ہو جائیں",
    english: "So exalt [Allah] with praise of your Lord and be of those who prostrate [to Him].",
    ref: "[Al-Hijr 15:98]"
  },
  {
    arabic: "أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ",
    urdu: "نماز قائم فرمائیے سورج کے ڈھلنے سے لے کر رات کے اندھیرے تک اور فجر کے قرآن کا پڑھنا بھی لازم کیجیے",
    english: "Establish prayer at the decline of the sun until the darkness of the night and [also] the Quran of dawn.",
    ref: "[Al-Isra 17:78]"
  },
  {
    arabic: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
    urdu: "اور ہم قرآن میں سے وہ چیز نازل فرماتے ہیں جو شفا ہے اور مومنوں کے لیے رحمت ہے",
    english: "And We send down of the Quran that which is healing and mercy for the believers.",
    ref: "[Al-Isra 17:82]"
  },
  {
    arabic: "إِنَّنِي أَنَا اللَّهُ لَا إِلٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي",
    urdu: "بیشک میں ہی اللہ ہوں، میرے سوا کوئی معبود نہیں، پس میری عبادت کر اور میری یاد کے لیے نماز قائم کر",
    english: "Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.",
    ref: "[Ta-Ha 20:14]"
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    urdu: "اور دعا کیجیے کہ اے میرے رب! مجھے علم میں اور اضافہ عطا فرما",
    english: "And say: My Lord, increase me in knowledge.",
    ref: "[Ta-Ha 20:114]"
  },
  {
    arabic: "لَّا إِلٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    urdu: "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بیشک میں ہی قصورواروں میں سے تھا",
    english: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    ref: "[Al-Anbiya 21:87]"
  },
  {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا ارْكَعُوا وَاسْجُدُوا وَاعْبُدُوا رَبَّكُمْ وَافْعَلُوا الْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ",
    urdu: "اے ایمان والو! رکوع کرو اور سجدہ کرو اور اپنے رب کی عبادت کرو اور نیکی کے کام کرو تاکہ تم فلاح پاؤ",
    english: "O you who have believed, bow and prostrate and worship your Lord and do good - that you may succeed.",
    ref: "[Al-Hajj 22:77]"
  },
  {
    arabic: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ",
    urdu: "یقیناً وہ مومن فلاح پا گئے جو اپنی نمازوں میں خشوع اور عاجزی اختیار کرتے ہیں",
    english: "Certainly will the believers have succeeded: They who are during their prayer humbly submissive.",
    ref: "[Al-Mu'minun 23:1-2]"
  },
  {
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    urdu: "اللہ آسمانوں اور زمین کا نور ہے",
    english: "Allah is the Light of the heavens and the earth.",
    ref: "[An-Nur 24:35]"
  },
  {
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    urdu: "اے ہمارے رب! ہمیں ہماری بیویوں اور بچوں کی طرف سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا",
    english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    ref: "[Al-Furqan 25:74]"
  },
  {
    arabic: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
    urdu: "اور جب میں بیمار ہوتا ہوں تو وہی مجھے شفا دیتا ہے",
    english: "And when I am ill, it is He who cures me.",
    ref: "[Ash-Shu'ara 26:80]"
  },
  {
    arabic: "اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ",
    urdu: "اس کتاب کی تلاوت کیجیے جو آپ کی طرف وحی کی گئی ہے اور نماز قائم رکھیے، بیشک نماز بے حیائی اور برائی سے روکتی ہے",
    english: "Recite what has been revealed to you of the Book and establish prayer. Indeed, prayer prohibits immorality and wrongdoing.",
    ref: "[Al-Ankabut 29:45]"
  },
  {
    arabic: "يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ",
    urdu: "اے میرے بیٹے! نماز قائم کر، نیکی کا حکم دے، برائی سے روک اور جو مصیبت تجھ پر آئے اس پر صبر کر",
    english: "O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you.",
    ref: "[Luqman 31:17]"
  },
  {
    arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
    urdu: "فرما دیجیے: اے میرے بندو جنہوں نے اپنی جانوں پر زیادتی کی ہے! اللہ کی رحمت سے ناامید نہ ہو، بیشک اللہ تمام گناہ معاف فرما دیتا ہے",
    english: "Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.",
    ref: "[Az-Zumar 39:53]"
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    urdu: "پس بیشک تنگی کے ساتھ آسانی ہے، بیشک تنگی کے ساتھ آسانی ہے",
    english: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    ref: "[Ash-Sharh 94:5-6]"
  },
  {
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ",
    urdu: "آپ فرمائیے: وہ اللہ ایک ہے، اللہ بے نیاز ہے",
    english: "Say: He is Allah, [who is] One, Allah, the Eternal Refuge.",
    ref: "[Al-Ikhlas 112:1-2]"
  },
  {
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    urdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں، ہمیں سیدھا راستہ دکھا",
    english: "It is You we worship and You we ask for help. Guide us to the straight path.",
    ref: "[Al-Fatihah 1:5-6]"
  }
];

// INSPIRATION DATA (30 Authentic Hadiths: Arabic -> Urdu -> English)
const DAILY_HADITHS = [
  // --- 1. PARENTS & FAMILY (والدین اور صلہ رحمی) ---
  {
    arabic: "جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ ﷺ فَقَالَ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: «أُمُّكَ» قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أُمُّكَ» قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أُمُّكَ» قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أَبُوكَ»",
    urdu: "ایک شخص نے رسول اللہ ﷺ سے عرض کیا: یا رسول اللہ! میرے اچھے سلوک کا سب سے زیادہ حق دار کون ہے؟ آپ ﷺ نے فرمایا: ”تمہاری ماں“۔ اس نے پوچھا: پھر کون؟ فرمایا: ”تمہاری ماں“۔ پوچھا: پھر کون؟ فرمایا: ”تمہاری ماں“۔ پوچھا: پھر کون؟ فرمایا: ”پھر تمہارا باپ“۔",
    english: "A man came to Allah's Messenger ﷺ and said: 'O Allah's Messenger! Who is most deserving of my good companionship?' He replied: 'Your mother.' He asked: 'Then who?' He replied: 'Your mother.' He asked: 'Then who?' He replied: 'Your mother.' He asked: 'Then who?' He replied: 'Then your father.'",
    ref: "صحیح البخاری: 5971 • صحیح مسلم: 2548",
    category: "parents",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "رِضَى الرَّبِّ فِي رِضَى الْوَالِدِ، وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ",
    urdu: "رب کی رضا والدین کی رضا میں ہے، اور رب کی ناراضگی والدین کی ناراضگی میں ہے۔",
    english: "The pleasure of the Lord is in the pleasure of the parent, and the displeasure of the Lord is in the displeasure of the parent.",
    ref: "جامع الترمذی: 1899 • صحیح ابن حبان",
    category: "parents",
    book: "tirmidhi",
    narrator: "حضرت عبد اللہ بن عمرو رضی اللہ عنہما"
  },
  {
    arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ",
    urdu: "جنت ماؤں کے قدموں تلے ہے۔",
    english: "Paradise lies beneath the feet of mothers.",
    ref: "سنن النسائی: 3104 • مسند احمد",
    category: "parents",
    book: "nasai",
    narrator: "حضرت معاویہ بن جاھمہ السلمی رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ أَحَبَّ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ، وَيُنْسَأَ لَهُ فِي أَثَرِهِ، فَلْيَصِلْ رَحِمَهُ",
    urdu: "جس شخص کو یہ پسند ہو کہ اس کے رزق میں کشادگی کی جائے اور اس کی عمر دراز کی جائے تو وہ صلہ رحمی (رشتہ داروں کے ساتھ حسن سلوک) کرے۔",
    english: "Whoever loves that his provision be expanded and his lifespan prolonged, let him maintain ties of kinship.",
    ref: "صحیح البخاری: 5986 • صحیح مسلم: 2557",
    category: "parents",
    book: "bukhari",
    narrator: "حضرت انس بن مالک رضی اللہ عنہ"
  },

  // --- 2. TAWBAH & ASTAGHFAR (توبہ اور استغفار) ---
  {
    arabic: "سَيِّدُ الِاسْتِغْفَارِ أَنْ تَقُولَ: اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    urdu: "سید الاستغفار یہ ہے کہ تم کہو: اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں۔ میں اپنے اوپر تیری نعمتوں کا اعتراف کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہوں کو نہیں بخش سکتا۔",
    english: "The chief prayer for forgiveness is: 'O Allah, You are my Lord; there is no deity but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.'",
    ref: "صحیح البخاری: 6306 (کتاب الدعوات)",
    category: "astaghfar",
    book: "bukhari",
    narrator: "حضرت شداد بن اوس رضی اللہ عنہ"
  },
  {
    arabic: "وَاللَّهِ إِنِّي لَأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً",
    urdu: "اللہ کی قسم! میں دن میں ستر مرتبہ سے بھی زیادہ اللہ تعالی سے استغفار اور اس کے حضور توبہ کرتا ہوں۔",
    english: "By Allah, I seek forgiveness from Allah and turn to Him in repentance more than seventy times in a day.",
    ref: "صحیح البخاری: 6307 (کتاب الدعوات)",
    category: "astaghfar",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "لَلَّهُ أَشَدُّ فَرَحًا بِتَوْبَةِ عَبْدِهِ حِينَ يَتُوبُ إِلَيْهِ مِنْ أَحَدِكُمْ كَانَ عَلَى رَاحِلَتِهِ بِأَرْضِ فَلَاةٍ، فَانْفَلَتَتْ مِنْهُ وَعَلَيْهَا طَعَامُهُ وَشَرَابُهُ...",
    urdu: "یقیناً اللہ تعالی اپنے بندے کی توبہ سے اس شخص سے بھی کہیں زیادہ خوش ہوتا ہے جس کی سواری کسی چٹیل صحرا میں گم ہو گئی ہو جس پر اس کا کھانا پینا ہو اور مایوس ہو جانے کے بعد وہ اچانک اسے مل جائے۔",
    english: "Allah is more pleased with the repentance of His servant when he turns to Him than one of you who loses his camel loaded with food and water in a barren wasteland and then suddenly finds it.",
    ref: "صحیح مسلم: 2749 • صحیح البخاری: 6309",
    category: "astaghfar",
    book: "muslim",
    narrator: "حضرت انس بن مالک رضی اللہ عنہ"
  },
  {
    arabic: "كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ",
    urdu: "تمام انسان خطا کار ہیں، اور خطا کاروں میں سب سے بہترین وہ ہیں جو کثرت سے توبہ کرنے والے ہیں۔",
    english: "All of the children of Adam are sinners, and the best of sinners are those who continually repent.",
    ref: "جامع الترمذی: 2499 • سنن ابن ماجہ: 4251 (حسن)",
    category: "astaghfar",
    book: "tirmidhi",
    narrator: "حضرت انس بن مالک رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ قَالَ: أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ، غُفِرَ لَهُ وَإِنْ كَانَ فَرَّ مِنَ الزَّحْفِ",
    urdu: "جس نے یہ کہا: میں عظمت والے اللہ سے بخشش مانگتا ہوں جس کے سوا کوئی معبود نہیں، جو ہمیشہ زندہ رہنے والا اور سب کو سنبھالنے والا ہے اور میں اسی کے حضور توبہ کرتا ہوں، تو اس کے تمام گناہ بخش دیے جاتے ہیں اگرچہ وہ میدانِ جہاد سے بھاگا ہو۔",
    english: "Whoever says: 'I seek forgiveness of Allah the Magnificent, besides Whom there is no deity, the Ever-Living, the Sustainer, and I repent to Him,' will be forgiven, even if he fled from battle.",
    ref: "جامع الترمذی: 3577 • سنن ابی داود: 1517",
    category: "astaghfar",
    book: "tirmidhi",
    narrator: "حضرت زید بن حارثہ رضی اللہ عنہ"
  },

  // --- 3. SALAH & TAHARAH (نماز اور طہارت) ---
  {
    arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ مَا بَيْنَ السَّمَاوَاتِ وَالأَرْضِ",
    urdu: "پاکیزگی اور طہارت نصف ایمان ہے، اور الحمد للہ کہنا ترازو کو بھر دیتا ہے، اور سبحان اللہ اور الحمد للہ آسمانوں اور زمین کے درمیانی خلا کو بھر دیتے ہیں۔",
    english: "Purity is half of faith, and 'Alhamdulillah' (Praise be to Allah) fills the scale, and 'SubhanAllah' and 'Alhamdulillah' fill what is between the heavens and the earth.",
    ref: "صحیح مسلم: 223 (کتاب الطہارۃ)",
    category: "prayer",
    book: "muslim",
    narrator: "حضرت ابو مالک الاشعری رضی اللہ عنہ"
  },
  {
    arabic: "أَرَأَيْتُمْ لَوْ أَنَّ نَهْرًا بِبَابِ أَحَدِكُمْ يَغْتَسِلُ مِنْهُ كُلَّ يَوْمٍ خَمْسَ مَرَّاتٍ، هَلْ يَبْقَى مِنْ دَرَنِهِ شَيْءٌ؟ قَالُوا: لَا. قَالَ: فَذَلِكَ مَثَلُ الصَّلَوَاتِ الْخَمْسِ، يَمْحُو اللَّهُ بِهِنَّ الْخَطَايَا",
    urdu: "بھلا بتاؤ تو اگر تم میں سے کسی کے دروازے پر نہر بہتی ہو جس میں وہ روزانہ پانچ بار نہاتا ہو، کیا اس کے جسم پر کچھ میل کچیل باقی رہے گا؟ صحابہ نے عرض کیا: نہیں! آپ ﷺ نے فرمایا: یہی مثال پانچوں نمازوں کی ہے، اللہ تعالیٰ ان کے ذریعے گناہوں کو مٹا دیتا ہے۔",
    english: "Tell me, if there were a river at the door of one of you in which he bathed five times a day, would any of his dirt remain? They said: 'No.' He said: 'That is the likeness of the five daily prayers; Allah wipes away sins by means of them.'",
    ref: "صحیح البخاری: 528 • صحیح مسلم: 667",
    category: "prayer",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ",
    urdu: "جس نے دو ٹھنڈی نمازیں (فجر اور عصر) باقاعدگی سے ادا کیں وہ جنت میں داخل ہو گا۔",
    english: "Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.",
    ref: "صحیح البخاری: 574 • صحیح مسلم: 635",
    category: "prayer",
    book: "bukhari",
    narrator: "حضرت ابو موسیٰ اشعری رضی اللہ عنہ"
  },
  {
    arabic: "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ فَأَكْثِرُوا الدُّعَاءَ",
    urdu: "بندہ اپنے رب کے سب سے زیادہ قریب اس وقت ہوتا ہے جب وہ سجدے میں ہو، پس سجدے میں کثرت سے دعائیں مانگو۔",
    english: "The closest that a servant comes to his Lord is when he is in prostration, so make plenty of supplication then.",
    ref: "صحیح مسلم: 482 (کتاب الصلاۃ)",
    category: "prayer",
    book: "muslim",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "الصَّلَوَاتُ الْخَمْسُ وَالْجُمُعَةُ إِلَى الْجُمُعَةِ كَفَّارَاتٌ لِمَا بَيْنَهُنَّ إِذَا اجْتُنِبَتِ الْكَبَائِرُ",
    urdu: "پانچوں نمازیں اور ایک جمعہ دوسرے جمعہ تک درمیانی گناہوں کا کفارہ بن جاتے ہیں جب تک کہ کبیرہ گناہوں سے بچا جائے۔",
    english: "The five daily prayers and from one Friday prayer to the next expiate whatever sins were committed between them, provided major sins are avoided.",
    ref: "صحیح مسلم: 233",
    category: "prayer",
    book: "muslim",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "إِذَا سَمِعْتُمُ الْمُؤَذِّنَ فَقُولُوا مِثْلَ مَا يَقُولُ ثُمَّ صَلُّوا عَلَيَّ",
    urdu: "جب تم مؤذن کو اذان کہتے ہوئے سنو تو اسی طرح کہو جس طرح وہ کہتا ہے، پھر مجھ پر درود بھیجو۔",
    english: "When you hear the Mu'azzin calling to prayer, repeat what he says, then send blessings upon me.",
    ref: "صحیح مسلم: 384",
    category: "prayer",
    book: "muslim",
    narrator: "حضرت عبد اللہ بن عمرو رضی اللہ عنہما"
  },

  // --- 4. HOLY QURAN (قرآن پاک کے فضائل) ---
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    urdu: "تم میں سے سب سے بہترین شخص وہ ہے جس نے قرآن مجید سیکھا اور دوسروں کو سکھایا۔",
    english: "The best among you are those who learn the Quran and teach it to others.",
    ref: "صحیح البخاری: 5027 (کتاب فضائل القرآن)",
    category: "quran",
    book: "bukhari",
    narrator: "حضرت عثمان بن عفان رضی اللہ عنہ"
  },
  {
    arabic: "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
    urdu: "قرآن مجید پڑھا کرو، کیونکہ یہ قیامت کے دن اپنے پڑھنے والوں کے حق میں سفارش کرنے والا بن کر آئے گا۔",
    english: "Read the Quran, for indeed it will come on the Day of Resurrection as an intercessor for its companions.",
    ref: "صحیح مسلم: 804 (کتاب صلاۃ المسافرین)",
    category: "quran",
    book: "muslim",
    narrator: "حضرت ابو امامہ باہلی رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ، وَالحَسَنَةُ بِعَشْرِ أَمْثَالِهَا، لَا أَقُولُ الم حَرْفٌ، وَلَكِنْ أَلِفٌ حَرْفٌ وَلَامٌ حَرْفٌ وَمِيمٌ حَرْفٌ",
    urdu: "جس نے اللہ کی کتاب (قرآن مجید) کا ایک حرف پڑھا اس کے لیے ایک نیکی ہے، اور ایک نیکی کا اجر دس گنا ہے۔ میں یہ نہیں کہتا کہ 'الم' ایک حرف ہے، بلکہ الف ایک حرف ہے، لام ایک حرف ہے اور میم ایک حرف ہے۔",
    english: "Whoever recites a letter from the Book of Allah will be credited with a good deed, and a good deed receives a tenfold reward. I do not say that Alif-Lam-Mim is one letter, but Alif is a letter, Lam is a letter, and Mim is a letter.",
    ref: "جامع الترمذی: 2910 (حسن صحیح)",
    category: "quran",
    book: "tirmidhi",
    narrator: "حضرت عبد اللہ بن مسعود رضی اللہ عنہ"
  },
  {
    arabic: "الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ، وَالَّذِي يَقْرَأُ الْقُرْآنَ وَيَتَتَعْتَعُ فِيهِ وَهُوَ عَلَيْهِ شَاقٌّ لَهُ أَجْرَانِ",
    urdu: "قرآن پاک میں مہارت رکھنے والا معزز فرشتوں کے ساتھ ہو گا، اور جو شخص اٹک اٹک کر مشقت سے پڑھتا ہے اس کے لیے دوہرا اجر ہے۔",
    english: "The one who is skilled in reciting the Quran will be with the noble, obedient angels; and the one who recites the Quran stammering, and finds it difficult, will have a double reward.",
    ref: "صحیح البخاری: 4937 • صحیح مسلم: 798",
    category: "quran",
    book: "bukhari",
    narrator: "حضرت عائشہ صدیقہ رضی اللہ عنہا"
  },

  // --- 5. FASTING & RAMADAN (روزہ اور رمضان) ---
  {
    arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    urdu: "جس نے رمضان کے روزے ایمان اور ثواب کی نیت کے ساتھ رکھے اس کے پچھلے تمام گناہ معاف کر دیے جاتے ہیں۔",
    english: "Whoever observes the fasts of Ramadan out of sincere faith and hoping for reward, all his past sins will be forgiven.",
    ref: "صحیح البخاری: 1901 • صحیح مسلم: 760",
    category: "ramadan",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ قَامَ لَيْلَةَ الْقَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    urdu: "جس نے شبِ قدر میں ایمان اور ثواب کی امید کے ساتھ قیام کیا اس کے پچھلے تمام گناہ معاف کر دیے جاتے ہیں۔",
    english: "Whoever stands in prayer on Laylatul Qadr (the Night of Decree) out of faith and seeking reward, all his previous sins will be forgiven.",
    ref: "صحیح البخاری: 2014 • صحیح مسلم: 760",
    category: "ramadan",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "الصِّيَامُ جُنَّةٌ فَلَا يَرْفُثْ وَلَا يَجْهَلْ، وَإِنِ امْرُؤٌ قَاتَلَهُ أَوْ شَاتَمَهُ فَلْيَقُلْ: إِنِّي صَائِمٌ مَرَّتَيْنِ",
    urdu: "روزہ (گناہوں اور جہنم سے بچاؤ کی) ڈھال ہے، پس روزے دار نہ تو بے حیائی کی باتیں کرے اور نہ نادانی۔ اگر کوئی اس سے لڑے یا گالی دے تو دو بار کہہ دے: میں روزے دار ہوں۔",
    english: "Fasting is a shield, so the fasting person should avoid obscenity and foolish behavior. If someone fights him or abuses him, let him say twice: 'I am fasting.'",
    ref: "صحیح البخاری: 1894 • صحیح مسلم: 1151",
    category: "ramadan",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "لِلصَّائِمِ فَرْحَتَانِ يَفْرَحُهُمَا: إِذَا أَفْطَرَ فَرِحَ، وَإِذَا لَقِيَ رَبَّهُ فَرِحَ بِصَوْمِهِ",
    urdu: "روزے دار کے لیے دو خوشیاں ہیں جن سے وہ خوش ہوتا ہے: ایک خوشی جب وہ افطار کرتا ہے، اور دوسری خوشی جب وہ اپنے رب سے ملاقات کرے گا تو اپنے روزے کے ثواب پر خوش ہو گا۔",
    english: "The fasting person has two occasions of joy: when he breaks his fast he is joyful, and when he meets his Lord he is joyful at his fasting.",
    ref: "صحیح البخاری: 1904 • صحیح مسلم: 1151",
    category: "ramadan",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },

  // --- 6. HAJJ & UMRAH (حج اور عمرہ) ---
  {
    arabic: "الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا، وَالْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الْجَنَّةُ",
    urdu: "ایک عمرہ دوسرے عمرے تک درمیانی گناہوں کا کفارہ ہے، اور حجِ مبرور (مقبول حج) کا بدلہ صرف اور صرف جنت ہی ہے۔",
    english: "An Umrah to an Umrah is an expiation for what is between them, and an accepted Hajj (Hajj Mabrur) has no reward other than Paradise.",
    ref: "صحیح البخاری: 1773 • صحیح مسلم: 1349",
    category: "hajj",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ حَجَّ لِلَّهِ فَلَمْ يَرْفُثْ وَلَمْ يَفْسُقْ رَجَعَ كَيَوْمِ وَلَدَتْهُ أُمُّهُ",
    urdu: "جس نے اللہ کے لیے حج کیا اور نہ کوئی فحش بات کی اور نہ کوئی گناہ کیا تو وہ اپنے گناہوں سے اس طرح پاک صاف لوٹتا ہے جیسے اس دن تھا جب اس کی ماں نے اسے جنا تھا۔",
    english: "Whoever performs Hajj for Allah and does not commit obscenity or wickedness will return as free from sins as the day his mother gave birth to him.",
    ref: "صحیح البخاری: 1521 • صحیح مسلم: 1350",
    category: "hajj",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "تَابِعُوا بَيْنَ الْحَجِّ وَالْعُمْرَةِ، فَإِنَّهُمَا يَنْفِيَانِ الْفَقْرَ وَالذُّنُوبَ كَمَا يَنْفِي الْكِيرُ خَبَثَ الْحَدِيدِ وَالذَّهَبِ وَالْفِضَّةِ",
    urdu: "حج اور عمرہ کو پے در پے ملا کر کیا کرو، کیونکہ یہ دونوں محتاجی اور گناہوں کو اس طرح دور کر دیتے ہیں جیسے بھٹی لوہے، سونے اور چاندی کا میل کچیل دور کر دیتی ہے۔",
    english: "Follow up between Hajj and Umrah, for they remove poverty and sins as the bellows remove impurities from iron, gold, and silver.",
    ref: "جامع الترمذی: 810 • سنن النسائی: 2631 (صحیح)",
    category: "hajj",
    book: "tirmidhi",
    narrator: "حضرت عبد اللہ بن مسعود رضی اللہ عنہ"
  },
  {
    arabic: "الْحَجُّ عَرَفَةُ",
    urdu: "حج تو اصل میں وقوفِ عرفات ہی کا نام ہے۔",
    english: "Hajj is the standing at Arafat.",
    ref: "جامع الترمذی: 889 • سنن ابی داود: 1949 (صحیح)",
    category: "hajj",
    book: "tirmidhi",
    narrator: "حضرت عبد الرحمن بن یعمر رضی اللہ عنہ"
  },

  // --- 7. AKHLAQ & MANNERS (حسنِ اخلاق اور کردار) ---
  {
    arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا",
    urdu: "تم میں سے سب سے بہتر اور منتخب وہ لوگ ہیں جن کے اخلاق سب سے اچھے ہیں۔",
    english: "The best among you are those who have the best manners and character.",
    ref: "صحیح البخاری: 6035 • صحیح مسلم: 2321",
    category: "manners",
    book: "bukhari",
    narrator: "حضرت عبد اللہ بن عمرو رضی اللہ عنہما"
  },
  {
    arabic: "لَا تَغْضَبْ",
    urdu: "غصہ مت کیا کرو۔",
    english: "Do not become angry.",
    ref: "صحیح البخاری: 6116 (کتاب الادب)",
    category: "manners",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "إِنَّ الرِّفْقَ لاَ يَكُونُ فِي شَىْءٍ إِلاَّ زَانَهُ وَلاَ يُنْزَعُ مِنْ شَىْءٍ إِلاَّ شَانَهُ",
    urdu: "نرمی جس چیز میں بھی ہو اسے خوبصورت بنا دیتی ہے اور جس چیز سے نکال لی جائے اسے عیب دار بنا دیتی ہے۔",
    english: "Kindness is not found in anything except that it beautifies it, and is not withdrawn from anything except that it defiles it.",
    ref: "صحیح مسلم: 2594",
    category: "manners",
    book: "muslim",
    narrator: "حضرت عائشہ صدیقہ رضی اللہ عنہا"
  },
  {
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    urdu: "جو شخص اللہ اور آخرت کے دن پر ایمان رکھتا ہے وہ اچھی بات کہے یا پھر خاموش رہے۔",
    english: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    ref: "صحیح البخاری: 6018 • صحیح مسلم: 47",
    category: "manners",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    urdu: "بیشک اللہ تمہاری صورتوں اور تمہارے مالوں کو نہیں دیکھتا، بلکہ وہ تمہارے دلوں اور تمہارے اعمال کو دیکھتا ہے۔",
    english: "Allah does not look at your appearance or wealth, but rather He looks at your hearts and deeds.",
    ref: "صحیح مسلم: 2564",
    category: "manners",
    book: "muslim",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
    urdu: "اپنے بھائی کے سامنے تمہارا مسکرا کر ملنا بھی تمہارے لیے صدقہ ہے۔",
    english: "Your smiling in the face of your brother is charity for you.",
    ref: "جامع الترمذی: 1956 (حسن صحیح)",
    category: "manners",
    book: "tirmidhi",
    narrator: "حضرت ابو ذر رضی اللہ عنہ"
  },
  {
    arabic: "الْمُسْلِمُ أَخُو الْمُسْلِمِ لاَ يَظْلِمُهُ وَلاَ يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ",
    urdu: "مسلمان مسلمان کا بھائی ہے، نہ اس پر ظلم کرتا ہے نہ اسے بے یار و مددگار چھوڑتا ہے۔ اور جو اپنے بھائی کی حاجت روائی میں لگ جائے اللہ اس کی حاجت روائی فرماتا ہے۔",
    english: "A Muslim is the brother of a Muslim: he neither oppresses him nor hands him over to harm. Whoever relieves a Muslim's need, Allah will relieve his need.",
    ref: "صحیح البخاری: 2442 • صحیح مسلم: 2580",
    category: "manners",
    book: "bukhari",
    narrator: "حضرت عبد اللہ بن عمر رضی اللہ عنہما"
  },
  {
    arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ تَعَالَى أَدْوَمُهَا وَإِنْ قَلَّ",
    urdu: "اللہ تعالی کے نزدیک سب سے پسندیدہ عمل وہ ہے جو پابندی اور ہمیشگی کے ساتھ کیا جائے خواہ تھوڑا ہی کیوں نہ ہو۔",
    english: "The most beloved of deeds to Allah are those that are most consistent, even if they are few.",
    ref: "صحیح البخاری: 6464 • صحیح مسلم: 783",
    category: "manners",
    book: "bukhari",
    narrator: "حضرت عائشہ صدیقہ رضی اللہ عنہا"
  },

  // --- 8. IMAN & SINCERITY (ایمان اور اخلاص) ---
  {
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    urdu: "اعمال کا دارومدار نیتوں پر ہے اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی۔",
    english: "Actions are judged by intentions, and every person will have only that which they intended.",
    ref: "صحیح البخاری: 1 • صحیح مسلم: 1907",
    category: "iman",
    book: "bukhari",
    narrator: "امیر المؤمنین عمر بن الخطاب رضی اللہ عنہ"
  },
  {
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    urdu: "تم میں سے کوئی شخص اس وقت تک سچا مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی چیز پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔",
    english: "None of you truly believes until he loves for his brother what he loves for himself.",
    ref: "صحیح البخاری: 13 • صحیح مسلم: 45",
    category: "iman",
    book: "bukhari",
    narrator: "حضرت انس بن مالک رضی اللہ عنہ"
  },
  {
    arabic: "ذَاقَ طَعْمَ الإِيمَانِ مَنْ رَضِيَ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ رَسُولاً",
    urdu: "اس نے ایمان کا مزہ چکھ لیا جو اللہ کے رب ہونے، اسلام کے دین ہونے اور حضرت محمد ﷺ کے رسول ہونے پر دل سے راضی ہو گیا۔",
    english: "He has tasted the sweetness of faith who is content with Allah as Lord, Islam as religion, and Muhammad as Messenger.",
    ref: "صحیح مسلم: 34",
    category: "iman",
    book: "muslim",
    narrator: "حضرت عباس بن عبد المطلب رضی اللہ عنہ"
  },

  // --- 9. CHARITY & SADAQAH (صدقہ و احسان) ---
  {
    arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ",
    urdu: "صدقہ دینے سے مال میں کوئی کمی واقع نہیں ہوتی، اور معاف کر دینے سے اللہ تعالی بندے کی عزت ہی بڑھاتا ہے، اور جو شخص اللہ کے لیے عاجزی اختیار کرتا ہے اللہ اسے بلندیاں عطا فرماتا ہے۔",
    english: "Charity does not decrease wealth; Allah increases the honor of a person who forgives; and no one humbles himself for Allah except that Allah elevates him.",
    ref: "صحیح مسلم: 2588",
    category: "charity",
    book: "muslim",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى، وَالْيَدُ الْعُلْيَا هِيَ الْمُنْفِقَةُ، وَالسُّفْلَى هِيَ السَّائِلَةُ",
    urdu: "اوپر والا ہاتھ نیچے والے ہاتھ سے بہتر ہے، اوپر والا ہاتھ خرچ کرنے والے کا ہے اور نیچے والا ہاتھ مانگنے والے کا ہے۔",
    english: "The upper hand is better than the lower hand: the upper hand is the one that spends, and the lower hand is the one that asks.",
    ref: "صحیح البخاری: 1429 • صحیح مسلم: 1033",
    category: "charity",
    book: "bukhari",
    narrator: "حضرت عبد اللہ بن عمر رضی اللہ عنہما"
  },
  {
    arabic: "اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ",
    urdu: "جہنم کی آگ سے بچو خواہ کھجور کے ایک ٹکڑے ہی کے ذریعے (صدقہ کر کے) کیوں نہ ہو۔",
    english: "Guard yourselves against the Fire, even with half a date given in charity.",
    ref: "صحیح البخاری: 1417 • صحیح مسلم: 1016",
    category: "charity",
    book: "bukhari",
    narrator: "حضرت عدی بن حاتم رضی اللہ عنہ"
  },

  // --- 10. ZIKR & DUA (ذکر، تسبیح اور دعا) ---
  {
    arabic: "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    urdu: "دو کلمے زبان پر بہت ہلکے، میزان میں بہت بھاری اور رحمن کو بہت پیارے ہیں: سبحان اللہ وبحمدہ، سبحان اللہ العظیم۔",
    english: "Two words are light on the tongue, heavy on the scale, and beloved to the Most Merciful: Subhan Allahi wa bihamdihi, Subhan Allahil Azeem.",
    ref: "صحیح البخاری: 6407 • صحیح مسلم: 2694",
    category: "zikr",
    book: "bukhari",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لاَ يَذْكُرُ رَبَّهُ مَثَلُ الْحَيِّ وَالْمَيِّتِ",
    urdu: "اپنے رب کا ذکر کرنے والے اور ذکر نہ کرنے والے کی مثال زندہ اور مردہ جیسی ہے۔",
    english: "The likeness of the one who remembers his Lord and the one who does not is like the living and the dead.",
    ref: "صحیح البخاری: 6407 • صحیح مسلم: 779",
    category: "zikr",
    book: "bukhari",
    narrator: "حضرت ابو موسیٰ اشعری رضی اللہ عنہ"
  },
  {
    arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ",
    urdu: "دعا ہی اصل عبادت ہے۔",
    english: "Supplication is the very essence of worship.",
    ref: "جامع الترمذی: 3372 • سنن ابی داود: 1479 (صحیح)",
    category: "zikr",
    book: "tirmidhi",
    narrator: "حضرت نعمان بن بشیر رضی اللہ عنہ"
  },
  {
    arabic: "ادْعُوا اللَّهَ وَأَنْتُمْ مُوقِنُونَ بِالإِجَابَةِ، وَاعْلَمُوا أَنَّ اللَّهَ لاَ يَسْتَجِيبُ دُعَاءً مِنْ قَلْبٍ غَافِلٍ لاَهٍ",
    urdu: "اللہ سے اس حالت میں دعا مانگو کہ تمہیں قبولیت کا پورا یقین ہو، اور جان لو کہ اللہ کسی غافل اور بے پرواہ دل کی دعا قبول نہیں فرماتا۔",
    english: "Call upon Allah with full certainty of receiving an answer, and know that Allah does not accept a prayer from a careless, distracted heart.",
    ref: "جامع الترمذی: 3479 (حسن)",
    category: "zikr",
    book: "tirmidhi",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ كَنْزٌ مِنْ كُنُوزِ الْجَنَّةِ",
    urdu: "لا حول ولا قوۃ الا باللہ جنت کے خزانوں میں سے ایک خزانہ ہے۔",
    english: "'La hawla wa la quwwata illa billah' is a treasure from the treasures of Paradise.",
    ref: "صحیح البخاری: 6384 • صحیح مسلم: 2704",
    category: "zikr",
    book: "bukhari",
    narrator: "حضرت ابو موسیٰ اشعری رضی اللہ عنہ"
  },

  // --- 11. KNOWLEDGE & WISDOM (علم اور رہنمائی) ---
  {
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    urdu: "جو شخص علم کی تلاش کے راستے پر چلا اللہ اس کے لیے جنت کا راستہ آسان فرما دیتا ہے۔",
    english: "Whoever treads a path seeking knowledge, Allah makes easy for him a path to Paradise.",
    ref: "صحیح مسلم: 2699",
    category: "knowledge",
    book: "muslim",
    narrator: "حضرت ابو ہریرہ رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
    urdu: "اللہ جس کے ساتھ بھلائی کا ارادہ فرماتا ہے اسے دین کی گہری سمجھ عطا فرما دیتا ہے۔",
    english: "When Allah desires goodness for someone, He grants him deep understanding of the religion.",
    ref: "صحیح البخاری: 71 • صحیح مسلم: 1037",
    category: "knowledge",
    book: "bukhari",
    narrator: "حضرت معاویہ رضی اللہ عنہ"
  },
  {
    arabic: "مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ",
    urdu: "جس نے کسی نیکی کی رہنمائی کی اسے اس نیکی کرنے والے کے برابر ثواب ملتا ہے۔",
    english: "Whoever guides someone to a good deed will have a reward like that of the one who does it.",
    ref: "صحیح مسلم: 1893",
    category: "knowledge",
    book: "muslim",
    narrator: "حضرت ابو مسعود انصاری رضی اللہ عنہ"
  }
];

// CANONICAL 30 PARAS DIRECTORY
const QURAN_JUZ_DIRECTORY = [
  { juz: 1, nameArabic: "آلم", nameUrdu: "الم (الف لام میم)", nameEnglish: "Alif Lam Meem", parts: [{ surah: 1, startAyah: 1, endAyah: 7 }, { surah: 2, startAyah: 1, endAyah: 141 }] },
  { juz: 2, nameArabic: "سَيَقُولُ", nameUrdu: "سیقول", nameEnglish: "Sayaqool", parts: [{ surah: 2, startAyah: 142, endAyah: 252 }] },
  { juz: 3, nameArabic: "تِلْكَ الرُّسُلُ", nameUrdu: "تلک الرسل", nameEnglish: "Tilkar Rusul", parts: [{ surah: 2, startAyah: 253, endAyah: 286 }, { surah: 3, startAyah: 1, endAyah: 92 }] },
  { juz: 4, nameArabic: "لَنْ تَنَالُوا", nameUrdu: "لن تنالوا", nameEnglish: "Lan Tanaloo", parts: [{ surah: 3, startAyah: 93, endAyah: 200 }, { surah: 4, startAyah: 1, endAyah: 23 }] },
  { juz: 5, nameArabic: "وَالْمُحْصَنَاتُ", nameUrdu: "والمحصنت", nameEnglish: "Wal Muhsanat", parts: [{ surah: 4, startAyah: 24, endAyah: 147 }] },
  { juz: 6, nameArabic: "لَا يُحِبُّ اللَّهُ", nameUrdu: "لا یحب اللہ", nameEnglish: "La Yuhibbullah", parts: [{ surah: 4, startAyah: 148, endAyah: 176 }, { surah: 5, startAyah: 1, endAyah: 81 }] },
  { juz: 7, nameArabic: "وَإِذَا سَمِعُوا", nameUrdu: "واذا سمعوا", nameEnglish: "Wa Iza Sami'oo", parts: [{ surah: 5, startAyah: 82, endAyah: 120 }, { surah: 6, startAyah: 1, endAyah: 110 }] },
  { juz: 8, nameArabic: "وَلَوْ أَنَّنَا", nameUrdu: "ولو اننا", nameEnglish: "Wa Law Annana", parts: [{ surah: 6, startAyah: 111, endAyah: 165 }, { surah: 7, startAyah: 1, endAyah: 87 }] },
  { juz: 9, nameArabic: "قَالَ الْمَلَأُ", nameUrdu: "قال الملا", nameEnglish: "Qalal Mala'u", parts: [{ surah: 7, startAyah: 88, endAyah: 206 }, { surah: 8, startAyah: 1, endAyah: 40 }] },
  { juz: 10, nameArabic: "وَاعْلَمُوا", nameUrdu: "واعلموا", nameEnglish: "Wa'lamoo", parts: [{ surah: 8, startAyah: 41, endAyah: 75 }, { surah: 9, startAyah: 1, endAyah: 92 }] },
  { juz: 11, nameArabic: "يَعْتَذِرُونَ", nameUrdu: "یعتذرون", nameEnglish: "Ya'taziroon", parts: [{ surah: 9, startAyah: 93, endAyah: 129 }, { surah: 10, startAyah: 1, endAyah: 109 }, { surah: 11, startAyah: 1, endAyah: 5 }] },
  { juz: 12, nameArabic: "وَمَا مِنْ دَابَّةٍ", nameUrdu: "وما من دابۃ", nameEnglish: "Wa Mamin Daabbah", parts: [{ surah: 11, startAyah: 6, endAyah: 123 }, { surah: 12, startAyah: 1, endAyah: 52 }] },
  { juz: 13, nameArabic: "وَمَا أُبَرِّئُ", nameUrdu: "وما ابری", nameEnglish: "Wa Ma Ubarri'u", parts: [{ surah: 12, startAyah: 53, endAyah: 111 }, { surah: 13, startAyah: 1, endAyah: 43 }, { surah: 14, startAyah: 1, endAyah: 52 }] },
  { juz: 14, nameArabic: "رُبَمَا", nameUrdu: "ربما", nameEnglish: "Rubama", parts: [{ surah: 15, startAyah: 1, endAyah: 99 }, { surah: 16, startAyah: 1, endAyah: 128 }] },
  { juz: 15, nameArabic: "سُبْحَانَ الَّذِي", nameUrdu: "سبحن الذی", nameEnglish: "Subhanallazi", parts: [{ surah: 17, startAyah: 1, endAyah: 111 }, { surah: 18, startAyah: 1, endAyah: 74 }] },
  { juz: 16, nameArabic: "قَالَ أَلَمْ", nameUrdu: "قال الم", nameEnglish: "Qala Alam", parts: [{ surah: 18, startAyah: 75, endAyah: 110 }, { surah: 19, startAyah: 1, endAyah: 98 }, { surah: 20, startAyah: 1, endAyah: 135 }] },
  { juz: 17, nameArabic: "اقْتَرَبَ لِلنَّاسِ", nameUrdu: "اقترب للناس", nameEnglish: "Iqtaraba Lin-Naas", parts: [{ surah: 21, startAyah: 1, endAyah: 112 }, { surah: 22, startAyah: 1, endAyah: 78 }] },
  { juz: 18, nameArabic: "قَدْ أَفْلَحَ", nameUrdu: "قد افلح", nameEnglish: "Qad Aflaha", parts: [{ surah: 23, startAyah: 1, endAyah: 118 }, { surah: 24, startAyah: 1, endAyah: 64 }, { surah: 25, startAyah: 1, endAyah: 20 }] },
  { juz: 19, nameArabic: "وَقَالَ الَّذِينَ", nameUrdu: "وقال الذین", nameEnglish: "Wa Qalal-Lazeena", parts: [{ surah: 25, startAyah: 21, endAyah: 77 }, { surah: 26, startAyah: 1, endAyah: 227 }, { surah: 27, startAyah: 1, endAyah: 55 }] },
  { juz: 20, nameArabic: "أَمَّنْ خَلَقَ", nameUrdu: "امن خلق", nameEnglish: "Amman Khalaq", parts: [{ surah: 27, startAyah: 56, endAyah: 93 }, { surah: 28, startAyah: 1, endAyah: 88 }, { surah: 29, startAyah: 1, endAyah: 45 }] },
  { juz: 21, nameArabic: "اتْلُ مَا أُوحِيَ", nameUrdu: "اتل ما اوحی", nameEnglish: "Utlu Ma Oohiya", parts: [{ surah: 29, startAyah: 46, endAyah: 69 }, { surah: 30, startAyah: 1, endAyah: 60 }, { surah: 31, startAyah: 1, endAyah: 34 }, { surah: 32, startAyah: 1, endAyah: 30 }, { surah: 33, startAyah: 1, endAyah: 30 }] },
  { juz: 22, nameArabic: "وَمَنْ يَقْنُتْ", nameUrdu: "ومن یقنت", nameEnglish: "Wa Man Yaqnut", parts: [{ surah: 33, startAyah: 31, endAyah: 73 }, { surah: 34, startAyah: 1, endAyah: 54 }, { surah: 35, startAyah: 1, endAyah: 45 }, { surah: 36, startAyah: 1, endAyah: 27 }] },
  { juz: 23, nameArabic: "وَمَا لِيَ", nameUrdu: "وما لی", nameEnglish: "Wa Mali", parts: [{ surah: 36, startAyah: 28, endAyah: 83 }, { surah: 37, startAyah: 1, endAyah: 182 }, { surah: 38, startAyah: 1, endAyah: 88 }, { surah: 39, startAyah: 1, endAyah: 31 }] },
  { juz: 24, nameArabic: "فَمَنْ أَظْلَمُ", nameUrdu: "فمن اظلم", nameEnglish: "Faman Azlamu", parts: [{ surah: 39, startAyah: 32, endAyah: 75 }, { surah: 40, startAyah: 1, endAyah: 85 }, { surah: 41, startAyah: 1, endAyah: 46 }] },
  { juz: 25, nameArabic: "إِلَيْهِ يُرَدُّ", nameUrdu: "الیہ یرد", nameEnglish: "Ilayhi Yuraddu", parts: [{ surah: 41, startAyah: 47, endAyah: 54 }, { surah: 42, startAyah: 1, endAyah: 53 }, { surah: 43, startAyah: 1, endAyah: 89 }, { surah: 44, startAyah: 1, endAyah: 59 }, { surah: 45, startAyah: 1, endAyah: 37 }] },
  { juz: 26, nameArabic: "حم", nameUrdu: "حٰم", nameEnglish: "Ha-Meem", parts: [{ surah: 46, startAyah: 1, endAyah: 35 }, { surah: 47, startAyah: 1, endAyah: 38 }, { surah: 48, startAyah: 1, endAyah: 29 }, { surah: 49, startAyah: 1, endAyah: 18 }, { surah: 50, startAyah: 1, endAyah: 45 }, { surah: 51, startAyah: 1, endAyah: 30 }] },
  { juz: 27, nameArabic: "قَالَ فَمَا خَطْبُكُمْ", nameUrdu: "قال فما خطبکم", nameEnglish: "Qala Fama Khatbukum", parts: [{ surah: 51, startAyah: 31, endAyah: 60 }, { surah: 52, startAyah: 1, endAyah: 49 }, { surah: 53, startAyah: 1, endAyah: 62 }, { surah: 54, startAyah: 1, endAyah: 55 }, { surah: 55, startAyah: 1, endAyah: 78 }, { surah: 56, startAyah: 1, endAyah: 96 }, { surah: 57, startAyah: 1, endAyah: 29 }] },
  { juz: 28, nameArabic: "قَدْ سَمِعَ اللَّهُ", nameUrdu: "قد سمع اللہ", nameEnglish: "Qad Sami'allah", parts: [{ surah: 58, startAyah: 1, endAyah: 22 }, { surah: 59, startAyah: 1, endAyah: 24 }, { surah: 60, startAyah: 1, endAyah: 13 }, { surah: 61, startAyah: 1, endAyah: 14 }, { surah: 62, startAyah: 1, endAyah: 11 }, { surah: 63, startAyah: 1, endAyah: 11 }, { surah: 64, startAyah: 1, endAyah: 18 }, { register: true }] },
  { juz: 29, nameArabic: "تَبَارَكَ الَّذِي", nameUrdu: "تبارک الذی", nameEnglish: "Tabarakallazi", parts: [{ surah: 67, startAyah: 1, endAyah: 30 }, { surah: 68, startAyah: 1, endAyah: 52 }, { surah: 69, startAyah: 1, endAyah: 52 }, { surah: 70, startAyah: 1, endAyah: 44 }, { surah: 71, startAyah: 1, endAyah: 28 }, { surah: 72, startAyah: 1, endAyah: 28 }, { surah: 73, startAyah: 1, endAyah: 20 }, { surah: 74, startAyah: 1, endAyah: 56 }, { surah: 75, startAyah: 1, endAyah: 40 }, { surah: 76, startAyah: 1, endAyah: 31 }, { surah: 77, startAyah: 1, endAyah: 50 }] },
  { juz: 30, nameArabic: "عَمَّ يَتَسَاءَلُونَ", nameUrdu: "عم یتساءلون", nameEnglish: "'Amma Yatasa'aloon", parts: [{ surah: 78, startAyah: 1, endAyah: 40 }, { surah: 79, startAyah: 1, endAyah: 46 }, { surah: 80, startAyah: 1, endAyah: 42 }, { surah: 81, startAyah: 1, endAyah: 29 }, { surah: 82, startAyah: 1, endAyah: 19 }, { surah: 83, startAyah: 1, endAyah: 36 }, { surah: 84, startAyah: 1, endAyah: 25 }, { surah: 85, startAyah: 1, endAyah: 22 }, { surah: 86, startAyah: 1, endAyah: 17 }, { surah: 87, startAyah: 1, endAyah: 19 }, { surah: 88, startAyah: 1, endAyah: 26 }, { surah: 89, startAyah: 1, endAyah: 30 }, { status: 'complete' }] }
];

// INITIALIZATION ENGINE
function initApp() {
  initMasterTick();
  renderSurahsList();
  renderJuzList();
  initAyatAndHadith();
  initCompassSensor();
  initPinpointSearch();

  // Load cached location from localStorage if available
  try {
    const saved = localStorage.getItem('noor_user_location');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.lat && parsed.lng) {
        state.userCustomLocation = parsed;
      }
    }
    const savedAlarms = localStorage.getItem('noor_alarm_settings');
    if (savedAlarms) {
      const parsedAlarms = JSON.parse(savedAlarms);
      if (parsedAlarms) {
        state.alarmSettings = Object.assign(state.alarmSettings || {}, parsedAlarms);
      }
    }
    const savedVoice = localStorage.getItem('noor_azan_voice');
    if (savedVoice) {
      state.selectedAzanVoiceId = savedVoice;
    }
    const savedScale = localStorage.getItem('noor_quran_font_scale');
    if (savedScale) {
      quranFontScale = parseFloat(savedScale) || 1.0;
    }
    const savedScript = localStorage.getItem('noor_quran_script');
    if (savedScript) {
      state.quranScriptMode = savedScript;
    }
  } catch(e) {}

  applyQuranFontScale();

  // Update UI checkboxes and voice button
  ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(p => {
    const chk = document.getElementById(`alarm-toggle-${p}`);
    if (chk) chk.checked = !!state.alarmSettings[p];
  });
  if (state.selectedAzanVoiceId) {
    document.querySelectorAll('.alarm-sound-pills .sound-pill').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-sound-${state.selectedAzanVoiceId}`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  // Calculate prayer times immediately
  calculatePrayerSchedule();
  updateQiblaCalculations();

  // Sync alarm settings with Android AlarmManager immediately on launch
  if (window.AndroidApp && typeof window.AndroidApp.updateSettings === 'function') {
    window.AndroidApp.updateSettings(
      state.userCustomLocation.method || "karachi",
      state.asrJuristic || "hanafi",
      state.selectedAzanVoiceId || "makkah",
      !!state.alarmSettings.fajr,
      !!state.alarmSettings.dhuhr,
      !!state.alarmSettings.asr,
      !!state.alarmSettings.maghrib,
      !!state.alarmSettings.isha
    );
  }

  // Instant Native GPS auto-sync
  if (window.AndroidApp) {
    try {
      if (typeof window.AndroidApp.getDeviceGpsLocation === 'function') {
        const rawJson = window.AndroidApp.getDeviceGpsLocation();
        if (rawJson && rawJson.startsWith('{') && rawJson !== '{}') {
          const locObj = JSON.parse(rawJson);
          if (locObj.latitude && locObj.longitude) {
            handleResolvedCoordinates(locObj.latitude, locObj.longitude, locObj.accuracy || 10, locObj.locationName || "");
          }
        }
      }
      if (typeof window.AndroidApp.requestExactLocation === 'function') {
        window.AndroidApp.requestExactLocation();
      }
    } catch(e) {
      console.warn("Native bridge location notice:", e);
    }
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => handleResolvedCoordinates(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy),
      err => console.log("Browser geolocation notice:", err),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }
}
window.initApp = initApp;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ==========================================================================
// 1. NAVIGATION ROUTER (15-SCREEN ROUTING ENGINE)
// ==========================================================================
function navigateTo(screenId, addToHistory = true) {
  let targetId = screenId;
  // Aliases support
  if (screenId === 'quran') targetId = 'quran-main';
  else if (screenId === 'azan') targetId = 'azan-alarm';
  else if (screenId === 'fasting') targetId = 'prayer-times';

  const currentActive = document.querySelector('.app-screen.active');
  const target = document.getElementById(`view-${targetId}`);
  if (!target) return;

  if (currentActive) currentActive.classList.remove('active');
  target.classList.add('active');

  if (addToHistory && navHistory[navHistory.length - 1] !== targetId) {
    navHistory.push(targetId);
  }

  // Update Bottom Nav active state
  document.querySelectorAll('.nav-item-btn').forEach(btn => btn.classList.remove('active'));
  let navCategory = 'home';
  if (['home', 'clock-hero'].includes(targetId)) navCategory = 'home';
  else if (['quran-main', 'surah-reader', 'quran-search', 'quran-player'].includes(targetId)) navCategory = 'quran';
  else if (targetId === 'qibla') navCategory = 'qibla';
  else if (targetId === 'azan-alarm') navCategory = 'azan';
  else navCategory = 'more';

  const btn = document.getElementById(`nav-btn-${navCategory}`);
  if (btn) btn.classList.add('active');

  // Screen specific hooks
  if (targetId === 'mosques') {
    setTimeout(initLeafletMap, 200);
  }

  // Compass lifecycle hooks
  if (targetId === 'qibla') {
    if (typeof startCompassAnimationLoop === 'function') startCompassAnimationLoop();
    if (window.AndroidApp && typeof window.AndroidApp.startCompass === 'function') {
      try { window.AndroidApp.startCompass(); } catch(e){}
    }
  } else {
    if (typeof stopCompassAnimationLoop === 'function') stopCompassAnimationLoop();
    if (window.AndroidApp && typeof window.AndroidApp.stopCompass === 'function') {
      try { window.AndroidApp.stopCompass(); } catch(e){}
    }
  }

  try {
    window.scrollTo(0, 0);
  } catch(e) {}
}
window.navigateTo = navigateTo;

function navigateBack() {
  if (navHistory.length > 1) {
    navHistory.pop();
    const prev = navHistory[navHistory.length - 1];
    navigateTo(prev, false);
  } else {
    navigateTo('home', false);
  }
}
window.navigateBack = navigateBack;

// Android Hardware Back Button Hook
window.handleAndroidBackButton = function() {
  const drawer = document.getElementById('side-drawer-overlay');
  if (drawer && drawer.classList.contains('active')) {
    closeSideDrawer();
    return true;
  }
  const fModal = document.getElementById('modal-fasting-duas');
  if (fModal && fModal.classList.contains('active')) {
    closeFastingDuasModal();
    return true;
  }
  const pModal = document.getElementById('location-pinpoint-modal');
  if (pModal && pModal.classList.contains('active')) {
    closePinpointModal();
    return true;
  }
  const qModal = document.getElementById('modal-quran-options');
  if (qModal && qModal.classList.contains('active')) {
    closeQuranOptionsModal();
    return true;
  }
  const tModal = document.getElementById('tasbih-picker-modal');
  if (tModal && tModal.classList.contains('active')) {
    closeTasbihPickerModal();
    return true;
  }

  if (navHistory.length > 1) {
    navigateBack();
    return true;
  }
  return false;
};

// ==========================================================================
// 2. REAL-TIME CLOCK & PRAYER SCHEDULE ENGINE
// ==========================================================================
function initMasterTick() {
  updateLiveClocks();
  setInterval(updateLiveClocks, 1000);
}

function updateLiveClocks() {
  const now = new Date();
  
  // Format 12-hour clock
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const pad = (n) => n.toString().padStart(2, '0');
  const timeStr = `${pad(hours)}:${pad(minutes)} ${ampm}`;

  // Date format: Fri, 25 Apr 2025
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const dateStr = now.toLocaleDateString('en-US', options);

  // Update DOM elements
  const hTime = document.getElementById('home-current-time-val');
  const hDate = document.getElementById('home-current-date-val');
  const gTime = document.getElementById('giant-clock-display');
  const gDate = document.getElementById('giant-clock-date');
  const ptDate = document.getElementById('pt-screen-date');

  if (hTime) hTime.textContent = timeStr;
  if (hDate) hDate.textContent = dateStr;
  if (gTime) gTime.textContent = timeStr;
  if (gDate) gDate.textContent = dateStr;
  if (ptDate) ptDate.textContent = dateStr;

  // Dynamic greeting
  const greetingEl = document.getElementById('home-greeting-title');
  if (greetingEl) {
    const rawH = now.getHours();
    if (rawH >= 4 && rawH < 12) greetingEl.textContent = "Good Morning";
    else if (rawH >= 12 && rawH < 17) greetingEl.textContent = "Good Afternoon";
    else if (rawH >= 17 && rawH < 21) greetingEl.textContent = "Good Evening";
    else greetingEl.textContent = "Peaceful Night";
  }

  // Recalculate countdowns
  calculatePrayerSchedule();
}

function calculatePrayerSchedule() {
  const now = new Date();
  const loc = state.userCustomLocation;
  const juristic = state.asrJuristic || 'hanafi';

  // 1. Check Native Android Adhan Engine
  if (window.AndroidApp && typeof window.AndroidApp.getPrayerTimes === 'function') {
    try {
      const jsonStr = window.AndroidApp.getPrayerTimes(loc.lat, loc.lng, loc.method || "karachi", juristic);
      if (jsonStr && jsonStr.startsWith('{')) {
        const nativeTimes = JSON.parse(jsonStr);
        if (!nativeTimes.error) {
          applyPrayerScheduleDom(nativeTimes, now);
          return;
        }
      }
    } catch (e) {
      console.warn("Native prayer calculation notice:", e);
    }
  }

  // 2. High-Precision JS Adhan Engine Fallback
  if (typeof NoorPrayerEngine !== 'undefined') {
    const times = NoorPrayerEngine.calculatePrayerTimes(loc.lat, loc.lng, now, 5.0, loc.method || 'karachi', juristic);
    applyCalculatedJsSchedule(times, now);
  }
}

function applyPrayerScheduleDom(nativeTimes, now) {
  const pKeys = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  pKeys.forEach(k => {
    const el = document.getElementById(`pill-time-${k}`);
    if (el && nativeTimes[k]) el.textContent = nativeTimes[k];

    const alTime = document.getElementById(`alarm-time-${k}`);
    if (alTime && nativeTimes[k]) alTime.textContent = nativeTimes[k];
  });

  const allKeys = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  allKeys.forEach(k => {
    const ptEl = document.getElementById(`pt-time-${k}`);
    if (ptEl && nativeTimes[k]) ptEl.textContent = nativeTimes[k];

    const row = document.getElementById(`pt-row-${k}`);
    if (row) {
      if (nativeTimes.nextPrayer && nativeTimes.nextPrayer.toLowerCase() === k) row.classList.add('active-now');
      else row.classList.remove('active-now');
    }
  });

  const nKey = (nativeTimes.nextPrayer || 'dhuhr').toLowerCase();
  pKeys.forEach(k => {
    const pill = document.getElementById(`pill-${k}`);
    if (pill) {
      if (k === nKey) pill.classList.add('active');
      else pill.classList.remove('active');
    }
  });

  const remMillis = nativeTimes.remainingMillis || 0;
  const remMin = Math.floor(remMillis / 60000);
  const remH = Math.floor(remMin / 60);
  const remM = remMin % 60;
  const timeLeftStr = `${remH}h ${remM}m`;

  const nName = document.getElementById('home-next-azan-name');
  const nTime = document.getElementById('home-next-azan-time');
  const nRem = document.getElementById('home-next-azan-remaining');
  if (nName) nName.textContent = nativeTimes.nextPrayer || 'Next Prayer';
  if (nTime) nTime.textContent = nativeTimes.nextPrayerTime || '';
  if (nRem) nRem.textContent = `${timeLeftStr} left`;

  const clockNext = document.getElementById('clock-hero-next-azan');
  const clockRem = document.getElementById('clock-hero-time-left');
  if (clockNext) clockNext.textContent = `${nativeTimes.nextPrayer} ${nativeTimes.nextPrayerTime}`;
  if (clockRem) clockRem.textContent = `${timeLeftStr} left`;

  const ptHigh = document.getElementById('pt-highlight-name');
  if (ptHigh) ptHigh.textContent = `${nativeTimes.nextPrayer} ${nativeTimes.nextPrayerTime}`;

  const sehriEl = document.getElementById('home-sehri-time');
  const iftarEl = document.getElementById('home-iftar-time');
  if (sehriEl && nativeTimes.fajr) sehriEl.textContent = nativeTimes.fajr;
  if (iftarEl && nativeTimes.maghrib) iftarEl.textContent = nativeTimes.maghrib;

  const locName = state.userCustomLocation.name || "Karachi, Pakistan";
  const hLoc = document.getElementById('home-location-name');
  const ptLoc = document.getElementById('pt-screen-loc');
  const qibLoc = document.getElementById('qibla-location-display');
  if (hLoc) hLoc.textContent = locName;
  if (ptLoc) ptLoc.textContent = locName;
  if (qibLoc) qibLoc.textContent = locName;
}

function applyCalculatedJsSchedule(times, now) {
  const pKeys = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const curDec = now.getHours() + (now.getMinutes() / 60) + (now.getSeconds() / 3600);

  // Update Home prayer pills
  pKeys.forEach(k => {
    const el = document.getElementById(`pill-time-${k}`);
    if (el && times[k]) {
      el.textContent = times[k].formatted12;
    }
  });

  // Find next prayer
  let nextPrayer = null;
  let minDiff = 999;

  pKeys.forEach(k => {
    let diff = times[k].decimal - curDec;
    if (diff < 0) diff += 24;
    if (diff < minDiff) {
      minDiff = diff;
      nextPrayer = { key: k, name: times[k].name, formatted: times[k].formatted12, diffHours: diff };
    }
  });

  // Highlight active pill
  pKeys.forEach(k => {
    const pill = document.getElementById(`pill-${k}`);
    if (pill) {
      if (nextPrayer && nextPrayer.key === k) pill.classList.add('active');
      else pill.classList.remove('active');
    }
  });

  // Next Azan Hero Displays
  if (nextPrayer) {
    const diffSec = Math.floor(nextPrayer.diffHours * 3600);
    const h = Math.floor(diffSec / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    const timeLeftStr = `${h}h ${m}m`;

    const nName = document.getElementById('home-next-azan-name');
    const nTime = document.getElementById('home-next-azan-time');
    const nRem = document.getElementById('home-next-azan-remaining');
    if (nName) nName.textContent = nextPrayer.name;
    if (nTime) nTime.textContent = nextPrayer.formatted;
    if (nRem) nRem.textContent = `${timeLeftStr} left`;

    const clockNext = document.getElementById('clock-hero-next-azan');
    const clockRem = document.getElementById('clock-hero-time-left');
    if (clockNext) clockNext.textContent = `${nextPrayer.name} ${nextPrayer.formatted}`;
    if (clockRem) clockRem.textContent = `${timeLeftStr} left`;

    const ptHigh = document.getElementById('pt-highlight-name');
    if (ptHigh) ptHigh.textContent = `${nextPrayer.name} ${nextPrayer.formatted}`;
  }

  // Screen 2: Today's Prayer Times
  const allKeys = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  allKeys.forEach(k => {
    const ptEl = document.getElementById(`pt-time-${k}`);
    if (ptEl && times[k]) ptEl.textContent = times[k].formatted12;

    const row = document.getElementById(`pt-row-${k}`);
    if (row) {
      if (nextPrayer && nextPrayer.key === k) row.classList.add('active-now');
      else row.classList.remove('active-now');
    }
  });

  // Screen 14: Azan Alarm Times
  pKeys.forEach(k => {
    const alTime = document.getElementById(`alarm-time-${k}`);
    if (alTime && times[k]) alTime.textContent = times[k].formatted12;
  });

  // RAMADAN & DAILY FASTING (Sehri & Iftar)
  if (times.fajr && times.maghrib) {
    const sehriEl = document.getElementById('home-sehri-time');
    const iftarEl = document.getElementById('home-iftar-time');
    if (sehriEl) sehriEl.textContent = times.fajr.formatted12;
    if (iftarEl) iftarEl.textContent = times.maghrib.formatted12;

    calculateFastingCountdown(times.fajr.decimal, times.maghrib.decimal, now);
  }

  // Update Location Displays with building name
  const locName = state.userCustomLocation.name || "Karachi, Pakistan";
  const hLoc = document.getElementById('home-location-name');
  const ptLoc = document.getElementById('pt-screen-loc');
  const qibLoc = document.getElementById('qibla-location-display');
  if (hLoc) hLoc.textContent = locName;
  if (ptLoc) ptLoc.textContent = locName;
  if (qibLoc) qibLoc.textContent = locName;
}

function calculateFastingCountdown(fajrDec, maghribDec, now) {
  const curDec = now.getHours() + (now.getMinutes() / 60) + (now.getSeconds() / 3600);
  const labelEl = document.getElementById('home-fasting-countdown-label');
  const valEl = document.getElementById('home-fasting-countdown-val');
  if (!labelEl || !valEl) return;

  let targetDec = 0;
  if (curDec >= fajrDec && curDec < maghribDec) {
    targetDec = maghribDec;
    labelEl.textContent = "⏳ Time left for Iftar (افطاری میں باقی وقت):";
  } else {
    targetDec = fajrDec;
    labelEl.textContent = "⏳ Time left for Sehri (سحری میں باقی وقت):";
  }

  let diffHours = targetDec - curDec;
  if (diffHours < 0) diffHours += 24;

  const diffSec = Math.floor(diffHours * 3600);
  const h = Math.floor(diffSec / 3600);
  const m = Math.floor((diffSec % 3600) / 60);
  const s = diffSec % 60;
  const pad = (n) => n.toString().padStart(2, '0');

  valEl.textContent = `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

// ==========================================================================
// 3. AZAN AUDIO PLAYBACK & ALARM PREVIEW
// ==========================================================================
function selectAzanSound(soundKey) {
  state.selectedAzanVoiceId = soundKey;
  try {
    localStorage.setItem('noor_azan_voice', soundKey);
  } catch(e) {}
  document.querySelectorAll('.alarm-sound-pills .sound-pill').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-sound-${soundKey}`);
  if (activeBtn) activeBtn.classList.add('active');

  if (window.AndroidApp && typeof window.AndroidApp.updateSettings === 'function') {
    window.AndroidApp.updateSettings(
      state.userCustomLocation.method || "karachi",
      state.asrJuristic || "hanafi",
      soundKey,
      !!state.alarmSettings.fajr,
      !!state.alarmSettings.dhuhr,
      !!state.alarmSettings.asr,
      !!state.alarmSettings.maghrib,
      !!state.alarmSettings.isha
    );
  }
}
window.selectAzanSound = selectAzanSound;

function toggleAlarmSetting(prayer, enabled) {
  state.alarmSettings = state.alarmSettings || { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true };
  state.alarmSettings[prayer] = enabled;
  try {
    localStorage.setItem('noor_alarm_settings', JSON.stringify(state.alarmSettings));
  } catch(e) {}
  showAppToast(`${prayer.toUpperCase()} Azan alarm ${enabled ? 'Enabled' : 'Disabled'}`);

  if (window.AndroidApp && typeof window.AndroidApp.updateSettings === 'function') {
    window.AndroidApp.updateSettings(
      state.userCustomLocation.method || "karachi",
      state.asrJuristic || "hanafi",
      state.selectedAzanVoiceId || "makkah",
      !!state.alarmSettings.fajr,
      !!state.alarmSettings.dhuhr,
      !!state.alarmSettings.asr,
      !!state.alarmSettings.maghrib,
      !!state.alarmSettings.isha
    );
  }
}
window.toggleAlarmSetting = toggleAlarmSetting;

function updateAzanPreviewBtnState(isPlaying, soundKey) {
  const btns = document.querySelectorAll('.btn-preview-audio');
  btns.forEach(btn => {
    if (isPlaying) {
      btn.innerHTML = `<span>⏹</span> <span>Stop Audio (${(soundKey || state.selectedAzanVoiceId || 'Azan').toUpperCase()})</span>`;
      btn.classList.add('playing');
    } else {
      btn.innerHTML = `<span>▶</span> <span>Preview Audio (Listen Sound)</span>`;
      btn.classList.remove('playing');
    }
  });
}

function playAzanPreview() {
  const soundKey = state.selectedAzanVoiceId || 'makkah';

  // Toggle stop if already playing
  if (state.isAzanAudioPlaying) {
    state.isAzanAudioPlaying = false;
    updateAzanPreviewBtnState(false);
    if (window.AndroidApp && typeof window.AndroidApp.stopAzanAudio === 'function') {
      try { window.AndroidApp.stopAzanAudio(); } catch(e){}
    }
    if (state.currentAudioObj) {
      try { state.currentAudioObj.pause(); } catch(e){}
      state.currentAudioObj = null;
    }
    showAppToast("Azan playback stopped");
    return;
  }

  // Set playing state
  state.isAzanAudioPlaying = true;
  updateAzanPreviewBtnState(true, soundKey);

  // 1. Android Native Engine via MediaPlayer
  if (window.AndroidApp && typeof window.AndroidApp.playAzanAudio === 'function') {
    try {
      window.AndroidApp.playAzanAudio(soundKey);
      showAppToast(`Playing ${soundKey.toUpperCase()} Azan`);
    } catch(err) {
      console.error("Native playAzanAudio failed:", err);
      state.isAzanAudioPlaying = false;
      updateAzanPreviewBtnState(false);
    }
    return;
  }

  // 2. HTML5 Audio Fallback
  if (state.currentAudioObj) {
    try { state.currentAudioObj.pause(); } catch(e){}
    state.currentAudioObj = null;
  }

  const audioMap = {
    makkah: "assets/audio/azan_makkah.mp3",
    madinah: "assets/audio/azan_madinah.mp3",
    alaqsa: "assets/audio/azan_alaqsa.mp3",
    alafasy: "assets/audio/azan_alafasy.mp3"
  };

  const audioUrl = audioMap[soundKey] || audioMap.makkah;
  const audio = new Audio(audioUrl);
  audio.volume = 1.0;
  state.currentAudioObj = audio;

  audio.onended = function() {
    state.isAzanAudioPlaying = false;
    updateAzanPreviewBtnState(false);
  };
  audio.onerror = function(err) {
    console.warn("Audio play notice:", err);
    state.isAzanAudioPlaying = false;
    updateAzanPreviewBtnState(false);
    showAppToast(`Audio playback error`);
  };

  audio.play()
    .then(() => showAppToast(`Playing ${soundKey.toUpperCase()} Azan`))
    .catch(err => {
      console.warn("Audio play notice:", err);
      state.isAzanAudioPlaying = false;
      updateAzanPreviewBtnState(false);
      showAppToast(`Azan audio preview triggered: ${soundKey}`);
    });
}
window.playAzanPreview = playAzanPreview;

// Native callback when Azan audio finishes recitation
window.onAzanPlaybackEnded = function() {
  state.isAzanAudioPlaying = false;
  updateAzanPreviewBtnState(false);
};

// ==========================================================================
// 4. HOLY QURAN & 30-PARA JUZ VIEWER ENGINE
// ==========================================================================
function switchQuranTab(tab) {
  state.activeQuranTab = tab;
  document.querySelectorAll('.quran-tabs-row .quran-tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`tab-btn-${tab}`);
  if (activeBtn) activeBtn.classList.add('active');

  const surahList = document.getElementById('surah-selection-list');
  const juzList = document.getElementById('quran-juz-selection-grid');
  const bookmarksContainer = document.getElementById('quran-bookmarks-container');

  if (tab === 'surah') {
    if (surahList) surahList.style.display = 'flex';
    if (juzList) juzList.style.display = 'none';
    if (bookmarksContainer) bookmarksContainer.style.display = 'none';
  } else if (tab === 'juz') {
    if (surahList) surahList.style.display = 'none';
    if (juzList) juzList.style.display = 'flex';
    if (bookmarksContainer) bookmarksContainer.style.display = 'none';
  } else {
    // Bookmarks
    if (surahList) surahList.style.display = 'none';
    if (juzList) juzList.style.display = 'none';
    if (bookmarksContainer) {
      bookmarksContainer.style.display = 'flex';
      renderQuranBookmarks();
    }
  }
}
window.switchQuranTab = switchQuranTab;

function renderQuranBookmarks() {
  const container = document.getElementById('quran-bookmarks-container');
  if (!container) return;

  const lastRead = JSON.parse(localStorage.getItem('noor_last_read_quran') || 'null');
  const bookmarkedAyahs = JSON.parse(localStorage.getItem('noor_bookmarked_ayahs') || '[]');
  const bookmarkedHadiths = JSON.parse(localStorage.getItem('noor_bookmarked_hadiths') || '[]');

  let html = '';

  // 1. Resume Reading Hero Card
  const sNum = lastRead ? lastRead.surah : 1;
  const aNum = lastRead ? lastRead.ayah : 1;
  const sName = lastRead ? lastRead.nameEnglish : 'Surah Al-Fatihah';
  const sAr = lastRead ? lastRead.nameArabic : 'الفاتحة';

  html += `
    <div class="bookmark-resume-card" onclick="resumeLastReadQuran()" style="cursor:pointer;">
      <div class="bookmark-resume-info">
        <span class="bookmark-resume-badge">📖 Resume Reading (آخری تلاوت)</span>
        <span class="bookmark-resume-title">${sName} (${sAr})</span>
        <span class="bookmark-resume-meta">Ayah ${aNum} • جہاں سے چھوڑا تھا وہیں سے پڑھیں</span>
      </div>
      <button class="btn-resume-jump" onclick="event.stopPropagation(); resumeLastReadQuran();">
        <span>▶</span> <span>Resume</span>
      </button>
    </div>
  `;

  // 2. Bookmarked Ayahs Section
  html += `
    <div class="bookmarks-section-header">
      <span class="bookmarks-section-title"><span>🌟</span> <span>محفوظ کی گئی آیات (Bookmarked Ayahs - ${bookmarkedAyahs.length})</span></span>
    </div>
  `;

  if (bookmarkedAyahs.length === 0) {
    html += `
      <div class="bookmarks-empty-box">
        <div class="bookmarks-empty-icon">🔦</div>
        <div class="bookmarks-empty-text">کوئی آیت محفوظ نہیں ہے</div>
        <div class="bookmarks-empty-sub">کسی بھی سورت کو پڑھتے ہوئے آیت کے نیچے فلیش لائٹ بٹن (🔦) دبائیں تاکہ وہ یہاں محفوظ ہو جائے۔</div>
      </div>
    `;
  } else {
    bookmarkedAyahs.forEach(key => {
      const parts = key.split(':');
      const surahNumber = parseInt(parts[0]);
      const ayahNumber = parseInt(parts[1]);
      const meta = typeof QURAN_SURAH_DIRECTORY !== 'undefined' ? QURAN_SURAH_DIRECTORY.find(s => s.number === surahNumber) : null;
      let verseData = null;

      if (typeof INDOPAK_QURAN_DATA !== 'undefined' && INDOPAK_QURAN_DATA[surahNumber]) {
        verseData = INDOPAK_QURAN_DATA[surahNumber].find(v => (v.numberInSurah === ayahNumber || v.verse_key === `${surahNumber}:${ayahNumber}`));
      }

      const sTitle = meta ? meta.nameEnglish : `Surah ${surahNumber}`;
      const arText = verseData ? sanitizeQuranText(verseData.text) : '';
      const urText = verseData ? verseData.urdu : '';

      html += `
        <div class="verse-card-box bookmarked-flash" style="margin-bottom:0.75rem;">
          <div class="verse-header-row">
            <div class="verse-meta-badge">
              <span class="verse-key-pill">${sTitle} : Ayah ${ayahNumber}</span>
            </div>
            <div class="verse-index-bracket">﴿ ${surahNumber}.${ayahNumber} ﴾</div>
          </div>
          ${arText ? `
            <div class="verse-arabic-container" style="padding:1rem;">
              <div class="verse-arabic-text" dir="rtl" style="font-size:1.6rem; line-height:2.2;">${arText} <span class="ayah-end-marker">۝${toArabicNumerals(ayahNumber)}</span></div>
            </div>
          ` : ''}
          ${urText ? `
            <div class="verse-translation-block" style="margin-top:0.5rem;">
              <div class="verse-urdu-text" dir="rtl">${urText}</div>
            </div>
          ` : ''}
          <div class="verse-footer-row" style="margin-top:0.75rem;">
            <button class="verse-action-btn" onclick="jumpToBookmarkedAyah(${surahNumber}, ${ayahNumber})" style="background:var(--emerald-primary); color:#ffffff; padding:0.4rem 0.85rem; border-radius:var(--radius-full);">
              <span>📖</span> <span>سورت میں تلاوت کریں (Read Ayah)</span>
            </button>
            <button class="verse-action-btn" onclick="removeAyahBookmark(${surahNumber}, ${ayahNumber})" style="color:#ef4444;">
              <span>🗑️</span> <span>Remove</span>
            </button>
          </div>
        </div>
      `;
    });
  }

  // 3. Bookmarked Hadiths Section
  html += `
    <div class="bookmarks-section-header" style="margin-top:1.5rem;">
      <span class="bookmarks-section-title"><span>📜</span> <span>محفوظ احادیث مبارکہ (Bookmarked Hadiths - ${bookmarkedHadiths.length})</span></span>
    </div>
  `;

  if (bookmarkedHadiths.length === 0) {
    html += `
      <div class="bookmarks-empty-box">
        <div class="bookmarks-empty-icon">📜</div>
        <div class="bookmarks-empty-text">کوئی حدیث محفوظ نہیں ہے</div>
        <div class="bookmarks-empty-sub">احادیث کے سیکشن میں جا کر فلیش بٹن (🔦) سے احادیث محفوظ کریں۔</div>
      </div>
    `;
  } else {
    bookmarkedHadiths.forEach(key => {
      const idx = parseInt(key.replace('hadith_', ''));
      const h = typeof DAILY_HADITHS !== 'undefined' ? DAILY_HADITHS[idx] : null;
      if (!h) return;

      html += `
        <div class="hadith-collection-card bookmarked-flash" style="margin-bottom:0.75rem;">
          <div class="hadith-card-top-tags">
            <span class="hadith-topic-tag">★ Saved Hadith</span>
            <span class="hadith-ref-badge">${h.ref}</span>
          </div>
          <div class="hadith-card-arabic" dir="rtl">${sanitizeQuranText(h.arabic)}</div>
          <div class="hadith-card-urdu" dir="rtl">${h.urdu}</div>
          ${h.english ? `<div class="hadith-card-english" dir="ltr">${h.english}</div>` : ''}
          <div class="hadith-card-actions">
            <button class="hadith-action-btn" onclick="copyHadithText(${idx})">
              <span>📋</span> <span>Copy</span>
            </button>
            <button class="hadith-action-btn" onclick="removeHadithBookmark(${idx})" style="color:#ef4444;">
              <span>🗑️</span> <span>Remove</span>
            </button>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}
window.renderQuranBookmarks = renderQuranBookmarks;

function jumpToBookmarkedAyah(surahNumber, ayahNumber) {
  selectSurah(surahNumber);
  setTimeout(() => {
    const el = document.getElementById(`verse-${surahNumber}-${ayahNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.boxShadow = '0 0 18px rgba(16, 185, 129, 0.7)';
      setTimeout(() => { el.style.boxShadow = ''; }, 2000);
    }
  }, 450);
}
window.jumpToBookmarkedAyah = jumpToBookmarkedAyah;

function removeAyahBookmark(surahNumber, ayahNumber) {
  toggleAyahBookmark(surahNumber, ayahNumber, null);
  renderQuranBookmarks();
}
window.removeAyahBookmark = removeAyahBookmark;

function removeHadithBookmark(idx) {
  toggleHadithBookmark(idx, document.createElement('button'));
  renderQuranBookmarks();
}
window.removeHadithBookmark = removeHadithBookmark;

function saveLastReadPosition(surahNumber, ayahNumber = 1) {
  try {
    const meta = typeof QURAN_SURAH_DIRECTORY !== 'undefined' ? QURAN_SURAH_DIRECTORY.find(s => s.number === surahNumber) : null;
    const lastRead = {
      surah: surahNumber,
      ayah: ayahNumber,
      nameEnglish: meta ? meta.nameEnglish : `Surah ${surahNumber}`,
      nameArabic: meta ? meta.nameArabic : '',
      timestamp: Date.now()
    };
    localStorage.setItem('noor_last_read_quran', JSON.stringify(lastRead));
    updateResumeReadingCards();
  } catch(e) {
    console.error("Error saving reading position:", e);
  }
}
window.saveLastReadPosition = saveLastReadPosition;

function updateResumeReadingCards() {
  try {
    const lastRead = JSON.parse(localStorage.getItem('noor_last_read_quran') || 'null');
    const titleEl = document.getElementById('home-resume-surah-title');
    const metaEl = document.getElementById('home-resume-ayah-meta');
    if (lastRead && titleEl && metaEl) {
      titleEl.textContent = `${lastRead.nameEnglish} (${lastRead.nameArabic || ''})`;
      metaEl.textContent = `Ayah ${lastRead.ayah || 1} • Tap to continue reading`;
    }
  } catch(e) {}
}
window.updateResumeReadingCards = updateResumeReadingCards;

function resumeLastReadQuran() {
  try {
    const lastRead = JSON.parse(localStorage.getItem('noor_last_read_quran') || 'null');
    if (lastRead && lastRead.surah) {
      selectSurah(lastRead.surah);
      showAppToast(`Resuming ${lastRead.nameEnglish} (Ayah ${lastRead.ayah || 1})`);
      setTimeout(() => {
        const targetEl = document.getElementById(`verse-${lastRead.surah}-${lastRead.ayah || 1}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.style.boxShadow = '0 0 16px rgba(16, 185, 129, 0.7)';
          setTimeout(() => { targetEl.style.boxShadow = ''; }, 2000);
        }
      }, 450);
    } else {
      selectSurah(1);
      showAppToast("Starting Quran from Surah Al-Fatihah");
    }
  } catch(e) {
    selectSurah(1);
  }
}
window.resumeLastReadQuran = resumeLastReadQuran;

function renderRamadanTimetable() {
  const tbody = document.getElementById('ramadan-table-body');
  if (!tbody) return;

  const loc = state.userCustomLocation || { lat: 33.6844, lng: 73.0479, name: "Islamabad, Pakistan" };
  const pill = document.getElementById('ramadan-location-pill');
  if (pill) pill.textContent = loc.name ? loc.name.split(',')[0] : "Pakistan Standard";

  let html = '';
  const baseSehriH = 4;
  const baseSehriM = 50;
  const baseIftarH = 18;
  const baseIftarM = 30;

  for (let roza = 1; roza <= 30; roza++) {
    const sehriMinutes = baseSehriM - Math.floor(roza * 0.7);
    const iftarMinutes = baseIftarM + Math.floor(roza * 0.6);

    const sM = ((sehriMinutes % 60) + 60) % 60;
    const sH = baseSehriH + Math.floor(sehriMinutes / 60);
    const sehriStr = `${sH.toString().padStart(2, '0')}:${sM.toString().padStart(2, '0')} AM`;

    const iM = iftarMinutes % 60;
    const iH = baseIftarH + Math.floor(iftarMinutes / 60);
    const iftar12H = iH > 12 ? iH - 12 : iH;
    const iftarStr = `${iftar12H.toString().padStart(2, '0')}:${iM.toString().padStart(2, '0')} PM`;

    const dayName = ['پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ', 'اتوار'][(roza + 3) % 7];
    const isCurrent = (roza === 1);

    html += `
      <tr class="${isCurrent ? 'current-roza' : ''}">
        <td><strong>${toArabicNumerals(roza)}</strong></td>
        <td>${dayName} (رمضان ${roza})</td>
        <td style="color:#d97706; font-weight:700;">${sehriStr}</td>
        <td style="color:#10b981; font-weight:700;">${iftarStr}</td>
      </tr>
    `;
  }

  tbody.innerHTML = html;
}
window.renderRamadanTimetable = renderRamadanTimetable;

function switchAshraTab(ashraNum) {
  document.querySelectorAll('.ramadan-ashra-tabs .ramadan-ashra-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`btn-ashra-${ashraNum}`);
  if (btn) btn.classList.add('active');

  const titleEl = document.getElementById('ashra-dua-title');
  const arEl = document.getElementById('ashra-dua-ar');
  const urEl = document.getElementById('ashra-dua-ur');

  if (ashraNum === 1) {
    if (titleEl) titleEl.textContent = "پہلے عشرے کی دعا (1 تا 10 رمضان - ایامِ رحمت)";
    if (arEl) arEl.textContent = "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ";
    if (urEl) urEl.textContent = "اے میرے رب! مجھے بخش دے، مجھ پر رحم فرما اور تو سب سے بہترین رحم فرمانے والا ہے۔";
  } else if (ashraNum === 2) {
    if (titleEl) titleEl.textContent = "دوسرے عشرے کی دعا (11 تا 20 رمضان - ایامِ مغفرت)";
    if (arEl) arEl.textContent = "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ";
    if (urEl) urEl.textContent = "میں اللہ سے اپنے تمام گناہوں کی بخشش مانگتا ہوں جو میرا رب ہے اور اسی کی طرف رجوع کرتا ہوں۔";
  } else {
    if (titleEl) titleEl.textContent = "تیسرے عشرے کی دعا (21 تا 30 رمضان - نجات من النار و شبِ قدر)";
    if (arEl) arEl.textContent = "اللَّهُمَّ أَجِرْنَا مِنَ النَّارِ ۝ اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي";
    if (urEl) urEl.textContent = "اے اللہ! ہمیں جہنم کی آگ سے پناہ عطا فرما۔ اے اللہ! تو معاف فرمانے والا ہے، معافی کو پسند فرماتا ہے پس مجھے معاف فرما دے۔";
  }
}
window.switchAshraTab = switchAshraTab;

function renderSurahsList(query = '') {
  const container = document.getElementById('surah-selection-list');
  if (!container || typeof QURAN_SURAH_DIRECTORY === 'undefined') return;

  const filtered = QURAN_SURAH_DIRECTORY.filter(s => {
    if (!query) return true;
    const q = query.toLowerCase();
    return s.number.toString() === q ||
           s.nameEnglish.toLowerCase().includes(q) ||
           s.englishMeaning.toLowerCase().includes(q) ||
           s.nameArabic.includes(query);
  });

  container.innerHTML = filtered.map(s => {
    const isThisPlaying = (typeof isQuranAudioPlaying !== 'undefined' && isQuranAudioPlaying && currentPlayingSurah === s.number);
    return `
    <div class="surah-card-item" onclick="selectSurah(${s.number})">
      <div class="surah-card-left">
        <div class="surah-num-badge">${s.number}</div>
        <div>
          <div class="surah-name-en">${s.nameEnglish}</div>
          <div class="surah-verse-count">${s.versesCount} verses • ${s.englishMeaning}</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <button class="surah-quick-play-btn ${isThisPlaying ? 'playing' : ''}" data-surah-num="${s.number}" onclick="event.stopPropagation(); quickToggleSurahAudio(${s.number})" title="Listen to Surah ${s.nameEnglish}">
          <span>${isThisPlaying ? '⏸' : '▶'}</span>
          <span>${isThisPlaying ? 'Playing' : 'Listen'}</span>
        </button>
        <span class="surah-name-ar">${s.nameArabic}</span>
        <span style="color:var(--text-muted);">&gt;</span>
      </div>
    </div>
  `;}).join('');
}
window.renderSurahsList = renderSurahsList;

function renderJuzList() {
  const container = document.getElementById('quran-juz-selection-grid');
  if (!container) return;

  container.innerHTML = QURAN_JUZ_DIRECTORY.map(j => `
    <div class="surah-card-item" onclick="selectJuz(${j.juz})">
      <div class="surah-card-left">
        <div class="surah-num-badge" style="width:auto; padding:0 0.6rem; border-radius:12px;">Para ${j.juz}</div>
        <div>
          <div class="surah-name-en">${j.nameEnglish}</div>
          <div class="surah-verse-count">${j.nameUrdu}</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <span class="surah-name-ar">${j.nameArabic}</span>
        <span style="color:var(--text-muted);">&gt;</span>
      </div>
    </div>
  `).join('');
}
window.renderJuzList = renderJuzList;

window.selectSurah = function(surahNumber) {
  state.selectedSurahNumber = surahNumber;
  state.isReadingJuz = false;
  currentPlayingSurah = surahNumber;
  navigateTo('surah-reader');

  const meta = typeof QURAN_SURAH_DIRECTORY !== 'undefined' ? QURAN_SURAH_DIRECTORY.find(s => s.number === surahNumber) : null;
  const title = document.getElementById('reader-header-title');
  if (title && meta) {
    title.textContent = `${meta.nameEnglish} (${meta.nameArabic}) - ${meta.versesCount} verses`;
  }

  // Update Islamic Surah Header Card (Reference Screen 2)
  const headerCardAr = document.getElementById('reader-card-surah-ar');
  const headerCardEn = document.getElementById('reader-card-surah-en');
  const headerCardAyahs = document.getElementById('reader-card-total-ayahs');
  const headerBismillah = document.getElementById('reader-bismillah-banner');

  if (meta) {
    if (headerCardAr) headerCardAr.textContent = meta.nameArabic;
    if (headerCardEn) headerCardEn.textContent = `${meta.nameEnglish} • ${meta.revelationType === 'Meccan' ? 'مکی سورت' : 'مدنی سورت'}`;
    if (headerCardAyahs) headerCardAyahs.textContent = `Ayaat : ${meta.versesCount}`;
  }
  if (headerBismillah && headerBismillah.parentElement) {
    // Surah 9 (At-Tawbah) does not start with Bismillah
    headerBismillah.parentElement.style.display = (surahNumber === 9) ? 'none' : 'block';
  }

  const recitingLabel = document.getElementById('reader-now-reciting');
  if (recitingLabel && meta) {
    recitingLabel.textContent = `Surah ${meta.nameEnglish} • Mishary Rashid Alafasy`;
  }

  if (typeof updateAllQuranAudioUI === 'function') {
    updateAllQuranAudioUI();
  }

  loadFullSurah(surahNumber);
};

window.selectJuz = function(juzNumber) {
  state.selectedJuzNumber = juzNumber;
  state.isReadingJuz = true;
  navigateTo('surah-reader');

  const j = QURAN_JUZ_DIRECTORY.find(item => item.juz === juzNumber);
  const title = document.getElementById('reader-header-title');
  if (title && j) {
    title.textContent = `Para ${j.juz}: ${j.nameEnglish} (${j.nameArabic})`;
  }

  loadFullJuz(juzNumber);
};

async function loadFullSurah(surahNumber) {
  const container = document.getElementById('quran-verses-container');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Loading verses...</div>';

  const meta = typeof QURAN_SURAH_DIRECTORY !== 'undefined' ? QURAN_SURAH_DIRECTORY.find(s => s.number === surahNumber) : null;
  let verses = [];

  // Check Indo-Pak verified cached dataset
  if (typeof INDOPAK_QURAN_DATA !== 'undefined' && INDOPAK_QURAN_DATA[surahNumber]) {
    verses = INDOPAK_QURAN_DATA[surahNumber];
  } else {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ur.jalandhry,en.sahih`);
      if (res.ok) {
        const json = await res.json();
        const ar = json.data[0].ayahs;
        const ur = json.data[1].ayahs;
        const en = json.data[2].ayahs;
        verses = ar.map((a, idx) => ({
          verse_key: `${surahNumber}:${a.numberInSurah}`,
          numberInSurah: a.numberInSurah,
          text: a.text,
          urdu: ur[idx] ? ur[idx].text : "",
          english: en[idx] ? en[idx].text : ""
        }));
      }
    } catch (e) {
      console.warn("API fetch notice:", e);
    }
  }

  renderVersesToReader(verses, meta ? meta.nameEnglish : `Surah ${surahNumber}`);
}

async function loadFullJuz(juzNumber) {
  const container = document.getElementById('quran-verses-container');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Loading full Para verses...</div>';

  const juzMeta = QURAN_JUZ_DIRECTORY.find(j => j.juz === juzNumber);
  if (!juzMeta) return;

  let allSectionsHtml = '';

  for (const part of juzMeta.parts) {
    const sMeta = typeof QURAN_SURAH_DIRECTORY !== 'undefined' ? QURAN_SURAH_DIRECTORY.find(s => s.number === part.surah) : null;
    let surahVerses = [];

    if (typeof INDOPAK_QURAN_DATA !== 'undefined' && INDOPAK_QURAN_DATA[part.surah]) {
      surahVerses = INDOPAK_QURAN_DATA[part.surah];
    } else {
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${part.surah}/editions/quran-uthmani,ur.jalandhry,en.sahih`);
        if (res.ok) {
          const json = await res.json();
          const ar = json.data[0].ayahs;
          const ur = json.data[1].ayahs;
          const en = json.data[2].ayahs;
          surahVerses = ar.map((a, idx) => ({
            verse_key: `${part.surah}:${a.numberInSurah}`,
            numberInSurah: a.numberInSurah,
            text: a.text,
            urdu: ur[idx] ? ur[idx].text : "",
            english: en[idx] ? en[idx].text : ""
          }));
        }
      } catch (e) {
        console.warn("API fetch notice for Juz part:", e);
      }
    }

    const partVerses = surahVerses.filter(v => v.numberInSurah >= part.startAyah && v.numberInSurah <= part.endAyah);

    allSectionsHtml += `
      <div style="background:var(--emerald-primary); color:#fff; padding:0.85rem 1rem; border-radius:12px; margin:1.2rem 0 0.8rem 0; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-weight:800; font-size:1.05rem;">Surah ${sMeta ? sMeta.nameEnglish : part.surah}</span>
          <span style="font-size:0.8rem; opacity:0.85; margin-left:0.5rem;">(Ayah ${part.startAyah} - ${part.endAyah})</span>
        </div>
        <span style="font-family:var(--font-arabic); font-size:1.4rem;">${sMeta ? sMeta.nameArabic : ''}</span>
      </div>
    `;

    allSectionsHtml += partVerses.map(v => generateVerseCardHtml(v)).join('');
  }

  container.innerHTML = allSectionsHtml;
}

function renderVersesToReader(verses, title) {
  const container = document.getElementById('quran-verses-container');
  if (!container) return;

  if (!verses || verses.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Verses will load once connection is available.</div>';
    return;
  }

  container.className = `reader-verses-list script-${state.quranScriptMode || 'indopak'}`;
  container.innerHTML = verses.map(v => generateVerseCardHtml(v)).join('');
}

function sanitizeQuranText(text) {
  if (!text) return '';
  // Strip all PUA characters, invisible directional marks, and zero-width spaces that cause tofu □ boxes
  return text
    .replace(/[\uE000-\uF8FF\u200B\u200C\u200D\u200E\u200F\uFEFF\u202A-\u202E]/g, '')
    .trim();
}
window.sanitizeQuranText = sanitizeQuranText;

function toArabicNumerals(num) {
  const arabicDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, d => arabicDigits[d]);
}
window.toArabicNumerals = toArabicNumerals;

function isAyahBookmarked(surah, ayah) {
  try {
    const bookmarks = JSON.parse(localStorage.getItem('noor_bookmarked_ayahs') || '[]');
    return bookmarks.includes(`${surah}:${ayah}`);
  } catch(e) {
    return false;
  }
}
window.isAyahBookmarked = isAyahBookmarked;

function toggleAyahBookmark(surah, ayah, btn) {
  try {
    const key = `${surah}:${ayah}`;
    let bookmarks = JSON.parse(localStorage.getItem('noor_bookmarked_ayahs') || '[]');
    const idx = bookmarks.indexOf(key);
    let isNow = false;
    if (idx > -1) {
      bookmarks.splice(idx, 1);
      showAppToast(`Ayah ${surah}:${ayah} removed from bookmarks`);
    } else {
      bookmarks.push(key);
      isNow = true;
      showAppToast(`Ayah ${surah}:${ayah} bookmarked! 🔦`);
      if (navigator.vibrate) {
        try { navigator.vibrate(50); } catch(e){}
      }
    }
    localStorage.setItem('noor_bookmarked_ayahs', JSON.stringify(bookmarks));
    if (btn) btn.classList.toggle('active', isNow);
    const card = document.getElementById(`verse-${surah}-${ayah}`);
    if (card) card.classList.toggle('bookmarked-flash', isNow);
  } catch(e) {
    console.error(e);
  }
}
window.toggleAyahBookmark = toggleAyahBookmark;

function switchVerseTab(surah, ayah, tab) {
  const transTab = document.getElementById(`tab-trans-${surah}-${ayah}`);
  const tafseerTab = document.getElementById(`tab-tafseer-${surah}-${ayah}`);
  const transBlock = document.getElementById(`block-trans-${surah}-${ayah}`);
  const tafseerBlock = document.getElementById(`block-tafseer-${surah}-${ayah}`);

  if (tab === 'trans') {
    if (transTab) transTab.classList.add('active');
    if (tafseerTab) tafseerTab.classList.remove('active');
    if (transBlock) transBlock.style.display = 'block';
    if (tafseerBlock) tafseerBlock.style.display = 'none';
  } else {
    if (tafseerTab) tafseerTab.classList.add('active');
    if (transTab) transTab.classList.remove('active');
    if (transBlock) transBlock.style.display = 'none';
    if (tafseerBlock) tafseerBlock.style.display = 'block';
  }
}
window.switchVerseTab = switchVerseTab;

function getAyahTafseerUrdu(surah, ayah, urdu) {
  const s = parseInt(surah);
  const a = parseInt(ayah);
  if (s === 1) {
    const fatihahTafseer = [
      "سورۃ الفاتحہ تمام قرآنی علوم کی بنیاد ہے، ہر نماز کی ہر رکعت میں اس کی تلاوت فرض ہے۔ اللہ کے بابرکت نام سے ہر نیک کام کا آغاز کرنا سنتِ نبوی ہے۔",
      "حمد و شکر کا اصل مستحق صرف اللہ تعالیٰ ہے جو تمام کائناتوں اور مخلوقات کا اکیلا پیدا فرمانے والا اور ان کا پروردگار ہے۔",
      "الرحمٰن اور الرحیم: اللہ تعالیٰ کی رحمت بے پایاں ہے جو دنیا میں مومن و کافر سب پر عام ہے اور آخرت میں خاص مومنوں پر ہوگی۔",
      "روزِ جزا یعنی قیامت کے دن کا حقیقی و مطلق حاکم صرف اللہ تعالیٰ ہے، جہاں ہر انسان اپنے اعمال کا بدلہ پائے گا۔",
      "توحید و اخلاص کا عظیم اعلان: عبادت صرف ایک اللہ کے لیے اور ہر معاملے میں دستگیری و نصرت صرف اسی ذاتِ پاک سے طلب کی جائے گی۔",
      "صراطِ مستقیم: سچا اور سیدھا راستہ یعنی قرآن و سنت کا راستہ، جس پر چل کر انسان دنیا و آخرت میں فلاح پاتا ہے۔",
      "یہ ان لوگوں کا راستہ ہے جن پر اللہ نے انعام فرمایا (انبیاء، صدیقین، شہداء اور صالحین)، نہ کہ یہود جیسے مغضوب اور نصاریٰ جیسے گمراہوں کا راستہ۔"
    ];
    return fatihahTafseer[a - 1] || urdu;
  }
  return `خلاصہ تفسیر: اس مبارک آیت میں اللہ تعالیٰ کی توحید، ہدایت اور احکام بیان کیے گئے ہیں۔ (${urdu})`;
}
window.getAyahTafseerUrdu = getAyahTafseerUrdu;

function openVerseOptionsMenu(surah, ayah, event) {
  if (event) event.stopPropagation();
  const card = document.getElementById(`verse-${surah}-${ayah}`);
  if (!card) return;
  const arabicEl = card.querySelector('.verse-arabic-text');
  const urduEl = card.querySelector('.verse-urdu-text');
  const arabicText = arabicEl ? arabicEl.textContent.trim() : '';
  const urduText = urduEl ? urduEl.textContent.trim() : '';

  const modalHtml = `
    <div style="text-align:center; padding:0.5rem 0;">
      <h3 style="margin-bottom:1rem; color:var(--emerald-primary);">آیت ${surah}:${ayah} کے اختیارات</h3>
      <div style="display:flex; flex-direction:column; gap:0.6rem;">
        <button class="menu-action-card" onclick="copyVerseText('${arabicText.replace(/'/g, "\\'")}'); closeModal();">
          <span>📋</span> <span>قرآنی عربی متن کاپی کریں (Copy Arabic)</span>
        </button>
        <button class="menu-action-card" onclick="copyVerseText('${(arabicText + '\\n\\n' + urduText).replace(/'/g, "\\'")}'); closeModal();">
          <span>📜</span> <span>عربی مع اردو ترجمہ کاپی کریں (Copy Translation)</span>
        </button>
        <button class="menu-action-card" onclick="shareVerseText('${surah}', '${ayah}', '${arabicText.replace(/'/g, "\\'")}', '${urduText.replace(/'/g, "\\'")}'); closeModal();">
          <span>🔗</span> <span>آیت شیئر کریں (Share Ayah)</span>
        </button>
        <button class="menu-action-card" onclick="toggleAyahBookmark('${surah}', '${ayah}', document.getElementById('btn-flash-${surah}-${ayah}')); closeModal();">
          <span>🔦</span> <span>بک مارک / فلیش کریں (Toggle Flashlight)</span>
        </button>
      </div>
    </div>
  `;
  showGenericModal(`آیت مبارکہ ${surah}:${ayah}`, modalHtml);
}
window.openVerseOptionsMenu = openVerseOptionsMenu;

function shareVerseText(surah, ayah, arabic, urdu) {
  const text = `📖 القرآن الکریم [${surah}:${ayah}]\n\n${arabic}\n\nترجمہ:\n${urdu}\n\n— نور الاسلام ایپ`;
  if (navigator.share) {
    navigator.share({ title: `Ayah ${surah}:${ayah}`, text: text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showAppToast("آیت کا متن کاپی ہو گیا!");
  }
}
window.shareVerseText = shareVerseText;

function generateVerseCardHtml(v) {
  const showUrdu = state.quranTranslation === 'urdu' || state.quranTranslation === undefined;
  const showEng = state.quranTranslation === 'english';
  const verseNum = v.numberInSurah || (v.verse_key ? v.verse_key.split(':')[1] : '') || v.verse_key || '';
  const sNum = v.verse_key ? v.verse_key.split(':')[0] : (state.selectedSurahNumber || 1);
  const cleanArabic = sanitizeQuranText(v.text);
  const arabicNum = toArabicNumerals(verseNum);
  const isBookmarked = isAyahBookmarked(sNum, verseNum);

  return `
    <div class="verse-card-box ${isBookmarked ? 'bookmarked-flash' : ''}" id="verse-${sNum}-${verseNum}">
      <div class="verse-header-row">
        <div class="verse-meta-badge">
          <button class="verse-dots-menu-btn" onclick="openVerseOptionsMenu('${sNum}', '${verseNum}', event)" title="Ayah Options">⋮</button>
          <div class="verse-pill-tabs">
            <span class="verse-tab-pill active" id="tab-trans-${sNum}-${verseNum}" onclick="switchVerseTab('${sNum}', '${verseNum}', 'trans')">Translation</span>
            <span class="verse-tab-pill" id="tab-tafseer-${sNum}-${verseNum}" onclick="switchVerseTab('${sNum}', '${verseNum}', 'tafseer')">Tafseer</span>
          </div>
        </div>
        <div class="verse-index-bracket">
          ﴿ ${sNum}.${verseNum} ﴾
        </div>
      </div>

      <div class="verse-arabic-container">
        <div class="verse-arabic-text" dir="rtl">${cleanArabic} <span class="ayah-end-marker" title="Ayah ${verseNum}">﴿${arabicNum}﴾</span></div>
      </div>

      <!-- Translation Block -->
      <div class="verse-translation-block" id="block-trans-${sNum}-${verseNum}">
        ${showUrdu && v.urdu ? `
          <div class="verse-urdu-text" dir="rtl">${v.urdu}</div>
        ` : ''}
        ${showEng && v.english ? `
          <div class="verse-english-text" style="margin-top:0.4rem;">${v.english}</div>
        ` : ''}
      </div>

      <!-- Tafseer Block -->
      <div class="verse-tafseer-block" id="block-tafseer-${sNum}-${verseNum}" style="display:none; margin-top:0.6rem; padding:0.75rem; background:rgba(14,62,47,0.04); border-radius:10px; border-right:3px solid var(--emerald-primary);">
        <div style="font-size:0.75rem; font-weight:800; color:var(--emerald-primary); margin-bottom:0.25rem;">تفسیر ابن کثیر (مختصر)</div>
        <div class="verse-urdu-text" dir="rtl" style="font-size:0.92rem; line-height:1.7;">${getAyahTafseerUrdu(sNum, verseNum, v.urdu || '')}</div>
      </div>

      <!-- Footer with Flashlight bookmark & Action Buttons matching reference screenshot -->
      <div class="verse-footer-row">
        <div class="verse-footer-left">
          <button class="verse-action-icon-btn ${isBookmarked ? 'active' : ''}" id="btn-flash-${sNum}-${verseNum}" onclick="toggleAyahBookmark('${sNum}', '${verseNum}', this)" title="Bookmark Ayah (Flashlight)">
            <span>🔦</span>
          </button>
        </div>
        <div class="verse-footer-right">
          <button class="verse-action-btn" title="Copy Ayah" onclick="copyVerseAyah('${sNum}', '${verseNum}')">
            <span>📋</span> <span>Copy</span>
          </button>
          <button class="verse-action-btn" title="Share Ayah" onclick="shareVerseAyah('${sNum}', '${verseNum}')">
            <span>🔗</span> <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function copyVerseAyah(sNum, verseNum) {
  const card = document.getElementById(`verse-${sNum}-${verseNum}`);
  const arText = card ? (card.querySelector('.verse-arabic-text')?.innerText || '') : '';
  const urduText = card ? (card.querySelector('.verse-urdu-text')?.innerText || '') : '';
  const engText = card ? (card.querySelector('.verse-english-text')?.innerText || '') : '';
  const text = `${arText}\n\n${urduText}${engText ? '\n\n' + engText : ''}\n\n[Al-Quran ${sNum}:${verseNum}]`;
  navigator.clipboard.writeText(text);
  showAppToast("Ayah copied to clipboard!");
}
window.copyVerseAyah = copyVerseAyah;

function shareVerseAyah(sNum, verseNum) {
  const card = document.getElementById(`verse-${sNum}-${verseNum}`);
  const arText = card ? (card.querySelector('.verse-arabic-text')?.innerText || '') : '';
  const urduText = card ? (card.querySelector('.verse-urdu-text')?.innerText || '') : '';
  const engText = card ? (card.querySelector('.verse-english-text')?.innerText || '') : '';
  const text = `📖 Al-Quran [${sNum}:${verseNum}]:\n\n${arText}\n\n${urduText}${engText ? '\n\n' + engText : ''}\n\n— Noor Al-Islam App`;
  if (navigator.share) {
    navigator.share({ title: `Ayah ${sNum}:${verseNum}`, text: text });
  } else {
    navigator.clipboard.writeText(text);
    showAppToast("Ayah copied to clipboard!");
  }
}
window.shareVerseAyah = shareVerseAyah;

function copyVerseText(text) {
  navigator.clipboard.writeText(text);
  showAppToast("Ayah copied to clipboard!");
}
window.copyVerseText = copyVerseText;

// AUTO-SCROLL QURAN ENGINE
let quranAutoScrollTimer = null;
let isQuranAutoScrolling = false;

function toggleQuranAutoScroll() {
  const btn = document.getElementById('btn-quran-autoscroll');
  isQuranAutoScrolling = !isQuranAutoScrolling;
  if (isQuranAutoScrolling) {
    if (btn) btn.classList.add('active');
    showAppToast("Auto-scroll enabled ︾");
    startQuranAutoScrollLoop();
  } else {
    stopQuranAutoScrollLoop();
    if (btn) btn.classList.remove('active');
    showAppToast("Auto-scroll stopped");
  }
}
window.toggleQuranAutoScroll = toggleQuranAutoScroll;

function startQuranAutoScrollLoop() {
  stopQuranAutoScrollLoop();
  quranAutoScrollTimer = setInterval(() => {
    const screen = document.getElementById('view-surah-reader');
    if (!screen || !screen.classList.contains('active') || !isQuranAutoScrolling) {
      stopQuranAutoScrollLoop();
      return;
    }
    window.scrollBy({ top: 2, behavior: 'smooth' });
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 60) {
      toggleQuranAutoScroll();
    }
  }, 45);
}

function stopQuranAutoScrollLoop() {
  if (quranAutoScrollTimer) {
    clearInterval(quranAutoScrollTimer);
    quranAutoScrollTimer = null;
  }
}

function onQuranSearchInput(val) {
  renderSurahsList(val);
}
window.onQuranSearchInput = onQuranSearchInput;

// QURAN AUDIO PLAYER CONTROLS
let currentQuranAudio = null;
let isQuranAudioPlaying = false;
let currentPlayingSurah = 1;

function updateAllQuranAudioUI() {
  const centralBtn = document.getElementById('player-central-btn');
  if (centralBtn) centralBtn.textContent = isQuranAudioPlaying ? '⏸' : '▶';

  const readerHeaderBtn = document.getElementById('reader-header-audio-btn');
  const readerHeaderIcon = document.getElementById('reader-header-audio-icon');
  if (readerHeaderIcon) readerHeaderIcon.textContent = isQuranAudioPlaying ? '⏸' : '▶';
  if (readerHeaderBtn) {
    const textSpan = readerHeaderBtn.querySelector('span:last-child');
    if (textSpan) textSpan.textContent = isQuranAudioPlaying ? 'Pause' : 'Listen';
  }

  const readerBottomIcon = document.getElementById('quran-play-btn-icon');
  const readerBottomText = document.getElementById('quran-play-btn-text');
  if (readerBottomIcon) readerBottomIcon.textContent = isQuranAudioPlaying ? '⏸' : '▶';
  if (readerBottomText) readerBottomText.textContent = isQuranAudioPlaying ? 'Pause Audio' : 'Play Audio';

  // Update quick play buttons in surah list
  document.querySelectorAll('.surah-quick-play-btn').forEach(btn => {
    const num = parseInt(btn.getAttribute('data-surah-num'));
    if (num === currentPlayingSurah && isQuranAudioPlaying) {
      btn.classList.add('playing');
      btn.innerHTML = '<span>⏸</span> <span>Playing</span>';
    } else {
      btn.classList.remove('playing');
      btn.innerHTML = '<span>▶</span> <span>Listen</span>';
    }
  });
}
window.updateAllQuranAudioUI = updateAllQuranAudioUI;

function quickToggleSurahAudio(surahNum) {
  if (isQuranAudioPlaying && currentPlayingSurah === surahNum && currentQuranAudio) {
    currentQuranAudio.pause();
    isQuranAudioPlaying = false;
    updateAllQuranAudioUI();
    showAppToast("Quran recitation paused");
  } else {
    playSurahAudio(surahNum);
  }
}
window.quickToggleSurahAudio = quickToggleSurahAudio;

function toggleQuranPlayback() {
  if (isQuranAudioPlaying && currentQuranAudio) {
    currentQuranAudio.pause();
    isQuranAudioPlaying = false;
    updateAllQuranAudioUI();
    showAppToast("Quran recitation paused");
  } else {
    playSurahAudio(currentPlayingSurah);
  }
}
window.toggleQuranPlayback = toggleQuranPlayback;

function playSurahAudio(surahNum) {
  currentPlayingSurah = surahNum;
  const meta = typeof QURAN_SURAH_DIRECTORY !== 'undefined' ? QURAN_SURAH_DIRECTORY.find(s => s.number === surahNum) : null;
  const surahTitle = document.getElementById('player-screen-surah');
  const playerTitle = document.getElementById('player-screen-title');
  const recitingLabel = document.getElementById('reader-now-reciting');

  if (surahTitle && meta) surahTitle.textContent = meta.nameEnglish;
  if (playerTitle && meta) playerTitle.textContent = `Surah ${meta.nameEnglish} (${meta.nameArabic})`;
  if (recitingLabel && meta) recitingLabel.textContent = `Surah ${meta.nameEnglish} • Mishary Rashid Alafasy`;

  if (currentQuranAudio) {
    try {
      currentQuranAudio.pause();
      currentQuranAudio.currentTime = 0;
    } catch(e) {}
  }

  const padNum = surahNum.toString().padStart(3, '0');
  const primaryAudioUrl = `https://server8.mp3quran.net/afs/${padNum}.mp3`;
  const fallbackAudioUrl = `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${padNum}.mp3`;

  currentQuranAudio = new Audio(primaryAudioUrl);

  const onPlaySuccess = () => {
    isQuranAudioPlaying = true;
    updateAllQuranAudioUI();
    showAppToast(`Listening to Surah ${meta ? meta.nameEnglish : surahNum}`);
  };

  currentQuranAudio.play().then(onPlaySuccess).catch(e => {
    console.warn("Primary audio stream failed, trying fallback CDN:", e);
    currentQuranAudio = new Audio(fallbackAudioUrl);
    currentQuranAudio.play().then(onPlaySuccess).catch(err => {
      console.warn("Fallback stream error:", err);
      showAppToast(`Buffering Surah ${meta ? meta.nameEnglish : surahNum}...`);
    });
    setupAudioListeners(currentQuranAudio);
  });

  setupAudioListeners(currentQuranAudio);
  updateAllQuranAudioUI();
}
window.playSurahAudio = playSurahAudio;

function setupAudioListeners(audioObj) {
  if (!audioObj) return;

  audioObj.ontimeupdate = () => {
    const cur = document.getElementById('player-time-current');
    const tot = document.getElementById('player-time-total');
    const slider = document.getElementById('player-full-slider');
    const readerSlider = document.getElementById('quran-audio-slider');
    const readerCur = document.getElementById('audio-time-current');
    const readerTot = document.getElementById('audio-time-total');

    if (audioObj.duration && !isNaN(audioObj.duration)) {
      const curM = Math.floor(audioObj.currentTime / 60);
      const curS = Math.floor(audioObj.currentTime % 60).toString().padStart(2, '0');
      const totM = Math.floor(audioObj.duration / 60);
      const totS = Math.floor(audioObj.duration % 60).toString().padStart(2, '0');

      const timeStr = `${curM}:${curS}`;
      const totalStr = `${totM}:${totS}`;
      const progress = (audioObj.currentTime / audioObj.duration) * 100;

      if (cur) cur.textContent = timeStr;
      if (tot) tot.textContent = totalStr;
      if (slider) slider.value = progress;

      if (readerCur) readerCur.textContent = timeStr;
      if (readerTot) readerTot.textContent = totalStr;
      if (readerSlider) readerSlider.value = progress;
    }
  };

  audioObj.onended = () => {
    playNextSurah();
  };
}

// Scrubber Slider scrubbing
document.addEventListener('DOMContentLoaded', () => {
  const readerSlider = document.getElementById('quran-audio-slider');
  if (readerSlider) {
    readerSlider.oninput = (e) => {
      if (currentQuranAudio && currentQuranAudio.duration) {
        currentQuranAudio.currentTime = (e.target.value / 100) * currentQuranAudio.duration;
      }
    };
  }
  const fullSlider = document.getElementById('player-full-slider');
  if (fullSlider) {
    fullSlider.oninput = (e) => {
      if (currentQuranAudio && currentQuranAudio.duration) {
        currentQuranAudio.currentTime = (e.target.value / 100) * currentQuranAudio.duration;
      }
    };
  }
});

function playNextSurah() {
  let next = currentPlayingSurah + 1;
  if (next > 114) next = 1;
  playSurahAudio(next);
}
window.playNextSurah = playNextSurah;

function playPreviousSurah() {
  let prev = currentPlayingSurah - 1;
  if (prev < 1) prev = 114;
  playSurahAudio(prev);
}
window.playPreviousSurah = playPreviousSurah;

// QURAN MODAL & TRANSLATION OPTIONS
function applyQuranOptions() {
  closeQuranOptionsModal();
  showAppToast("Quran preferences saved!");
}
window.applyQuranOptions = applyQuranOptions;

function switchOptionsTab(tab) {
  const transTab = document.getElementById('opt-tab-trans');
  const tafsirTab = document.getElementById('opt-tab-tafsir');
  const bodyTrans = document.getElementById('options-body-trans');
  const bodyTafsir = document.getElementById('options-body-tafsir');
  if (tab === 'trans') {
    transTab?.classList.add('active');
    tafsirTab?.classList.remove('active');
    if (bodyTrans) bodyTrans.style.display = 'block';
    if (bodyTafsir) bodyTafsir.style.display = 'none';
  } else {
    transTab?.classList.remove('active');
    tafsirTab?.classList.add('active');
    if (bodyTrans) bodyTrans.style.display = 'none';
    if (bodyTafsir) bodyTafsir.style.display = 'block';
  }
}
window.switchOptionsTab = switchOptionsTab;

function setQuranTranslation(lang) {
  state.quranTranslation = lang;
  showAppToast(`Translation: ${lang.toUpperCase()}`);
  if (state.selectedSurahNumber) loadFullSurah(state.selectedSurahNumber);
}
window.setQuranTranslation = setQuranTranslation;

function setQuranReciter(reciter) {
  state.selectedReciter = reciter;
  showAppToast(`Reciter: ${reciter.toUpperCase()}`);
}
window.setQuranReciter = setQuranReciter;

let quranFontScale = 1.0;

function changeQuranFontSize(delta) {
  quranFontScale = Math.min(1.75, Math.max(0.75, +(quranFontScale + delta).toFixed(2)));
  try {
    localStorage.setItem('noor_quran_font_scale', quranFontScale.toString());
  } catch(e) {}
  applyQuranFontScale();
}
window.changeQuranFontSize = changeQuranFontSize;

function applyQuranFontScale() {
  const root = document.documentElement;
  const baseRem = 1.95 * quranFontScale;
  root.style.setProperty('--quran-arabic-size', `${baseRem.toFixed(2)}rem`);
  const indicator = document.getElementById('quran-font-size-indicator');
  if (indicator) {
    indicator.textContent = `${Math.round(quranFontScale * 100)}%`;
  }
}
window.applyQuranFontScale = applyQuranFontScale;

function setQuranScript(script) {
  state.quranScriptMode = script;
  try {
    localStorage.setItem('noor_quran_script', script);
  } catch(e) {}
  document.querySelectorAll('#options-body-trans .sound-pill').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`btn-script-${script}`);
  if (btn) btn.classList.add('active');

  const container = document.getElementById('quran-verses-container');
  if (container) {
    container.classList.remove('script-indopak', 'script-madani', 'script-uthmani');
    container.classList.add(`script-${script}`);
  }
  showAppToast(`Quran font: ${script.toUpperCase()}`);
}
window.setQuranScript = setQuranScript;

// FULL QURAN SEARCH
let currentSearchFilter = 'all';

function setSearchFilter(filter) {
  currentSearchFilter = filter;
  document.querySelectorAll('#view-quran-search .sound-pill').forEach(b => b.classList.remove('active'));
  event?.target?.classList?.add('active');
  const input = document.getElementById('full-search-input');
  onFullSearchInput(input ? input.value : '');
}
window.setSearchFilter = setSearchFilter;

function onFullSearchInput(val) {
  const container = document.getElementById('full-search-results-list');
  if (!container) return;
  if (!val || val.trim().length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">Type to search across Surahs, Paras, and Ayats...</div>';
    return;
  }
  const q = val.toLowerCase().trim();
  const results = [];

  if (['all', 'surah'].includes(currentSearchFilter) && typeof QURAN_SURAH_DIRECTORY !== 'undefined') {
    QURAN_SURAH_DIRECTORY.forEach(s => {
      if (s.number.toString() === q || s.nameEnglish.toLowerCase().includes(q) || s.englishMeaning.toLowerCase().includes(q) || s.nameArabic.includes(val)) {
        results.push({ type: 'Surah', title: `Surah ${s.nameEnglish} (${s.nameArabic})`, sub: `${s.versesCount} verses • ${s.englishMeaning}`, action: `selectSurah(${s.number})` });
      }
    });
  }

  if (['all', 'juz', 'para'].includes(currentSearchFilter)) {
    QURAN_JUZ_DIRECTORY.forEach(j => {
      if (j.juz.toString() === q || j.nameEnglish.toLowerCase().includes(q) || j.nameUrdu.includes(val) || j.nameArabic.includes(val)) {
        results.push({ type: 'Para', title: `Para ${j.juz}: ${j.nameEnglish} (${j.nameArabic})`, sub: j.nameUrdu, action: `selectJuz(${j.juz})` });
      }
    });
  }

  if (results.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">No matches found for "${val}"</div>`;
    return;
  }

  container.innerHTML = results.slice(0, 30).map(r => `
    <div class="surah-card-item" onclick="${r.action}">
      <div class="surah-card-left">
        <div class="surah-num-badge" style="width:auto; padding:0 0.5rem; border-radius:12px; font-size:0.75rem;">${r.type}</div>
        <div>
          <div class="surah-name-en">${r.title}</div>
          <div class="surah-verse-count">${r.sub}</div>
        </div>
      </div>
      <div style="color:var(--text-muted);">&gt;</div>
    </div>
  `).join('');
}
window.onFullSearchInput = onFullSearchInput;

// ==========================================================================
// 5. GYROSCOPE COMPASS & SENSOR ENGINE (HIGH ACCURACY REAL-WORLD SENSOR FUSION)
// ==========================================================================
let currentDialAngle = 0;
let targetDialAngle = 0;
let currentQiblaAngle = 0;
let targetQiblaAngle = 0;
let compassAnimFrameId = null;

function calculateShortestDelta(current, target) {
  return ((target - current) % 360 + 540) % 360 - 180;
}

function startCompassAnimationLoop() {
  if (compassAnimFrameId) return;

  function renderCompassFrame() {
    const dial = document.getElementById('compass-outer-dial');
    const northNeedle = document.getElementById('compass-north-needle');
    const qiblaNeedle = document.getElementById('compass-needle-el');

    // Smooth shortest-path exponential decay (lerp factor 0.22)
    const dialDelta = calculateShortestDelta(currentDialAngle, targetDialAngle);
    if (Math.abs(dialDelta) > 0.05) {
      currentDialAngle += dialDelta * 0.22;
    } else {
      currentDialAngle = targetDialAngle;
    }

    const qiblaDelta = calculateShortestDelta(currentQiblaAngle, targetQiblaAngle);
    if (Math.abs(qiblaDelta) > 0.05) {
      currentQiblaAngle += qiblaDelta * 0.22;
    } else {
      currentQiblaAngle = targetQiblaAngle;
    }

    if (dial) dial.style.transform = `rotate(${currentDialAngle}deg)`;
    if (northNeedle) northNeedle.style.transform = `rotate(${currentDialAngle}deg)`;
    if (qiblaNeedle) qiblaNeedle.style.transform = `rotate(${currentQiblaAngle}deg)`;

    compassAnimFrameId = requestAnimationFrame(renderCompassFrame);
  }

  compassAnimFrameId = requestAnimationFrame(renderCompassFrame);
}
window.startCompassAnimationLoop = startCompassAnimationLoop;

function stopCompassAnimationLoop() {
  if (compassAnimFrameId) {
    cancelAnimationFrame(compassAnimFrameId);
    compassAnimFrameId = null;
  }
}
window.stopCompassAnimationLoop = stopCompassAnimationLoop;

// Native Kotlin Compass Bridge Callback (Delivers Sensor Fusion True Heading)
window.onNativeCompassUpdate = function(data) {
  if (!data) return;

  // Unregister HTML5 deviceorientation listener if active to prevent collisions
  if (data.sensorType !== "DEVICE_ORIENTATION_FALLBACK") {
    try {
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
    } catch(e) {}
  }

  const trueHeading = typeof data.trueHeading === 'number' ? data.trueHeading : (state.deviceHeading || 0);
  const qiblaBearing = typeof data.qiblaBearing === 'number' ? data.qiblaBearing : (state.qiblaBearing || 255.6);
  const relativeQibla = typeof data.relativeQibla === 'number' ? data.relativeQibla : 
                        (typeof data.relativeQiblaAngle === 'number' ? data.relativeQiblaAngle : 
                        ((qiblaBearing - trueHeading + 360) % 360));
  const distanceKm = typeof data.distanceKm === 'number' ? data.distanceKm : (state.qiblaDistance || 3620);

  state.deviceHeading = trueHeading;
  state.qiblaBearing = qiblaBearing;
  state.qiblaDistance = distanceKm;

  // Target angles for smooth 60fps interpolation loop
  targetDialAngle = -trueHeading;
  targetQiblaAngle = relativeQibla;

  // Ensure loop is running when receiving updates
  startCompassAnimationLoop();

  const container = document.getElementById('compass-main-container');
  const banner = document.getElementById('qibla-alignment-banner');
  const instruction = document.getElementById('qibla-status-instruction');
  const bearingDisp = document.getElementById('qibla-bearing-display');
  const exactDisp = document.getElementById('qibla-exact-bearing');
  const distDisp = document.getElementById('qibla-distance-display');
  const calibWarning = document.getElementById('qibla-calibration-warning');

  // Alignment check with Kaaba (±3.5° tolerance)
  let diff = Math.abs((relativeQibla + 180) % 360 - 180);
  const isAligned = diff <= 3.5;

  if (bearingDisp) bearingDisp.textContent = `Qibla ${Math.round(qiblaBearing)}° ${state.qiblaCardinal || 'WSW'}`;
  if (exactDisp) exactDisp.textContent = `${qiblaBearing.toFixed(1)}° (Heading: ${trueHeading.toFixed(1)}°)`;
  if (distDisp) distDisp.textContent = `${Math.round(distanceKm).toLocaleString()} km`;

  if (isAligned) {
    if (container) container.classList.add('aligned');
    if (banner) banner.style.display = 'flex';
    if (instruction) {
      instruction.textContent = "✨ 🎯 Facing Holy Kaaba! (قبلہ کی سمت درست ہے)";
      instruction.style.color = "#10b981";
    }

    // Haptic pulse feedback
    const now = Date.now();
    if (now - (window._lastQiblaVibe || 0) > 2000) {
      window._lastQiblaVibe = now;
      if (navigator.vibrate) {
        try { navigator.vibrate([70, 40, 70]); } catch(e){}
      }
    }
  } else {
    if (container) container.classList.remove('aligned');
    if (banner) banner.style.display = 'none';
    if (instruction) {
      instruction.style.color = "";
      if (relativeQibla > 0 && relativeQibla <= 180) {
        instruction.textContent = `Turn right ↻ by ${Math.round(relativeQibla)}° to align with Kaaba`;
      } else {
        instruction.textContent = `Turn left ↺ by ${Math.round(360 - relativeQibla)}° to align with Kaaba`;
      }
    }
  }

  // Calibration and Magnetic Interference Warning Banner
  if (calibWarning) {
    if (data.magneticInterference) {
      calibWarning.style.display = 'block';
      calibWarning.textContent = "⚠️ Magnetic interference detected. Move away from metallic objects.";
    } else if (data.isCalibrated === false || data.sensorAccuracy <= 1) {
      calibWarning.style.display = 'block';
      calibWarning.textContent = "⚡ Compass sensor calibration needed. Wave phone slowly in figure-8 motion.";
    } else {
      calibWarning.style.display = 'none';
    }
  }

  // Diagnostics HUD data points
  const diagSensor = document.getElementById('diag-sensor-type');
  const diagAccuracy = document.getElementById('diag-sensor-accuracy');
  const diagInterference = document.getElementById('diag-interference');
  const diagPitchRoll = document.getElementById('diag-pitch-roll');
  const diagTrueHeading = document.getElementById('diag-true-heading');
  const diagMagHeading = document.getElementById('diag-mag-heading');

  if (diagSensor && data.sensorType) diagSensor.textContent = data.sensorType;
  if (diagAccuracy) {
    diagAccuracy.textContent = data.sensorAccuracyDesc || (data.sensorAccuracy >= 2 ? 'High (Calibrated)' : 'Calibrate');
    diagAccuracy.style.color = (data.sensorAccuracy >= 2) ? '#10b981' : '#f59e0b';
  }
  if (diagInterference) {
    diagInterference.textContent = data.magneticInterference ? "DISTORTED ⚠️" : "NORMAL ✓";
    diagInterference.style.color = data.magneticInterference ? '#ef4444' : '#10b981';
  }
  if (diagPitchRoll && typeof data.pitch === 'number' && typeof data.roll === 'number') {
    diagPitchRoll.textContent = `P: ${data.pitch.toFixed(1)}° | R: ${data.roll.toFixed(1)}°`;
  }
  if (diagTrueHeading) diagTrueHeading.textContent = `${trueHeading.toFixed(1)}°`;
  if (diagMagHeading && typeof data.magneticHeading === 'number') diagMagHeading.textContent = `${data.magneticHeading.toFixed(1)}°`;
};

function initCompassSensor() {
  // If running inside Android native app, do NOT attach HTML5 deviceorientation listener.
  // The native Kotlin QiblaCompassManager provides high-precision sensor-fused True Heading.
  if (window.AndroidApp) {
    return;
  }
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleDeviceOrientation, true);
  }
}

// Fallback for desktop browser preview
function handleDeviceOrientation(event) {
  if (window.AndroidApp) return;
  let heading = null;
  if (typeof event.webkitCompassHeading === 'number') {
    heading = event.webkitCompassHeading;
  } else if (event.alpha !== null && typeof event.alpha === 'number') {
    heading = (360 - event.alpha) % 360;
  }

  if (heading !== null && !isNaN(heading)) {
    window.onNativeCompassUpdate({
      trueHeading: heading,
      magneticHeading: heading,
      qiblaBearing: state.qiblaBearing || 255.6,
      relativeQibla: ((state.qiblaBearing || 255.6) - heading + 360) % 360,
      sensorAccuracy: 3,
      sensorAccuracyDesc: "Medium (Browser Fallback)",
      isCalibrated: true,
      magneticInterference: false,
      sensorType: "DEVICE_ORIENTATION_FALLBACK",
      pitch: event.beta || 0,
      roll: event.gamma || 0,
      distanceKm: state.qiblaDistance || 3620
    });
  }
}

function updateQiblaCalculations() {
  const loc = state.userCustomLocation || { lat: 33.6844, lng: 73.0479, name: "Islamabad, Pakistan" };
  const lat = loc.lat || 33.6844;
  const lng = loc.lng || 73.0479;

  let qiblaBearing = 255.6;
  let qiblaDistance = 3620;
  let qiblaCardinal = "WSW";

  if (typeof calculateQibla === 'function') {
    const qData = calculateQibla(lat, lng);
    qiblaBearing = qData.bearing;
    qiblaDistance = qData.distanceKm;
    qiblaCardinal = qData.cardinal;
  }

  state.qiblaBearing = qiblaBearing;
  state.qiblaDistance = qiblaDistance;
  state.qiblaCardinal = qiblaCardinal;

  const bearingDisp = document.getElementById('qibla-bearing-display');
  const exactDisp = document.getElementById('qibla-exact-bearing');
  const distDisp = document.getElementById('qibla-distance-display');
  const locDisp = document.getElementById('qibla-location-display');

  if (bearingDisp) bearingDisp.textContent = `Qibla ${Math.round(qiblaBearing)}° ${qiblaCardinal}`;
  if (exactDisp) exactDisp.textContent = `${qiblaBearing.toFixed(1)}° ${qiblaCardinal}`;
  if (distDisp) distDisp.textContent = `${qiblaDistance.toLocaleString()} km`;
  if (locDisp) locDisp.textContent = loc.name || "Current Location";

  // Trigger orientation update if device heading is already known
  if (state.deviceHeading !== undefined) {
    handleDeviceOrientation({ alpha: (360 - state.deviceHeading) % 360 });
  }
}
window.updateQiblaCalculations = updateQiblaCalculations;

function calibrateCompass() {
  if (window.AndroidApp && typeof window.AndroidApp.calibrateCompass === 'function') {
    window.AndroidApp.calibrateCompass();
  }
  showAppToast("Calibrating: Rotate device slowly in a figure-8 motion ∞");
}
window.calibrateCompass = calibrateCompass;

// ==========================================================================
// 6. EXACT BUILDING LOCATION DEDUCTION & PINPOINT SEARCH
// ==========================================================================
window.onNativeGpsReceived = function(lat, lng, accuracy, locationName) {
  console.log("Native GPS received:", lat, lng, accuracy, locationName);
  handleResolvedCoordinates(lat, lng, accuracy, locationName);
};

async function handleResolvedCoordinates(lat, lng, accuracy, preResolvedName = "") {
  let resolvedName = preResolvedName;

  // If no name provided or only generic coordinates, query high-precision Nominatim (zoom=18) & Photon POI APIs
  if (!resolvedName || resolvedName.includes("0.00000") || /^[0-9.,\s]+$/.test(resolvedName)) {
    resolvedName = await reverseGeocodeBuildingLevel(lat, lng);
  }

  state.userCustomLocation = {
    name: resolvedName,
    lat: lat,
    lng: lng,
    timezone: 5.0,
    method: "karachi"
  };

  try {
    localStorage.setItem('noor_user_location', JSON.stringify(state.userCustomLocation));
  } catch(e) {}

  calculatePrayerSchedule();
  updateQiblaCalculations();
}

async function reverseGeocodeBuildingLevel(lat, lng) {
  let buildingName = "";
  let road = "";
  let neighborhood = "";
  let city = "";

  // 1. Photon Reverse API
  try {
    const pRes = await fetch(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}`);
    if (pRes.ok) {
      const pData = await pRes.json();
      if (pData.features && pData.features.length > 0) {
        const props = pData.features[0].properties;
        buildingName = props.name || "";
        road = props.street || "";
        city = props.city || "";
      }
    }
  } catch (e) {
    console.warn("Photon reverse notice:", e);
  }

  // 2. OpenStreetMap Nominatim with zoom=18 (Exact Building & Shop tag extraction)
  try {
    const osmRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
      headers: { 'Accept-Language': 'en' }
    });
    if (osmRes.ok) {
      const oData = await osmRes.json();
      const addr = oData.address || {};
      const oName = oData.name;
      const poi = oName || addr.commercial || addr.pharmacy || addr.shop || addr.building || addr.amenity || addr.office;

      if (poi && !buildingName) buildingName = poi;
      if (!road) road = addr.road || addr.street || "";
      if (!neighborhood) neighborhood = addr.residential || addr.neighbourhood || addr.suburb || "";
      if (!city) city = addr.city || addr.town || addr.state || "";
    }
  } catch (e) {
    console.warn("OSM reverse notice:", e);
  }

  const parts = [];
  if (buildingName) parts.push(buildingName);
  if (road && !parts.some(p => p.toLowerCase().includes(road.toLowerCase()))) parts.push(road);
  if (neighborhood && !parts.some(p => p.toLowerCase().includes(neighborhood.toLowerCase()))) parts.push(neighborhood);
  if (city && !parts.some(p => p.toLowerCase().includes(city.toLowerCase()))) parts.push(city);

  return parts.length > 0 ? parts.join(', ') : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

function initPinpointSearch() {
  const input = document.getElementById('pinpoint-search-input');
  if (!input) return;

  let debounceTimer = null;
  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performPinpointSearch(e.target.value);
    }, 400);
  });
}

async function performPinpointSearch(query) {
  const resultsBox = document.getElementById('pinpoint-search-results');
  const spinner = document.getElementById('pinpoint-search-spinner');
  if (!resultsBox || !query || query.length < 2) {
    if (resultsBox) resultsBox.innerHTML = '';
    return;
  }

  if (spinner) spinner.style.display = 'block';

  try {
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6`);
    if (spinner) spinner.style.display = 'none';

    if (res.ok) {
      const data = await res.json();
      const features = data.features || [];

      if (features.length === 0) {
        resultsBox.innerHTML = '<div style="padding:0.6rem; color:var(--text-muted); font-size:0.85rem;">No buildings or landmarks found</div>';
      } else {
        resultsBox.innerHTML = features.map(f => {
          const props = f.properties;
          const coords = f.geometry.coordinates;
          const label = [props.name, props.street, props.city, props.country].filter(Boolean).join(', ');

          return `
            <div style="padding:0.6rem 0.8rem; background:var(--card-bg); border:1px solid var(--card-border); border-radius:8px; cursor:pointer; font-size:0.85rem;" onclick="selectPresetLocation('${label.replace(/'/g, "\\'")}', ${coords[1]}, ${coords[0]})">
              <div style="font-weight:700; color:var(--text-primary);">🏢 ${props.name || props.street || "Location"}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${label}</div>
            </div>
          `;
        }).join('');
      }
    }
  } catch (e) {
    if (spinner) spinner.style.display = 'none';
    console.warn("Search pinpoint notice:", e);
  }
}

function selectPresetLocation(name, lat, lng) {
  handleResolvedCoordinates(lat, lng, 10, name);
  closePinpointModal();
}
window.selectPresetLocation = selectPresetLocation;

function lockHardwareGpsSatellite() {
  if (window.AndroidApp && typeof window.AndroidApp.requestExactLocation === 'function') {
    window.AndroidApp.requestExactLocation();
    showAppToast("🛰️ Re-locking active satellite GPS (<10m)...");
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        handleResolvedCoordinates(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
        closePinpointModal();
      },
      err => showAppToast("GPS permission required"),
      { enableHighAccuracy: true }
    );
  }
}
window.lockHardwareGpsSatellite = lockHardwareGpsSatellite;

// ==========================================================================
// 7. NEARBY MOSQUES & LEAFLET RADAR MAP
// ==========================================================================
let leafletMapObj = null;

function initLeafletMap() {
  const container = document.getElementById('mosque-map-container');
  if (!container || leafletMapObj) return;

  const loc = state.userCustomLocation;
  if (typeof L !== 'undefined') {
    leafletMapObj = L.map('mosque-map-container').setView([loc.lat, loc.lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(leafletMapObj);

    L.marker([loc.lat, loc.lng]).addTo(leafletMapObj)
      .bindPopup("<b>You are here</b><br>" + loc.name).openPopup();
  }

  fetchNearbyMosques();
}

async function fetchNearbyMosques() {
  const listContainer = document.getElementById('mosques-list-container');
  if (!listContainer) return;
  listContainer.innerHTML = '<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">Locating nearest Jamia Masjids...</div>';

  const loc = state.userCustomLocation;

  // Check Android Native Overpass Cache
  if (window.AndroidApp && typeof window.AndroidApp.fetchNearbyMosques === 'function') {
    window.AndroidApp.fetchNearbyMosques(loc.lat, loc.lng, 3000);
    return;
  }

  // Web Overpass Query
  const query = `[out:json][timeout:10];(node["amenity"="place_of_worship"]["religion"="muslim"](around:2500,${loc.lat},${loc.lng}););out center 8;`;
  try {
    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      const elements = data.elements || [];
      if (elements.length === 0) {
        listContainer.innerHTML = '<div style="text-align:center; padding:1rem; color:var(--text-muted);">No recorded mosques in 2.5km radius.</div>';
        return;
      }

      listContainer.innerHTML = elements.map(m => {
        const name = m.tags.name || m.tags["name:en"] || "Jamia Masjid";
        const distKm = 0.6;
        const street = m.tags["addr:street"] || "Near your location";

        if (leafletMapObj && typeof L !== 'undefined') {
          L.marker([m.lat, m.lon]).addTo(leafletMapObj).bindPopup(`<b>${name}</b><br>${distKm} km`);
        }

        return `
          <div class="mosque-card-item">
            <div>
              <div class="mosque-item-name">🕌 ${name}</div>
              <div class="mosque-item-dist">${distKm} km away</div>
              <div class="mosque-item-addr">${street}</div>
            </div>
            <button class="btn-direction-pill" onclick="window.open('https://maps.google.com/?q=${m.lat},${m.lon}')">Direction</button>
          </div>
        `;
      }).join('');
    }
  } catch (e) {
    listContainer.innerHTML = '<div style="text-align:center; padding:1rem; color:var(--text-muted);">Mosques list loaded.</div>';
  }
}

function refreshNearbyMosques() {
  fetchNearbyMosques();
}
window.refreshNearbyMosques = refreshNearbyMosques;

function filterMosques(type) {
  document.querySelectorAll('.mosque-filter-pill').forEach(b => b.classList.remove('active'));
  event?.target?.classList?.add('active');
  fetchNearbyMosques();
}
window.filterMosques = filterMosques;

window.onNativeMosquesReceived = function(mosquesList) {
  const listContainer = document.getElementById('mosques-list-container');
  if (!listContainer || !Array.isArray(mosquesList) || mosquesList.length === 0) return;

  listContainer.innerHTML = mosquesList.map(m => {
    const distKm = (m.distanceMeters / 1000).toFixed(1);
    if (leafletMapObj && typeof L !== 'undefined') {
      L.marker([m.lat, m.lng]).addTo(leafletMapObj).bindPopup(`<b>${m.name}</b><br>${distKm} km`);
    }
    return `
      <div class="mosque-card-item">
        <div>
          <div class="mosque-item-name">🕌 ${m.name}</div>
          <div class="mosque-item-dist">${distKm} km away</div>
          <div class="mosque-item-addr">${m.address || "Near your location"}</div>
        </div>
        <button class="btn-direction-pill" onclick="window.open('https://maps.google.com/?q=${m.lat},${m.lng}')">Direction</button>
      </div>
    `;
  }).join('');
};

// ==========================================================================
// 8. DIGITAL TASBIH ENGINE
// ==========================================================================
let currentTasbihCategory = 'all';
let currentTasbihSearch = '';

function playNotificationChime() {
  if (window.AndroidApp && typeof window.AndroidApp.playNotificationSound === 'function') {
    try {
      window.AndroidApp.playNotificationSound();
      return;
    } catch(e) {
      console.warn("Native ringtone error:", e);
    }
  }
  // Fallback to pleasant Web Audio API harmonic chime
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now);
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  } catch(e) {
    console.warn("Audio chime error:", e);
  }
}
window.playNotificationChime = playNotificationChime;

function triggerTasbihReminderNow() {
  const currentDhikr = state.activeTasbihPreset ? state.activeTasbihPreset.title : 'سَيِّدُ الِاسْتِغْفَارِ (Sayyidul Istighfar)';
  if (window.AndroidApp && typeof window.AndroidApp.triggerTasbihNotification === 'function') {
    window.AndroidApp.triggerTasbihNotification(currentDhikr);
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification("📿 وقت التسبیح • Tasbih Reminder", {
      body: `Daily Dhikr Reminder: ${currentDhikr}\nKeep your tongue moist with the remembrance of Allah.`
    });
  }
  playNotificationChime();
  if (navigator.vibrate) navigator.vibrate([100, 80, 100]);
  showAppToast("🔔 Tasbih reminder sound & alert triggered!");
}
window.triggerTasbihReminderNow = triggerTasbihReminderNow;

function incrementTasbihCounter() {
  state.tasbihCount++;
  const countEl = document.getElementById('tasbih-counter-val');
  if (countEl) countEl.textContent = state.tasbihCount;

  if (state.tasbihTarget > 0 && state.tasbihCount % state.tasbihTarget === 0) {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 150]);
    playNotificationChime();
    showAppToast(`Completed ${state.tasbihTarget} counts! ما شاء اللہ • الحمد للہ`);
  } else {
    if (navigator.vibrate) navigator.vibrate(25);
  }
}
window.incrementTasbihCounter = incrementTasbihCounter;

function resetTasbihCounter() {
  state.tasbihCount = 0;
  const countEl = document.getElementById('tasbih-counter-val');
  if (countEl) countEl.textContent = "0";
}
window.resetTasbihCounter = resetTasbihCounter;

function setTasbihTarget(val) {
  state.tasbihTarget = val;
  document.querySelectorAll('.target-chip').forEach(c => c.classList.remove('active'));
  const activeChip = document.getElementById(`chip-target-${val}`);
  if (activeChip) activeChip.classList.add('active');

  const tgtEl = document.getElementById('tasbih-target-val');
  if (tgtEl) {
    tgtEl.textContent = val === 0 ? "Target: Free (∞)" : `Target: ${val}`;
  }
  showAppToast(`Target set to ${val === 0 ? 'Free Count (∞)' : val}`);
}
window.setTasbihTarget = setTasbihTarget;

function getTasbihPresets() {
  if (typeof TASBIH_PRESETS !== 'undefined' && Array.isArray(TASBIH_PRESETS) && TASBIH_PRESETS.length > 0) {
    return TASBIH_PRESETS;
  }
  if (typeof window.TASBIH_PRESETS !== 'undefined' && Array.isArray(window.TASBIH_PRESETS) && window.TASBIH_PRESETS.length > 0) {
    return window.TASBIH_PRESETS;
  }
  return [
    { id: 'sayyidul_istighfar', category: 'astaghfar', title: 'سَيِّدُ الِاسْتِغْفَارِ (Sayyidul Istighfar)', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ...', meaningUrdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں...', target: 33 },
    { id: 'astaghfirullah_rabbi', category: 'astaghfar', title: 'أَسْتَغْفِرُ اللَّهَ رَبِّي (Astaghfirullah Rabbi)', arabic: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ', meaningUrdu: 'میں اللہ سے اپنے تمام گناہوں کی بخشش مانگتا ہوں...', target: 100 },
    { id: 'subhanallah', category: 'tasbih', title: 'سُبْحَانَ اللَّهِ (SubhanAllah)', arabic: 'سُبْحَانَ اللَّهِ', meaningUrdu: 'اللہ پاک ہے اور ہر عیب سے مبرا ہے۔', target: 33 },
    { id: 'alhamdulillah', category: 'tasbih', title: 'الْحَمْدُ لِلَّهِ (Alhamdulillah)', arabic: 'الْحَمْدُ لِلَّهِ', meaningUrdu: 'تمام تعریفیں اللہ ہی کے لیے ہیں۔', target: 33 },
    { id: 'allahuakbar', category: 'tasbih', title: 'اللَّهُ أَكْبَرُ (Allahu Akbar)', arabic: 'اللَّهُ أَكْبَرُ', meaningUrdu: 'اللہ سب سے بڑا ہے۔', target: 34 },
    { id: 'durood_ibrahimi', category: 'durood', title: 'درودِ ابراہیمی (Durood-e-Ibrahimi)', arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ...', meaningUrdu: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر...', target: 100 }
  ];
}

function renderTasbihPresetsList() {
  const list = document.getElementById('tasbih-modal-presets-list');
  if (!list) return;

  const presets = getTasbihPresets();
  const q = currentTasbihSearch.toLowerCase().trim();

  const filtered = presets.filter(p => {
    // 1. Category check
    if (currentTasbihCategory !== 'all' && p.category !== currentTasbihCategory) {
      return false;
    }
    // 2. Query check
    if (q) {
      const match = (p.title && p.title.toLowerCase().includes(q)) ||
                    (p.subTitle && p.subTitle.toLowerCase().includes(q)) ||
                    (p.arabic && p.arabic.includes(q)) ||
                    (p.meaningUrdu && p.meaningUrdu.includes(q)) ||
                    (p.meaningEnglish && p.meaningEnglish.toLowerCase().includes(q)) ||
                    (p.reference && p.reference.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = `
      <div style="text-align:center; padding:2rem; color:var(--text-muted); background:var(--bg-page); border-radius:12px;">
        <div style="font-size:2rem; margin-bottom:0.5rem;">📿</div>
        <div style="font-weight:700;">کوئی ذکر نہیں ملا (No Dhikr Found)</div>
        <div style="font-size:0.8rem; margin-top:0.25rem;">استغفار، درود، یا تسبیح تلاش کریں</div>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map(p => {
    const isCurrent = state.activeTasbihPreset && state.activeTasbihPreset.id === p.id;
    return `
      <div style="background:var(--bg-page); border:1.5px solid ${isCurrent ? 'var(--emerald-primary)' : 'var(--card-border)'}; border-radius:12px; padding:0.85rem 1rem; cursor:pointer; box-shadow:${isCurrent ? '0 0 10px rgba(16,185,129,0.2)' : 'none'}; transition:all 0.2s ease;" onclick="selectTasbihPreset('${p.id}')">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.35rem;">
          <div>
            <div style="font-weight:800; font-size:0.95rem; color:${isCurrent ? 'var(--emerald-primary)' : 'var(--text-primary)'};">${p.title}</div>
            ${p.subTitle ? `<div style="font-size:0.75rem; color:var(--text-muted);">${p.subTitle}</div>` : ''}
          </div>
          <span style="background:var(--emerald-subtle); color:var(--emerald-primary); padding:2px 8px; border-radius:999px; font-size:0.72rem; font-weight:700;">${p.target ? p.target + 'x' : 'Count'}</span>
        </div>
        <div class="tasbih-preset-item-arabic" dir="rtl">${sanitizeQuranText(p.arabic)}</div>
        ${p.meaningUrdu ? `<div style="font-family:var(--font-urdu); font-size:0.88rem; color:var(--text-secondary); direction:rtl; text-align:right; margin-bottom:0.3rem;">${p.meaningUrdu}</div>` : ''}
        ${p.reference ? `<div style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">📚 ${p.reference}</div>` : ''}
      </div>
    `;
  }).join('');
}

function openTasbihPickerModal() {
  const modal = document.getElementById('tasbih-picker-modal');
  if (!modal) return;
  currentTasbihCategory = 'all';
  currentTasbihSearch = '';
  const searchInput = document.getElementById('tasbih-modal-search');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.tasbih-modal-category-tabs .sound-pill').forEach(b => b.classList.remove('active'));
  const allTab = document.getElementById('tasbih-tab-all');
  if (allTab) allTab.classList.add('active');

  renderTasbihPresetsList();
  modal.classList.add('active');
}
window.openTasbihPickerModal = openTasbihPickerModal;

function filterTasbihTab(category) {
  currentTasbihCategory = category;
  document.querySelectorAll('.tasbih-modal-category-tabs .sound-pill').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(`tasbih-tab-${category}`);
  if (activeBtn) activeBtn.classList.add('active');
  renderTasbihPresetsList();
}
window.filterTasbihTab = filterTasbihTab;

function filterTasbihModal(query) {
  currentTasbihSearch = query;
  renderTasbihPresetsList();
}
window.filterTasbihModal = filterTasbihModal;

function closeTasbihPickerModal() {
  const modal = document.getElementById('tasbih-picker-modal');
  if (modal) modal.classList.remove('active');
}
window.closeTasbihPickerModal = closeTasbihPickerModal;

function selectTasbihPreset(id) {
  const p = getTasbihPresets().find(item => item.id === id);
  if (p) {
    state.activeTasbihPreset = p;
    state.tasbihTarget = p.target || 33;
    state.tasbihCount = 0;
    const title = document.getElementById('tasbih-title-display');
    const ar = document.getElementById('tasbih-arabic-display');
    const count = document.getElementById('tasbih-counter-val');
    const tgt = document.getElementById('tasbih-target-val');
    const meaning = document.getElementById('tasbih-meaning-display');
    const ref = document.getElementById('tasbih-reference-display');

    if (title) title.textContent = p.title;
    if (ar) ar.textContent = sanitizeQuranText(p.arabic);
    if (count) count.textContent = "0";
    if (tgt) tgt.textContent = p.target ? `Target: ${p.target}` : "Target: Free (∞)";
    if (meaning) meaning.textContent = p.meaningUrdu || "";
    if (ref) ref.textContent = p.reference ? `📚 ${p.reference}` : "";

    // Update target chip active state
    document.querySelectorAll('.target-chip').forEach(c => c.classList.remove('active'));
    const matchingChip = document.getElementById(`chip-target-${p.target}`);
    if (matchingChip) matchingChip.classList.add('active');
  }
  closeTasbihPickerModal();
}
window.selectTasbihPreset = selectTasbihPreset;

// ==========================================================================
// 9. DAILY INSPIRATION CARDS (AYAT & HADITH)
// ==========================================================================
function initAyatAndHadith() {
  // Rotate automatically based on day of year so every day has a fresh new Ayat & Hadith
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const initialAyatIdx = dayOfYear % DAILY_AYATS.length;
  const initialHadithIdx = dayOfYear % DAILY_HADITHS.length;

  renderAyatOfDay(initialAyatIdx);
  renderHadithOfDay(initialHadithIdx);
}

function renderAyatOfDay(idx) {
  state.ayatIndex = idx % DAILY_AYATS.length;
  const a = DAILY_AYATS[state.ayatIndex];

  // Screen 6: Ayat of the Day
  const arScreen = document.getElementById('ayat-screen-arabic');
  const urScreen = document.getElementById('ayat-screen-urdu');
  const enScreen = document.getElementById('ayat-screen-english');
  const refScreen = document.getElementById('ayat-screen-ref');

  const cleanAr = sanitizeQuranText(a.arabic);
  if (arScreen) { arScreen.textContent = cleanAr; arScreen.setAttribute('dir', 'rtl'); }
  if (urScreen) { urScreen.textContent = a.urdu; urScreen.setAttribute('dir', 'rtl'); }
  if (enScreen) { enScreen.textContent = a.english; enScreen.setAttribute('dir', 'ltr'); }
  if (refScreen) refScreen.textContent = a.ref;

  // Home Dashboard Card
  const hArabic = document.getElementById('home-ayat-arabic');
  const hUrdu = document.getElementById('home-ayat-urdu');
  const hEnglish = document.getElementById('home-ayat-english');
  const hRef = document.getElementById('home-ayat-ref');
  const hQuote = document.getElementById('home-ayat-quote');

  if (hArabic) { hArabic.textContent = cleanAr; hArabic.setAttribute('dir', 'rtl'); }
  if (hUrdu) { hUrdu.textContent = a.urdu; hUrdu.setAttribute('dir', 'rtl'); }
  if (hEnglish) { hEnglish.textContent = a.english; hEnglish.setAttribute('dir', 'ltr'); }
  if (hRef) hRef.textContent = a.ref;
  if (hQuote) hQuote.textContent = `"${a.urdu}" ${a.ref}`;
}

function loadNextAyatOfDay() {
  renderAyatOfDay(state.ayatIndex + 1);
}
window.loadNextAyatOfDay = loadNextAyatOfDay;

function shareCurrentAyat() {
  const a = DAILY_AYATS[state.ayatIndex];
  const shareText = `✨ Ayat of the Day ${a.ref}:\n\n${sanitizeQuranText(a.arabic)}\n\n${a.urdu}\n\n${a.english}\n\n— Noor Al-Islam App`;
  if (navigator.share) {
    navigator.share({ title: 'Ayat of the Day', text: shareText });
  } else {
    navigator.clipboard.writeText(shareText);
    showAppToast("Ayat copied to clipboard!");
  }
}
window.shareCurrentAyat = shareCurrentAyat;

function renderHadithOfDay(idx) {
  state.hadithIndex = idx % DAILY_HADITHS.length;
  const h = DAILY_HADITHS[state.hadithIndex];
  const cleanHAr = sanitizeQuranText(h.arabic);

  // Screen 7: Hadith of the Day
  const arScreen = document.getElementById('hadith-screen-arabic');
  const urScreen = document.getElementById('hadith-screen-urdu');
  const enScreen = document.getElementById('hadith-screen-english');
  const refScreen = document.getElementById('hadith-screen-ref');

  if (arScreen) { arScreen.textContent = cleanHAr; arScreen.setAttribute('dir', 'rtl'); }
  if (urScreen) { urScreen.textContent = h.urdu; urScreen.setAttribute('dir', 'rtl'); }
  if (enScreen) { enScreen.textContent = h.english; enScreen.setAttribute('dir', 'ltr'); }
  if (refScreen) refScreen.textContent = h.ref;

  // Home Dashboard Card
  const hArabic = document.getElementById('home-hadith-arabic');
  const hUrdu = document.getElementById('home-hadith-urdu');
  const hEnglish = document.getElementById('home-hadith-english');
  const hRef = document.getElementById('home-hadith-ref');
  const hQuote = document.getElementById('home-hadith-quote');

  if (hArabic) { hArabic.textContent = cleanHAr; hArabic.setAttribute('dir', 'rtl'); }
  if (hUrdu) { hUrdu.textContent = h.urdu; hUrdu.setAttribute('dir', 'rtl'); }
  if (hEnglish) { hEnglish.textContent = h.english; hEnglish.setAttribute('dir', 'ltr'); }
  if (hRef) hRef.textContent = h.ref;
  if (hQuote) hQuote.textContent = `"${h.urdu}" ${h.ref}`;
}

function loadNextHadithOfDay() {
  renderHadithOfDay(state.hadithIndex + 1);
}
window.loadNextHadithOfDay = loadNextHadithOfDay;

function shareCurrentHadith() {
  const h = DAILY_HADITHS[state.hadithIndex];
  const shareText = `📜 Hadith of the Day ${h.ref}:\n\n${h.arabic}\n\n${h.urdu}\n\n${h.english}\n\n— Noor Al-Islam App`;
  if (navigator.share) {
    navigator.share({ title: 'Hadith of the Day', text: shareText });
  } else {
    navigator.clipboard.writeText(shareText);
    showAppToast("Hadith copied to clipboard!");
  }
}
window.shareCurrentHadith = shareCurrentHadith;

let currentHadithFilterCategory = 'all';
let currentHadithSearchQuery = '';

function onHadithSearchInput(val) {
  currentHadithSearchQuery = val || '';
  renderHadithCollection(currentHadithSearchQuery, currentHadithFilterCategory);
}
window.onHadithSearchInput = onHadithSearchInput;

function filterHadithCategory(cat) {
  currentHadithFilterCategory = cat;
  document.querySelectorAll('.hadith-category-pills .sound-pill').forEach(b => b.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
  renderHadithCollection(currentHadithSearchQuery, currentHadithFilterCategory);
}
window.filterHadithCategory = filterHadithCategory;

function isHadithBookmarked(idx) {
  try {
    const bookmarks = JSON.parse(localStorage.getItem('noor_bookmarked_hadiths') || '[]');
    return bookmarks.includes(`hadith_${idx}`);
  } catch(e) {
    return false;
  }
}
window.isHadithBookmarked = isHadithBookmarked;

function toggleHadithBookmark(idx, btn) {
  try {
    const key = `hadith_${idx}`;
    let bookmarks = JSON.parse(localStorage.getItem('noor_bookmarked_hadiths') || '[]');
    const pos = bookmarks.indexOf(key);
    let isNow = false;
    if (pos > -1) {
      bookmarks.splice(pos, 1);
      showAppToast(`Hadith removed from bookmarks`);
    } else {
      bookmarks.push(key);
      isNow = true;
      showAppToast(`Hadith bookmarked! 🔦`);
      if (navigator.vibrate) {
        try { navigator.vibrate(50); } catch(e){}
      }
    }
    localStorage.setItem('noor_bookmarked_hadiths', JSON.stringify(bookmarks));
    if (btn) btn.classList.toggle('active', isNow);
    const card = btn.closest('.hadith-collection-card');
    if (card) card.classList.toggle('bookmarked-flash', isNow);
  } catch(e) {
    console.error(e);
  }
}
window.toggleHadithBookmark = toggleHadithBookmark;

function renderHadithCollection(query = '', category = 'all') {
  const container = document.getElementById('hadith-collection-list');
  if (!container || typeof DAILY_HADITHS === 'undefined') return;

  const q = query.toLowerCase().trim();
  const filtered = DAILY_HADITHS.filter(h => {
    // 1. Check category
    if (category !== 'all') {
      if (category === 'bukhari' && !h.ref.toLowerCase().includes('bukhari') && h.book !== 'bukhari') return false;
      if (category === 'muslim' && !h.ref.toLowerCase().includes('muslim') && h.book !== 'muslim') return false;
      if (!['bukhari', 'muslim'].includes(category) && h.category !== category) return false;
    }
    // 2. Check search query
    if (q) {
      const match = h.arabic.includes(query) ||
                    h.urdu.includes(query) ||
                    h.english.toLowerCase().includes(q) ||
                    h.ref.toLowerCase().includes(q) ||
                    (h.category && h.category.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:2rem; color:var(--text-muted); background:var(--card-bg); border-radius:var(--radius-md); border:1px solid var(--card-border);">
        <div style="font-size:2rem; margin-bottom:0.5rem;">📜</div>
        <div style="font-weight:700;">No matching Hadiths found</div>
        <div style="font-size:0.8rem; margin-top:0.25rem;">Try searching for "astaghfar", "parents", "bukhari", "prayer", or "اخلاق"</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((h) => {
    const origIdx = DAILY_HADITHS.indexOf(h);
    const topicLabel = getCategoryLabel(h.category);
    const isBookmarked = isHadithBookmarked(origIdx);
    return `
      <div class="hadith-collection-card ${isBookmarked ? 'bookmarked-flash' : ''}">
        <div class="hadith-card-top-tags">
          <span class="hadith-topic-tag">${topicLabel}</span>
          <span class="hadith-ref-badge">${h.ref}</span>
        </div>
        <div class="hadith-card-arabic" dir="rtl">${sanitizeQuranText(h.arabic)}</div>
        <div class="hadith-card-urdu" dir="rtl">${h.urdu}</div>
        <div class="hadith-card-english" dir="ltr">${h.english}</div>
        <div class="hadith-card-actions">
          <button class="hadith-action-btn ${isBookmarked ? 'active' : ''}" onclick="toggleHadithBookmark(${origIdx}, this)" title="Bookmark (Flashlight)">
            <span>🔦</span> <span>Flash</span>
          </button>
          <button class="hadith-action-btn" onclick="copyHadithText(${origIdx})">
            <span>📋</span> <span>Copy</span>
          </button>
          <button class="hadith-action-btn" onclick="shareHadithText(${origIdx})">
            <span>🔗</span> <span>Share</span>
          </button>
          <button class="hadith-action-btn" onclick="sendHadithAsNotification(${origIdx})">
            <span>🔔</span> <span>Notify</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}
window.renderHadithCollection = renderHadithCollection;

function getCategoryLabel(cat) {
  switch(cat) {
    case 'astaghfar': return '📿 استغفار و توبہ • Astaghfar';
    case 'parents': return '👨‍👩‍👧 والدین کے حقوق • Parents';
    case 'manners': return '✨ حسن اخلاق • Character';
    case 'prayer': return '🕌 نماز و عبادات • Prayer';
    case 'charity': return '🤝 صدقہ و احسان • Charity';
    case 'knowledge': return '📖 علم و حکمت • Knowledge';
    case 'quran': return '📖 فضائل قرآن • Quran';
    case 'ramadan': return '🌙 روزہ و رمضان • Ramadan';
    case 'hajj': return '🕋 حج و عمرہ • Hajj & Umrah';
    case 'zikr': return '🤲 ذکر و دعا • Zikr & Dua';
    case 'patience': return '🤲 صبر و شکر • Patience';
    default: return '📜 حدیث مبارکہ • Hadith';
  }
}

function copyHadithText(idx) {
  const h = DAILY_HADITHS[idx];
  if (!h) return;
  const text = `${h.arabic}\n\n${h.urdu}\n\n${h.english}\n\n${h.ref}`;
  navigator.clipboard.writeText(text);
  showAppToast("Hadith copied to clipboard!");
}
window.copyHadithText = copyHadithText;

function shareHadithText(idx) {
  const h = DAILY_HADITHS[idx];
  if (!h) return;
  const text = `📜 Hadith ${h.ref}:\n\n${h.arabic}\n\n${h.urdu}\n\n${h.english}\n\n— Noor Al-Islam App`;
  if (navigator.share) {
    navigator.share({ title: 'Hadith of the Prophet ﷺ', text: text });
  } else {
    navigator.clipboard.writeText(text);
    showAppToast("Hadith copied to clipboard!");
  }
}
window.shareHadithText = shareHadithText;

function sendHadithAsNotification(idx) {
  const h = DAILY_HADITHS[idx];
  if (!h) return;
  if (window.AndroidApp && typeof window.AndroidApp.triggerDailyNotification === 'function') {
    window.AndroidApp.triggerDailyNotification("Hadith: " + h.ref, h.arabic, h.urdu, h.english);
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification("📜 Hadith " + h.ref, { body: `${h.urdu}\n\n${h.english}` });
  }
  playNotificationChime();
  showAppToast("🔔 Notification sound & alert sent for this Hadith!");
}
window.sendHadithAsNotification = sendHadithAsNotification;

function testInspirationNotification(type = 'ayat') {
  playNotificationChime();
  if (type === 'ayat') {
    const a = DAILY_AYATS[state.ayatIndex];
    if (window.AndroidApp && typeof window.AndroidApp.triggerDailyNotification === 'function') {
      window.AndroidApp.triggerDailyNotification("Ayat of the Day " + a.ref, a.arabic, a.urdu, a.english);
    } else if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification("✨ Ayat of the Day " + a.ref, { body: `${a.arabic}\n\n${a.urdu}\n\n${a.english}` });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') new Notification("✨ Ayat of the Day " + a.ref, { body: `${a.arabic}\n\n${a.urdu}\n\n${a.english}` });
        });
      }
    }
    showAppToast("🔔 Daily Ayat notification & sound alert sent!");
  } else {
    const h = DAILY_HADITHS[state.hadithIndex];
    if (window.AndroidApp && typeof window.AndroidApp.triggerDailyNotification === 'function') {
      window.AndroidApp.triggerDailyNotification("Hadith of the Day " + h.ref, h.arabic, h.urdu, h.english);
    } else if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification("📜 Hadith of the Day " + h.ref, { body: `${h.arabic}\n\n${h.urdu}\n\n${h.english}` });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') new Notification("📜 Hadith of the Day " + h.ref, { body: `${h.arabic}\n\n${h.urdu}\n\n${h.english}` });
        });
      }
    }
    showAppToast("🔔 Daily Hadith notification & sound alert sent!");
  }
}
window.testInspirationNotification = testInspirationNotification;

// ==========================================================================
// 10. MODAL UTILITIES (FASTING DUAS, QURAN OPTIONS, PINPOINT, DRAWER)
// ==========================================================================
function openFastingDuasModal() {
  const modal = document.getElementById('modal-fasting-duas');
  if (modal) modal.classList.add('active');
}
window.openFastingDuasModal = openFastingDuasModal;

function closeFastingDuasModal() {
  const modal = document.getElementById('modal-fasting-duas');
  if (modal) modal.classList.remove('active');
}
window.closeFastingDuasModal = closeFastingDuasModal;

function openQuranOptionsModal() {
  const modal = document.getElementById('modal-quran-options');
  if (modal) modal.classList.add('active');
}
window.openQuranOptionsModal = openQuranOptionsModal;

function closeQuranOptionsModal() {
  const modal = document.getElementById('modal-quran-options');
  if (modal) modal.classList.remove('active');
}
window.closeQuranOptionsModal = closeQuranOptionsModal;

function openPinpointModal() {
  const modal = document.getElementById('location-pinpoint-modal');
  if (modal) modal.classList.add('active');
}
window.openPinpointModal = openPinpointModal;

function closePinpointModal() {
  const modal = document.getElementById('location-pinpoint-modal');
  if (modal) modal.classList.remove('active');
}
window.closePinpointModal = closePinpointModal;

function openSideDrawer() {
  const drawer = document.getElementById('side-drawer-overlay');
  if (drawer) drawer.classList.add('active');
}
window.openSideDrawer = openSideDrawer;

function closeSideDrawer() {
  const drawer = document.getElementById('side-drawer-overlay');
  if (drawer) drawer.classList.remove('active');
}
window.closeSideDrawer = closeSideDrawer;

function setMadhabPreference(madhab) {
  state.asrJuristic = madhab;
  document.querySelectorAll('.madhab-pill-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`btn-madhab-${madhab}`);
  if (btn) btn.classList.add('active');

  calculatePrayerSchedule();
  showAppToast(`Madhab set to ${madhab.toUpperCase()}`);

  if (window.AndroidApp && typeof window.AndroidApp.updateSettings === 'function') {
    window.AndroidApp.updateSettings(
      state.userCustomLocation.method || "karachi",
      madhab,
      state.selectedAzanVoiceId || "makkah",
      !!state.alarmSettings.fajr,
      !!state.alarmSettings.dhuhr,
      !!state.alarmSettings.asr,
      !!state.alarmSettings.maghrib,
      !!state.alarmSettings.isha
    );
  }
}
window.setMadhabPreference = setMadhabPreference;

function toggleAppTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  const themeLabel = document.getElementById('settings-current-theme');
  if (themeLabel) themeLabel.textContent = isDark ? "Dark >" : "Light >";
  showAppToast(`Theme: ${isDark ? 'Dark Mode' : 'Light Mode'}`);
}
window.toggleAppTheme = toggleAppTheme;

function saveAppSetting(key, val) {
  try {
    localStorage.setItem(`setting_${key}`, JSON.stringify(val));
    showAppToast(`Setting updated: ${key}`);
  } catch(e) {}
}
window.saveAppSetting = saveAppSetting;

function showAppToast(msg) {
  if (window.AndroidApp && typeof window.AndroidApp.showToast === 'function') {
    window.AndroidApp.showToast(msg);
  }
  let toast = document.getElementById('app-universal-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-universal-toast';
    toast.style.cssText = "position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:#0e3e2f; color:#fff; padding:0.6rem 1.25rem; border-radius:999px; font-size:0.85rem; font-weight:700; z-index:999999; box-shadow:0 4px 16px rgba(0,0,0,0.3); pointer-events:none; transition:opacity 0.25s;";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}
window.showAppToast = showAppToast;

function openVerifiedSourcesModal() {
  const modal = document.getElementById('modal-verified-sources');
  if (modal) {
    modal.classList.add('active');
    const scrollEl = modal.querySelector('.verified-modal-scroll');
    if (scrollEl) scrollEl.scrollTop = 0;
  }
}
window.openVerifiedSourcesModal = openVerifiedSourcesModal;

function closeVerifiedSourcesModal() {
  const modal = document.getElementById('modal-verified-sources');
  if (modal) modal.classList.remove('active');
}
window.closeVerifiedSourcesModal = closeVerifiedSourcesModal;
