/**
 * NOOR AL-ISLAM - ISLAMIC ESSENTIALS DATA ENGINE
 * Contains:
 * 1. Six Kalimas (چھ کلمے) with Arabic, Urdu, English, Roman Transliteration & Audio Recitation
 * 2. Daily Routine Masnoon Duas (روزمرہ کی مسنون دعائیں - حصن المسلم) categorized
 * 3. Complete Wudu Guide (طریقۂ وضو، فرائض، سنتیں، اور نواقضِ وضو)
 */

// ============================================================================
// 1. THE SIX KALIMAS OF ISLAM (شش کلمے)
// ============================================================================
const SIX_KALIMAS_DATA = [
  {
    number: 1,
    nameArabic: "الكَلِمَاتُ الطَّيِّبَة",
    nameUrdu: "کلمہ طیبہ (پہلا کلمہ)",
    nameEnglish: "Kalima Tayyibah (Word of Purity)",
    arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَّسُولُ اللّٰهِ",
    roman: "Laaa Ilaaha Illa-llaahu Muhammadur-Rasoolu-llaah.",
    urdu: "اللہ تعالیٰ کے سوا کوئی معبود نہیں، حضرت محمد مصطفیٰ ﷺ اللہ کے رسول ہیں۔",
    english: "There is no god but Allah, and Muhammad (peace be upon him) is the Messenger of Allah.",
    virtuesUrdu: "ایمان کی بنیادی بنیاد ہے۔ اس کلمے کا صدقِ دل سے اقرار کرنے والا دائرہ اسلام میں داخل ہوتا ہے۔",
    virtuesEnglish: "The primary pillar and foundation of Islamic faith. Sincere recitation grants entry into Islam."
  },
  {
    number: 2,
    nameArabic: "كَلِمَةُ الشَّهَادَة",
    nameUrdu: "کلمہ شہادت (دوسرا کلمہ)",
    nameEnglish: "Kalima Shahadat (Word of Testimony)",
    arabic: "أَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    roman: "Ash-hadu Al-Laaa Ilaaha Illa-llaahu Wahdahoo Laa Shareeka Lahoo Wa-Ash-hadu Anna Muhammadan 'Abduhoo Wa Rasooluh.",
    urdu: "میں گواہی دیتا ہوں کہ اللہ تعالیٰ کے سوا کوئی عبادت کے لائق نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ حضرت محمد ﷺ اس کے خاص بندے اور رسول ہیں۔",
    english: "I bear witness that there is no god but Allah, He is Alone and has no partner, and I bear witness that Muhammad is His servant and His Messenger.",
    virtuesUrdu: "وضو کے بعد یہ کلمہ پڑھنے والے کے لیے جنت کے آٹھوں دروازے کھول دیے جاتے ہیں۔ (صحیح مسلم)",
    virtuesEnglish: "Whoever recites this testimony after performing Wudu, all eight gates of Paradise are opened for them. (Sahih Muslim)"
  },
  {
    number: 3,
    nameArabic: "كَلِمَةُ التَّمْجِيد",
    nameUrdu: "کلمہ تمجید (تیسرا کلمہ)",
    nameEnglish: "Kalima Tamjeed (Word of Glorification)",
    arabic: "سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ ۖ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيمِ",
    roman: "Subhaanallaahi Walhamdu Lillaahi Wa Laaa Ilaaha Illallaahu Wallaahu Akbar, Wa Laa Hawla Wa Laa Quwwata Illaa Billaahil 'Aliyyil 'Azeem.",
    urdu: "اللہ پاک ہے اور تمام تعریفیں اللہ ہی کے لیے ہیں اور اللہ کے سوا کوئی معبود نہیں اور اللہ سب سے بڑا ہے، اور گناہوں سے بچنے کی طاقت اور نیکی کرنے کی قوت نہیں مگر اللہ ہی کی توفیق سے جو بلند و برتر اور عظمت والا ہے۔",
    english: "Glory be to Allah, and all praise is for Allah, and there is no god but Allah, and Allah is the Greatest. And there is no power and no strength except with Allah, the Most High, the Most Supreme.",
    virtuesUrdu: "یہ کلمات جنت کے پودے ہیں اور بارگاہ الٰہی میں سب سے زیادہ پسندیدہ اذکار ہیں۔",
    virtuesEnglish: "These words are treasures of Paradise and among the most beloved phrases to Allah Almighty."
  },
  {
    number: 4,
    nameArabic: "كَلِمَةُ التَّوْحِيد",
    nameUrdu: "کلمہ توحید (چوتھا کلمہ)",
    nameEnglish: "Kalima Tauheed (Word of Oneness)",
    arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَّا يَمُوتُ أَبَدًا أَبَدًا ؕ ذُو الْجَلَالِ وَالْإِكْرَامِ ؕ بِيَدِهِ الْخَيْرُ ؕ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    roman: "Laaa Ilaaha Illallaahu Wahdahoo Laa Shareeka Lahoo, Lahul Mulku Wa Lahul Hamdu Yuhyee Wa Yumeetu Wa Huwa Hayyul Laa Yamootu Abadan Abadaa, Zul Jalaali Wal Ikraam, Biyadihil Khayr, Wa Huwa 'Alaa Kulli Shay'in Qadeer.",
    urdu: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کے لیے بادشاہی ہے اور اسی کے لیے تمام تعریفیں ہیں، وہی جِلاتا ہے اور وہی مارتا ہے اور وہ ہمیشہ زندہ رہنے والا ہے جسے کبھی موت نہیں آئے گی، وہ عظمت اور بزرگی والا ہے، تمام بھلائی اسی کے دستِ قدرت میں ہے، اور وہ ہر چیز پر کامل قدرت رکھنے والا ہے۔",
    english: "There is no god but Allah, He is Alone and has no partner. His is the sovereignty and His is all praise. He gives life and causes death, and He is Ever-Living and never dies. Possessor of Majesty and Honor. In His hand is all good, and He has power over all things.",
    virtuesUrdu: "بازار میں داخل ہوتے وقت یہ کلمہ پڑھنے پر دس لاکھ نیکیاں لکھی جاتی ہیں اور دس لاکھ گناہ معاف ہوتے ہیں۔ (ترمذی)",
    virtuesEnglish: "Reciting this upon entering a marketplace gains 1,000,000 good deeds and forgives 1,000,000 sins. (Tirmidhi)"
  },
  {
    number: 5,
    nameArabic: "كَلِمَةُ الِاسْتِغْفَار",
    nameUrdu: "کلمہ استغفار (پانچواں کلمہ)",
    nameEnglish: "Kalima Astaghfar (Word of Forgiveness)",
    arabic: "أَسْتَغْفِرُ اللّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمْدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَّأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ، إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيمِ",
    roman: "Astaghfirullaaha Rabbee Min Kulli Zambin Aznabtuhoo 'Amadan Aw Khata-an Sirran Aw 'Alaaniyataw-Wa Atoobu Ilayhi Minaz-Zambil-Lazeee A'lamu Wa Minaz-Zambil-Lazee Laaa A'lam, Innaka Anta 'Allaamul Ghuyoobi Wa Sattaarul 'Uyoobi Wa Ghaffaaruz-Zunoobi Wa Laa Hawla Wa Laa Quwwata Illaa Billaahil 'Aliyyil 'Azeem.",
    urdu: "میں اپنے پروردگار اللہ سے اپنے تمام گناہوں کی معافی مانگتا ہوں جو میں نے جان بوجھ کر کیے یا بھول کر، چھپ کر کیے یا علانیہ، اور میں اس کی بارگاہ میں توبہ کرتا ہوں ان تمام گناہوں سے جنہیں میں جانتا ہوں اور جنہیں میں نہیں جانتا۔ بیشک تو تمام غیبوں کو خوب جاننے والا اور عیبوں کو چھپانے والا اور گناہوں کو بخشنے والا ہے، اور گناہوں سے بچنے اور نیکی کرنے کی طاقت اللہ بزرگ و برتر ہی کے سہارے ہے۔",
    english: "I seek forgiveness from Allah, my Lord, for every sin I committed knowingly or unknowingly, secretly or openly. And I turn to Him in repentance from the sins I know and the sins I do not know. Indeed You are the Knower of all unseen, the Concealer of flaws, and the Forgiver of sins. And there is no power nor might except with Allah, the Most High, the Supreme.",
    virtuesUrdu: "دل کی تسکین، رزق کی کشادگی اور ہر غم سے نجات کا ذریعہ ہے۔",
    virtuesEnglish: "A powerful prayer for cleansing the soul, expanding sustenance, and lifting anxiety and distress."
  },
  {
    number: 6,
    nameArabic: "كَلِمَةُ رَدِّ الْكُفْر",
    nameUrdu: "کلمہ ردِ کفر (چھٹا کلمہ)",
    nameEnglish: "Kalima Radde Kufr (Word of Rejecting Disbelief)",
    arabic: "اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَّأَنَا أَعْلَمُ بِهِ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ، تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكِذْبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا، وَأَسْلَمْتُ وَأَقُولُ: لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَّسُولُ اللّٰهِ",
    roman: "Allaahumma Inneee A'oozu Bika Min An Ushrika Bika Shay'aw-Wa Ana A'lamu Bihee, Wa Astaghfiruka Limaa Laaa A'lamu Bihee, Tubtu 'Anhu Wa Tabarra'tu Minal Kufri Wash-Shirki Wal Kizbi Wal Gheebati Wal Bid'ati Wan-Nameemati Wal Fawaahishi Wal Buhtaani Wal Ma'aasee Kullihaa, Wa Aslamtu Wa Aqoolu: Laaa Ilaaha Illallaahu Muhammadur-Rasoolullaah.",
    urdu: "اے اللہ! میں تیری پناہ مانگتا ہوں اس بات سے کہ میں جان بوجھ کر کسی چیز کو تیرا شریک ٹھہراؤں، اور میں تجھ سے معافی مانگتا ہوں اس شرک سے جس کا مجھے علم نہیں، میں نے اس سے توبہ کی اور میں بری اور بیزار ہوا کفر، شرک، جھوٹ، غیبت، بدعت، چغلی، بے حیائی، تہمت اور تمام نافرمانیوں سے، اور میں اسلام لایا اور اقرار کرتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، حضرت محمد ﷺ اللہ کے رسول ہیں۔",
    english: "O Allah, I seek refuge in You from knowingly associating anything with You, and I ask Your forgiveness for that which I do not know. I repent from it and disassociate myself from disbelief, polytheism, falsehood, backbiting, innovation, slander, lewdness, false accusation, and all acts of disobedience. I have submitted and I declare: There is no god but Allah, Muhammad is the Messenger of Allah.",
    virtuesUrdu: "ایمان کی تجدید اور ہر قسم کے باطنی وسوسوں، شرک اور کفر سے حفاظت کی جامع ترین دعا ہے۔",
    virtuesEnglish: "Guarantees renewal of pure Islamic faith and shields the believer from inadvertent polytheism and evil whispers."
  }
];

