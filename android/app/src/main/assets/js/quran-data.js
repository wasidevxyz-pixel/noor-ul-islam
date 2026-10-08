/**
 * AUTHENTIC QURAN, HADITH & DUAS DATABASE
 * 1. Complete 114 Surahs Directory of the Holy Quran
 * 2. 100% Verified Uthmani text with diacritics
 * 3. Authentic Urdu Translation: Maulana Fateh Muhammad Jalandhari
 * 4. Authentic English Translation: Sahih International
 * 5. Full verses streaming from Quran API + Pre-cached Surahs
 * 6. Authentic Hadith & Masnoon Salawat
 */

// Full Directory of all 114 Surahs of the Holy Quran
const QURAN_SURAH_DIRECTORY = [
  { number: 1, nameArabic: "الفَاتِحَة", nameEnglish: "Al-Fatihah", englishMeaning: "The Opening", revelationType: "Meccan", versesCount: 7 },
  { number: 2, nameArabic: "البَقَرَة", nameEnglish: "Al-Baqarah", englishMeaning: "The Cow", revelationType: "Medinan", versesCount: 286 },
  { number: 3, nameArabic: "آلِ عِمْرَان", nameEnglish: "Ali 'Imran", englishMeaning: "Family of Imran", revelationType: "Medinan", versesCount: 200 },
  { number: 4, nameArabic: "النِّسَاء", nameEnglish: "An-Nisa", englishMeaning: "The Women", revelationType: "Medinan", versesCount: 176 },
  { number: 5, nameArabic: "المَائِدَة", nameEnglish: "Al-Ma'idah", englishMeaning: "The Table Spread", revelationType: "Medinan", versesCount: 120 },
  { number: 6, nameArabic: "الأَنْعَام", nameEnglish: "Al-An'am", englishMeaning: "The Cattle", revelationType: "Meccan", versesCount: 165 },
  { number: 7, nameArabic: "الأَعْرَاف", nameEnglish: "Al-A'raf", englishMeaning: "The Heights", revelationType: "Meccan", versesCount: 206 },
  { number: 8, nameArabic: "الأَنْفَال", nameEnglish: "Al-Anfal", englishMeaning: "The Spoils of War", revelationType: "Medinan", versesCount: 75 },
  { number: 9, nameArabic: "التَّوْبَة", nameEnglish: "At-Tawbah", englishMeaning: "The Repentance", revelationType: "Medinan", versesCount: 129 },
  { number: 10, nameArabic: "يُونُس", nameEnglish: "Yunus", englishMeaning: "Jonah", revelationType: "Meccan", versesCount: 109 },
  { number: 11, nameArabic: "هُود", nameEnglish: "Hud", englishMeaning: "Hud", revelationType: "Meccan", versesCount: 123 },
  { number: 12, nameArabic: "يُوسُف", nameEnglish: "Yusuf", englishMeaning: "Joseph", revelationType: "Meccan", versesCount: 111 },
  { number: 13, nameArabic: "الرَّعْد", nameEnglish: "Ar-Ra'd", englishMeaning: "The Thunder", revelationType: "Medinan", versesCount: 43 },
  { number: 14, nameArabic: "إِبْرَاهِيم", nameEnglish: "Ibrahim", englishMeaning: "Abraham", revelationType: "Meccan", versesCount: 52 },
  { number: 15, nameArabic: "الحِجْر", nameEnglish: "Al-Hijr", englishMeaning: "The Rocky Tract", revelationType: "Meccan", versesCount: 99 },
  { number: 16, nameArabic: "النَّحْل", nameEnglish: "An-Nahl", englishMeaning: "The Bee", revelationType: "Meccan", versesCount: 128 },
  { number: 17, nameArabic: "الإِسْرَاء", nameEnglish: "Al-Isra", englishMeaning: "The Night Journey", revelationType: "Meccan", versesCount: 111 },
  { number: 18, nameArabic: "الكَهْف", nameEnglish: "Al-Kahf", englishMeaning: "The Cave", revelationType: "Meccan", versesCount: 110 },
  { number: 19, nameArabic: "مَرْيَم", nameEnglish: "Maryam", englishMeaning: "Mary", revelationType: "Meccan", versesCount: 98 },
  { number: 20, nameArabic: "طه", nameEnglish: "Ta-Ha", englishMeaning: "Ta-Ha", revelationType: "Meccan", versesCount: 135 },
  { number: 21, nameArabic: "الأَنْبِيَاء", nameEnglish: "Al-Anbiya", englishMeaning: "The Prophets", revelationType: "Meccan", versesCount: 112 },
  { number: 22, nameArabic: "الحَجّ", nameEnglish: "Al-Hajj", englishMeaning: "The Pilgrimage", revelationType: "Medinan", versesCount: 78 },
  { number: 23, nameArabic: "المُؤْمِنُون", nameEnglish: "Al-Mu'minun", englishMeaning: "The Believers", revelationType: "Meccan", versesCount: 118 },
  { number: 24, nameArabic: "النُّور", nameEnglish: "An-Nur", englishMeaning: "The Light", revelationType: "Medinan", versesCount: 64 },
  { number: 25, nameArabic: "الفُرْقَان", nameEnglish: "Al-Furqan", englishMeaning: "The Criterion", revelationType: "Meccan", versesCount: 77 },
  { number: 26, nameArabic: "الشُّعَرَاء", nameEnglish: "Ash-Shu'ara", englishMeaning: "The Poets", revelationType: "Meccan", versesCount: 227 },
  { number: 27, nameArabic: "النَّمْل", nameEnglish: "An-Naml", englishMeaning: "The Ant", revelationType: "Meccan", versesCount: 93 },
  { number: 28, nameArabic: "القَصَص", nameEnglish: "Al-Qasas", englishMeaning: "The Stories", revelationType: "Meccan", versesCount: 88 },
  { number: 29, nameArabic: "العَنْكَبُوت", nameEnglish: "Al-'Ankabut", englishMeaning: "The Spider", revelationType: "Meccan", versesCount: 69 },
  { number: 30, nameArabic: "الرُّوم", nameEnglish: "Ar-Rum", englishMeaning: "The Romans", revelationType: "Meccan", versesCount: 60 },
  { number: 31, nameArabic: "لُقْمَان", nameEnglish: "Luqman", englishMeaning: "Luqman", revelationType: "Meccan", versesCount: 34 },
  { number: 32, nameArabic: "السَّجْدَة", nameEnglish: "As-Sajdah", englishMeaning: "The Prostration", revelationType: "Meccan", versesCount: 30 },
  { number: 33, nameArabic: "الأَحْزَاب", nameEnglish: "Al-Ahzab", englishMeaning: "The Combined Forces", revelationType: "Medinan", versesCount: 73 },
  { number: 34, nameArabic: "سَبَأ", nameEnglish: "Saba", englishMeaning: "Sheba", revelationType: "Meccan", versesCount: 54 },
  { number: 35, nameArabic: "فَاطِر", nameEnglish: "Fatir", englishMeaning: "Originator", revelationType: "Meccan", versesCount: 45 },
  { number: 36, nameArabic: "يس", nameEnglish: "Ya-Sin", englishMeaning: "Ya-Sin", revelationType: "Meccan", versesCount: 83 },
  { number: 37, nameArabic: "الصَّافَّات", nameEnglish: "As-Saffat", englishMeaning: "Those who set the Ranks", revelationType: "Meccan", versesCount: 182 },
  { number: 38, nameArabic: "ص", nameEnglish: "Sad", englishMeaning: "The Letter Sad", revelationType: "Meccan", versesCount: 88 },
  { number: 39, nameArabic: "الزُّمَر", nameEnglish: "Az-Zumar", englishMeaning: "The Troops", revelationType: "Meccan", versesCount: 75 },
  { number: 40, nameArabic: "غَافِر", nameEnglish: "Ghafir", englishMeaning: "The Forgiver", revelationType: "Meccan", versesCount: 85 },
  { number: 41, nameArabic: "فُصِّلَت", nameEnglish: "Fussilat", englishMeaning: "Explained in Detail", revelationType: "Meccan", versesCount: 54 },
  { number: 42, nameArabic: "الشُّورَى", nameEnglish: "Ash-Shura", englishMeaning: "The Consultation", revelationType: "Meccan", versesCount: 53 },
  { number: 43, nameArabic: "الزُّخْرُف", nameEnglish: "Az-Zukhruf", englishMeaning: "The Ornaments of Gold", revelationType: "Meccan", versesCount: 89 },
  { number: 44, nameArabic: "الدُّخَان", nameEnglish: "Ad-Dukhan", englishMeaning: "The Smoke", revelationType: "Meccan", versesCount: 59 },
  { number: 45, nameArabic: "الجَاثِيَة", nameEnglish: "Al-Jathiyah", englishMeaning: "The Crouching", revelationType: "Meccan", versesCount: 37 },
  { number: 46, nameArabic: "الأَحْقَاف", nameEnglish: "Al-Ahqaf", englishMeaning: "The Wind-Curved Sandhills", revelationType: "Meccan", versesCount: 35 },
  { number: 47, nameArabic: "مُحَمَّد", nameEnglish: "Muhammad", englishMeaning: "Muhammad ﷺ", revelationType: "Medinan", versesCount: 38 },
  { number: 48, nameArabic: "الفَتْح", nameEnglish: "Al-Fath", englishMeaning: "The Victory", revelationType: "Medinan", versesCount: 29 },
  { number: 49, nameArabic: "الحُجُرَات", nameEnglish: "Al-Hujurat", englishMeaning: "The Rooms", revelationType: "Medinan", versesCount: 18 },
  { number: 50, nameArabic: "ق", nameEnglish: "Qaf", englishMeaning: "The Letter Qaf", revelationType: "Meccan", versesCount: 45 },
  { number: 51, nameArabic: "الذَّارِيَات", nameEnglish: "Adh-Dhariyat", englishMeaning: "The Winnowing Winds", revelationType: "Meccan", versesCount: 60 },
  { number: 52, nameArabic: "الطُّور", nameEnglish: "At-Tur", englishMeaning: "The Mount", revelationType: "Meccan", versesCount: 49 },
  { number: 53, nameArabic: "النَّجْم", nameEnglish: "An-Najm", englishMeaning: "The Star", revelationType: "Meccan", versesCount: 62 },
  { number: 54, nameArabic: "القَمَر", nameEnglish: "Al-Qamar", englishMeaning: "The Moon", revelationType: "Meccan", versesCount: 55 },
  { number: 55, nameArabic: "الرَّحْمَٰن", nameEnglish: "Ar-Rahman", englishMeaning: "The Beneficent", revelationType: "Medinan", versesCount: 78 },
  { number: 56, nameArabic: "الوَاقِعَة", nameEnglish: "Al-Waqi'ah", englishMeaning: "The Inevitable", revelationType: "Meccan", versesCount: 96 },
  { number: 57, nameArabic: "الحَدِيد", nameEnglish: "Al-Hadid", englishMeaning: "The Iron", revelationType: "Medinan", versesCount: 29 },
  { number: 58, nameArabic: "المُجَادِلَة", nameEnglish: "Al-Mujadila", englishMeaning: "The Pleading Woman", revelationType: "Medinan", versesCount: 22 },
  { number: 59, nameArabic: "الحَشْر", nameEnglish: "Al-Hashr", englishMeaning: "The Exile", revelationType: "Medinan", versesCount: 24 },
  { number: 60, nameArabic: "المُمْتَحَنَة", nameEnglish: "Al-Mumtahanah", englishMeaning: "She that is to be examined", revelationType: "Medinan", versesCount: 13 },
  { number: 61, nameArabic: "الصَّفّ", nameEnglish: "As-Saff", englishMeaning: "The Ranks", revelationType: "Medinan", versesCount: 14 },
  { number: 62, nameArabic: "الجُمُعَة", nameEnglish: "Al-Jumu'ah", englishMeaning: "The Congregation (Friday)", revelationType: "Medinan", versesCount: 11 },
  { number: 63, nameArabic: "المُنَافِقُون", nameEnglish: "Al-Munafiqun", englishMeaning: "The Hypocrites", revelationType: "Medinan", versesCount: 11 },
  { number: 64, nameArabic: "التَّغَابُن", nameEnglish: "At-Taghabun", englishMeaning: "The Mutual Disillusion", revelationType: "Medinan", versesCount: 18 },
  { number: 65, nameArabic: "الطَّلَاق", nameEnglish: "At-Talaq", englishMeaning: "The Divorce", revelationType: "Medinan", versesCount: 12 },
  { number: 66, nameArabic: "التَّحْرِيم", nameEnglish: "At-Tahrim", englishMeaning: "The Prohibition", revelationType: "Medinan", versesCount: 12 },
  { number: 67, nameArabic: "المُلْك", nameEnglish: "Al-Mulk", englishMeaning: "The Sovereignty", revelationType: "Meccan", versesCount: 30 },
  { number: 68, nameArabic: "القَلَم", nameEnglish: "Al-Qalam", englishMeaning: "The Pen", revelationType: "Meccan", versesCount: 52 },
  { number: 69, nameArabic: "الحَاقَّة", nameEnglish: "Al-Haqqah", englishMeaning: "The Reality", revelationType: "Meccan", versesCount: 52 },
  { number: 70, nameArabic: "المَعَارِج", nameEnglish: "Al-Ma'arij", englishMeaning: "The Ascending Stairways", revelationType: "Meccan", versesCount: 44 },
  { number: 71, nameArabic: "نُوح", nameEnglish: "Nuh", englishMeaning: "Noah", revelationType: "Meccan", versesCount: 28 },
  { number: 72, nameArabic: "الجِنّ", nameEnglish: "Al-Jinn", englishMeaning: "The Jinn", revelationType: "Meccan", versesCount: 28 },
  { number: 73, nameArabic: "المُزَّمِّل", nameEnglish: "Al-Muzzammil", englishMeaning: "The Enshrouded One", revelationType: "Meccan", versesCount: 20 },
  { number: 74, nameArabic: "المُدَّثِّر", nameEnglish: "Al-Muddaththir", englishMeaning: "The Cloaked One", revelationType: "Meccan", versesCount: 56 },
  { number: 75, nameArabic: "القِيَامَة", nameEnglish: "Al-Qiyamah", englishMeaning: "The Resurrection", revelationType: "Meccan", versesCount: 40 },
  { number: 76, nameArabic: "الإِنْسَان", nameEnglish: "Al-Insan", englishMeaning: "Man", revelationType: "Medinan", versesCount: 31 },
  { number: 77, nameArabic: "المُرْسَلَات", nameEnglish: "Al-Mursalat", englishMeaning: "The Emissaries", revelationType: "Meccan", versesCount: 50 },
  { number: 78, nameArabic: "النَّبَأ", nameEnglish: "An-Naba", englishMeaning: "The Tidings", revelationType: "Meccan", versesCount: 40 },
  { number: 79, nameArabic: "النَّازِعَات", nameEnglish: "An-Nazi'at", englishMeaning: "Those who drag forth", revelationType: "Meccan", versesCount: 46 },
  { number: 80, nameArabic: "عَبَسَ", nameEnglish: "'Abasa", englishMeaning: "He Frowned", revelationType: "Meccan", versesCount: 42 },
  { number: 81, nameArabic: "التَّكْوِير", nameEnglish: "At-Takwir", englishMeaning: "The Overthrowing", revelationType: "Meccan", versesCount: 29 },
  { number: 82, nameArabic: "الانْفِطَار", nameEnglish: "Al-Infitar", englishMeaning: "The Cleaving", revelationType: "Meccan", versesCount: 19 },
  { number: 83, nameArabic: "المُطَفِّفِين", nameEnglish: "Al-Mutaffifin", englishMeaning: "The Defrauding", revelationType: "Meccan", versesCount: 36 },
  { number: 84, nameArabic: "الانْشِقَاق", nameEnglish: "Al-Inshiqaq", englishMeaning: "The Splitting Open", revelationType: "Meccan", versesCount: 25 },
  { number: 85, nameArabic: "البُرُوج", nameEnglish: "Al-Buruj", englishMeaning: "The Mansions of the Stars", revelationType: "Meccan", versesCount: 22 },
  { number: 86, nameArabic: "الطَّارِق", nameEnglish: "At-Tariq", englishMeaning: "The Morning Star", revelationType: "Meccan", versesCount: 17 },
  { number: 87, nameArabic: "الأَعْلَى", nameEnglish: "Al-A'la", englishMeaning: "The Most High", revelationType: "Meccan", versesCount: 19 },
  { number: 88, nameArabic: "الغَاشِيَة", nameEnglish: "Al-Ghashiyah", englishMeaning: "The Overwhelming Event", revelationType: "Meccan", versesCount: 26 },
  { number: 89, nameArabic: "الفَجْر", nameEnglish: "Al-Fajr", englishMeaning: "The Dawn", revelationType: "Meccan", versesCount: 30 },
  { number: 90, nameArabic: "البَلَد", nameEnglish: "Al-Balad", englishMeaning: "The City", revelationType: "Meccan", versesCount: 20 },
  { number: 91, nameArabic: "الشَّمْس", nameEnglish: "Ash-Shams", englishMeaning: "The Sun", revelationType: "Meccan", versesCount: 15 },
  { number: 92, nameArabic: "اللَّيْل", nameEnglish: "Al-Layl", englishMeaning: "The Night", revelationType: "Meccan", versesCount: 21 },
  { number: 93, nameArabic: "الضُّحَى", nameEnglish: "Ad-Duha", englishMeaning: "The Morning Hours", revelationType: "Meccan", versesCount: 11 },
  { number: 94, nameArabic: "الشَّرْح", nameEnglish: "Ash-Sharh", englishMeaning: "The Relief", revelationType: "Meccan", versesCount: 8 },
  { number: 95, nameArabic: "التِّين", nameEnglish: "At-Tin", englishMeaning: "The Fig", revelationType: "Meccan", versesCount: 8 },
  { number: 96, nameArabic: "العَلَق", nameEnglish: "Al-'Alaq", englishMeaning: "The Clot", revelationType: "Meccan", versesCount: 19 },
  { number: 97, nameArabic: "القَدْر", nameEnglish: "Al-Qadr", englishMeaning: "The Power, Fate", revelationType: "Meccan", versesCount: 5 },
  { number: 98, nameArabic: "البَيِّنَة", nameEnglish: "Al-Bayyinah", englishMeaning: "The Clear Proof", revelationType: "Medinan", versesCount: 8 },
  { number: 99, nameArabic: "الزَّلْزَلَة", nameEnglish: "Az-Zalzalah", englishMeaning: "The Earthquake", revelationType: "Medinan", versesCount: 8 },
  { number: 100, nameArabic: "العَادِيَات", nameEnglish: "Al-'Adiyat", englishMeaning: "The Courser", revelationType: "Meccan", versesCount: 11 },
  { number: 101, nameArabic: "القَارِعَة", nameEnglish: "Al-Qari'ah", englishMeaning: "The Calamity", revelationType: "Meccan", versesCount: 11 },
  { number: 102, nameArabic: "التَّكَاثُر", nameEnglish: "At-Takathur", englishMeaning: "The Rivalry in World Increase", revelationType: "Meccan", versesCount: 8 },
  { number: 103, nameArabic: "العَصْر", nameEnglish: "Al-'Asr", englishMeaning: "The Declining Day", revelationType: "Meccan", versesCount: 3 },
  { number: 104, nameArabic: "الهُمَزَة", nameEnglish: "Al-Humazah", englishMeaning: "The Traducer", revelationType: "Meccan", versesCount: 9 },
  { number: 105, nameArabic: "الفِيل", nameEnglish: "Al-Fil", englishMeaning: "The Elephant", revelationType: "Meccan", versesCount: 5 },
  { number: 106, nameArabic: "قُرَيْش", nameEnglish: "Quraysh", englishMeaning: "Quraysh", revelationType: "Meccan", versesCount: 4 },
  { number: 107, nameArabic: "المَاعُون", nameEnglish: "Al-Ma'un", englishMeaning: "The Small Kindnesses", revelationType: "Meccan", versesCount: 7 },
  { number: 108, nameArabic: "الكَوْثَر", nameEnglish: "Al-Kawthar", englishMeaning: "The Abundance", revelationType: "Meccan", versesCount: 3 },
  { number: 109, nameArabic: "الكَافِرُون", nameEnglish: "Al-Kafirun", englishMeaning: "The Disbelievers", revelationType: "Meccan", versesCount: 6 },
  { number: 110, nameArabic: "النَّصْر", nameEnglish: "An-Nasr", englishMeaning: "The Divine Support", revelationType: "Medinan", versesCount: 3 },
  { number: 111, nameArabic: "المَسَد", nameEnglish: "Al-Masad", englishMeaning: "The Palm Fibre", revelationType: "Meccan", versesCount: 5 },
  { number: 112, nameArabic: "الإِخْلَاص", nameEnglish: "Al-Ikhlas", englishMeaning: "The Sincerity", revelationType: "Meccan", versesCount: 4 },
  { number: 113, nameArabic: "الفَلَق", nameEnglish: "Al-Falaq", englishMeaning: "The Daybreak", revelationType: "Meccan", versesCount: 5 },
  { number: 114, nameArabic: "النَّاس", nameEnglish: "An-Nas", englishMeaning: "Mankind", revelationType: "Meccan", versesCount: 6 }
];