// ============================================================================
// 2. DAILY ROUTINE MASNOON DUAS (حصن المسلم - مسنون دعائیں)
// ============================================================================
const DAILY_DUAS_CATEGORIES = [
  { id: 'all', titleUrdu: 'تمام مسنون دعائیں', titleEnglish: 'All Duas', icon: '🤲' },
  { id: 'food', titleUrdu: 'کھانے پینے کی دعائیں', titleEnglish: 'Food & Drink', icon: '🍽️' },
  { id: 'home', titleUrdu: 'گھر کے معمولات', titleEnglish: 'Home & Family', icon: '🏠' },
  { id: 'sleep', titleUrdu: 'سونے اور جاگنے کی دعائیں', titleEnglish: 'Sleep Routine', icon: '🌙' },
  { id: 'restroom', titleUrdu: 'بیت الخلاء و طہارت', titleEnglish: 'Hygiene & Restroom', icon: '🚿' },
  { id: 'masjid', titleUrdu: 'مسجد کی دعائیں', titleEnglish: 'Masjid Etiquettes', icon: '🕌' },
  { id: 'travel', titleUrdu: 'سفر اور سواری', titleEnglish: 'Travel & Journey', icon: '🚗' },
  { id: 'living', titleUrdu: 'لباس اور آئینہ', titleEnglish: 'Attire & Mirror', icon: '👕' },
  { id: 'protection', titleUrdu: 'بیماری، رنج و حفاظت', titleEnglish: 'Protection & Healing', icon: '🛡️' },
  { id: 'social', titleUrdu: 'روزمرہ گفتگو و اخلاق', titleEnglish: 'Social Sunnahs', icon: '🤝' }
];

const DAILY_DUAS_DATA = [
  // --- FOOD & DRINK ---
  {
    id: 'food_before',
    category: 'food',
    titleUrdu: 'کھانا شروع کرتے وقت کی دعا',
    titleEnglish: 'Before Eating',
    arabic: "بِسْمِ اللّٰهِ وَعَلَىٰ بَرَكَةِ اللّٰهِ",
    urdu: "اللہ کے نام سے اور اللہ کی برکت کے ساتھ (ہم کھانا شروع کرتے ہیں)۔",
    english: "In the name of Allah and upon the blessing of Allah.",
    ref: "ابوداؤد / الحاكم",
    notesUrdu: "دائیں ہاتھ سے کھانا اور اپنے سامنے سے کھانا سنت ہے۔"
  },
  {
    id: 'food_forgot',
    category: 'food',
    titleUrdu: 'کھانے کے شروع میں دعا بھول جانے پر',
    titleEnglish: 'If You Forget at the Start',
    arabic: "بِسْمِ اللّٰهِ أَوَّلَهُ وَآخِرَهُ",
    urdu: "اللہ کے نام سے، اس کے شروع میں بھی اور اس کے آخر میں بھی۔",
    english: "In the name of Allah, in its beginning and in its end.",
    ref: "سنن ترمذی: ۱۸۵۸",
    notesUrdu: "یہ دعا پڑھنے سے شیطان اس کھانے میں شریک نہیں ہو سکتا۔"
  },
  {
    id: 'food_after',
    category: 'food',
    titleUrdu: 'کھانا کھانے کے بعد کی دعا',
    titleEnglish: 'After Eating',
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    urdu: "تمام تعریفیں اللہ ہی کے لیے ہیں جس نے ہمیں کھلایا، پلایا اور ہمیں مسلمان بنایا۔",
    english: "All praise is for Allah who fed us, gave us drink, and made us Muslims.",
    ref: "سنن ابوداؤد: ۳۸۵۰",
    notesUrdu: "کھانے کے بعد اللہ کا شکر ادا کرنے سے رزق میں برکت ہوتی ہے۔"
  },
  {
    id: 'drink_milk',
    category: 'food',
    titleUrdu: 'دودھ پینے کے بعد کی دعا',
    titleEnglish: 'After Drinking Milk',
    arabic: "اَللّٰهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ",
    urdu: "اے اللہ! ہمارے لیے اس (دودھ) میں برکت عطا فرما اور ہمیں اس سے زیادہ عطا فرما۔",
    english: "O Allah, bless it for us and grant us even more of it.",
    ref: "سنن ترمذی: ۳۴۵۵",
    notesUrdu: "دودھ کے علاوہ دیگر مشروبات پر صرف برکت کی دعا ہوتی ہے، مگر دودھ پر زیادتی کی دعا بھی ہے۔"
  },
  {
    id: 'drink_water_sunnah',
    category: 'food',
    titleUrdu: 'پانی پینے کی سنت اور دعا',
    titleEnglish: 'Sunnah of Drinking Water',
    arabic: "بِسْمِ اللّٰهِ (پینے سے پہلے) ➔ اَلْحَمْدُ لِلّٰهِ (پینے کے بعد)",
    urdu: "پانی بیٹھ کر، دائیں ہاتھ سے، دیکھ کر، تین سانسوں میں پینا سنت ہے اور شروعات میں بسم اللہ اور آخر میں الحمد للہ کہنا چاہیے۔",
    english: "Recite Bismillah before drinking, drink while sitting in three sips, and recite Alhamdulillah after finishing.",
    ref: "صحیح بخاری / صحیح مسلم",
    notesUrdu: "کھڑے ہو کر پینے سے رسول اللہ ﷺ نے منع فرمایا ہے۔"
  },

  // --- HOME & FAMILY ---
  {
    id: 'home_leave',
    category: 'home',
    titleUrdu: 'گھر سے باہر نکلنے کی دعا',
    titleEnglish: 'Leaving the Home',
    arabic: "بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ",
    urdu: "اللہ کے نام سے میں نکلا، میں نے اللہ پر بھروسہ کیا، گناہوں سے بچنے اور نیکی کرنے کی طاقت صرف اللہ کی توفیق سے ہے۔",
    english: "In the name of Allah, I place my trust in Allah; there is no power and no strength except through Allah.",
    ref: "سنن ابوداؤد: ۵۰۹۵",
    notesUrdu: "فرشتے کہتے ہیں: تیرے لیے کافی ہو گیا، تجھے بچا لیا گیا، اور شیطان اس سے دور ہو جاتا ہے۔"
  },
  {
    id: 'home_enter',
    category: 'home',
    titleUrdu: 'گھر میں داخل ہونے کی دعا',
    titleEnglish: 'Entering the Home',
    arabic: "بِسْمِ اللّٰهِ وَلَجْنَا، وَبِسْمِ اللّٰهِ خَرَجْنَا، وَعَلَى اللّٰهِ رَبِّنَا تَوَكَّلْنَا",
    urdu: "اللہ کے نام کے ساتھ ہم داخل ہوئے اور اللہ کے نام کے ساتھ ہی ہم نکلے تھے اور اپنے رب اللہ ہی پر ہم نے بھروسہ کیا۔",
    english: "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord Allah we rely.",
    ref: "سنن ابوداؤد: ۵۰۹۶",
    notesUrdu: "گھر میں داخل ہوتے وقت گھر والوں کو سلام (السلام علیکم) کہنا سنت ہے۔"
  },

  // --- SLEEP ROUTINE ---
  {
    id: 'sleep_before',
    category: 'sleep',
    titleUrdu: 'سوتے وقت کی مسنون دعا',
    titleEnglish: 'Before Going to Sleep',
    arabic: "اَللّٰهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    urdu: "اے اللہ! تیرے ہی نام کے ساتھ میں مرتا ہوں (سوتا ہوں) اور جیتا ہوں (جاگتا ہوں)۔",
    english: "O Allah, in Your name do I die (sleep) and live (wake up).",
    ref: "صحیح بخاری: ۶۳۲۴",
    notesUrdu: "دائیں کروٹ پر سونا اور سونے سے پہلے باوضو ہونا سنت ہے۔"
  },
  {
    id: 'sleep_wake',
    category: 'sleep',
    titleUrdu: 'نیند سے بیدار ہونے کی دعا',
    titleEnglish: 'Upon Waking Up',
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت (نیند) کے بعد زندگی بخشی اور اسی کی طرف لوٹ کر جانا ہے۔",
    english: "All praise is for Allah who brought us back to life after causing us to die, and to Him is the resurrection.",
    ref: "صحیح بخاری: ۶۳۱۲",
    notesUrdu: "آنکھ کھلتے ہی چہرے پر ہاتھ پھیرنا اور یہ دعا پڑھنا سنت ہے۔"
  },
  {
    id: 'sleep_nightmare',
    category: 'sleep',
    titleUrdu: 'نیند میں ڈر جانے یا برا خواب دیکھنے پر',
    titleEnglish: 'Upon a Nightmare or Fear',
    arabic: "أَعُوذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَّحْضُرُونِ",
    urdu: "میں پناہ مانگتا ہوں اللہ کے کامل کلمات کے ذریعے اس کے غضب، اس کی سزا، اس کے بندوں کے شر سے اور شیطانوں کے وسوسوں سے اور اس بات سے کہ وہ میرے پاس آئیں۔",
    english: "I seek refuge in the perfect words of Allah from His anger, His punishment, the evil of His slaves, and from the whispers of devils, and that they should come near me.",
    ref: "سنن ترمذی: ۳۵۲۸",
    notesUrdu: "برا خواب دیکھنے پر بائیں طرف ۳ بار تھوتھکاریں اور کروٹ بدل لیں۔"
  },

  // --- RESTROOM & HYGIENE ---
  {
    id: 'restroom_enter',
    category: 'restroom',
    titleUrdu: 'بیت الخلاء (Washroom) میں داخل ہونے کی دعا',
    titleEnglish: 'Before Entering the Restroom',
    arabic: "اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    urdu: "اے اللہ! میں تیری پناہ مانگتا ہوں ناپاک جنات (مرد اور عورت) کی برائی اور گندگی سے۔",
    english: "O Allah, I seek refuge in You from the foul male and female evil spirits.",
    ref: "صحیح بخاری: ۱۴۲ / صحیح مسلم",
    notesUrdu: "بیت الخلاء میں پہلے بایاں (Left) پاؤں رکھنا چاہیے۔"
  },
  {
    id: 'restroom_exit',
    category: 'restroom',
    titleUrdu: 'بیت الخلاء سے باہر آنے کی دعا',
    titleEnglish: 'Upon Exiting the Restroom',
    arabic: "غُفْرَانَكَ، اَلْحَمْدُ لِلّٰهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَىٰ وَعَافَانِي",
    urdu: "اے اللہ! میں تیری بخشش کا طلبگار ہوں۔ تمام تعریفیں اللہ ہی کے لیے ہیں جس نے مجھ سے تکلیف دہ چیز دور کی اور مجھے عافیت بخشی۔",
    english: "I seek Your forgiveness. All praise is for Allah who removed hardship from me and granted me relief.",
    ref: "سنن ترمذی: ۷ / ابن ماجہ",
    notesUrdu: "باہر آتے وقت پہلے دایاں (Right) پاؤں باہر نکالنا چاہیے۔"
  },

  // --- MASJID ---
  {
    id: 'masjid_enter',
    category: 'masjid',
    titleUrdu: 'مسجد میں داخل ہونے کی دعا',
    titleEnglish: 'Entering the Masjid',
    arabic: "اَللّٰهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    urdu: "اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",
    english: "O Allah, open for me the gates of Your mercy.",
    ref: "صحیح مسلم: ۷۱۳",
    notesUrdu: "مسجد میں پہلے دایاں پاؤں رکھنا چاہیے اور درود پاک پڑھنا چاہیے۔"
  },
  {
    id: 'masjid_exit',
    category: 'masjid',
    titleUrdu: 'مسجد سے باہر نکلنے کی دعا',
    titleEnglish: 'Leaving the Masjid',
    arabic: "اَللّٰهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    urdu: "اے اللہ! میں تجھ سے تیرے فضل اور کرم کا سوال کرتا ہوں۔",
    english: "O Allah, I ask You from Your bounty.",
    ref: "صحیح مسلم: ۷۱۳",
    notesUrdu: "مسجد سے نکلتے وقت پہلے بایاں پاؤں باہر رکھنا چاہیے۔"
  },

  // --- TRAVEL & JOURNEY ---
  {
    id: 'travel_ride',
    category: 'travel',
    titleUrdu: 'سواری (گاڑی، بائیک، جہاز) پر بیٹھنے کی دعا',
    titleEnglish: 'When Boarding a Vehicle / Ride',
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
    urdu: "پاک ہے وہ ذات جس نے اس (سواری) کو ہمارے تابع کر دیا حالانکہ ہم اسے قابو میں لانے والے نہ تھے، اور بیشک ہم اپنے رب ہی کی طرف لوٹ کر جانے والے ہیں۔",
    english: "Glory be to Him who has subjected this to us, and we could never have achieved it by ourselves. And indeed, unto our Lord we shall return.",
    ref: "سورۃ الزخرف: ۱۳-۱۴",
    notesUrdu: "سفر پر روانہ ہوتے وقت ۳ بار اللہ اکبر کہنا بھی مسنون ہے۔"
  },
  {
    id: 'travel_return',
    category: 'travel',
    titleUrdu: 'سفر سے واپسی کی دعا',
    titleEnglish: 'Returning from a Journey',
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    urdu: "ہم لوٹنے والے ہیں، توبہ کرنے والے ہیں، بندگی بجا لانے والے ہیں اور اپنے رب کی تعریف کرنے والے ہیں۔",
    english: "We are returning, repenting, worshipping, and praising our Lord.",
    ref: "صحیح مسلم: ۱۳۴۲",
    notesUrdu: "سفر سے واپسی پر محلے کی مسجد میں ۲ رکعت نفل ادا کرنا سنت ہے۔"
  },

  // --- ATTIRE & MIRROR ---
  {
    id: 'clothes_new',
    category: 'living',
    titleUrdu: 'نیا کپڑا پہننے کی دعا',
    titleEnglish: 'Wearing New Clothes',
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِي كَسَانِي هَٰذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِّنِّي وَلَا قُوَّةٍ",
    urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ لباس پہنایا اور میری کسی طاقت و تدبیر کے بغیر یہ مجھے عطا فرمایا۔",
    english: "Praise be to Allah who has clothed me with this garment and provided it for me without any power or might on my part.",
    ref: "سنن ابوداؤد: ۴۰۲۳",
    notesUrdu: "کپڑا پہنتے وقت دائیں طرف سے شروعات کرنی چاہیے۔"
  },
  {
    id: 'mirror_look',
    category: 'living',
    titleUrdu: 'آئینہ دیکھنے کی مسنون دعا',
    titleEnglish: 'Looking into the Mirror',
    arabic: "اَللّٰهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    urdu: "اے اللہ! جس طرح تو نے میری صورت اچھی بنائی ہے، اسی طرح میرے اخلاق بھی اچھے بنا دے۔",
    english: "O Allah, just as You have made my physical appearance beautiful, so also beautify my character.",
    ref: "مسند احمد: ۳۸۲۳ / الحصن الحصين",
    notesUrdu: "خوبصورتی پر غرور کے بجائے عاجزی اختیار کرنے کا درس ہے۔"
  },

  // --- PROTECTION & HEALING ---
  {
    id: 'distress_sorrow',
    category: 'protection',
    titleUrdu: 'پریشانی، غم اور قرض سے نجات کی دعا',
    titleEnglish: 'Relief from Grief, Anxiety & Debt',
    arabic: "اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    urdu: "اے اللہ! میں تیری پناہ مانگتا ہوں فکر و پریشانی سے اور غم سے، اور پناہ مانگتا ہوں عاجزی اور سستی سے، اور پناہ مانگتا ہوں بزدلی اور بخل سے، اور پناہ مانگتا ہوں قرض کے بوجھ سے اور لوگوں کے دباؤ سے۔",
    english: "O Allah, I seek refuge in You from grief and sadness, weakness and laziness, cowardice and stinginess, and the burden of debt and the oppression of men.",
    ref: "صحیح بخاری: ۲۸۹۳",
    notesUrdu: "حضرت ابو امامہؓ کی پریشانی اس دعا کے پڑھنے سے اللہ نے دور فرما دی تھی۔"
  },
  {
    id: 'visit_sick',
    category: 'protection',
    titleUrdu: 'مریض کی عیادت کے وقت کی دعا',
    titleEnglish: 'Visiting the Sick',
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللّٰهُ ؕ أَسْأَلُ اللّٰهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَّشْفِيَكَ",
    urdu: "کوئی گھبراہٹ کی بات نہیں، یہ بیماری گناہوں سے پاک کرنے والی ہے اگر اللہ نے چاہا۔ میں عظمت والے اللہ، عرشِ عظیم کے مالک سے سوال کرتا ہوں کہ وہ آپ کو شفائے کاملہ عطا فرمائے۔",
    english: "No harm, it will be a purification [from sins], if Allah wills. I ask Allah the Supreme, Lord of the Magnificent Throne, to cure you.",
    ref: "صحیح بخاری: ۵۶۵۶ / سنن ترمذی",
    notesUrdu: "مریض پر یہ دعا ۷ بار پڑھنے سے اللہ شفا عطا فرماتا ہے۔"
  },
  {
    id: 'evil_eye',
    category: 'protection',
    titleUrdu: 'نظرِ بد اور شیطان سے بچوں کی حفاظت کی دعا',
    titleEnglish: 'Protection from Evil Eye (Nazar)',
    arabic: "أُعِيذُكَ بِكَلِمَاتِ اللّٰهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَّهَامَّةٍ وَّمِنْ كُلِّ عَيْنٍ لَّامَّةٍ",
    urdu: "میں تجھے اللہ کے مکمل کلمات کی پناہ میں دیتا ہوں ہر شیطان سے، ہر زہریلے جانور سے اور ہر نقصان پہنچانے والی بری نظر سے۔",
    english: "I seek protection for you with the perfect words of Allah from every devil and poisonous beast, and from every envious, harmful eye.",
    ref: "صحیح بخاری: ۳۳۷۱",
    notesUrdu: "رسول اللہ ﷺ حضرت حسنؓ اور حضرت حسینؓ پر یہ دعا پڑھ کر دم فرمایا کرتے تھے۔"
  },
  {
    id: 'rain_dua',
    category: 'protection',
    titleUrdu: 'بارش برستے وقت کی دعا',
    titleEnglish: 'When It Rains',
    arabic: "اَللّٰهُمَّ صَيِّبًا نَافِعًا",
    urdu: "اے اللہ! اس بارش کو نفع بخش اور خوب برسنے والی بنا۔",
    english: "O Allah, make it a beneficial and productive rain.",
    ref: "صحیح بخاری: ۱۰۳۲",
    notesUrdu: "بارش کا وقت دعاؤں کی قبولیت کا خاص وقت ہوتا ہے۔"
  },

  // --- SOCIAL SUNNAHS ---
  {
    id: 'sneeze_sunnah',
    category: 'social',
    titleUrdu: 'چھینک آنے پر اور اس کا جواب دینے کی دعا',
    titleEnglish: 'Etiquettes of Sneezing',
    arabic: "چھینکنے والا: اَلْحَمْدُ لِلّٰهِ ➔ سننے والا: يَرْحَمُكَ اللّٰهُ ➔ جواب: يَهْدِيكُمُ اللّٰهُ وَيُصْلِحُ بَالَكُمْ",
    urdu: "چھینکنے والا کہے: الحمد للہ (تمام تعریفیں اللہ کے لیے ہیں)۔ سننے والا کہے: یرحمک اللہ (اللہ تجھ پر رحم فرمائے)۔ پھر چھینکنے والا کہے: یہدیکم اللہ ویصلح بالکم (اللہ تمہیں ہدایت دے اور تمہارا حال درست فرمائے)۔",
    english: "Sneezer: Alhamdulillah (All praise to Allah). Listener: Yarhamukallah (May Allah have mercy on you). Sneezer responds: Yahdeekumullahu wa yuslihu baalakum (May Allah guide you and set your state right).",
    ref: "صحیح بخاری: ۶۲۲۴",
    notesUrdu: "مسلمان کے دوسرے مسلمان پر حقوق میں سے چھینک کا جواب دینا بھی شامل ہے۔"
  },
  {
    id: 'thank_someone',
    category: 'social',
    titleUrdu: 'کسی کے احسان پر شکریہ ادا کرنے کی دعا',
    titleEnglish: 'Thanking Someone for a Favor',
    arabic: "جَزَاكَ اللّٰهُ خَيْرًا",
    urdu: "اللہ تعالیٰ آپ کو بہترین بدلہ عطا فرمائے۔",
    english: "May Allah reward you with the best.",
    ref: "سنن ترمذی: ۲۰۳۵",
    notesUrdu: "حضور ﷺ نے فرمایا جس نے احسان کے بدلے یہ دعا دی، اس نے شکریہ ادا کرنے کا حق پورا کر دیا۔"
  },
  {
    id: 'anger_control',
    category: 'social',
    titleUrdu: 'غصہ آنے پر قابو پانے کی دعا',
    titleEnglish: 'When Getting Angry',
    arabic: "أَعُوذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    urdu: "میں پناہ مانگتا ہوں اللہ کی دھتکارے ہوئے شیطان کے شر سے۔",
    english: "I seek refuge in Allah from the accursed Satan.",
    ref: "صحیح بخاری: ۶۱۱۵",
    notesUrdu: "غصے میں وضو کرنا یا بیٹھ جانا سنت نبوی ﷺ ہے۔"
  }
];