// Pre-cached verified Complete Surahs (Instant Offline Access)
const CACHED_SURAHS = {
  1: {
    number: 1,
    nameArabic: "سُورَةُ الفَاتِحَةِ",
    nameEnglish: "Al-Fatihah",
    verses: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", urdu: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے", english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", audio: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3" },
      { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", urdu: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے", english: "[All] praise is [due] to Allah, Lord of the worlds -", audio: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3" },
      { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", urdu: "بڑا مہربان نہایت رحم فرمانے والا", english: "The Entirely Merciful, the Especially Merciful,", audio: "https://everyayah.com/data/Alafasy_128kbps/001003.mp3" },
      { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", urdu: "روزِ جزا کا مالک", english: "Sovereign of the Day of Recompense.", audio: "https://everyayah.com/data/Alafasy_128kbps/001004.mp3" },
      { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", urdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں", english: "It is You we worship and You we ask for help.", audio: "https://everyayah.com/data/Alafasy_128kbps/001005.mp3" },
      { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", urdu: "ہمیں سیدھے راستے پر چلا", english: "Guide us to the straight path -", audio: "https://everyayah.com/data/Alafasy_128kbps/001006.mp3" },
      { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", urdu: "ان لوگوں کے راستے پر جن پر تو نے انعام فرمایا، نہ ان کے جن پر غضب ہوا اور نہ گمراہوں کے۔", english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.", audio: "https://everyayah.com/data/Alafasy_128kbps/001007.mp3" }
    ]
  },
  94: {
    number: 94,
    nameArabic: "سُورَةُ الشَّرْحِ",
    nameEnglish: "Ash-Sharh",
    verses: [
      { number: 1, arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", urdu: "کیا ہم نے آپ کے لیے آپ کا سینہ کشادہ نہیں فرما دیا؟", english: "Did We not expand for you, [O Muhammad], your breast?", audio: "https://everyayah.com/data/Alafasy_128kbps/094001.mp3" },
      { number: 2, arabic: "وَوَضَعْنَا عَنكَ وِزْرَكَ", urdu: "اور ہم نے آپ سے آپ کا بوجھ اتار دیا۔", english: "And We removed from you your burden", audio: "https://everyayah.com/data/Alafasy_128kbps/094002.mp3" },
      { number: 3, arabic: "الَّذِي أَنقَضَ ظَهْرَكَ", urdu: "جس نے آپ کی پیٹھ توڑ رکھی تھی۔", english: "Which had weighed upon your back", audio: "https://everyayah.com/data/Alafasy_128kbps/094003.mp3" },
      { number: 4, arabic: "وَرَفَعْنَا لَكَ ذِكْرَكَ", urdu: "اور ہم نے آپ کے لیے آپ کا ذکر بلند کر دیا۔", english: "And raised high for you your repute.", audio: "https://everyayah.com/data/Alafasy_128kbps/094004.mp3" },
      { number: 5, arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", urdu: "پس یقیناً مشکل کے ساتھ آسانی ہے۔", english: "For indeed, with hardship [will be] ease.", audio: "https://everyayah.com/data/Alafasy_128kbps/094005.mp3" },
      { number: 6, arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", urdu: "بے شک مشکل کے ساتھ آسانی ہے۔", english: "Indeed, with hardship [will be] ease.", audio: "https://everyayah.com/data/Alafasy_128kbps/094006.mp3" },
      { number: 7, arabic: "فَإِذَا فَرَغْتَ فَانصَبْ", urdu: "سو جب آپ فارغ ہوں تو محنت کیجیے۔", english: "So when you have finished [your duties], then stand up [for worship].", audio: "https://everyayah.com/data/Alafasy_128kbps/094007.mp3" },
      { number: 8, arabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", urdu: "اور اپنے رب ہی کی طرف رغبت کیجیے۔", english: "And to your Lord direct [your] longing.", audio: "https://everyayah.com/data/Alafasy_128kbps/094008.mp3" }
    ]
  },
  112: {
    number: 112,
    nameArabic: "سُورَةُ الإِخْلَاصِ",
    nameEnglish: "Al-Ikhlas",
    verses: [
      { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", urdu: "کہہ دیجیے کہ وہ اللہ ایک ہے۔", english: "Say, 'He is Allah, [who is] One,", audio: "https://everyayah.com/data/Alafasy_128kbps/112001.mp3" },
      { number: 2, arabic: "اللَّهُ الصَّمَدُ", urdu: "اللہ بے نیاز ہے۔", english: "Allah, the Eternal Refuge.", audio: "https://everyayah.com/data/Alafasy_128kbps/112002.mp3" },
      { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", urdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے۔", english: "He neither begets nor is born,", audio: "https://everyayah.com/data/Alafasy_128kbps/112003.mp3" },
      { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", urdu: "اور کوئی اس کا ہمسر نہیں۔", english: "Nor is there to Him any equivalent.'", audio: "https://everyayah.com/data/Alafasy_128kbps/112004.mp3" }
    ]
  },
  113: {
    number: 113,
    nameArabic: "سُورَةُ الفَلَقِ",
    nameEnglish: "Al-Falaq",
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", urdu: "کہہ دیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں۔", english: "Say, 'I seek refuge in the Lord of daybreak", audio: "https://everyayah.com/data/Alafasy_128kbps/113001.mp3" },
      { number: 2, arabic: "مِن شَرِّ مَا خَلَقَ", urdu: "ہر اس چیز کی برائی سے جو اس نے پیدا فرمائی۔", english: "From the evil of that which He created", audio: "https://everyayah.com/data/Alafasy_128kbps/113002.mp3" },
      { number: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", urdu: "اور اندھیری رات کی برائی سے جب وہ چھا جائے۔", english: "And from the evil of darkness when it settles", audio: "https://everyayah.com/data/Alafasy_128kbps/113003.mp3" },
      { number: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", urdu: "اور گرہوں میں پھونکنے والیوں کی برائی سے۔", english: "And from the evil of the blowers in knots", audio: "https://everyayah.com/data/Alafasy_128kbps/113004.mp3" },
      { number: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", urdu: "اور حسد کرنے والے کی برائی سے جب وہ حسد کرے۔", english: "And from the evil of an envier when he envies.'", audio: "https://everyayah.com/data/Alafasy_128kbps/113005.mp3" }
    ]
  },
  114: {
    number: 114,
    nameArabic: "سُورَةُ النَّاسِ",
    nameEnglish: "An-Nas",
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", urdu: "کہہ دیجیے کہ میں لوگوں کے پروردگار کی پناہ مانگتا ہوں۔", english: "Say, 'I seek refuge in the Lord of mankind,", audio: "https://everyayah.com/data/Alafasy_128kbps/114001.mp3" },
      { number: 2, arabic: "مَلِكِ النَّاسِ", urdu: "لوگوں کے بادشاہ کی۔", english: "The Sovereign of mankind,", audio: "https://everyayah.com/data/Alafasy_128kbps/114002.mp3" },
      { number: 3, arabic: "إِلَٰهِ النَّاسِ", urdu: "لوگوں کے معبود برحق کی۔", english: "The God of mankind,", audio: "https://everyayah.com/data/Alafasy_128kbps/114003.mp3" },
      { number: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", urdu: "پیچھے ہٹ جانے والے وسوسہ ڈالنے والے کی برائی سے۔", english: "From the evil of the retreating whisperer -", audio: "https://everyayah.com/data/Alafasy_128kbps/114004.mp3" },
      { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", urdu: "جو لوگوں کے سینوں میں وسوسے ڈالتا ہے۔", english: "Who whispers into the breasts of mankind -", audio: "https://everyayah.com/data/Alafasy_128kbps/114005.mp3" },
      { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", urdu: "خواہ وہ جنات میں سے ہو یا انسانوں میں سے۔", english: "From among the jinn and mankind.'", audio: "https://everyayah.com/data/Alafasy_128kbps/114006.mp3" }
    ]
  }
};

const AYAT_AL_KURSI = {
  surah: "سُورَةُ البَقَرَةِ (Al-Baqarah)",
  reference: "Surah 2 : Ayah 255",
  arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  urdu: "اللہ تعالیٰ، اس کے سوا کوئی عبادت کے لائق نہیں، وہ ہمیشہ زندہ رہنے والا اور سب کو سنبھالنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند۔ جو کچھ آسمانوں میں ہے اور جو کچھ زمین میں ہے اسی کا ہے۔ کون ہے جو اس کی اجازت کے بغیر اس کے حضور شفاعت کر سکے؟ وہ جانتا ہے جو کچھ ان کے آگے ہے اور جو کچھ ان کے پیچھے ہے، اور وہ اس کے علم میں سے کسی چیز کا احاطہ نہیں کر سکتے سوائے جتنا وہ چاہے۔ اس کی کرسی آسمانوں اور زمین کو گھیرے ہوئے ہے، اور ان دونوں کی حفاظت اس پر گراں نہیں گزرتی، اور وہی بلند اور عظمت والا ہے۔",
  english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that could intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
  audio: "https://everyayah.com/data/Alafasy_128kbps/002255.mp3"
};

const HADITH_COLLECTION = [
  {
    source: "صحيح البخاري — رقم الحديث: 1",
    book: "Sahih al-Bukhari",
    hadithNumber: "Hadith #1",
    narrator: "Hazrat 'Umar bin Al-Khattab (رضي الله عنه)",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.",
    urdu: "اعمال کا دارومدار نیتوں پر ہے اور ہر شخص کے لیے وہی ہے جس کی اس نے نیت کی۔ پس جس کی ہجرت دنیا کے لیے ہو جو وہ حاصل کرنا چاہتا ہے یا کسی عورت کے لیے جس سے وہ نکاح کرنا چاہتا ہے تو اس کی ہجرت اسی کے لیے ہے جس کے لیے اس نے ہجرت کی۔",
    english: "Actions are but by intention and every man shall have but that which he intended. Thus he whose migration was for worldly gain or to marry a woman, his migration is for what he migrated."
  },
  {
    source: "صحيح البخاري — رقم الحديث: 13 | صحيح مسلم — رقم الحديث: 45",
    book: "Sahih al-Bukhari & Muslim",
    hadithNumber: "Bukhari #13 / Muslim #45",
    narrator: "Hazrat Anas bin Malik (رضي الله عنه)",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.",
    urdu: "تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک کہ وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔",
    english: "None of you truly believes until he loves for his brother what he loves for himself."
  },
  {
    source: "صحيح مسلم — رقم الحديث: 223",
    book: "Sahih Muslim",
    hadithNumber: "Hadith #223",
    narrator: "Hazrat Abu Malik Al-Ash'ari (رضي الله عنه)",
    arabic: "الطَّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ.",
    urdu: "پاکیزگی اور صفائی آدھا ایمان ہے، اور الحمد للہ کہنا ترازو کو بھر دیتا ہے۔",
    english: "Purity and cleanliness is half of faith, and 'Alhamdulillah' (Praise be to Allah) fills the scale."
  },
  {
    source: "جامع الترمذي — رقم الحديث: 1924 | سنن أبي داود — رقم الحديث: 4941",
    book: "Jami' at-Tirmidhi & Abu Dawud",
    hadithNumber: "Tirmidhi #1924 (Sahih)",
    narrator: "Hazrat 'Abdullah bin 'Amr (رضي الله عنه)",
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ.",
    urdu: "رحم کرنے والوں پر رحمان رحم فرماتا ہے۔ تم زمین والوں پر رحم کرو، آسمان والا تم پر رحم فرمائے گا۔",
    english: "The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth, and the One in the heavens will be merciful to you."
  }
];

const TASBIH_PRESETS = [
  // --- 1. ASTAGHFAR & TAWBAH (توبہ اور استغفار) ---
  {
    id: "sayyidul_istighfar",
    category: "astaghfar",
    title: "سَيِّدُ الِاسْتِغْفَارِ (Sayyidul Istighfar)",
    subTitle: "سب سے افضل استغفار — چیف توبہ",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    meaningUrdu: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں۔ میں اپنے اوپر تیری نعمتوں کا اعتراف کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہوں کو نہیں بخش سکتا۔",
    meaningEnglish: "O Allah, You are my Lord; there is no god but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
    reference: "صحیح البخاری: 6306 (کتاب الدعوات) • جس نے شام کو یقین سے پڑھا اور صبح سے پہلے فوت ہو گیا وہ جنتی ہے",
    target: 33
  },
  {
    id: "astaghfirullah_rabbi",
    category: "astaghfar",
    title: "أَسْتَغْفِرُ اللَّهَ رَبِّي (Astaghfirullah Rabbi)",
    subTitle: "ہر گناہ سے جامع استغفار",
    arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
    meaningUrdu: "میں اللہ سے اپنے تمام گناہوں کی بخشش مانگتا ہوں جو میرا رب ہے اور اسی کی بارگاہ میں توبہ کرتا ہوں۔",
    meaningEnglish: "I seek forgiveness from Allah, my Lord, for every sin, and I turn to Him in repentance.",
    reference: "سنن نسائی و احمد • مسنون کثرتِ استغفار",
    target: 100
  },
  {
    id: "astaghfirullah_alazeem_hayy",
    category: "astaghfar",
    title: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ (Great Astaghfar)",
    subTitle: "اسمِ اعظم کے ساتھ استغفار (گناہوں کی معافی)",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    meaningUrdu: "میں عظمت والے اللہ سے مغفرت چاہتا ہوں جس کے سوا کوئی معبود نہیں، جو ہمیشہ زندہ رہنے والا اور سب کو سنبھالنے والا ہے، اور میں اسی کی طرف رجوع کرتا ہوں۔",
    meaningEnglish: "I seek forgiveness of Allah the Magnificent, besides Whom there is no deity, the Ever-Living, the Sustainer, and I repent unto Him.",
    reference: "جامع الترمذی: 3577 • سنن ابی داود: 1517 (جس نے یہ پڑھا اس کے گناہ معاف کر دیے جاتے ہیں چاہے میدان جنگ سے بھاگا ہو)",
    target: 100
  },
  {
    id: "rabbi_ghfirli_wa_tub",
    category: "astaghfar",
    title: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ (Majlis Istighfar)",
    subTitle: "نبی کریم ﷺ کا ۱۰۰ بار مجلس کا استغفار",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    meaningUrdu: "اے میرے رب! مجھے بخش دے اور میری توبہ قبول فرما، بیشک تو ہی توبہ قبول کرنے والا اور بڑا رحم فرمانے والا ہے۔",
    meaningEnglish: "My Lord, forgive me and accept my repentance; indeed You are the Accepter of repentance, the Most Merciful.",
    reference: "سنن ابی داود: 1516 • جامع الترمذی: 3434 (رسول اللہ ﷺ ایک مجلس میں ۱۰۰ بار یہ کلمات پڑھتے تھے)",
    target: 100
  },
  {
    id: "dua_yunus_ayate_kareema",
    category: "astaghfar",
    title: "آیتِ کریمہ (Dua of Hazrat Yunus A.S)",
    subTitle: "پریشانی اور غم سے نجات کا وظیفہ",
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    meaningUrdu: "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بیشک میں ہی قصورواروں اور زیادتی کرنے والوں میں سے تھا۔",
    meaningEnglish: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    reference: "سورۃ الانبیاء: 87 • جامع الترمذی: 3505 (کوئی مسلمان ان الفاظ سے دعا کرے تو اللہ ضرور قبول فرماتا ہے)",
    target: 100
  },
  {
    id: "dua_adam_istighfar",
    category: "astaghfar",
    title: "دعائے حضرت آدم علیہ السلام (Dua of Adam A.S)",
    subTitle: "قرآنی دعائے مغفرت و رحمت",
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    meaningUrdu: "اے ہمارے پروردگار! ہم نے اپنی جانوں پر ظلم کیا، اور اگر تو نے ہمیں نہ بخشا اور ہم پر رحم نہ فرمایا تو ہم یقیناً نقصان پانے والوں میں سے ہو جائیں گے۔",
    meaningEnglish: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
    reference: "سورۃ الاعراف: 23 • قبولیتِ توبہ کی قرآنی دعا",
    target: 70
  },
  {
    id: "astaghfar_short",
    category: "astaghfar",
    title: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ (Daily Sunnah Istighfar)",
    subTitle: "روزانہ ۱۰۰ مرتبہ سنتِ نبوی ﷺ",
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    meaningUrdu: "میں اللہ سے بخشش طلب کرتا ہوں اور اسی کے حضور توبہ کرتا ہوں۔",
    meaningEnglish: "I ask Allah for forgiveness and I turn to Him in repentance.",
    reference: "صحیح البخاری: 6307 • صحیح مسلم: 2702 (نبی کریم ﷺ روزانہ ۱۰۰ بار استغفار فرماتے تھے)",
    target: 100
  },
  {
    id: "istighfar_parents",
    category: "astaghfar",
    title: "والدین کے لیے استغفار (Istighfar for Parents)",
    subTitle: "والدین اور مومنین کی مغفرت کی قرآنی دعا",
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    meaningUrdu: "اے ہمارے رب! مجھے اور میرے والدین کو اور سب ایمان والوں کو بخش دے جس دن حساب قائم ہو گا۔",
    meaningEnglish: "Our Lord, forgive me and my parents and the believers the Day the account is established.",
    reference: "سورۃ ابراہیم: 41 • دعائے ابراہیم علیہ السلام",
    target: 33
  },

  // --- 2. TASBIH & TAHMEED (تسبیح، تحمید و تکبیر) ---
  {
    id: "fatimah_cycle",
    category: "tasbih",
    title: "تَسْبِيحِ فَاطِمَة (Tasbih-e-Fatimah)",
    subTitle: "ہر نماز کے بعد مسنون تسبیح (33-33-34)",
    arabic: "سُبْحَانَ اللَّهِ (33) • الْحَمْدُ لِلَّهِ (33) • اللَّهُ أَكْبَرُ (34)",
    meaningUrdu: "۳۳ مرتبہ سبحان اللہ، ۳۳ مرتبہ الحمد للہ، ۳۴ مرتبہ اللہ اکبر۔ نماز کے بعد اور رات سونے سے پہلے کا عظیم ذکر۔",
    meaningEnglish: "33 times SubhanAllah, 33 times Alhamdulillah, 34 times Allahu Akbar. Prescribed after every prayer and at bedtime.",
    reference: "صحیح البخاری: 3705 • صحیح مسلم: 2727",
    target: 100
  },
  {
    id: "subhanallah",
    category: "tasbih",
    title: "سُبْحَانَ اللَّهِ (SubhanAllah)",
    subTitle: "اللہ پاک ہے اور ہر عیب سے منزہ ہے",
    arabic: "سُبْحَانَ اللَّهِ",
    meaningUrdu: "اللہ پاک ہے تمام عیوب اور کمزوریوں سے۔",
    meaningEnglish: "Glory be to Allah.",
    reference: "صحیح مسلم: 2698 (۱۰۰ بار کہنے پر ۱۰۰۰ نیکیاں لکھی جاتی ہیں یا ۱۰۰۰ گناہ مٹا دیے جاتے ہیں)",
    target: 33
  },
  {
    id: "alhamdulillah",
    category: "tasbih",
    title: "الْحَمْدُ لِلَّهِ (Alhamdulillah)",
    subTitle: "شکر و حمدِ الٰہی — ترازو کو بھر دینے والا کلمہ",
    arabic: "الْحَمْدُ لِلَّهِ",
    meaningUrdu: "تمام تعریفیں اور شکر گزاری صرف اللہ وحدہ لا شریک کے لیے ہے۔",
    meaningEnglish: "All praise and gratitude belong to Allah alone.",
    reference: "صحیح مسلم: 223 (والحمد للہ تملا المیزان — الحمد للہ میزان کو بھر دیتا ہے)",
    target: 33
  },
  {
    id: "allahuakbar",
    category: "tasbih",
    title: "اللَّهُ أَكْبَرُ (Allahu Akbar)",
    subTitle: "تکبیر — اللہ سب سے بڑا اور برتر ہے",
    arabic: "اللَّهُ أَكْبَرُ",
    meaningUrdu: "اللہ سب سے بڑا اور برتر و بالاتر ہے۔",
    meaningEnglish: "Allah is the Greatest.",
    reference: "صحیح مسلم • تسبیحاتِ مسنونہ",
    target: 34
  },
  {
    id: "kalimatani_habibatani",
    category: "tasbih",
    title: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    subTitle: "کلمتان حبیبتان الی الرحمٰن",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    meaningUrdu: "اللہ پاک ہے اپنی تعریف کے ساتھ، اللہ پاک ہے جو بہت عظمت والا ہے۔ زبان پر بہت ہلکے، میزان میں بہت بھاری اور رحمن کو بہت محبوب۔",
    meaningEnglish: "Glory be to Allah and His is the praise, glory be to Allah the Supreme. Beloved to the Most Merciful, heavy on the scales.",
    reference: "صحیح البخاری: 6407 • صحیح مسلم: 2694",
    target: 100
  },
  {
    id: "subhanallahi_wa_bihamdihi_100",
    category: "tasbih",
    title: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ (SubhanAllahi wa biHamdihi)",
    subTitle: "گناہوں کی معافی خواہ سمندر کے جھاگ برابر ہوں",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    meaningUrdu: "اللہ پاک ہے اپنی حمد اور تعریف کے ساتھ۔",
    meaningEnglish: "Glory be to Allah and praised be He.",
    reference: "صحیح البخاری: 6405 • صحیح مسلم: 2691 (روزانہ ۱۰۰ بار پڑھنے سے تمام صغیرہ گناہ معاف)",
    target: 100
  },
  {
    id: "la_hawla",
    category: "tasbih",
    title: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ (La Hawla)",
    subTitle: "جنت کے خزانوں میں سے ایک خزانہ",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    meaningUrdu: "گناہوں سے بچنے کی طاقت اور نیکی کرنے کی قوت صرف بلند و بالا عظمت والے اللہ کی توفیق سے ہے۔",
    meaningEnglish: "There is no might nor power except with Allah, the Most High, the Supreme.",
    reference: "صحیح البخاری: 6384 • کنز من کنوز الجنة",
    target: 100
  },
  {
    id: "al_baqiyat_as_salihat",
    category: "tasbih",
    title: "الْبَاقِيَاتُ الصَّالِحَاتُ (Four Great Praises)",
    subTitle: "دنیا و مافیہا سے زیادہ محبوب ذکر",
    arabic: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ",
    meaningUrdu: "اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے۔",
    meaningEnglish: "Glory be to Allah, all praise is due to Allah, there is no god but Allah, and Allah is the Greatest.",
    reference: "صحیح مسلم: 2695 (رسول اللہ ﷺ نے فرمایا: یہ مجھے ان تمام چیزوں سے زیادہ محبوب ہے جن پر سورج طلوع ہوتا ہے)",
    target: 100
  },
  {
    id: "tahlil_100",
    category: "tasbih",
    title: "تَہْلِیلِ تَام (Complete Tahlil)",
    subTitle: "۱۰ غلام آزاد کرنے اور ۱۰۰ برائیاں مٹانے کا اجر",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    meaningUrdu: "اللہ کے سوا کوئی عبادت کے لائق نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے، اور وہ ہر چیز پر قادر ہے۔",
    meaningEnglish: "There is no deity except Allah alone, without partner. His is the kingdom, and His is all praise, and He has power over all things.",
    reference: "صحیح البخاری: 3293 • صحیح مسلم: 2691 (روزانہ ۱۰۰ بار پڑھنے پر شیطان سے حفاظت اور ۱۰۰ نیکیاں)",
    target: 100
  },
  {
    id: "hasbunallah",
    category: "tasbih",
    title: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ (HasbunAllah)",
    subTitle: "کفایتِ الٰہی — حضرت ابراہیمؑ و صحابہؓ کا کلمہ",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ، نِعْمَ الْمَوْلَىٰ وَنِعْمَ النَّصِيرُ",
    meaningUrdu: "ہمیں اللہ ہی کافی ہے اور وہ بہترین کارساز ہے، بہترین مددگار اور بہترین حمایتی ہے۔",
    meaningEnglish: "Sufficient for us is Allah, and He is the best Disposer of affairs, the excellent Protector and Helper.",
    reference: "سورۃ آل عمران: 173 • صحیح البخاری: 4563",
    target: 100
  },
  {
    id: "tasbih_juwayriyah",
    category: "tasbih",
    title: "تَسْبِيحِ جُوَيْرِيَہؓ (Dhikr of Juwayriyah R.A)",
    subTitle: "تمام دن کی تسبیحات سے وزنی جامع ذکر",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
    meaningUrdu: "اللہ پاک ہے اپنی حمد کے ساتھ، اس کی مخلوق کی تعداد کے برابر، اس کی ذات کی رضا کے مطابق، اس کے عرش کے وزن کے برابر اور اس کے کلمات کی سیاہی کے برابر۔",
    meaningEnglish: "Glory be to Allah and His is the praise, according to the number of His creation, according to His pleasure, according to the weight of His Throne, and according to the ink of His words.",
    reference: "صحیح مسلم: 2726 • صبح ۳ بار پڑھنے کی سنت",
    target: 33
  },

  // --- 3. DUROOD SHARIF (درود شریف و صلوات) ---
  {
    id: "durood_ibrahimi",
    category: "durood",
    title: "درودِ ابراہیمی (Durood-e-Ibrahimi)",
    subTitle: "افضل ترین درودِ مسنونہ نماز والا",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    meaningUrdu: "اے اللہ! رحمت نازل فرما حضرت محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے رحمت نازل فرمائی حضرت ابراہیم علیہ السلام پر اور ان کی آل پر، بے شک تو تعریف کیا گیا بڑی شان والا ہے۔ اے اللہ! برکت نازل فرما حضرت محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے برکت نازل فرمائی حضرت ابراہیم علیہ السلام پر اور ان کی آل پر، بے شک تو تعریف کیا گیا بڑی شان والا ہے۔",
    meaningEnglish: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy and Majestic. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy and Majestic.",
    reference: "صحیح البخاری: 3370 • صحیح مسلم: 405",
    target: 100
  },
  {
    id: "durood_short",
    category: "durood",
    title: "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ (Mukhtasar Durood)",
    subTitle: "مختصر جامع درود شریف کثرت کے لیے",
    arabic: "صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ",
    meaningUrdu: "اللہ کی رحمتیں اور سلامتی نازل ہو آپ ﷺ پر اور آپ کی آل پر۔",
    meaningEnglish: "May Allah send blessings and peace upon him and his family.",
    reference: "صحیح مسلم: 384 (جس نے مجھ پر ایک بار درود بھیجا اللہ اس پر ۱۰ رحمتیں نازل فرماتا ہے)",
    target: 100
  },
  {
    id: "durood_pak_kamil",
    category: "durood",
    title: "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ (Durood-e-Pak)",
    subTitle: "آل اور اصحاب پر درود و سلام",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَىٰ آلِهِ وَصَحْبِهِ وَسَلِّمْ تَسْلِيمًا",
    meaningUrdu: "اے اللہ! رحمت نازل فرما ہمارے سردار حضرت محمد نبی امی پر اور ان کی آل اور اصحاب پر اور خوب سلامتی نازل فرما۔",
    meaningEnglish: "O Allah, bestow peace and blessings upon our Master Muhammad, the Unlettered Prophet, and upon his family and companions.",
    reference: "سنن ابی داود • فضائل الصلوات",
    target: 100
  },

  // --- 4. THE 6 KALIMAS (کلماتِ اسلام) ---
  {
    id: "kalima_1_tayyibah",
    category: "kalima",
    title: "الْكَلِمَةُ الطَّيِّبَةُ (First Kalima Tayyibah)",
    subTitle: "کلمہ پاک — اسلام کا پہلا بنیادی کلمہ",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَّسُولُ اللَّهِ",
    meaningUrdu: "اللہ کے سوا کوئی معبود نہیں، حضرت محمد ﷺ اللہ کے رسول ہیں۔",
    meaningEnglish: "There is no god but Allah, Muhammad ﷺ is the Messenger of Allah.",
    reference: "صحیح البخاری • مفتاح الجنۃ",
    target: 100
  },
  {
    id: "kalima_2_shahadat",
    category: "kalima",
    title: "كَلِمَةُ الشَّهَادَةِ (Second Kalima Shahadat)",
    subTitle: "کلمہ شہادت — گواہی کا کلمہ",
    arabic: "أَشْهَدُ أَنْ لَّا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    meaningUrdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ حضرت محمد ﷺ اس کے بندے اور رسول ہیں۔",
    meaningEnglish: "I bear witness that there is no god but Allah, He is One without partner, and I bear witness that Muhammad ﷺ is His servant and Messenger.",
    reference: "صحیح مسلم: 234 (وضو کے بعد پڑھنے پر جنت کے آٹھوں دروازے کھل جاتے ہیں)",
    target: 33
  },
  {
    id: "kalima_3_tamjeed",
    category: "kalima",
    title: "كَلِمَةُ التَّمْجِيدِ (Third Kalima Tamjeed)",
    subTitle: "کلمہ تمجید — بزرگی و عظمت کا کلمہ",
    arabic: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    meaningUrdu: "اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، اللہ سب سے بڑا ہے، اور گناہوں سے بچنے کی طاقت اور نیکی کی قوت صرف بلند و برتر اللہ کی طرف سے ہے۔",
    meaningEnglish: "Exalted is Allah, all praise is for Allah, there is no deity but Allah, Allah is the Greatest, and there is no power or might except with Allah, the Most High, the Supreme.",
    reference: "صحیح ابن حبان • تسبیحاتِ تمجید",
    target: 33
  },
  {
    id: "kalima_4_tawheed",
    category: "kalima",
    title: "كَلِمَةُ التَّوْحِيدِ (Fourth Kalima Tawheed)",
    subTitle: "کلمہ توحید — یکتائی کا اقرار",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَّا يَمُوتُ أَبَدًا أَبَدًا، ذُو الْجَلَالِ وَالْإِكْرَامِ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    meaningUrdu: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے حمد ہے، وہی جلاتا ہے اور وہی مارتا ہے اور وہ ہمیشہ زندہ رہنے والا ہے جسے کبھی موت نہیں آنی، وہ عظمت اور بزرگی والا ہے، اسی کے ہاتھ میں تمام بھلائی ہے اور وہ ہر چیز پر کامل قدرت رکھتا ہے۔",
    meaningEnglish: "There is no god but Allah alone, without partner. His is the sovereignty and His is the praise. He gives life and causes death, and He is Ever-Living and never dies. Possessor of Majesty and Honor. In His hand is all good, and He has power over all things.",
    reference: "جامع الترمذی: 3428 • دعائے بازار",
    target: 33
  },
  {
    id: "kalima_5_astaghfar",
    category: "kalima",
    title: "كَلِمَةُ الاسْتِغْفَارِ (Fifth Kalima Astaghfar)",
    subTitle: "کلمہ استغفار — بخشش طلب کرنے کا کلمہ",
    arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً، وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ، إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    meaningUrdu: "میں اپنے پروردگار اللہ سے اپنے ہر اس گناہ کی بخشش مانگتا ہوں جو میں نے جان بوجھ کر کیا یا بھول کر، چھپ کر کیا یا اعلانیہ، اور میں اس کی بارگاہ میں ہر اس گناہ سے توبہ کرتا ہوں جس کا مجھے علم ہے اور ہر اس گناہ سے جس کا مجھے علم نہیں، بے شک تو ہی غیبوں کو جاننے والا، عیبوں کو چھپانے والا اور گناہوں کو بخشنے والا ہے، اور گناہوں سے بچنے اور نیکی کرنے کی طاقت صرف بلند و برتر اللہ کی مدد سے ہے۔",
    meaningEnglish: "I seek forgiveness from Allah, my Lord, for every sin I committed knowingly or unknowingly, secretly or openly, and I repent unto Him from sins I know and sins I do not know. Truly You are the Knower of the unseen, the Concealer of faults, and the Forgiver of sins; there is no power nor might except with Allah, the Most High, the Supreme.",
    reference: "مستند دعائے استغفار برصغیر و کتبِ اذکار",
    target: 33
  },
  {
    id: "kalima_6_radde_kufr",
    category: "kalima",
    title: "كَلِمَةُ رَدِّ الْكُفْرِ (Sixth Kalima Radde Kufr)",
    subTitle: "کلمہ رد کفر — کفر و شرک سے برات کا کلمہ",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ، تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكِذْبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا، وَأَسْلَمْتُ وَأَقُولُ: لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَّسُولُ اللَّهِ",
    meaningUrdu: "اے اللہ! میں تیری پناہ مانگتا ہوں اس بات سے کہ میں جان بوجھ کر کسی چیز کو تیرا شریک ٹھہراؤں، اور میں تجھ سے بخشش مانگتا ہوں اس شرک سے جس کا مجھے علم نہیں۔ میں نے اس سے توبہ کی اور بیزاری کا اظہار کیا کفر، شرک، جھوٹ، غیبت، بدعت، چغلی، بے حیائی، بہتان اور تمام گناہوں سے، اور میں نے اسلام قبول کیا اور کہتا ہوں: اللہ کے سوا کوئی معبود نہیں، حضرت محمد ﷺ اللہ کے رسول ہیں۔",
    meaningEnglish: "O Allah, I seek refuge in You from knowingly associating any partner with You, and I seek Your forgiveness for what I do not know. I repent from it and disown disbelief, polytheism, falsehood, backbiting, bid'ah, tale-bearing, obscenities, slanders, and all sins. I have submitted to Islam and I proclaim: There is no god but Allah, Muhammad ﷺ is the Messenger of Allah.",
    reference: "الادب المفرد للبخاری: 716 • مسند احمد",
    target: 33
  },

  // --- 5. MASNOON DUAS (مسنون دعائیں) ---
  {
    id: "ya_hayyu_ya_qayyum",
    category: "dua",
    title: "يَا حَيُّ يَا قَيُّومُ (Ism-e-Azam Dua)",
    subTitle: "رحمت و مدد طلب کرنے کی جامع مسنون دعا",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    meaningUrdu: "اے ہمیشہ زندہ رہنے والے! اے تمام کائنات کو سنبھالنے والے! میں تیری ہی رحمت کے وسیلے سے فریاد کرتا ہوں، تو میرے تمام حالات درست فرما دے اور پلک جھپکنے کی دیر کے لیے بھی مجھے میرے نفس کے حوالے نہ فرما۔",
    meaningEnglish: "O Ever-Living, O Sustainer, by Your mercy I seek assistance; rectify for me all of my affairs and do not leave me to myself even for the blink of an eye.",
    reference: "جامع الترمذی: 3524 • مسنن نسائی الکبری",
    target: 33
  },
  {
    id: "dua_laylatul_qadr",
    category: "dua",
    title: "دعائے شبِ قدر و رمضان (Laylatul Qadr Dua)",
    subTitle: "عفو و درگزر کی دعا — ام المؤمنین عائشہؓ کی روایت",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    meaningUrdu: "اے اللہ! بیشک تو بہت معاف فرمانے والا ہے، معاف کرنے کو پسند فرماتا ہے، پس مجھ سے درگزر فرما اور مجھے معاف فرما۔",
    meaningEnglish: "O Allah, You are Most Forgiving and You love to forgive, so forgive me.",
    reference: "جامع الترمذی: 3513 • سنن ابن ماجہ: 3850",
    target: 100
  },
  {
    id: "dua_dunya_akhirah",
    category: "dua",
    title: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً (Dua of Both Worlds)",
    subTitle: "دنیا و آخرت کی جامع ترین قرآنی دعا",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    meaningUrdu: "اے ہمارے پروردگار! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔",
    meaningEnglish: "Our Lord, grant us in this world that which is good and in the Hereafter that which is good and protect us from the torment of the Fire.",
    reference: "سورۃ البقرۃ: 201 • صحیح البخاری: 4522 (نبی کریم ﷺ کی کثرت سے پڑھی جانے والی دعا)",
    target: 100
  },
  {
    id: "dua_musa_sharah_sadr",
    category: "dua",
    title: "رَبِّ اشْرَحْ لِي صَدْرِي (Dua of Musa A.S)",
    subTitle: "شرحِ صدر، آسانی اور فصاحتِ بیان کی دعا",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي ، وَيَسِّرْ لِي أَمْرِي ، وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي ، يَفْقَهُوا قَوْلِي",
    meaningUrdu: "اے میرے رب! میرے لیے میرا سینہ کھول دے، اور میرا کام میرے لیے آسان فرما دے، اور میری زبان کی گرہ کھول دے تاکہ وہ میری بات سمجھ سکیں۔",
    meaningEnglish: "My Lord, expand for me my breast, ease for me my task, and untie the knot from my tongue that they may understand my speech.",
    reference: "سورۃ طہٰ: 25-28 • قرآنی دعا",
    target: 33
  }
];

// 100% Guaranteed Local Offline Azan Audio Files
const AZAN_VOICES = [
  {
    id: "madinah",
    title: "Masjid Nabawi Madinah",
    muezzin: "Sheikh Essam Bukhari (شیخ عصام بخاری)",
    audio: "assets/audio/azan_madinah.mp3"
  },
  {
    id: "makkah",
    title: "Haram Makkah Mukarrama",
    muezzin: "Sheikh Ali Mulla (شیخ علی ملا)",
    audio: "assets/audio/azan_makkah.mp3"
  },
  {
    id: "alafasy",
    title: "Sheikh Mishary Rashid Alafasy",
    muezzin: "Mishary Alafasy (مشاري راشد العفاسي)",
    audio: "assets/audio/azan_alafasy.mp3"
  },
  {
    id: "alaqsa",
    title: "Masjid Al-Aqsa, Al-Quds",
    muezzin: "Al-Aqsa Historical Muezzin",
    audio: "assets/audio/azan_alaqsa.mp3"
  }
];