// ============================================================================
// 3. COMPLETE WUDU & TAHARAH GUIDE (وضو کا مسنون طریقہ و احکام)
// ============================================================================
const WUDU_GUIDE_DATA = {
  faraiz: [
    {
      step: 1,
      titleUrdu: "۱. پورا چہرہ دھونا",
      titleEnglish: "1. Washing the Entire Face",
      detailUrdu: "پیشانی کے اوپر بالوں کے اگنے کی جگہ سے لے کر ٹھوڑی کے نیچے تک لمبائی میں، اور ایک کان کی لو سے لے کر دوسرے کان کی لو تک چوڑائی میں پورے چہرے پر ایک بار پانی بہانا کہ کوئی بال برابر جگہ بھی خشک نہ رہے۔",
      detailEnglish: "Washing from the hairline above the forehead down to the bottom of the chin vertically, and from earlobe to earlobe horizontally without missing a single hair's breadth.",
      essential: true
    },
    {
      step: 2,
      titleUrdu: "۲. دونوں بازو کہنیوں سمیت دھونا",
      titleEnglish: "2. Washing Both Arms Including Elbows",
      detailUrdu: "انگلیوں کے پوروں سے لے کر کہنیوں سمیت دونوں بازوؤں کو ایک ایک بار اچھی طرح دھونا۔ انگوٹھی یا گھڑی وغیرہ ہو تو اسے حرکت دے کر نیچے تک پانی پہنچانا لازمی ہے۔",
      detailEnglish: "Washing both arms from the fingertips including the elbows thoroughly at least once. Tight rings or watches must be moved to let water reach underneath.",
      essential: true
    },
    {
      step: 3,
      titleUrdu: "۳. چوتھائی سر کا مسح کرنا",
      titleEnglish: "3. Wiping One-Fourth of the Head (Masah)",
      detailUrdu: "تر ہاتھ سے کم از کم چوتھائی (1/4) سر کا ایک بار مسح کرنا۔ پورا سر مسح کرنا سنتِ مؤکدہ ہے۔",
      detailEnglish: "Wiping at least one-fourth (1/4) of the head once with moist wet hands. Wiping the entire head is an emphatic Sunnah.",
      essential: true
    },
    {
      step: 4,
      titleUrdu: "۴. دونوں پاؤں ٹخنوں سمیت دھونا",
      titleEnglish: "4. Washing Both Feet Including Ankles",
      detailUrdu: "دونوں پاؤں کی انگلیوں سے لے کر ٹخنوں (Ganjon) سمیت ایک ایک بار دھونا۔ ایڑیوں اور انگلیوں کے درمیان کی جگہ کا خاص خیال رکھنا کہ خشک نہ رہے۔",
      detailEnglish: "Washing both feet from the toes including the protruding ankle bones at least once, paying careful attention to heels and crevices.",
      essential: true
    }
  ],

  sunnats: [
    { num: 1, textUrdu: "وضو سے پہلے دل میں پاکیزگی کی نیت کرنا۔", textEnglish: "Making the sincere intention (Niyyah) in the heart." },
    { num: 2, textUrdu: "شروع میں 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ' پڑھنا۔", textEnglish: "Reciting 'Bismillah' before touching water." },
    { num: 3, textUrdu: "دونوں ہاتھ پہنچوں (کلائیوں) تک تین بار دھونا۔", textEnglish: "Washing both hands up to the wrists three times." },
    { num: 4, textUrdu: "مسواک کا استعمال کرنا (اگر مسواک نہ ہو تو انگلی سے دانت ملنا)۔", textEnglish: "Using the Miswak (teeth cleaning stick) before rinsing." },
    { num: 5, textUrdu: "دائیں ہاتھ سے تین بار منہ میں پانی ڈال کر کلی کرنا۔", textEnglish: "Rinsing the mouth thoroughly three times with the right hand." },
    { num: 6, textUrdu: "تین بار دائیں ہاتھ سے نرم ہڈی تک ناک میں پانی چڑھانا اور بائیں ہاتھ سے ناک صاف کرنا۔", textEnglish: "Sniffing water into the nostrils three times and blowing it out with the left hand." },
    { num: 7, textUrdu: "گھنی داڑھی والے کے لیے انگلیوں کے ذریعے داڑھی کا خلال کرنا۔", textEnglish: "Running wet fingers upward through a thick beard (Khilal)." },
    { num: 8, textUrdu: "ہاتھوں اور پاؤں کی انگلیوں کا خلال کرنا۔", textEnglish: "Interlacing wet fingers through the fingers and toes." },
    { num: 9, textUrdu: "ہر عضو کو تین تین بار دھونا (تین سے زیادہ دھونا اسراف اور مکروہ ہے)۔", textEnglish: "Washing each limb exactly three times." },
    { num: 10, textUrdu: "ایک بار پورے سر کا مسح کرنا۔", textEnglish: "Wiping the whole head in a single sweeping motion." },
    { num: 11, textUrdu: "شہادت کی انگلی سے کانوں کے اندر اور انگوٹھے سے کانوں کے پیچھے کا مسح کرنا۔", textEnglish: "Wiping the inside of ears with index fingers and behind ears with thumbs." },
    { num: 12, textUrdu: "ترتیب قائم رکھنا (یعنی پہلے چہرہ، پھر بازو، پھر سر، پھر پاؤں)۔", textEnglish: "Observing proper sequential order (Tartib)." },
    { num: 13, textUrdu: "پے در پے دھونا (یعنی ایک عضو خشک ہونے سے پہلے دوسرا عضو دھو لینا)۔", textEnglish: "Continuity (Muwalat) without allowing limbs to dry in between." }
  ],

  steps: [
    {
      step: 1,
      titleUrdu: "۱. نیت اور تسمیہ",
      titleEnglish: "1. Intention & Bismillah",
      descUrdu: "قبلہ رخ بیٹھ کر دل میں وضو کی نیت کریں اور پڑھیں: 'بِسْمِ اللّٰهِ الْعَظِيمِ وَالْحَمْدُ لِلّٰهِ عَلَى دِينِ الْإِسْلَامِ'۔",
      descEnglish: "Sit facing the Qibla, form sincere intention, and say Bismillah.",
      icon: "🤲"
    },
    {
      step: 2,
      titleUrdu: "۲. دونوں ہاتھ کلائیوں تک دھونا",
      titleEnglish: "2. Washing Hands to Wrists",
      descUrdu: "پہلے دایاں ہاتھ پھر بایاں ہاتھ تین تین بار کلائیوں تک دھوئیں اور انگلیوں کا خلال کریں۔",
      descEnglish: "Wash right hand up to wrists 3 times, then left hand 3 times, passing fingers through each other.",
      icon: "💧"
    },
    {
      step: 3,
      titleUrdu: "۳. کلی کرنا اور مسواک",
      titleEnglish: "3. Rinsing Mouth & Miswak",
      descUrdu: "مسواک کریں اور دائیں ہاتھ سے ۳ چلو پانی لے کر تین بار خوب کلی کریں۔ (اگر روزہ نہ ہو تو غرارہ کریں)۔",
      descEnglish: "Use miswak, take water with right hand and rinse the mouth thoroughly 3 times.",
      icon: "🦷"
    },
    {
      step: 4,
      titleUrdu: "۴. ناک میں پانی چڑھانا",
      titleEnglish: "4. Sniffing Water into Nose",
      descUrdu: "دائیں ہاتھ سے ۳ بار ناک کی نرم ہڈی تک پانی کھینچیں اور بائیں ہاتھ کی چھوٹی انگلی سے ناک صاف کریں۔",
      descEnglish: "Sniff water into the nose 3 times with the right hand and blow out gently using the left hand.",
      icon: "👃"
    },
    {
      step: 5,
      titleUrdu: "۵. چہرہ دھونا",
      titleEnglish: "5. Washing the Entire Face",
      descUrdu: "پیشانی کے بالوں سے ٹھوڑی کے نیچے تک اور دونوں کانوں کی لو تک تین بار پانی سے چہرہ دھوئیں اور داڑھی کا خلال کریں۔",
      descEnglish: "Wash the face from the hairline to below the chin, and from earlobe to earlobe 3 times thoroughly.",
      icon: "✨"
    },
    {
      step: 6,
      titleUrdu: "۶. بازو کہنیوں سمیت دھونا",
      titleEnglish: "6. Washing Arms with Elbows",
      descUrdu: "پہلے دایاں بازو انگلیوں کے ناخنوں سے کہنی کے اوپر تک ۳ بار دھوئیں، پھر اسی طرح بایاں بازو ۳ بار دھوئیں۔",
      descEnglish: "Wash the right arm including the elbow 3 times, then repeat for the left arm 3 times.",
      icon: "💪"
    },
    {
      step: 7,
      titleUrdu: "۷. سر، کان اور گردن کا مسح",
      titleEnglish: "7. Wiping Head, Ears & Nape",
      descUrdu: "دونوں ہاتھوں کو تر کر کے پیشانی سے گدی تک لے جائیں اور واپس لائیں۔ پھر کلمے کی انگلی سے کان کے اندر اور انگوٹھے سے کان کے پیچھے اور ہاتھوں کی پشت سے گردن کا مسح کریں۔",
      descEnglish: "Wipe moist hands from front hairline to back of neck and return; wipe ears with index fingers & thumbs.",
      icon: "💆"
    },
    {
      step: 8,
      titleUrdu: "۸. پاؤں ٹخنوں سمیت دھونا",
      titleEnglish: "8. Washing Feet with Ankles",
      descUrdu: "پہلے دایاں پاؤں ٹخنوں سمیت ۳ بار دھوئیں اور بائیں ہاتھ کی چھوٹی انگلی سے خلال کریں، پھر بایاں پاؤں ۳ بار دھو کر خلال کریں۔",
      descEnglish: "Wash the right foot including ankles 3 times interlacing toes, then wash the left foot 3 times thoroughly.",
      icon: "🦶"
    }
  ],

  afterDua: {
    titleUrdu: "وضو مکمل کرنے کے بعد کی مسنون دعا",
    titleEnglish: "Dua After Completing Wudu",
    arabic: "أَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ؕ اَللّٰهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    roman: "Ash-hadu Al-Laaa Ilaaha Illallaahu Wahdahoo Laa Shareeka Lahoo Wa Ash-hadu Anna Muhammadan 'Abduhoo Wa Rasooluh. Allaahummaj-'alnee Minat-Tawwaabeena Waj-'alnee Minal-Mutatahhireen.",
    urdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ حضرت محمد ﷺ اس کے خاص بندے اور رسول ہیں۔ اے اللہ! مجھے خوب توبہ کرنے والوں میں اور خوب پاکیزگی اختیار کرنے والوں میں شامل فرما۔",
    english: "I bear witness that there is no god but Allah, Alone without partner, and Muhammad is His servant and Messenger. O Allah, make me among those who constantly repent, and make me among those who purify themselves.",
    virtueUrdu: "حضور ﷺ نے فرمایا: جو شخص وضو کے بعد یہ کلمات پڑھے، اس کے لیے جنت کے آٹھوں دروازے کھول دیے جاتے ہیں، جس سے چاہے داخل ہو جائے۔ (صحیح مسلم / ترمذی)",
    virtueEnglish: "Whoever recites this after performing Wudu, all eight gates of Paradise are opened for him, to enter from whichever he pleases. (Sahih Muslim / Tirmidhi)"
  },

  nawaqiz: [
    { num: 1, titleUrdu: "پیشاب یا پاخانہ کرنا یا اس راستے سے کسی چیز کا نکلنا۔", titleEnglish: "Urination, defecation, or any discharge from either passage." },
    { num: 2, titleUrdu: "پیچھے سے ریح (ہوا/گیس) کا خارج ہونا۔", titleEnglish: "Passing wind / flatulence." },
    { num: 3, titleUrdu: "جسم کے کسی حصے سے خون یا پیپ کا نکل کر اس جگہ تک بہہ جانا جس کا دھونا وضو یا غسل میں فرض ہے۔", titleEnglish: "Flowing of blood or pus from any part of the body to an area required to be washed." },
    { num: 4, titleUrdu: "منہ بھر کر قے (الٹی/Vomiting) آنا۔", titleEnglish: "A mouthful of vomiting." },
    { num: 5, titleUrdu: "ٹیک لگا کر یا لیٹ کر سونا جس سے اعضاء ڈھیلے پڑ جائیں۔", titleEnglish: "Sleeping lying down or leaning heavily on one side where awareness is lost." },
    { num: 6, titleUrdu: "بے ہوش ہو جانا یا نشہ طاری ہو جانا یا جنون کی کیفیت ہونا۔", titleEnglish: "Fainting, unconsciousness, severe intoxication, or insanity." },
    { num: 7, titleUrdu: "نماز (رکوع و سجدے والی) کے دوران اتنی زور سے قہقہہ لگا کر ہنسنا کہ قریب والا سن لے۔ (اس سے وضو اور نماز دونوں ٹوٹ جاتے ہیں)۔", titleEnglish: "Laughing out loud in prayer (with Ruku and Sujood) so that bystanders can hear." }
  ],

  makroohat: [
    { num: 1, titleUrdu: "پانی کا بلا ضرورت اسراف کرنا (ضرورت سے زیادہ بہانا)۔", titleEnglish: "Wasting water unnecessarily." },
    { num: 2, titleUrdu: "اتنا کم پانی لینا کہ اعضاء خشک رہ جائیں۔", titleEnglish: "Using so little water that limbs remain dry or unwashed." },
    { num: 3, titleUrdu: "چہرے یا اعضاء پر زور سے چھینٹے مارنا۔", titleEnglish: "Splashing water aggressively against the face or limbs." },
    { num: 4, titleUrdu: "وضو کے دوران دنیاوی فضول باتیں کرنا۔", titleEnglish: "Indulging in idle worldly talk while performing Wudu." },
    { num: 5, titleUrdu: "اعضاء کو تین سے زیادہ بار دھونا۔", titleEnglish: "Washing limbs more than three times." }
  ],

  ghuslFaraiz: [
    {
      num: 1,
      titleUrdu: "۱. کلی کرنا (غرارہ کرنا)",
      titleEnglish: "1. Gargling the Mouth",
      descUrdu: "منہ میں اس طرح پانی ڈالنا کہ حلق کی جڑ تک پانی پہنچ جائے اور کوئی حصہ خشک نہ رہے (روزہ کی حالت میں غرارہ نہ کریں)۔",
      descEnglish: "Rinsing the mouth ensuring water reaches back of the throat thoroughly."
    },
    {
      num: 2,
      titleUrdu: "۲. ناک میں پانی چڑھانا",
      titleEnglish: "2. Sniffing Water into Nostrils",
      descUrdu: "ناک میں نرم ہڈی تک پانی ڈالنا اور ناک کو اندر سے اچھی طرح صاف کرنا۔",
      descEnglish: "Sniffing water up to the soft bone of the nose to wash all inner parts."
    },
    {
      num: 3,
      titleUrdu: "۳. پورے جسم پر پانی بہانا",
      titleEnglish: "3. Washing the Entire Body",
      descUrdu: "سر کے بالوں کی جڑوں سے لے کر پاؤں کے تلووں تک پورے جسم پر اس طرح پانی بہانا کہ بال برابر بھی کوئی جگہ خشک نہ رہے۔",
      descEnglish: "Pouring water over the entire body from head to feet leaving not a single hair dry."
    }
  ]
};

// ============================================================================
// 4. COMPLETE NAMAZ GUIDE DATA ENGINE (طریقۂ نماز مکمل مع سورت کی مثال اور تلاوت)
// ============================================================================
const NAMAZ_GUIDE_DATA = {
  steps: [
    {
      id: 'step_niyyah',
      num: 1,
      postureUrdu: 'قیام (سیدھا کھڑے ہونا)',
      postureEnglish: 'Qiyam (Standing)',
      titleUrdu: '۱. نماز کی نیت (Intention)',
      titleEnglish: '1. Niyyah (Intention)',
      arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلّٰهِ تَعَالَىٰ صَلَاةَ (فَجْرٍ/ظُهْرٍ/عَصْرٍ/مَغْرِبٍ/عِشَاءٍ)",
      roman: "Nawaytu an usalliya lillaahi ta'aalaa salaata (Fajr/Zuhr/Asr/Maghrib/Isha)...",
      urdu: "میں نیت کرتا ہوں اللہ تعالیٰ کے واسطے (آج کی نمازِ فجر/ظہر...)، منہ میرا قبلہ شریف کی طرف۔",
      english: "I intend to offer for Allah Almighty the prayer of (Fajr/Dhuhr...), facing the Holy Ka'bah.",
      notesUrdu: "نیت دل کے پختہ ارادے کا نام ہے۔ زبان سے کہنا مستحب ہے لیکن دل میں ارادہ ہونا فرض ہے۔",
      notesEnglish: "The intention resides in the heart; pronouncing it quietly is recommended.",
      audioUrl: null
    },
    {
      id: 'step_takbeer',
      num: 2,
      postureUrdu: 'تکبیرِ تحریمہ (ہاتھ اٹھانا اور باندھنا)',
      postureEnglish: 'Takbeer-e-Tahreeimah',
      titleUrdu: '۲. تکبیرِ تحریمہ (Takbeer Tahreema)',
      titleEnglish: '2. Takbeer Tahreema',
      arabic: "اَللّٰهُ أَكْبَرُ",
      roman: "Allaahu Akbar.",
      urdu: "اللہ سب سے بڑا ہے۔",
      english: "Allah is the Greatest.",
      notesUrdu: "مرد دونوں ہاتھ کانوں کی لو تک اٹھائیں اور ناف کے نیچے باندھ لیں (دایاں ہاتھ بائیں کلائی پر)۔ خواتین دونوں ہاتھ کندھوں تک اٹھائیں اور سینے پر باندھ لیں۔",
      notesEnglish: "Men raise hands to earlobes and fold below navel. Women raise hands to shoulder level and place on the chest.",
      audioUrl: null
    },
    {
      id: 'step_sana',
      num: 3,
      postureUrdu: 'قیام (ہاتھ باندھے ہوئے)',
      postureEnglish: 'Qiyam (Folded Hands)',
      titleUrdu: '۳. ثناء پڑھنا (Glorification of Allah)',
      titleEnglish: '3. Sana (Subhanakallahumma)',
      arabic: "سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلٰهَ غَيْرُكَ",
      roman: "Subhaanakallaahumma Wa Bihamdika Wa Tabaarakasmuka Wa Ta'aalaa Jadduka Wa Laaa Ilaaha Ghayruk.",
      urdu: "اے اللہ! ہم تیری پاکی بیان کرتے ہیں اور تیری حمد و تعریف کرتے ہیں، اور تیرا نام برکت والا ہے، اور تیری بزرگی بلند و برتر ہے، اور تیرے سوا کوئی عبادت کے لائق نہیں۔",
      english: "Glory be to You, O Allah, and all praise is for You, blessed is Your name, exalted is Your majesty, and there is no god worthy of worship besides You.",
      notesUrdu: "تکبیرِ تحریمہ کے فوراً بعد ثناء آہستہ آواز سے پڑھنا سنتِ مؤکدہ ہے۔",
      notesEnglish: "Recited silently right after folding hands in the first Rak'ah.",
      audioUrl: null
    },
    {
      id: 'step_taawuz',
      num: 4,
      postureUrdu: 'قیام (ہاتھ باندھے ہوئے)',
      postureEnglish: 'Qiyam (Folded Hands)',
      titleUrdu: '۴. تعوذ اور تسمیہ (Ta\'awwuz & Tasmiyah)',
      titleEnglish: '4. Ta\'awwuz & Tasmiyah',
      arabic: "أَعُوذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيمِ ۝ بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ۝",
      roman: "A'oozu Billaahi Minash-Shaytaanir-Rajeem. Bismillaahir-Rahmaanir-Raheem.",
      urdu: "میں پناہ مانگتا ہوں اللہ کی شیطان مردود کے شر سے۔ اللہ کے نام سے شروع جو بڑا مہربان نہایت رحم والا ہے۔",
      english: "I seek refuge in Allah from Satan the outcast. In the name of Allah, the Most Compassionate, the Most Merciful.",
      notesUrdu: "پہلی رکعت میں تعوذ اور ہر رکعت میں سورۃ الفاتحہ سے قبل بسم اللہ آہستہ پڑھیں۔",
      notesEnglish: "Recite quietly before Surah Al-Fatihah.",
      audioUrl: null
    },
    {
      id: 'step_fatihah',
      num: 5,
      postureUrdu: 'قیام (قرآنی تلاوت - فرض)',
      postureEnglish: 'Qiyam (Quran Recitation - Obligatory)',
      titleUrdu: '۵. سورۃ الفاتحہ (Surah Al-Fatihah)',
      titleEnglish: '5. Surah Al-Fatihah (The Opening)',
      arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝ آمِينَ",
      roman: "Al-Hamdu Lillaahi Rabbil 'Aalameen. Ar-Rahmaanir-Raheem. Maaliki Yawmid-Deen. Iyyaaka Na'budu Wa Iyyaaka Nasta'een. Ihdinassiraatal Mustaqeem. Siraatal Lazeena An'amta 'Alayhim, Ghayril Maghdoobi 'Alayhim Walad-Daalleen. Aameen.",
      urdu: "سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ بڑا مہربان نہایت رحم فرمانے والا۔ جزا و سزا کے دن کا مالک۔ ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔ ہمیں سیدھے راستے پر چلا۔ ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، جن پر نہ غضب ہوا اور نہ وہ گمراہ ہوئے۔ الٰہی قبول فرما (آمین)۔",
      english: "All praise is for Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship and You alone we ask for help. Guide us upon the straight path. The path of those upon whom You bestowed favor, not of those who evoked Your anger, nor of those who are astray. Aameen.",
      notesUrdu: "نماز کی ہر رکعت میں سورۃ الفاتحہ پڑھنا فرض و واجب ہے۔ آخر میں آہستہ 'آمین' کہنا سنت ہے۔",
      notesEnglish: "Reciting Al-Fatihah is an essential pillar in every Rak'ah.",
      qariRecitationName: "قاری مشاری راشد العفاسی",
      audioUrl: "https://cdn.mp3quran.net/audio/mishary-alafasy/r1/001.mp3",
      quranRef: "1:1-7"
    },
    {
      id: 'step_surah_example',
      num: 6,
      postureUrdu: 'قیام (ضمِ سورۃ - واجب)',
      postureEnglish: 'Qiyam (Additional Surah Example)',
      titleUrdu: '۶. ضمِ سورۃ کی مثال: سورۃ الاخلاص (Surah Al-Ikhlas)',
      titleEnglish: '6. Additional Surah Example: Surah Al-Ikhlas',
      arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ۝ قُلْ هُوَ اللّٰهُ أَحَدٌ ۝ اللّٰهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ۝",
      roman: "Qul Huwal-Laahu Ahad. Allaahus-Samad. Lam Yalid Wa Lam Yoolad. Wa Lam Yakul-Lahoo Kufuwan Ahad.",
      urdu: "آپ فرما دیجیے: وہ اللہ ایک ہے۔ اللہ بے نیاز (سب اس کے محتاج، وہ کسی کا محتاج نہیں) ہے۔ نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا۔ اور کوئی اس کے برابر یا ہمسر نہیں ہے۔",
      english: "Say: He is Allah, the One and Only. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.",
      notesUrdu: "فرض نماز کی پہلی دو رکعتوں میں اور سنت و نفل کی تمام رکعتوں میں سورۃ الفاتحہ کے بعد کم از کم ایک چھوٹی سورت یا ۳ چھوٹی آیات ملانا واجب ہے۔",
      notesEnglish: "Reciting another Surah or at least three verses is required after Al-Fatihah in the first two Rak'ahs of Farz and all Rak'ahs of Sunnah/Nafl.",
      qariRecitationName: "قاری مشاری راشد العفاسی",
      audioUrl: "https://cdn.mp3quran.net/audio/mishary-alafasy/r1/112.mp3",
      quranRef: "112:1-4"
    },
    {
      id: 'step_ruku',
      num: 7,
      postureUrdu: 'رکوع (جھکنا)',
      postureEnglish: 'Ruku (Bowing Down)',
      titleUrdu: '۷. رکوع اور اس کی تسبیح (Ruku & Tasbeeh)',
      titleEnglish: '7. Ruku (Bowing) & Tasbeeh',
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      roman: "Subhaana Rabbiyal 'Azeem.",
      urdu: "پاک ہے میرا پروردگار جو بڑی عظمت والا ہے۔ (۳، ۵ یا ۷ مرتبہ پڑھیں)",
      english: "Glory be to my Lord, the Magnificent. (Recite 3, 5, or 7 times)",
      notesUrdu: "مرد اتنے جھکیں کہ پیٹھ اور سر بالکل برابر سیدھے ہو جائیں اور انگلیوں کو کھول کر گھٹنوں کو مضبوط پکڑیں۔ خواتین صرف اتنا جھکیں کہ ہاتھ گھٹنوں تک پہنچ جائیں اور انگلیاں ملا کر رکھیں۔",
      notesEnglish: "Men bow with back straight and fingers spread on knees. Women bow moderately with fingers closed together.",
      audioUrl: null
    },
    {
      id: 'step_qawmah',
      num: 8,
      postureUrdu: 'قومہ (رکوع سے سیدھا کھڑے ہونا)',
      postureEnglish: 'Qawmah (Standing Upright from Ruku)',
      titleUrdu: '۸. قومہ، تسمیع و تحمید (Qawmah)',
      titleEnglish: '8. Qawmah (Rising from Ruku)',
      arabic: "سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا لَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ ۝",
      roman: "Sami'Allaahu Liman Hamidah. Rabbanaa Lakal Hamd, Hamdan Kaseeran Tayyiban Mubaarakan Feeh.",
      urdu: "اللہ نے سن لیا اس کو جس نے اس کی تعریف کی۔ اے ہمارے رب! تمام تعریفیں تیرے ہی لیے ہیں، بہت زیادہ، پاکیزہ اور برکت والی تعریفیں۔",
      english: "Allah hears whoever praises Him. Our Lord, all praise is for You, abundant, pure, and blessed praise.",
      notesUrdu: "رکوع سے اٹھتے وقت امام اور تنہا نمازی 'سمع اللہ لمن حمدہ' کہے، پھر سیدھا کھڑا ہو کر 'ربنا لک الحمد' کہے۔ قومہ میں مکمل سیدھا کھڑا ہونا واجب ہے۔",
      notesEnglish: "Stand completely upright in tranquil posture before proceeding to prostration.",
      audioUrl: null
    },
    {
      id: 'step_sajdah',
      num: 9,
      postureUrdu: 'سجدہ (پیشانی زمین پر رکھنا - فرض)',
      postureEnglish: 'Sujood (Prostration)',
      titleUrdu: '۹. سجدہ اور تسبیحِ سجدہ (First Prostration)',
      titleEnglish: '9. Sajdah & Prostration Tasbeeh',
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ",
      roman: "Subhaana Rabbiyal A'laa.",
      urdu: "پاک ہے میرا پروردگار جو سب سے بلند و برتر ہے۔ (۳، ۵ یا ۷ مرتبہ پڑھیں)",
      english: "Glory be to my Lord, the Most High. (Recite 3, 5, or 7 times)",
      notesUrdu: "زمین پر پہلے گھٹنے، پھر ہاتھ، پھر ناک اور پیشانی رکھیں۔ مرد کہنیاں زمین سے اور رانوں کو پیٹ سے جدا رکھیں۔ خواتین زمین کے ساتھ سمٹ کر سجدہ کریں اور کہنیاں زمین پر بچھا دیں۔",
      notesEnglish: "Touch knees first, then hands, then nose and forehead. Men keep arms away from ribs; women prostrate compactly.",
      audioUrl: null
    },
    {
      id: 'step_jalsah',
      num: 10,
      postureUrdu: 'جلسہ (دو سجدوں کے درمیان بیٹھنا)',
      postureEnglish: 'Jalsah (Sitting Between Prostrations)',
      titleUrdu: '۱۰. جلسہ اور اس کی دعا (Jalsah)',
      titleEnglish: '10. Jalsah (Between Two Prostrations)',
      arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَاهْدِنِي وَارْزُقْنِي",
      roman: "Rabbighfir Lee Warhamnee Wa 'Aafinee Wahdinee Warzuqnee.",
      urdu: "اے میرے رب! مجھے بخش دے، مجھ پر رحم فرما، مجھے عافیت عطا فرما، مجھے سیدھی راہ دکھا، اور مجھے رزق عطا فرما۔",
      english: "O my Lord, forgive me, have mercy on me, grant me well-being, guide me, and grant me sustenance.",
      notesUrdu: "پہلے سجدے کے بعد 'اللہ اکبر' کہتے ہوئے اطمینان سے سیدھے بیٹھ جائیں اور یہ دعا پڑھیں۔ پھر 'اللہ اکبر' کہہ کر دوسرا سجدہ کریں۔",
      notesEnglish: "Sit calmly between the two prostrations before performing the second Sajdah.",
      audioUrl: null
    },
    {
      id: 'step_tashahhud',
      num: 11,
      postureUrdu: 'قعدہ (بیٹھنا اور تشہد پڑھنا)',
      postureEnglish: 'Qa\'dah & Tashahhud',
      titleUrdu: '۱۱. قعدہ اور تشہد - التحیات (Tashahhud)',
      titleEnglish: '11. Tashahhud (At-Tahiyyat)',
      arabic: "التَّحِيَّاتُ لِلّٰهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللّٰهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      roman: "At-Tahiyyaatu Lillaahi Was-Salawaatu Wat-Tayyibaat, As-Salaamu 'Alayka Ayyuhan-Nabiyyu Wa Rahmatullaahi Wa Barakaatuh, As-Salaamu 'Alaynaa Wa 'Alaa 'Ibaadillaahis-Saaliheen, Ash-hadu Al-Laaa Ilaaha Illallaahu Wa Ash-hadu Anna Muhammadan 'Abduhoo Wa Rasooluh.",
      urdu: "تمام قولی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ آپ پر سلام ہو اے نبیِ مکرم اور اللہ کی رحمت اور اس کی برکتیں! سلامتی ہو ہم پر اور اللہ کے تمام نیک بندوں پر۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ حضرت محمد ﷺ اس کے خاص بندے اور رسول ہیں۔",
      english: "All verbal, physical, and financial worship is due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and Messenger.",
      notesUrdu: "اشھد ان لا الہ پر شہادت کی انگلی اٹھائیں اور الا اللہ پر جھکا لیں۔ مرد بایاں پاؤں بچھا کر اس پر بیٹھیں اور دایاں کھڑا رکھیں۔ خواتین دونوں پاؤں دائیں طرف نکال کر سرین پر بیٹھیں۔",
      notesEnglish: "Raise index finger upon affirming Tawheed. Men sit on left foot; women sit on hips with both feet pointing right.",
      audioUrl: null
    },
    {
      id: 'step_durood',
      num: 12,
      postureUrdu: 'قعدۂ اخیرہ (آخری بیٹھک)',
      postureEnglish: 'Final Qa\'dah (Durood)',
      titleUrdu: '۱۲. درودِ ابراہیمی (Durood-e-Ibrahimi)',
      titleEnglish: '12. Durood-e-Ibrahimi (Salutations)',
      arabic: "اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَّجِيدٌ ۝ اَللّٰهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَّجِيدٌ ۝",
      roman: "Allaahumma Salli 'Alaa Muhammadinw-Wa 'Alaaa Aali Muhammadin Kamaa Sallayta 'Alaaa Ibraaheema Wa 'Alaaa Aali Ibraaheema Innaka Hameedum-Majeed. Allaahumma Baarik 'Alaa Muhammadinw-Wa 'Alaaa Aali Muhammadin Kamaa Baarakta 'Alaaa Ibraaheema Wa 'Alaaa Aali Ibraaheema Innaka Hameedum-Majeed.",
      urdu: "اے اللہ! حضرت محمد ﷺ اور ان کی آل پر رحمت نازل فرما جیسا کہ تو نے حضرت ابراہیم علیہ السلام اور ان کی آل پر رحمت نازل فرمائی، بیشک تو تعریف کے لائق بڑی بزرگی والا ہے۔ اے اللہ! حضرت محمد ﷺ اور ان کی آل پر برکتیں نازل فرما جیسا کہ تو نے حضرت ابراہیم علیہ السلام اور ان کی آل پر برکتیں نازل فرمائیں، بیشک تو تعریف کے لائق بڑی بزرگی والا ہے۔",
      english: "O Allah, bestow Your favor upon Muhammad and the family of Muhammad, as You bestowed favor upon Abraham and the family of Abraham; You are Praiseworthy, Full of Glory. O Allah, bless Muhammad and the family of Muhammad, as You blessed Abraham and the family of Abraham; You are Praiseworthy, Full of Glory.",
      notesUrdu: "آخری قعدے میں تشہد کے فوراً بعد درودِ ابراہیمی پڑھنا سنتِ مؤکدہ ہے۔",
      notesEnglish: "Sunnah Mu'akkadah recited after Tashahhud in the final sitting.",
      audioUrl: null
    },
    {
      id: 'step_dua_masoorah',
      num: 13,
      postureUrdu: 'قعدۂ اخیرہ (سلام سے پہلے)',
      postureEnglish: 'Final Qa\'dah (Before Salam)',
      titleUrdu: '۱۳. دعائے ماثورہ (Dua Masoorah)',
      titleEnglish: '13. Dua Masoorah',
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَّفِي الْآخِرَةِ حَسَنَةً وَّقِنَا عَذَابَ النَّارِ ۝ اَللّٰهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَّلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِّنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ ۝",
      roman: "Rabbanaa Aatinaa Fid-Dunyaa Hasanataw-Wa Fil Aakhirati Hasanataw-Wa Qinaa 'Azaaban-Naar. Allaahumma Innee Zalamtu Nafsee Zulman Kaseeranw-Wa Laa Yaghfiruz-Zunooba Illaa Anta Faghfir Lee Maghfiratam-Min 'Indika Warhamnee Innaka Antal Ghafoorur-Raheem.",
      urdu: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں دوزخ کے عذاب سے بچا۔ اے اللہ! میں نے اپنی جان پر بہت بڑا ظلم کیا اور تیرے سوا کوئی گناہوں کو معاف نہیں کر سکتا، پس مجھے اپنے خاص فضل سے بخش دے اور مجھ پر رحم فرما، بیشک تو ہی بخشنے والا نہایت رحم فرمانے والا ہے۔",
      english: "Our Lord, grant us good in this world and good in the Hereafter, and save us from the torment of the Fire. O Allah, I have wronged myself greatly and none forgives sins but You, so grant me forgiveness from You and have mercy on me.",
      notesUrdu: "درودِ پاک کے بعد قرآنی یا مسنون دعا مانگنا سنت ہے۔",
      notesEnglish: "Recited after Durood before concluding the prayer.",
      audioUrl: null
    },
    {
      id: 'step_salam',
      num: 14,
      postureUrdu: 'سلام پھیرنا (اختتامِ نماز)',
      postureEnglish: 'Salam (Conclusion of Prayer)',
      titleUrdu: '۱۴. سلام پھیرنا (Tasleem / Salam)',
      titleEnglish: '14. Tasleem (Ending the Prayer)',
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ",
      roman: "As-Salaamu 'Alaykum Wa Rahmatullaah.",
      urdu: "تم پر سلامتی ہو اور اللہ کی رحمت۔",
      english: "Peace and the mercy of Allah be upon you.",
      notesUrdu: "پہلے دائیں کندھے کی طرف رخ کر کے سلام پھیریں، پھر بائیں کندھے کی طرف۔ دونوں کندھوں پر موجود فرشتوں اور تمام نمازیوں کو نیت میں شامل رکھیں۔",
      notesEnglish: "Turn face to right shoulder first, then to left shoulder, completing the prayer.",
      audioUrl: null
    },
    {
      id: 'step_qunoot',
      num: 15,
      postureUrdu: 'نمازِ وتر (تیسری رکعت - بعد از رکوع یا قبل از رکوع)',
      postureEnglish: 'Witr Prayer (Third Rak\'ah)',
      titleUrdu: '۱۵. دعائے قنوت (Dua-e-Qunoot - نمازِ وتر کے لیے)',
      titleEnglish: '15. Dua-e-Qunoot (For Witr Prayer)',
      arabic: "اَللّٰهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ، وَنَشْكُرُكَ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَّفْجُرُكَ. اَللّٰهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ، وَإِلَيْكَ نَسْعَىٰ وَنَحْفِدُ، وَنَرْجُو رَحْمَتَكَ وَنَخْشَىٰ عَذَابَكَ، إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحَقٌ",
      roman: "Allaahumma Innaa Nasta'eenuka Wa Nastaghfiruka Wa Nu'minu Bika Wa Natawakkalu 'Alayka Wa Nusnee 'Alaykal Khayr, Wa Nashkuruka Wa Laa Nakfuruk, Wa Nakhla'u Wa Natruku May-Yafjuruk. Allaahumma Iyyaaka Na'budu Wa Laka Nusallee Wa Nasjud, Wa Ilayka Nas'aa Wa Nahfid, Wa Narjoo Rahmataka Wa Nakhshaa 'Azaabak, Inna 'Azaabaka Bil Kuffaari Mulhaq.",
      urdu: "اے اللہ! ہم تجھ ہی سے مدد چاہتے ہیں اور تجھ ہی سے بخشش مانگتے ہیں اور تجھ پر ایمان لاتے ہیں اور تجھ ہی پر بھروسہ کرتے ہیں اور تیری بہترین تعریف کرتے ہیں، اور تیرا شکر ادا کرتے ہیں اور تیری ناشکری نہیں کرتے، اور ہم الگ کرتے ہیں اور چھوڑتے ہیں ہر اس شخص کو جو تیری نافرمانی کرے۔ اے اللہ! ہم تیری ہی عبادت کرتے ہیں اور تیرے ہی لیے نماز پڑھتے اور سجدہ کرتے ہیں، اور تیری ہی طرف دوڑتے اور حاضر ہوتے ہیں، اور ہم تیری رحمت کے امیدوار ہیں اور تیرے عذاب سے ڈرتے ہیں، بیشک تیرا عذاب کافروں کو پہنچنے والا ہے۔",
      english: "O Allah, we seek Your assistance and ask for Your forgiveness, we believe in You and put our trust in You, we praise You in the best way and thank You, and we are not ungrateful to You, and we forsake and leave whoever disobeys You. O Allah, You alone we worship and to You we pray and prostrate, toward You we strive and serve, we hope for Your mercy and fear Your punishment, indeed Your punishment is upon the disbelievers.",
      notesUrdu: "عشاء کی نماز کے بعد ۳ رکعت وتر واجب میں تیسری رکعت میں سورۃ الفاتحہ اور سورت کے بعد اللہ اکبر کہہ کر کانوں تک ہاتھ اٹھائیں، پھر ہاتھ باندھ کر یہ دعا پڑھیں۔",
      notesEnglish: "Recited in the third Rak'ah of Witr prayer.",
      audioUrl: null
    }
  ],

  // Rak'ats Table
  rakats: [
    { nameUrdu: 'نمازِ فجر (Fajr)', sunnat: '۲ سنت (مؤکدہ)', farz: '۲ فرض', nafl: '-', witr: '-', total: '۴ رکعات' },
    { nameUrdu: 'نمازِ ظہر (Dhuhr)', sunnat: '۴ سنت + ۲ سنت', farz: '۴ فرض', nafl: '۲ نفل', witr: '-', total: '۱۲ رکعات' },
    { nameUrdu: 'نمازِ عصر (Asr)', sunnat: '۴ سنت (غیر مؤکدہ)', farz: '۴ فرض', nafl: '-', witr: '-', total: '۸ رکعات' },
    { nameUrdu: 'نمازِ مغرب (Maghrib)', sunnat: '۲ سنت (مؤکدہ)', farz: '۳ فرض', nafl: '۲ نفل', witr: '-', total: '۷ رکعات' },
    { nameUrdu: 'نمازِ عشاء (Isha)', sunnat: '۴ سنت + ۲ سنت', farz: '۴ فرض', nafl: '۲ نفل + ۲ نفل', witr: '۳ وتر (واجب)', total: '۱۷ رکعات' },
    { nameUrdu: 'نمازِ جمعہ (Jummah)', sunnat: '۴ سنت + ۴ سنت + ۲ سنت', farz: '۲ فرض', nafl: '۲ نفل', witr: '-', total: '۱۴ رکعات' }
  ],

  // 6 Essential Differences Between Men and Women in Namaz
  genderDifferences: [
    {
      num: 1,
      aspectUrdu: 'تکبیرِ تحریمہ کے وقت ہاتھ اٹھانا',
      aspectEnglish: 'Raising Hands in Takbeer',
      menUrdu: 'مرد دونوں ہاتھ کانوں کی لو تک اٹھاتے ہیں۔',
      womenUrdu: 'خواتین دونوں ہاتھ صرف کندھوں تک اٹھاتی ہیں اور چادر سے ہاتھ باہر نہ نکالیں۔'
    },
    {
      num: 2,
      aspectUrdu: 'ہاتھ باندھنے کی جگہ',
      aspectEnglish: 'Position of Folded Hands',
      menUrdu: 'مرد ناف کے نیچے ہاتھ باندھتے ہیں، دائیں ہاتھ سے بائیں کلائی کو حلقہ بنا کر پکڑتے ہیں۔',
      womenUrdu: 'خواتین سینے پر ہاتھ رکھتی ہیں، دایاں ہاتھ بائیں ہاتھ کی پشت پر بغیر حلقہ بنائے رکھتی ہیں۔'
    },
    {
      num: 3,
      aspectUrdu: 'رکوع کی کیفیت',
      aspectEnglish: 'Posture in Ruku',
      menUrdu: 'مرد اتنے جھکیں کہ پیٹھ اور سر بالکل سیدھے برابر ہوں، کہنیاں سیدھی اور انگلیاں گھٹنوں پر کھلی ہوں۔',
      womenUrdu: 'خواتین صرف اتنا جھکیں کہ ہاتھ گھٹنوں تک پہنچ جائیں، انگلیاں گھٹنوں پر ملی ہوئی ہوں اور گھٹنے آگے نہ جھکیں۔'
    },
    {
      num: 4,
      aspectUrdu: 'سجدے کی ہیئت و پردہ',
      aspectEnglish: 'Posture in Sajdah',
      menUrdu: 'مرد پیٹ کو رانوں سے، کہنیوں کو پہلوؤں سے اور بازوؤں کو زمین سے دور اور اونچا رکھتے ہیں۔',
      womenUrdu: 'خواتین خوب سمٹ کر سجدہ کرتی ہیں، پیٹ رانوں سے ملا ہوا اور بازو دونوں پہلوؤں اور زمین سے لگے ہوں۔'
    },
    {
      num: 5,
      aspectUrdu: 'قعدے اور جلسے میں بیٹھنے کا طریقہ',
      aspectEnglish: 'Sitting Posture in Qa\'dah',
      menUrdu: 'مرد بایاں پاؤں بچھا کر اس پر بیٹھتے ہیں اور دائیں پاؤں کی انگلیاں قبلہ رخ کھڑی رکھتے ہیں۔',
      womenUrdu: 'خواتین دونوں پاؤں دائیں جانب نکال کر زمین پر سرین (کولہے) کے بل بیٹھتی ہیں۔'
    },
    {
      num: 6,
      aspectUrdu: 'جہری قراءت (آواز سے پڑھنا)',
      aspectEnglish: 'Audible Recitation',
      menUrdu: 'مرد جہری نمازوں میں آواز سے قراءت کرتے ہیں۔',
      womenUrdu: 'خواتین تمام نمازوں میں ہمیشہ آہستہ آواز سے قراءت کرتی ہیں۔'
    }
  ]
};

// Export to window for global app availability
if (typeof window !== 'undefined') {
  window.SIX_KALIMAS_DATA = SIX_KALIMAS_DATA;
  window.DAILY_DUAS_CATEGORIES = DAILY_DUAS_CATEGORIES;
  window.DAILY_DUAS_DATA = DAILY_DUAS_DATA;
  window.WUDU_GUIDE_DATA = WUDU_GUIDE_DATA;
  window.NAMAZ_GUIDE_DATA = NAMAZ_GUIDE_DATA;
}

