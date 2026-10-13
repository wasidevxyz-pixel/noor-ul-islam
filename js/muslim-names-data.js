/**
 * ============================================================================
 * NOOR AL-ISLAM — AUTHENTIC MUSLIM BABY NAMES & MEANINGS EXPLORER
 * أسماء الأولاد والبنات الإسلامية مع المعاني باللغتين العربية والأردية والإنجليزية
 * ============================================================================
 */

const MUSLIM_NAMES_DB = [
  // ===================== BOYS NAMES (لڑکوں کے اسلامی نام) =====================
  {
    name: "Muhammad",
    arabic: "مُحَمَّد",
    urdu: "محمد",
    gender: "boy",
    meaningEn: "Praiseworthy, the most praised, glorified",
    meaningUr: "بہت زیادہ تعریف کیا گیا، جس کی تعریف کی گئی ہو، قابلِ ستائش",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic", "Best Name"],
    blessedNote: "The blessed and holy name of the Final Messenger of Allah, Hazrat Muhammad Mustafa ﷺ."
  },
  {
    name: "Ahmad",
    arabic: "أَحْمَد",
    urdu: "احمد",
    gender: "boy",
    meaningEn: "Most commendable, one who praises Allah constantly",
    meaningUr: "سب سے زیادہ تعریف کرنے والا، لائقِ ستائش",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"],
    blessedNote: "Prophetic name mentioned in Surah As-Saff (61:6)."
  },
  {
    name: "Ali",
    arabic: "عَلِيّ",
    urdu: "علی",
    gender: "boy",
    meaningEn: "High, elevated, champion, sublime",
    meaningUr: "بلند مرتبہ، اعلیٰ، برتر، بہادر",
    origin: "Arabic",
    tags: ["Sahabi", "Asadullah"],
    blessedNote: "Hazrat Ali ibn Abi Talib (RA), the fourth Righteous Caliph and Asadullah (Lion of Allah)."
  },
  {
    name: "Umar",
    arabic: "عُمَر",
    urdu: "عمر",
    gender: "boy",
    meaningEn: "Long-lived, flourishing, prosperous",
    meaningUr: "طویل عمر پانے والا، آباد، زندہ دل",
    origin: "Arabic",
    tags: ["Sahabi", "Farooq-e-Azam"],
    blessedNote: "Hazrat Umar Farooq (RA), the second Righteous Caliph of Islam."
  },
  {
    name: "Usman",
    arabic: "عُثْمَان",
    urdu: "عثمان",
    gender: "boy",
    meaningEn: "Wise, intuitive, noble young bird",
    meaningUr: "عقلمند، دانشمند، خوبصورت نوجوان",
    origin: "Arabic",
    tags: ["Sahabi", "Zun-Noorain"],
    blessedNote: "Hazrat Usman ibn Affan (RA), the third Caliph of Islam (Zun-Noorain)."
  },
  {
    name: "Abu Bakr",
    arabic: "أَبُو بَكْر",
    urdu: "ابوبکر",
    gender: "boy",
    meaningEn: "Noble leader, father of the young camel",
    meaningUr: "شریف النسب، دانشمند، اول خلیفہ",
    origin: "Arabic",
    tags: ["Sahabi", "Siddiq-e-Akbar"],
    blessedNote: "Hazrat Abu Bakr As-Siddiq (RA), closest companion of the Prophet ﷺ."
  },
  {
    name: "Hassan",
    arabic: "حَسَن",
    urdu: "حسن",
    gender: "boy",
    meaningEn: "Handsome, beautiful, good-mannered, virtuous",
    meaningUr: "خوبصورت، نیک خصال، عمدہ، بہترین",
    origin: "Arabic",
    tags: ["Ahl al-Bayt", "Beloved"],
    blessedNote: "Hazrat Imam Hassan (RA), beloved grandson of Prophet Muhammad ﷺ."
  },
  {
    name: "Hussain",
    arabic: "حُسَيْن",
    urdu: "حسین",
    gender: "boy",
    meaningEn: "Extremely handsome, noble, brave prince",
    meaningUr: "بہت خوبصورت، صاحبِ وقار، سید الشہداء",
    origin: "Arabic",
    tags: ["Ahl al-Bayt", "Sayyid-ush-Shuhada"],
    blessedNote: "Hazrat Imam Hussain (RA), Sayyid-ush-Shuhada, grandson of Prophet Muhammad ﷺ."
  },
  {
    name: "Ibrahim",
    arabic: "إِبْرَاهِيم",
    urdu: "ابراہیم",
    gender: "boy",
    meaningEn: "Father of nations, intimate friend of Allah (Khalilullah)",
    meaningUr: "امتوں کا باپ، خلیل اللہ، برگزیدہ نبی",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"],
    blessedNote: "Prophet Ibrahim (AS), Khalilullah (Friend of Allah)."
  },
  {
    name: "Ismail",
    arabic: "إِسْمَاعِيل",
    urdu: "اسماعیل",
    gender: "boy",
    meaningEn: "God hears, obedient, patient",
    meaningUr: "اللہ نے دعا سن لی، فرماں بردار، صابر",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Zabihullah"],
    blessedNote: "Prophet Ismail (AS), Zabihullah, son of Prophet Ibrahim (AS)."
  },
  {
    name: "Rayyan",
    arabic: "رَيَّان",
    urdu: "ریان",
    gender: "boy",
    meaningEn: "Luxuriant, gate of Paradise reserved for fasting believers",
    meaningUr: "سیراب، تروتازہ، جنت کا وہ مخصوص دروازہ جس سے روزہ دار داخل ہوں گے",
    origin: "Arabic / Hadith",
    tags: ["Jannah", "Popular"],
    blessedNote: "Ar-Rayyan is the special gate of Jannah mentioned in Sahih Bukhari (1896)."
  },
  {
    name: "Zayan",
    arabic: "زَيَّان",
    urdu: "زیان",
    gender: "boy",
    meaningEn: "Graceful, beautifier, one who adorns things",
    meaningUr: "خوبصورت بنانے والا، زینت بخشنے والا، دلکش",
    origin: "Arabic",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Ayan",
    arabic: "عَيَّان",
    urdu: "عیان",
    gender: "boy",
    meaningEn: "God's gift, clear, evident, perceiving",
    meaningUr: "اللہ کا تحفہ، واضح، روشن، باصلاحیت",
    origin: "Arabic / Quranic",
    tags: ["Popular", "Quranic"]
  },
  {
    name: "Hamza",
    arabic: "حَمْزَة",
    urdu: "حمزہ",
    gender: "boy",
    meaningEn: "Lion, strong, steadfast, brave warrior",
    meaningUr: "شیر، طاقتور، بہادر، قائد",
    origin: "Arabic",
    tags: ["Sahabi", "Asadullah"],
    blessedNote: "Hazrat Hamza ibn Abdul-Muttalib (RA), beloved uncle of the Prophet ﷺ and Chief of Martyrs."
  },
  {
    name: "Bilal",
    arabic: "بِلَال",
    urdu: "بلال",
    gender: "boy",
    meaningEn: "Moisture, freshness, water of life",
    meaningUr: "تر و تازہ، شاداب، نمی",
    origin: "Arabic",
    tags: ["Sahabi", "Muezzin-e-Rasool"],
    blessedNote: "Hazrat Bilal ibn Rabah (RA), the first Muezzin of Islam and beloved companion."
  },
  {
    name: "Zayd",
    arabic: "زَيْد",
    urdu: "زید",
    gender: "boy",
    meaningEn: "Abundance, growth, progress, increment",
    meaningUr: "بڑھوتری، کثرت، ترقی، برکت والا",
    origin: "Arabic / Quranic",
    tags: ["Sahabi", "Quranic"],
    blessedNote: "Hazrat Zayd ibn Harithah (RA), the only Sahabi mentioned explicitly by name in the Quran (33:37)."
  },
  {
    name: "Khalid",
    arabic: "خَالِد",
    urdu: "خالد",
    gender: "boy",
    meaningEn: "Eternal, everlasting, undefeated sword of Allah",
    meaningUr: "ہمیشہ رہنے والا، لافانی، سیف اللہ",
    origin: "Arabic",
    tags: ["Sahabi", "Saifullah"],
    blessedNote: "Hazrat Khalid ibn al-Walid (RA), Saifullah (The Unsheathed Sword of Allah)."
  },
  {
    name: "Taha",
    arabic: "طه",
    urdu: "طٰہٰ",
    gender: "boy",
    meaningEn: "Pure, noble, title of Prophet Muhammad ﷺ",
    meaningUr: "پاک، برگزیدہ، رسول اللہ ﷺ کا مبارک لقب",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Prophetic Title"],
    blessedNote: "Named after Surah Ta-Ha (20) in the Holy Quran."
  },
  {
    name: "Yasin",
    arabic: "يس",
    urdu: "یاسین",
    gender: "boy",
    meaningEn: "Heart of the Quran, title of Prophet Muhammad ﷺ",
    meaningUr: "قرآن کا دل، حضور اکرم ﷺ کا مبارک اسمِ گرامی",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Prophetic Title"],
    blessedNote: "Named after Surah Ya-Sin (36), the Heart of the Quran."
  },
  {
    name: "Daniyal",
    arabic: "دَانِيَال",
    urdu: "دانیال",
    gender: "boy",
    meaningEn: "Intelligent, wise, God is my judge",
    meaningUr: "دانا، عقل مند، اللہ میرا منصف ہے",
    origin: "Arabic",
    tags: ["Prophet", "Popular"]
  },
  {
    name: "Arham",
    arabic: "أَرْحَم",
    urdu: "ارحم",
    gender: "boy",
    meaningEn: "Most merciful, most compassionate, kindest",
    meaningUr: "سب سے زیادہ رحم کرنے والا، انتہائی مہربان",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"],
    blessedNote: "Mentioned in the Quran: 'Arhamur-Rahimeen' (The Most Merciful of the merciful)."
  },
  {
    name: "Shahzain",
    arabic: "شَاهْزَيْن",
    urdu: "شاہ زین",
    gender: "boy",
    meaningEn: "Brave king, crown of beauty and elegance",
    meaningUr: "بہادر بادشاہ، حسن و خوبصورتی کا تاج",
    origin: "Persian / Arabic",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Rohaan",
    arabic: "رَوْحَان",
    urdu: "روحان",
    gender: "boy",
    meaningEn: "Spiritual, pure soul, merciful, fragrance of Paradise",
    meaningUr: "پاکیزہ روح، روحانیت والا، خوشبو",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"]
  },
  {
    name: "Shayan",
    arabic: "شَايَان",
    urdu: "شایان",
    gender: "boy",
    meaningEn: "Worthy, deserving, suitable, noble",
    meaningUr: "لائق، سزاوار، موزوں، قابلِ قدر",
    origin: "Persian",
    tags: ["Popular"]
  },
  {
    name: "Farhan",
    arabic: "فَرْحَان",
    urdu: "فرحان",
    gender: "boy",
    meaningEn: "Joyful, cheerful, happy, delighted",
    meaningUr: "خوش، مسرور، شادمان، مسکراتا ہوا",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Anas",
    arabic: "أَنَس",
    urdu: "انس",
    gender: "boy",
    meaningEn: "Affectionate, friendly, companion, love",
    meaningUr: "محبت کرنے والا، مونس و غمخوار، دوست",
    origin: "Arabic",
    tags: ["Sahabi"],
    blessedNote: "Hazrat Anas ibn Malik (RA), faithful companion and servant of the Prophet ﷺ."
  },
  {
    name: "Talha",
    arabic: "طَلْحَة",
    urdu: "طلحہ",
    gender: "boy",
    meaningEn: "Fruitful tree of Paradise, blessed warrior",
    meaningUr: "جنت کا پھلدار درخت، سخی، فیاض",
    origin: "Arabic",
    tags: ["Sahabi", "Ashara Mubashara"],
    blessedNote: "Hazrat Talha ibn Ubaydullah (RA), one of the ten promised Paradise (Ashara Mubashara)."
  },
  {
    name: "Zubair",
    arabic: "زُبَيْر",
    urdu: "زبیر",
    gender: "boy",
    meaningEn: "Strong, fierce lion, loyal disciple",
    meaningUr: "مضبوط، بہادر، عقلمند",
    origin: "Arabic",
    tags: ["Sahabi", "Hawari-e-Rasool"],
    blessedNote: "Hazrat Zubair ibn al-Awwam (RA), Hawari-e-Rasool (Disciple of the Messenger ﷺ)."
  },
  {
    name: "Saad",
    arabic: "سَعْد",
    urdu: "سعد",
    gender: "boy",
    meaningEn: "Felicity, good fortune, prosperous, blessed",
    meaningUr: "خوش بخت، مبارک، نیک قسمت",
    origin: "Arabic",
    tags: ["Sahabi", "Ashara Mubashara"],
    blessedNote: "Hazrat Saad ibn Abi Waqqas (RA), one of the earliest Muslims and promised Paradise."
  },
  {
    name: "Abdullah",
    arabic: "عَبْدُ اللَّهِ",
    urdu: "عبد اللہ",
    gender: "boy",
    meaningEn: "Servant of Allah (Beloved name to Allah)",
    meaningUr: "اللہ کا بندہ، انتہائی پسندیدہ نام",
    origin: "Arabic / Hadith",
    tags: ["Beloved to Allah", "Quranic"],
    blessedNote: "The Prophet ﷺ said: 'The most beloved names to Allah are Abdullah and Abdur-Rahman.' (Sahih Muslim 2132)."
  },
  {
    name: "Abdul Rahman",
    arabic: "عَبْدُ الرَّحْمَن",
    urdu: "عبد الرحمن",
    gender: "boy",
    meaningEn: "Servant of the Most Compassionate",
    meaningUr: "نہایت رحم فرمانے والے اللہ کا بندہ",
    origin: "Arabic / Hadith",
    tags: ["Beloved to Allah", "Asma-ul-Husna"],
    blessedNote: "Beloved name to Allah reported in Sahih Muslim."
  },
  {
    name: "Abdul Malik",
    arabic: "عَبْدُ الْمَلِك",
    urdu: "عبد الملک",
    gender: "boy",
    meaningEn: "Servant of the Sovereign King",
    meaningUr: "حقیقی بادشاہ (اللہ) کا بندہ",
    origin: "Arabic",
    tags: ["Asma-ul-Husna"]
  },
  {
    name: "Abdul Aziz",
    arabic: "عَبْدُ الْعَزِيز",
    urdu: "عبد العزیز",
    gender: "boy",
    meaningEn: "Servant of the Almighty and Honorable",
    meaningUr: "سب پر غالب اور باعزت ذات (اللہ) کا بندہ",
    origin: "Arabic",
    tags: ["Asma-ul-Husna"]
  },
  {
    name: "Musa",
    arabic: "مُوسَى",
    urdu: "موسیٰ",
    gender: "boy",
    meaningEn: "Drawn out of the water, Kalimullah (The one who spoke to Allah)",
    meaningUr: "کلیم اللہ، پانی سے نکالا گیا، برگزیدہ پیغمبر",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"],
    blessedNote: "Prophet Musa (AS), Kalimullah."
  },
  {
    name: "Isa",
    arabic: "عِيسَى",
    urdu: "عیسیٰ",
    gender: "boy",
    meaningEn: "God is salvation, Ruhullah (Spirit from Allah)",
    meaningUr: "روح اللہ، کلمۃ اللہ، اللہ کا برگزیدہ نبی",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"],
    blessedNote: "Prophet Isa ibn Maryam (AS)."
  },
  {
    name: "Yusuf",
    arabic: "يُوسُف",
    urdu: "یوسف",
    gender: "boy",
    meaningEn: "God increases, symbol of extraordinary beauty and patience",
    meaningUr: "حسن و جمال کا پیکر، اللہ اضافہ فرماتا ہے",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"],
    blessedNote: "Prophet Yusuf (AS), renowned for unmatched beauty and piety."
  },
  {
    name: "Ammar",
    arabic: "عَمَّار",
    urdu: "عمار",
    gender: "boy",
    meaningEn: "One who builds up faith, pious, long of life",
    meaningUr: "ایمان کی عمارت بلند کرنے والا، پرہیزگار، دیندار",
    origin: "Arabic",
    tags: ["Sahabi"],
    blessedNote: "Hazrat Ammar ibn Yasir (RA), early hero and martyr of Islam."
  },
  {
    name: "Salman",
    arabic: "سَلْمَان",
    urdu: "سلمان",
    gender: "boy",
    meaningEn: "Safe, secure, peaceful, seeker of truth",
    meaningUr: "محفوظ، سلامتی والا، حق کا متلاشی",
    origin: "Arabic",
    tags: ["Sahabi", "Ahl al-Bayt"],
    blessedNote: "Hazrat Salman al-Farsi (RA), whom the Prophet ﷺ declared part of his family."
  },
  {
    name: "Tariq",
    arabic: "طَارِق",
    urdu: "طارق",
    gender: "boy",
    meaningEn: "Morning star, radiant visitor who knocks at night",
    meaningUr: "صبح کا روشن ستارہ، اندھیرے میں راستہ دکھانے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic"],
    blessedNote: "Surah At-Tariq (86:1)."
  },
  {
    name: "Zulqarnain",
    arabic: "ذُو الْقَرْنَيْن",
    urdu: "ذوالقرنین",
    gender: "boy",
    meaningEn: "Possessor of the two horns (east and west), righteous king",
    meaningUr: "مشرق و مغرب کا فاتح، عادل و نیک فرمانروا",
    origin: "Arabic / Quranic",
    tags: ["Quranic"],
    blessedNote: "Righteous king mentioned in Surah Al-Kahf (18:83)."
  },
  {
    name: "Ahsan",
    arabic: "أَحْسَن",
    urdu: "احسن",
    gender: "boy",
    meaningEn: "Most excellent, best, superior, finest",
    meaningUr: "سب سے بہترین، نہایت عمدہ، خوبصورت ترین",
    origin: "Arabic / Quranic",
    tags: ["Quranic"]
  },
  {
    name: "Azan",
    arabic: "أَذَان",
    urdu: "اذان",
    gender: "boy",
    meaningEn: "Call to prayer, announcement of truth",
    meaningUr: "نماز کی پکار، اعلانِ حق، بیداری کا پیغام",
    origin: "Arabic",
    tags: ["Popular"]
  },

  // ===================== GIRLS NAMES (لڑکیوں کے اسلامی نام) =====================
  {
    name: "Fatima",
    arabic: "فَاطِمَة",
    urdu: "فاطمہ",
    gender: "girl",
    meaningEn: "Chaste, one who abstains, mother of virtues",
    meaningUr: "پاکدامن، برائیوں سے محفوظ رہنے والی، جنتی خواتین کی سردار",
    origin: "Arabic",
    tags: ["Sayyidat-un-Nisa", "Ahl al-Bayt", "Beloved"],
    blessedNote: "Hazrat Fatima Az-Zahra (RA), beloved youngest daughter of Prophet Muhammad ﷺ and leader of women in Jannah."
  },
  {
    name: "Ayesha",
    arabic: "عَائِشَة",
    urdu: "عائشہ",
    gender: "girl",
    meaningEn: "Living, prosperous, one who lives well, vibrant",
    meaningUr: "خوشحال، پرسکون زندگی گزارنے والی، ام المؤمنین",
    origin: "Arabic",
    tags: ["Umm al-Mu'minin", "Scholar"],
    blessedNote: "Hazrat Ayesha Siddiqa (RA), beloved wife of the Prophet ﷺ and greatest female scholar in Islam."
  },
  {
    name: "Khadija",
    arabic: "خَدِيجَة",
    urdu: "خدیجہ",
    gender: "girl",
    meaningEn: "Trustworthy, early blessed, pure lady",
    meaningUr: "خوش نصیب، طاہرہ، اول ام المؤمنین",
    origin: "Arabic",
    tags: ["Umm al-Mu'minin", "Tahira"],
    blessedNote: "Hazrat Khadija al-Kubra (RA), the first believer and devoted wife of the Prophet ﷺ."
  },
  {
    name: "Maryam",
    arabic: "مَرْيَم",
    urdu: "مریم",
    gender: "girl",
    meaningEn: "Pious, devoted worshipper of God, chaste",
    meaningUr: "عبادت گزار، پاکدامن، عفت مآب",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Best Women"],
    blessedNote: "Hazrat Maryam (AS), mother of Prophet Isa (AS), only woman named in the Quran."
  },
  {
    name: "Zainab",
    arabic: "زَيْنَب",
    urdu: "زینب",
    gender: "girl",
    meaningEn: "Adornment of the father, fragrant beautiful tree of Paradise",
    meaningUr: "باپ کی زینت، خوشبودار خوبصورت پھول",
    origin: "Arabic",
    tags: ["Ahl al-Bayt", "Beloved"],
    blessedNote: "Daughter and granddaughter of the Prophet Muhammad ﷺ (Hazrat Zainab bint Muhammad & Hazrat Zainab bint Ali)."
  },
  {
    name: "Hafsa",
    arabic: "حَفْصَة",
    urdu: "حفصہ",
    gender: "girl",
    meaningEn: "Young lioness, protector, gatherer of Quran",
    meaningUr: "شیرنی کا بچہ، بہادر، امانت دار، محافظِ قرآن",
    origin: "Arabic",
    tags: ["Umm al-Mu'minin"],
    blessedNote: "Hazrat Hafsa bint Umar (RA), Mother of the Believers, who preserved the original written Quran."
  },
  {
    name: "Noor",
    arabic: "نُور",
    urdu: "نور",
    gender: "girl",
    meaningEn: "Divine light, radiance, illumination",
    meaningUr: "روشنی، چمک، اجالا، تجلی",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"],
    blessedNote: "Mentioned in Surah An-Nur (24:35): 'Allahu Nurus-Samawati wal-Ard'."
  },
  {
    name: "Inaya",
    arabic: "عِنَايَة",
    urdu: "عنایہ",
    gender: "girl",
    meaningEn: "Care, grace, solicitude, divine protection from Allah",
    meaningUr: "توجہ، عنایت، اللہ کی نگہبانی و رحمت",
    origin: "Arabic",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Hoorain",
    arabic: "حُور عِين",
    urdu: "حورین",
    gender: "girl",
    meaningEn: "Beautiful eyed maidens of Paradise",
    meaningUr: "خوبصورت اور کشادہ آنکھوں والی، جنتی حور",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"],
    blessedNote: "Mentioned in Surah At-Tur (52:20) and Surah Al-Waqiah."
  },
  {
    name: "Zoya",
    arabic: "زُويَا",
    urdu: "زویا",
    gender: "girl",
    meaningEn: "Loving, caring, alive, full of life",
    meaningUr: "محبت کرنے والی، زندگی سے بھرپور، زندہ دل",
    origin: "Arabic / Persian",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Anum",
    arabic: "أَنْعُم",
    urdu: "انعم",
    gender: "girl",
    meaningEn: "Blessing of God, gift, favor",
    meaningUr: "اللہ کی نعمت، فضل، انعام",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"]
  },
  {
    name: "Hania",
    arabic: "هَانِيَة",
    urdu: "ہانیہ",
    gender: "girl",
    meaningEn: "Happy, pleasant, contented, delighted",
    meaningUr: "خوش و خرم، مسرور، پرمسرت، پرسکون",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Dua",
    arabic: "دُعَاء",
    urdu: "دعا",
    gender: "girl",
    meaningEn: "Supplication, prayer, calling upon Allah",
    meaningUr: "التجا، عبادت کا مغز، اللہ سے مانگنا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"],
    blessedNote: "The Prophet ﷺ said: 'Dua is the essence of worship.' (Tirmidhi)."
  },
  {
    name: "Jannat",
    arabic: "جَنَّة",
    urdu: "جنت",
    gender: "girl",
    meaningEn: "Paradise, heavenly lush garden of eternity",
    meaningUr: "فردوس، بہشت، سرسبز باغ",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"]
  },
  {
    name: "Ayra",
    arabic: "عَيْرَة",
    urdu: "آئرہ",
    gender: "girl",
    meaningEn: "Noble, respectful, eye-opening",
    meaningUr: "معزز، باوقار، قابلِ احترام",
    origin: "Arabic",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Zara",
    arabic: "زَهْرَة",
    urdu: "زارا / زہرہ",
    gender: "girl",
    meaningEn: "Radiant blooming flower, princess, glowing",
    meaningUr: "کھلتا ہوا پھول، چمکدار کلی، شہزادی",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Mahnoor",
    arabic: "مَاهْ نُور",
    urdu: "ماہ نور",
    gender: "girl",
    meaningEn: "Moonlight, radiance of the glowing full moon",
    meaningUr: "چاند کی روشنی، چاند کا نور",
    origin: "Persian / Arabic",
    tags: ["Popular"]
  },
  {
    name: "Ruqayyah",
    arabic: "رُقَيَّة",
    urdu: "رقیہ",
    gender: "girl",
    meaningEn: "Gentle, ascending, charming, elevated",
    meaningUr: "بلند مرتبہ، نرم خو، دلکش",
    origin: "Arabic",
    tags: ["Ahl al-Bayt", "Beloved"],
    blessedNote: "Hazrat Ruqayyah (RA), beloved daughter of the Prophet Muhammad ﷺ and wife of Hazrat Usman (RA)."
  },
  {
    name: "Umm Kulthum",
    arabic: "أُمّ كُلْثُوم",
    urdu: "ام کلثوم",
    gender: "girl",
    meaningEn: "One with pleasant healthy cheeks, noble lady",
    meaningUr: "خوش رو، خوبصورت چہرے والی، برگزیدہ خاتون",
    origin: "Arabic",
    tags: ["Ahl al-Bayt"],
    blessedNote: "Beloved daughter of Prophet Muhammad ﷺ."
  },
  {
    name: "Asma",
    arabic: "أَسْمَاء",
    urdu: "اسماء",
    gender: "girl",
    meaningEn: "Exalted, high-status, possessor of virtues",
    meaningUr: "بلند مرتبہ، صفات والی، ذات النطاقین",
    origin: "Arabic",
    tags: ["Sahabiya", "Zat-un-Nitaqayn"],
    blessedNote: "Hazrat Asma bint Abi Bakr (RA), known as Zat-un-Nitaqayn (She of the Two Waistbelts)."
  },
  {
    name: "Sumayyah",
    arabic: "سُمَيَّة",
    urdu: "سمیہ",
    gender: "girl",
    meaningEn: "Unique, lofty, elevated",
    meaningUr: "بلند مرتبہ، اول شہیدۂ اسلام",
    origin: "Arabic",
    tags: ["Sahabiya", "First Martyr"],
    blessedNote: "Hazrat Sumayyah bint Khabbat (RA), the first person martyred for Islam."
  },
  {
    name: "Safiyya",
    arabic: "صَفِيَّة",
    urdu: "صفیہ",
    gender: "girl",
    meaningEn: "Pure, chosen, sincere friend",
    meaningUr: "خالص، برگزیدہ، سچی سہیلی",
    origin: "Arabic",
    tags: ["Umm al-Mu'minin"]
  },
  {
    name: "Juwayriya",
    arabic: "جُوَيْرِيَة",
    urdu: "جویریہ",
    gender: "girl",
    meaningEn: "Young flower, brought immense blessing to her people",
    meaningUr: "پھول کی کلی، با برکت خاتون",
    origin: "Arabic",
    tags: ["Umm al-Mu'minin"]
  },
  {
    name: "Sarah",
    arabic: "سَارَة",
    urdu: "سارہ",
    gender: "girl",
    meaningEn: "Princess, bringer of happiness and delight",
    meaningUr: "خوشی دینے والی، شہزادی، پاکدامن",
    origin: "Arabic / Quranic",
    tags: ["Prophet's Wife"],
    blessedNote: "Wife of Prophet Ibrahim (AS) and mother of Prophet Ishaq (AS)."
  },
  {
    name: "Layla",
    arabic: "لَيْلَى",
    urdu: "لیلیٰ",
    gender: "girl",
    meaningEn: "Night beauty, deep dark night, enchantment",
    meaningUr: "رات کا حسن، گہری شب، پرکشش",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Amina",
    arabic: "آمِنَة",
    urdu: "آمنہ",
    gender: "girl",
    meaningEn: "Peaceful, trustworthy, safe, secure",
    meaningUr: "امن و امان والی، امانت دار، پناہ دینے والی",
    origin: "Arabic",
    tags: ["Mother of Prophet ﷺ"],
    blessedNote: "Hazrat Amina bint Wahb, blessed mother of the Prophet Muhammad ﷺ."
  },
  {
    name: "Halima",
    arabic: "حَلِيمَة",
    urdu: "حلیمہ",
    gender: "girl",
    meaningEn: "Gentle, patient, forbearing, kind-hearted",
    meaningUr: "بردبار، صابرہ، نرم مزاج، رحم دل",
    origin: "Arabic",
    tags: ["Foster Mother of Prophet ﷺ"],
    blessedNote: "Hazrat Halima As-Sa'diyya, foster mother who nursed the infant Prophet Muhammad ﷺ."
  },
  {
    name: "Marwa",
    arabic: "مَرْوَة",
    urdu: "مروہ",
    gender: "girl",
    meaningEn: "Fragrant stone, holy hillock near the Kaaba",
    meaningUr: "خوشبودار پتھر، مکہ مکرمہ کی مقدس پہاڑی (صفا و مروہ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Hajj"],
    blessedNote: "Mentioned in Surah Al-Baqarah (2:158): 'Innas-Safa wal-Marwata min Sha'a'irillah'."
  },
  {
    name: "Safa",
    arabic: "صَفَا",
    urdu: "صفا",
    gender: "girl",
    meaningEn: "Purity, clarity, holy hillock in Makkah",
    meaningUr: "پاکیزگی، صفائی، مکہ مکرمہ کی مقدس پہاڑی",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Hajj"]
  },
  {
    name: "Sidra",
    arabic: "سِدْرَة",
    urdu: "سدرہ",
    gender: "girl",
    meaningEn: "Lote-tree at the utmost boundary of the 7th heaven",
    meaningUr: "ساتویں آسمان پر بیر کا درخت (سدرۃ المنتہیٰ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic"],
    blessedNote: "Sidrat-ul-Muntaha mentioned in Surah An-Najm (53:14)."
  },
  {
    name: "Kawthar",
    arabic: "كَوْثَر",
    urdu: "کوثر",
    gender: "girl",
    meaningEn: "Abundant goodness, blessed fountain of Jannah",
    meaningUr: "خیرِ کثیر، جنت کی مبارک نہر و حوض",
    origin: "Arabic / Quranic",
    tags: ["Quranic"],
    blessedNote: "Named after Surah Al-Kawthar (108:1)."
  },
  {
    name: "Tasneem",
    arabic: "تَسْنِيم",
    urdu: "تسنیم",
    gender: "girl",
    meaningEn: "Fountain of Paradise from high above",
    meaningUr: "جنت کا سب سے اعلیٰ چشمہ",
    origin: "Arabic / Quranic",
    tags: ["Quranic"],
    blessedNote: "Mentioned in Surah Al-Mutaffifin (83:27)."
  },
  {
    name: "Salsabil",
    arabic: "سَلْسَبِيل",
    urdu: "سلسبیل",
    gender: "girl",
    meaningEn: "Sweet flowing spring of Paradise",
    meaningUr: "جنت کا میٹھا اور لذیذ چشمہ",
    origin: "Arabic / Quranic",
    tags: ["Quranic"],
    blessedNote: "Mentioned in Surah Al-Insan (76:18)."
  },
  {
    name: "Areeba",
    arabic: "أَرِيبَة",
    urdu: "اریبہ",
    gender: "girl",
    meaningEn: "Intelligent, wise, skillful, clever",
    meaningUr: "عقلمند، دانا، باصلاحیت، ہنرمند",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Aleena",
    arabic: "عَلِينَا",
    urdu: "علینہ",
    gender: "girl",
    meaningEn: "Soft, delicate, graceful, high status",
    meaningUr: "نرم مزاج، نازک، خوبصورت، بلند مرتبہ",
    origin: "Arabic",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Manha",
    arabic: "مَنْحَة",
    urdu: "منحہ",
    gender: "girl",
    meaningEn: "Gift from Allah, divine favor, blessing",
    meaningUr: "اللہ کا دیا ہوا تحفہ، عطیہ، احسان",
    origin: "Arabic",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Mehak",
    arabic: "مَهَك",
    urdu: "مہک",
    gender: "girl",
    meaningEn: "Fragrance, sweet aroma, pleasant scent",
    meaningUr: "خوشبو، عطر کی خوشبو، مہکتی ہوئی",
    origin: "Arabic / Urdu",
    tags: ["Popular"]
  },
  {
    name: "Alishba",
    arabic: "أَلِيشْبَا",
    urdu: "الشبہ",
    gender: "girl",
    meaningEn: "Pretty, sweet, sunshine, innocence",
    meaningUr: "معصوم، خوبصورت، شائستہ، چمکدار",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Rimsha",
    arabic: "رِمْشَة",
    urdu: "رمشا",
    gender: "girl",
    meaningEn: "Bouquet of beautiful flowers, graceful",
    meaningUr: "پھولوں کا گلدستہ، خوبصورت، نازک",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Iqra",
    arabic: "اقْرَأ",
    urdu: "اقرا",
    gender: "girl",
    meaningEn: "Read, recite! The very first word revealed in the Holy Quran",
    meaningUr: "پڑھو! قرآنِ پاک کا سب سے پہلا نازل شدہ کلمہ",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "First Revelation"],
    blessedNote: "First word of Surah Al-Alaq (96:1) revealed on Mount Hira."
  }
,
  {
    name: "Abdur Rahman",
    arabic: "عَبْدُ الرَّحْمٰن",
    urdu: "عبد الرحمٰن",
    gender: "boy",
    meaningEn: "Servant of the Most Merciful, servant of Ar-Rahman",
    meaningUr: "رحمٰن (نہایت مہربان اللہ) کا بندہ",
    origin: "Arabic / Quranic",
    tags: ["Sahabi", "Best Name", "Beloved"],
    blessedNote: "One of the two most beloved names in the sight of Allah Almighty."
  },
  {
    name: "Abdul Qadir",
    arabic: "عَبْدُ الْقَادِر",
    urdu: "عبد القادر",
    gender: "boy",
    meaningEn: "Servant of the All-Powerful, servant of the Capable",
    meaningUr: "ہر چیز پر قادر اللہ کا بندہ",
    origin: "Arabic",
    tags: ["Divine Names", "Noble"]
  },
  {
    name: "Abdul Rauf",
    arabic: "عَبْدُ الرَّؤُوْف",
    urdu: "عبد الرؤف",
    gender: "boy",
    meaningEn: "Servant of the Most Compassionate and Kind",
    meaningUr: "نہایت شفقت فرمانے والے رب کا بندہ",
    origin: "Arabic",
    tags: ["Divine Names"]
  },
  {
    name: "Abdul Samad",
    arabic: "عَبْدُ الصَّمَد",
    urdu: "عبد الصمد",
    gender: "boy",
    meaningEn: "Servant of the Eternal, Self-Sufficient Allah",
    meaningUr: "بے نیاز اور خود کفیل ذات کا بندہ",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Surah Ikhlas"]
  },
  {
    name: "Abdul Wahab",
    arabic: "عَبْدُ الْوَهَّاب",
    urdu: "عبد الوہاب",
    gender: "boy",
    meaningEn: "Servant of the Supreme Bestower of blessings",
    meaningUr: "سب کچھ عطا کرنے والے کریم رب کا بندہ",
    origin: "Arabic",
    tags: ["Divine Names"]
  },
  {
    name: "Abu Hurairah",
    arabic: "أَبُو هُرَيْرَة",
    urdu: "ابو ہریرہ",
    gender: "boy",
    meaningEn: "Father of the kitten (affectionate title given by Prophet ﷺ)",
    meaningUr: "بلی کے بچے کا باپ، جلیل القدر صحابی",
    origin: "Arabic",
    tags: ["Sahabi", "Muhaddith"],
    blessedNote: "Hazrat Abu Hurairah (RA), the greatest narrator of Hadith."
  },
  {
    name: "Adil",
    arabic: "عَادِل",
    urdu: "عادل",
    gender: "boy",
    meaningEn: "Just, fair, righteous, one who acts with equity",
    meaningUr: "انصاف پسند، عدل کرنے والا، حق گو",
    origin: "Arabic",
    tags: ["Virtue", "Popular"]
  },
  {
    name: "Adnan",
    arabic: "عَدْنَان",
    urdu: "عدنان",
    gender: "boy",
    meaningEn: "Settler, permanent resident, ancient ancestor of Prophet ﷺ",
    meaningUr: "آبادکار، جنت میں مقیم رہنے والا، جدِ امجدِ مصطفیٰ ﷺ",
    origin: "Arabic",
    tags: ["Noble", "Prophetic Lineage"]
  },
  {
    name: "Affan",
    arabic: "عَفَّان",
    urdu: "عفان",
    gender: "boy",
    meaningEn: "Chaste, pure, forgiving, modest",
    meaningUr: "پاکدامن، درگزر کرنے والا، پاکیزہ کردار",
    origin: "Arabic",
    tags: ["Virtue", "Popular"]
  },
  {
    name: "Arsalan",
    arabic: "أَرْسَلَان",
    urdu: "ارسلان",
    gender: "boy",
    meaningEn: "Lion, brave warrior, fearless champion",
    meaningUr: "شیر، بہادر، نڈر، جری جنگجو",
    origin: "Turkish / Arabic",
    tags: ["Brave", "Popular"]
  },
  {
    name: "Asad",
    arabic: "أَسَد",
    urdu: "اسد",
    gender: "boy",
    meaningEn: "Lion, courageous hero, symbol of strength",
    meaningUr: "شیر، بہادر انسان، جری",
    origin: "Arabic",
    tags: ["Sahabi", "Courage"]
  },
  {
    name: "Asim",
    arabic: "عَاصِم",
    urdu: "عاصم",
    gender: "boy",
    meaningEn: "Protector, guardian, shield against evil",
    meaningUr: "بچانے والا، نگہبان، برائی سے روکنے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Protector"]
  },
  {
    name: "Ayaan",
    arabic: "أَيَّان",
    urdu: "ایان",
    gender: "boy",
    meaningEn: "God's gift, blessing, when/time (Quranic)",
    meaningUr: "اللہ کا تحفہ، نعمت، وقت (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Trending", "Popular"]
  },
  {
    name: "Ayaz",
    arabic: "أَيَاز",
    urdu: "ایاز",
    gender: "boy",
    meaningEn: "Cool night breeze, loyal and faithful companion",
    meaningUr: "صبح کی ٹھنڈی ہوا، وفادار ساتھی",
    origin: "Arabic / Persian",
    tags: ["Loyal", "Classic"]
  },
  {
    name: "Azhar",
    arabic: "أَزْهَر",
    urdu: "اظہر / ازہر",
    gender: "boy",
    meaningEn: "Most radiant, luminous, bright, flourishing",
    meaningUr: "چمکدار، روشن، نہایت واضح، کھلتا ہوا پھول",
    origin: "Arabic",
    tags: ["Radiant", "Classic"]
  },
  {
    name: "Babar",
    arabic: "بَابَر",
    urdu: "بابر",
    gender: "boy",
    meaningEn: "Tiger, lion-hearted, courageous leader",
    meaningUr: "شیر، بہادر، شجاع دلیر انسان",
    origin: "Persian / Turkish",
    tags: ["Courage", "Classic"]
  },
  {
    name: "Badr",
    arabic: "بَدْر",
    urdu: "بدر",
    gender: "boy",
    meaningEn: "Full moon, site of the glorious first victory in Islam",
    meaningUr: "چودہویں کا چاند، غزوہ بدر کا میدان",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Sahabi", "Historic"]
  },
  {
    name: "Basit",
    arabic: "بَاسِط",
    urdu: "باسط",
    gender: "boy",
    meaningEn: "Expander, one who enriches and brings abundance",
    meaningUr: "کشادگی دینے والا، روزی کشادہ کرنے والا",
    origin: "Arabic",
    tags: ["Divine Names"]
  },
  {
    name: "Burhan",
    arabic: "بُرْهَان",
    urdu: "برہان",
    gender: "boy",
    meaningEn: "Proof, indisputable evidence, clear truth",
    meaningUr: "روشن دلیل، واضح ثبوت، حق کا برہان",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Wisdom"]
  },
  {
    name: "Dawood",
    arabic: "دَاوُۥد",
    urdu: "داؤد",
    gender: "boy",
    meaningEn: "Beloved, noble Prophet of Allah and righteous King",
    meaningUr: "پیارا، محبوب، حضرت داؤد علیہ السلام (صاحبِ زبور)",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"],
    blessedNote: "Prophet Dawood (David) peace be upon him, recipient of the Zabur."
  },
  {
    name: "Dilawar",
    arabic: "دِلَاوَر",
    urdu: "دلاور",
    gender: "boy",
    meaningEn: "Brave, valiant, fearless heart",
    meaningUr: "شجاع، نڈر، دلیر، بہادر دل والا",
    origin: "Persian",
    tags: ["Courage", "Classic"]
  },
  {
    name: "Ehsan",
    arabic: "إِحْسَان",
    urdu: "احسان",
    gender: "boy",
    meaningEn: "Excellence, beneficence, worshipping Allah as if seeing Him",
    meaningUr: "نیکی، حسنِ سلوک، اللہ کی کامل عبادت و احسان",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Spiritual"]
  },
  {
    name: "Ehtisham",
    arabic: "احْتِشَام",
    urdu: "احتشام",
    gender: "boy",
    meaningEn: "Modesty, dignity, grandeur, prestige",
    meaningUr: "شان و شوکت، حیا، وقار، عظمت",
    origin: "Arabic",
    tags: ["Noble", "Dignity"]
  },
  {
    name: "Fahad",
    arabic: "فَهْد",
    urdu: "فہد",
    gender: "boy",
    meaningEn: "Panther, leopard, agile, swift and brave",
    meaningUr: "چیتا، تیز رفتار، بہادر اور چست",
    origin: "Arabic",
    tags: ["Brave", "Popular"]
  },
  {
    name: "Faizan",
    arabic: "فَيْضَان",
    urdu: "فیضان",
    gender: "boy",
    meaningEn: "Abundance, outpouring of grace, bounty of Allah",
    meaningUr: "کشادگی، برکتوں کا سیلاب، سخاوت، فیضِ عام",
    origin: "Arabic",
    tags: ["Blessed", "Popular"]
  },
  {
    name: "Farooq",
    arabic: "فَارُوق",
    urdu: "فاروق",
    gender: "boy",
    meaningEn: "One who distinguishes right from wrong, just leader",
    meaningUr: "حق اور باطل میں فرق کرنے والا، عادل",
    origin: "Arabic",
    tags: ["Sahabi", "Title of Umar RA"],
    blessedNote: "The prestigious title bestowed upon Hazrat Umar Farooq (RA) by the Prophet ﷺ."
  },
  {
    name: "Furqan",
    arabic: "فُرْقَان",
    urdu: "فرقان",
    gender: "boy",
    meaningEn: "Criterion of truth vs falsehood, title of the Quran",
    meaningUr: "حق اور باطل میں تمیز کرنے والی کسوٹی، قرآنِ کریم کا اسمِ مبارک",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Criterion"]
  },
  {
    name: "Ghafoor",
    arabic: "غَفُور",
    urdu: "غفور",
    gender: "boy",
    meaningEn: "All-Forgiving, one who pardons continuously",
    meaningUr: "بہت بخشنے والا، معاف فرمانے والا رب",
    origin: "Arabic / Quranic",
    tags: ["Divine Names", "Mercy"]
  },
  {
    name: "Ghazi",
    arabic: "غَازِي",
    urdu: "غازی",
    gender: "boy",
    meaningEn: "Heroic conqueror, soldier returning victorious from holy battle",
    meaningUr: "میدانِ جنگ کا فاتح، باوقار مجاہد",
    origin: "Arabic",
    tags: ["Warrior", "Honor"]
  },
  {
    name: "Ghalib",
    arabic: "غَالِب",
    urdu: "غالب",
    gender: "boy",
    meaningEn: "Victor, predominant, supreme, triumphant",
    meaningUr: "غلبہ پانے والا، فتح یاب، فتح مند",
    origin: "Arabic",
    tags: ["Noble", "Literary"]
  },
  {
    name: "Habib",
    arabic: "حَبِيب",
    urdu: "حبیب",
    gender: "boy",
    meaningEn: "Beloved, dear friend, sweetheart",
    meaningUr: "پیارا، دلی دوست، محبوبِ خدا",
    origin: "Arabic",
    tags: ["Prophetic Title", "Beloved"]
  },
  {
    name: "Hadi",
    arabic: "هَادِي",
    urdu: "ہادی",
    gender: "boy",
    meaningEn: "Guide to the straight path, director to truth",
    meaningUr: "سیدھا راستہ دکھانے والا، رہبر، رہنما",
    origin: "Arabic / Quranic",
    tags: ["Guide", "Quranic"]
  },
  {
    name: "Haider",
    arabic: "حَيْدَر",
    urdu: "حیدر",
    gender: "boy",
    meaningEn: "Fierce lion, courageous warrior, title of Hazrat Ali (RA)",
    meaningUr: "ببر شیر، بہادر و نڈر مجاہد، حیدرِ کرار (ع)",
    origin: "Arabic",
    tags: ["Sahabi", "Lion of Allah"],
    blessedNote: "Hazrat Ali ibn Abi Talib (RA), given the title Haider-e-Karrar for unmatched valor."
  },
  {
    name: "Hamdan",
    arabic: "حَمْدَان",
    urdu: "حمدان",
    gender: "boy",
    meaningEn: "One who praises Allah constantly and abundantly",
    meaningUr: "اللہ کی کثرت سے حمد و ثنا کرنے والا",
    origin: "Arabic",
    tags: ["Praise", "Popular"]
  },
  {
    name: "Haris",
    arabic: "حَارِث",
    urdu: "حارث",
    gender: "boy",
    meaningEn: "Cultivator, provider, vigilant protector",
    meaningUr: "محنتی، کاشتکار، محنت کش، کسان",
    origin: "Arabic",
    tags: ["Sahabi", "Virtue"]
  },
  {
    name: "Haroon",
    arabic: "هَارُون",
    urdu: "ہارون",
    gender: "boy",
    meaningEn: "Exalted, mountain of strength, noble Prophet of Allah",
    meaningUr: "بلند مرتبہ، کوہِ وقار، حضرت موسیٰ (ع) کے برادر اور پیغمبر",
    origin: "Hebrew / Arabic",
    tags: ["Prophet", "Quranic"]
  },
  {
    name: "Hashim",
    arabic: "هَاشِم",
    urdu: "ہاشم",
    gender: "boy",
    meaningEn: "Destroyer of evil, generous host, great-grandfather of Prophet ﷺ",
    meaningUr: "سخاوت کرنے والا، روٹیاں توڑ کر کھلانے والا، جدِ رسول ﷺ",
    origin: "Arabic",
    tags: ["Prophetic Lineage", "Generous"]
  },
  {
    name: "Hashir",
    arabic: "حَاشِر",
    urdu: "حاشر",
    gender: "boy",
    meaningEn: "One who gathers, an honorable attribute of the Prophet ﷺ",
    meaningUr: "لوگوں کو جمع کرنے والا، حضور ﷺ کا ایک اسمِ گرامی",
    origin: "Arabic",
    tags: ["Prophetic Name", "Quranic"]
  },
  {
    name: "Huzaifa",
    arabic: "حُذَيْفَة",
    urdu: "حذیفہ",
    gender: "boy",
    meaningEn: "Wise, prudent, keeper of secrets",
    meaningUr: "عقلمند، رازدار، حضرت حذیفہ بن یمان (رض)",
    origin: "Arabic",
    tags: ["Sahabi", "Keeper of Secrets"],
    blessedNote: "Hazrat Huzaifa ibn al-Yaman (RA), the trusted keeper of the Prophet's ﷺ secrets."
  },
  {
    name: "Idris",
    arabic: "إِدْرِيس",
    urdu: "ادریس",
    gender: "boy",
    meaningEn: "Studious, learner, noble Prophet mentioned in the Quran",
    meaningUr: "علم و حکمت کا متلاشی، درس دینے والا، پیغمبرِ خدا",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"]
  },
  {
    name: "Ihsan",
    arabic: "إِحْسَان",
    urdu: "احسان",
    gender: "boy",
    meaningEn: "Kindness, beneficence, doing good to others",
    meaningUr: "نیکی، بھلائی، حسنِ سلوک، سخاوت",
    origin: "Arabic / Quranic",
    tags: ["Virtue", "Quranic"]
  },
  {
    name: "Ilyas",
    arabic: "إِلْيَاس",
    urdu: "الیاس",
    gender: "boy",
    meaningEn: "God is my Lord, noble Quranic Prophet",
    meaningUr: "میرا رب ہی سب کچھ ہے، حضرت الیاس علیہ السلام",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"]
  },
  {
    name: "Imran",
    arabic: "عِمْرَان",
    urdu: "عمران",
    gender: "boy",
    meaningEn: "Prosperity, father of Maryam (AS), host of nations",
    meaningUr: "آبادی، خوشحالی، حضرت مریم علیہا السلام کے والدِ محترم",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Surah Al Imran"]
  },
  {
    name: "Irfan",
    arabic: "عِرْفَان",
    urdu: "عرفان",
    gender: "boy",
    meaningEn: "Spiritual wisdom, knowledge of divine truth, gratitude",
    meaningUr: "معرفتِ الٰہی، دانائی، پہچان، شکرگزاری",
    origin: "Arabic",
    tags: ["Wisdom", "Spiritual"]
  },
  {
    name: "Ishaq",
    arabic: "إِسْحَاق",
    urdu: "اسحاق",
    gender: "boy",
    meaningEn: "One who laughs with joy, noble Prophet of Allah",
    meaningUr: "مسکرانے والا، حضرت اسحاق علیہ السلام (ابن ابراہیم)",
    origin: "Hebrew / Arabic",
    tags: ["Prophet", "Quranic"]
  },
  {
    name: "Jafar",
    arabic: "جَعْفَر",
    urdu: "جعفر",
    gender: "boy",
    meaningEn: "Fresh stream, river, heroic martyr of Islam (Al-Tayyar)",
    meaningUr: "میٹھا چشمہ، ندی، حضرت جعفر طیار (رض)",
    origin: "Arabic",
    tags: ["Sahabi", "Shaheed"]
  },
  {
    name: "Jalal",
    arabic: "جَلَال",
    urdu: "جلال",
    gender: "boy",
    meaningEn: "Majesty, greatness, glory, supreme dignity",
    meaningUr: "عظمت، رعب، شان و شوکت، بزرگی",
    origin: "Arabic / Quranic",
    tags: ["Majesty", "Quranic"]
  },
  {
    name: "Jamal",
    arabic: "جَمَال",
    urdu: "جمال",
    gender: "boy",
    meaningEn: "Beauty, elegance, handsome charm and grace",
    meaningUr: "حسن، خوبصورتی، وقار، عمدگی",
    origin: "Arabic",
    tags: ["Beauty", "Popular"]
  },
  {
    name: "Junaid",
    arabic: "جُنَيْد",
    urdu: "جنید",
    gender: "boy",
    meaningEn: "Young warrior of the holy army, pious spiritual master",
    meaningUr: "لشکر کا سپاہی، حضرت جنید بغدادی رحمة اللہ علیہ",
    origin: "Arabic",
    tags: ["Spiritual", "Popular"]
  },
  {
    name: "Kabir",
    arabic: "كَبِير",
    urdu: "کبیر",
    gender: "boy",
    meaningEn: "Great, grand, magnificent, venerable leader",
    meaningUr: "بزرگ، عظیم الشان، صاحبِ عزت",
    origin: "Arabic / Quranic",
    tags: ["Noble", "Quranic"]
  },
  {
    name: "Kamran",
    arabic: "كَامْرَان",
    urdu: "کامران",
    gender: "boy",
    meaningEn: "Fortunate, successful, blessed with prosperity",
    meaningUr: "کامیاب، بامراد، خوش نصیب",
    origin: "Persian",
    tags: ["Success", "Popular"]
  },
  {
    name: "Kashif",
    arabic: "كَاشِف",
    urdu: "کاشف",
    gender: "boy",
    meaningEn: "Discoverer, pioneer, unveiler of truth",
    meaningUr: "کھولنے والا، ظاہر کرنے والا، سچائی آشکار کرنے والا",
    origin: "Arabic",
    tags: ["Wisdom", "Popular"]
  },
  {
    name: "Khalil",
    arabic: "خَلِيل",
    urdu: "خلیل",
    gender: "boy",
    meaningEn: "Intimate friend, title of Prophet Ibrahim (AS) — Khalilullah",
    meaningUr: "سچا اور گہرا دوست، خلیل اللہ (حضرت ابراہیم علیہ السلام)",
    origin: "Arabic / Quranic",
    tags: ["Prophetic Title", "Quranic"]
  },
  {
    name: "Luqman",
    arabic: "لُقْمَان",
    urdu: "لقمان",
    gender: "boy",
    meaningEn: "Wise philosopher, wise mentor honored in Surah Luqman",
    meaningUr: "دانا، حکیم، صاحبِ حکمت (حکیم لقمان جن کا ذکر قرآن میں ہے)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Wisdom"]
  },
  {
    name: "Latif",
    arabic: "لَطِيف",
    urdu: "لطیف",
    gender: "boy",
    meaningEn: "Kind, subtle, gentle, gracious",
    meaningUr: "نہایت مہربان، باریک بین، نرم خو",
    origin: "Arabic / Quranic",
    tags: ["Divine Names"]
  },
  {
    name: "Mahad",
    arabic: "مَهْد",
    urdu: "مہد",
    gender: "boy",
    meaningEn: "Cradle, place of comfort, peace and rest",
    meaningUr: "گہوارہ، آرام دہ مقام، پرسکون",
    origin: "Arabic / Quranic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Mahmood",
    arabic: "مَحْمُود",
    urdu: "محمود",
    gender: "boy",
    meaningEn: "Praised, commendable, blessed with good deeds",
    meaningUr: "جس کی تعریف کی جائے، قابلِ تعریف",
    origin: "Arabic / Quranic",
    tags: ["Prophetic Name", "Quranic"]
  },
  {
    name: "Mansoor",
    arabic: "مَنْصُور",
    urdu: "منصور",
    gender: "boy",
    meaningEn: "Victorious, aided by divine help, triumphant",
    meaningUr: "فتح یاب، جس کی اللہ نے مدد فرمائی ہو، سرخرو",
    origin: "Arabic / Quranic",
    tags: ["Victory", "Popular"]
  },
  {
    name: "Moeez",
    arabic: "مُعِزّ",
    urdu: "معز",
    gender: "boy",
    meaningEn: "Bestower of honor, dignity, and respect",
    meaningUr: "عزت بخشنے والا، عزت و وقار دینے والا",
    origin: "Arabic / Quranic",
    tags: ["Divine Attribute", "Trending"]
  },
  {
    name: "Mohsin",
    arabic: "مُحْسِن",
    urdu: "محسن",
    gender: "boy",
    meaningEn: "Benefactor, charitable person, one who does good",
    meaningUr: "احسان کرنے والا، بھلائی کرنے والا، نیکوکار",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Virtue"]
  },
  {
    name: "Momin",
    arabic: "مُؤْمِن",
    urdu: "مومن",
    gender: "boy",
    meaningEn: "Believer, faithful devotee who guarantees peace",
    meaningUr: "ایمان والا، اللہ کا سچا ماننے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Faith"]
  },
  {
    name: "Muawiya",
    arabic: "مُعَاوِيَة",
    urdu: "معاویہ",
    gender: "boy",
    meaningEn: "Young lion / fox, scribe of the Holy Quran, Sahabi",
    meaningUr: "شیر کا بچہ، کاتبِ وحی حضرت امیر معاویہ (رض)",
    origin: "Arabic",
    tags: ["Sahabi", "Katib-e-Wahi"]
  },
  {
    name: "Mubashir",
    arabic: "مُبَشِّر",
    urdu: "مبشر",
    gender: "boy",
    meaningEn: "Bringer of good tidings, bearer of glad news",
    meaningUr: "خوشخبری سنانے والا، مبارکباد دینے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Joy"]
  },
  {
    name: "Mudassir",
    arabic: "مُدَّثِّر",
    urdu: "مدثر",
    gender: "boy",
    meaningEn: "The wrapped one, noble title of Prophet Muhammad ﷺ in Surah Al-Muddathir",
    meaningUr: "چادر اوڑھنے والا، حضور ﷺ کا خوبصورت قرآنی لقب",
    origin: "Arabic / Quranic",
    tags: ["Prophetic Title", "Quranic"]
  },
  {
    name: "Mujtaba",
    arabic: "مُجْتَبَى",
    urdu: "مجتبیٰ",
    gender: "boy",
    meaningEn: "Chosen one, selected for honor, title of the Prophet ﷺ",
    meaningUr: "برگزیدہ، چنا ہوا، حضور ﷺ کا مبارک لقب",
    origin: "Arabic",
    tags: ["Prophetic Title", "Beloved"]
  },
  {
    name: "Munir",
    arabic: "مُنِير",
    urdu: "منیر",
    gender: "boy",
    meaningEn: "Illuminating, shining lamp that radiates guidance",
    meaningUr: "روشنی پھیلانے والا، چمکتا ہوا، سراجِ منیر",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Light"]
  },
  {
    name: "Mustafa",
    arabic: "مُصْطَفَى",
    urdu: "مصطفیٰ",
    gender: "boy",
    meaningEn: "The Chosen One, pure and elected, title of Prophet Muhammad ﷺ",
    meaningUr: "برگزیدہ، اللہ کا منتخب کردہ، حضور ﷺ کا اسمِ مبارک",
    origin: "Arabic",
    tags: ["Prophet", "Beloved", "Best Name"]
  },
  {
    name: "Muzammil",
    arabic: "مُزَّمِّل",
    urdu: "مزمل",
    gender: "boy",
    meaningEn: "The enfolded one in mantle, affectionate Quranic title of Prophet ﷺ",
    meaningUr: "کملی اوڑھنے والا، حضور ﷺ کا قرآنی لقب (سورۃ المزمل)",
    origin: "Arabic / Quranic",
    tags: ["Prophetic Title", "Quranic"]
  },
  {
    name: "Nabeel",
    arabic: "نَبِيل",
    urdu: "نبیل",
    gender: "boy",
    meaningEn: "Noble, aristocratic, honorable, magnanimous",
    meaningUr: "شریف، شریف النفس، باوقار، عالی نسب",
    origin: "Arabic",
    tags: ["Noble", "Popular"]
  },
  {
    name: "Nadeem",
    arabic: "نَدِيم",
    urdu: "ندیم",
    gender: "boy",
    meaningEn: "Companion, faithful friend, intimate confidant",
    meaningUr: "مخلص دوست، ہمدم، مصاحب",
    origin: "Arabic",
    tags: ["Friendship", "Popular"]
  },
  {
    name: "Naeem",
    arabic: "نَعِيم",
    urdu: "نعیم",
    gender: "boy",
    meaningEn: "Comfort, bliss, tranquility, gardens of Paradise",
    meaningUr: "نعمت، راحت، چین، جنت کی نعمتیں",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Paradise"]
  },
  {
    name: "Nasir",
    arabic: "نَاصِر",
    urdu: "ناصر",
    gender: "boy",
    meaningEn: "Helper, protector, supporter in times of need",
    meaningUr: "مددگار، معاون، فتح و نصرت دینے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Helper"]
  },
  {
    name: "Noman",
    arabic: "نُعْمَان",
    urdu: "نعمان",
    gender: "boy",
    meaningEn: "Blood-red flower, anemone, blessing, name of Imam Abu Hanifa (RA)",
    meaningUr: "سرخ پھول، نعمت، امام اعظم ابو حنیفہ رحمہ اللہ کا اصل نام",
    origin: "Arabic",
    tags: ["Scholar", "Blessing", "Popular"]
  },
  {
    name: "Owais",
    arabic: "أُوَيْس",
    urdu: "اویس",
    gender: "boy",
    meaningEn: "Little wolf, fearless devotee, Hazrat Owais Qarni (RA)",
    meaningUr: "چھوٹا بھیڑیا، عاشقِ رسول حضرت اویس قرنی (رح)",
    origin: "Arabic",
    tags: ["Tabi'ee", "Devotion", "Beloved"],
    blessedNote: "Hazrat Owais al-Qarni (RA), praised by the Prophet ﷺ for profound filial devotion."
  },
  {
    name: "Qasim",
    arabic: "قَاسِم",
    urdu: "قاسم",
    gender: "boy",
    meaningEn: "Distributor, one who shares justly, eldest son of Prophet ﷺ",
    meaningUr: "بانٹنے والا، تقسیم کرنے والا، حضور ﷺ کے صاحبزادے",
    origin: "Arabic",
    tags: ["Prophetic Lineage", "Abul Qasim"],
    blessedNote: "Hazrat Qasim (RA), eldest son of the Prophet Muhammad ﷺ (hence Kunya Abul-Qasim)."
  },
  {
    name: "Rehan",
    arabic: "رَيْحَان",
    urdu: "ریحان",
    gender: "boy",
    meaningEn: "Sweet basil, fragrant flower of Paradise mentioned in the Quran",
    meaningUr: "خوشبودار پودا، جنت کا معطر پھول (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Fragrance"]
  },
  {
    name: "Rizwan",
    arabic: "رِضْوَان",
    urdu: "رضوان",
    gender: "boy",
    meaningEn: "Acceptance, good pleasure of Allah, keeper of Paradise",
    meaningUr: "اللہ کی خوشنودی، جنت کا نگہبان فرشتہ",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Angel of Paradise"]
  },
  {
    name: "Rohail",
    arabic: "رُحَيْل",
    urdu: "روہیل",
    gender: "boy",
    meaningEn: "Traveler, noble wayfarer, adventurous spirit",
    meaningUr: "سفر کرنے والا، مسافر، بلند حوصلہ",
    origin: "Arabic",
    tags: ["Popular", "Modern"]
  },
  {
    name: "Sadiq",
    arabic: "صَادِق",
    urdu: "صادق",
    gender: "boy",
    meaningEn: "Truthful, honest, sincere in word and deed",
    meaningUr: "سچا، راست گو، امانت دار",
    origin: "Arabic / Quranic",
    tags: ["Virtue", "Quranic"]
  },
  {
    name: "Saeed",
    arabic: "سَعِيد",
    urdu: "سعید",
    gender: "boy",
    meaningEn: "Happy, auspicious, blessed, fortunate",
    meaningUr: "خوش قسمت، نیک بخت، مبارک",
    origin: "Arabic / Quranic",
    tags: ["Sahabi", "Happiness"]
  },
  {
    name: "Saifullah",
    arabic: "سَيْفُ الله",
    urdu: "سیف اللہ",
    gender: "boy",
    meaningEn: "Sword of Allah, heroic warrior title of Khalid bin Walid (RA)",
    meaningUr: "اللہ کی تلوار، مجاہدِ اسلام",
    origin: "Arabic",
    tags: ["Sahabi Title", "Courage"]
  },
  {
    name: "Sajid",
    arabic: "سَاجِد",
    urdu: "ساجد",
    gender: "boy",
    meaningEn: "One who prostrates in humble prayer before Allah",
    meaningUr: "سجدہ کرنے والا، اللہ کے حضور جھکنے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Devotion"]
  },
  {
    name: "Sameer",
    arabic: "سَمِير",
    urdu: "سمیر",
    gender: "boy",
    meaningEn: "Pleasant nighttime companion in conversation, cheerful friend",
    meaningUr: "رات کو اچھی باتیں کرنے والا دوست، مخلص ساتھی",
    origin: "Arabic",
    tags: ["Friendship", "Popular"]
  },
  {
    name: "Saqib",
    arabic: "ثَاقِب",
    urdu: "ثاقب",
    gender: "boy",
    meaningEn: "Piercingly bright, radiant star mentioned in Surah At-Tariq",
    meaningUr: "چمکتا ہوا ستارہ، تیز روشنی، تاریکی کو چیرنے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Star"]
  },
  {
    name: "Sarfaraz",
    arabic: "سَرْفَرَاز",
    urdu: "سرفراز",
    gender: "boy",
    meaningEn: "Exalted, honorable, respected leader",
    meaningUr: "سر بلند، باوقار، عزت دار",
    origin: "Persian",
    tags: ["Honor", "Classic"]
  },
  {
    name: "Shahmeer",
    arabic: "شَاه مِير",
    urdu: "شاہ میر",
    gender: "boy",
    meaningEn: "Beauty, flintstone, kingly prince",
    meaningUr: "خوبصورت، چقماق پتھر، بادشاہوں کا سردار",
    origin: "Persian / Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Shahroz",
    arabic: "شَهْرُوز",
    urdu: "شہرروز",
    gender: "boy",
    meaningEn: "Luminous countenance, one who has a bright face like day",
    meaningUr: "روشن چہرے والا، روشن دن",
    origin: "Persian",
    tags: ["Popular"]
  },
  {
    name: "Shoaib",
    arabic: "شُعَيْب",
    urdu: "شعیب",
    gender: "boy",
    meaningEn: "One who shows the right path, eloquent Prophet of Allah",
    meaningUr: "سیدھا راستہ دکھانے والا، خطیب الانبیاء حضرت شعیب (ع)",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"]
  },
  {
    name: "Sohaib",
    arabic: "صُهَيْب",
    urdu: "صہیب",
    gender: "boy",
    meaningEn: "Golden-haired, noble companion Hazrat Sohaib Rumi (RA)",
    meaningUr: "سنہرے بالوں والا، حضرت صہیب رومی (رض)",
    origin: "Arabic",
    tags: ["Sahabi", "Popular"]
  },
  {
    name: "Subhan",
    arabic: "سُبْحَان",
    urdu: "سبحان",
    gender: "boy",
    meaningEn: "Glory be to Allah, pure and free from all defects",
    meaningUr: "اللہ کی پاکی، عیب سے پاک، حمد و ثنا",
    origin: "Arabic / Quranic",
    tags: ["Praise", "Quranic", "Popular"]
  },
  {
    name: "Sufyan",
    arabic: "سُفْيَان",
    urdu: "سفیان",
    gender: "boy",
    meaningEn: "Fast walking, cloud, noble Sahabi Abu Sufyan / Sufyan Thawri",
    meaningUr: "تیز رفتار، بادل، جلیل القدر صحابی و محدث",
    origin: "Arabic",
    tags: ["Sahabi", "Historic"]
  },
  {
    name: "Sulaiman",
    arabic: "سُلَيْمَان",
    urdu: "سلیمان",
    gender: "boy",
    meaningEn: "Man of peace, wise king and glorious Prophet of Allah",
    meaningUr: "سلامتی والا، حضرت سلیمان علیہ السلام (بادشاہ و پیغمبر)",
    origin: "Hebrew / Arabic",
    tags: ["Prophet", "Quranic", "King"]
  },
  {
    name: "Tahir",
    arabic: "طَاهِر",
    urdu: "طاہر",
    gender: "boy",
    meaningEn: "Pure, clean, immaculate, chaste",
    meaningUr: "پاک، پاکیزہ، صاف، گناہوں سے دور",
    origin: "Arabic",
    tags: ["Purity", "Popular"]
  },
  {
    name: "Tayyab",
    arabic: "طَيِّب",
    urdu: "طیب",
    gender: "boy",
    meaningEn: "Pure, wholesome, sweet, good-natured",
    meaningUr: "پاکیزہ، ستھرا، خوشبودار، عمدہ",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Purity"]
  },
  {
    name: "Umair",
    arabic: "عُمَيْر",
    urdu: "عمیر",
    gender: "boy",
    meaningEn: "Flourishing, prosperous, youthful, Sahabi",
    meaningUr: "آبادکار، لمبی عمر پانے والا، صحابیِ رسول (رض)",
    origin: "Arabic",
    tags: ["Sahabi", "Popular"]
  },
  {
    name: "Usama",
    arabic: "أُسَامَة",
    urdu: "اسامہ",
    gender: "boy",
    meaningEn: "Brave lion, beloved young commander of the Prophet ﷺ",
    meaningUr: "شیر، دلیر، حضرت اسامہ بن زید (رض) حبِ رسول",
    origin: "Arabic",
    tags: ["Sahabi", "Commander"]
  },
  {
    name: "Waleed",
    arabic: "وَلِيد",
    urdu: "ولید",
    gender: "boy",
    meaningEn: "Newborn boy, youth, prince, child",
    meaningUr: "نو مولود بچہ، نومولود لڑکا، جوان",
    origin: "Arabic",
    tags: ["Popular", "Historic"]
  },
  {
    name: "Waqas",
    arabic: "وَقَّاص",
    urdu: "وقاص",
    gender: "boy",
    meaningEn: "Courageous warrior, fearless soldier",
    meaningUr: "بہادر جنگجو، نڈر انسان، والدِ سعد بن ابی وقاص",
    origin: "Arabic",
    tags: ["Sahabi Ancestor", "Popular"]
  },
  {
    name: "Waseem",
    arabic: "وَسِيم",
    urdu: "وسیم",
    gender: "boy",
    meaningEn: "Handsome, graceful, good-looking with charming features",
    meaningUr: "خوبصورت، پرکشش، حسین چہرے والا",
    origin: "Arabic",
    tags: ["Beauty", "Popular"]
  },
  {
    name: "Yahya",
    arabic: "يَحْيَى",
    urdu: "یحییٰ",
    gender: "boy",
    meaningEn: "To live, alive, noble Prophet of Allah mentioned in Quran",
    meaningUr: "زندہ رہنے والا، حضرت یحییٰ علیہ السلام (پیغمبرِ خدا)",
    origin: "Arabic / Quranic",
    tags: ["Prophet", "Quranic"]
  },
  {
    name: "Yasir",
    arabic: "يَاسِر",
    urdu: "یاسر",
    gender: "boy",
    meaningEn: "Gentle, easy-going, prosperous, first martyr family of Islam",
    meaningUr: "آسانی پیدا کرنے والا، نرم خو، حضرت یاسر (رض)",
    origin: "Arabic",
    tags: ["Sahabi", "Shaheed"]
  },
  {
    name: "Younus",
    arabic: "يُونُس",
    urdu: "یونس",
    gender: "boy",
    meaningEn: "Dove, companion of the fish, noble Prophet of Allah",
    meaningUr: "فاختہ، حضرت یونس علیہ السلام (ذوالنون)",
    origin: "Hebrew / Arabic",
    tags: ["Prophet", "Quranic", "Dhun Nun"]
  },
  {
    name: "Yousuf",
    arabic: "يُوسُف",
    urdu: "یوسف",
    gender: "boy",
    meaningEn: "God increases, epitome of male beauty and virtue in Quran",
    meaningUr: "حسن و جمال کا پیکر، حضرت یوسف علیہ السلام (احسن القصص)",
    origin: "Hebrew / Arabic",
    tags: ["Prophet", "Quranic", "Surah Yusuf", "Best Name"]
  },
  {
    name: "Zafar",
    arabic: "ظَفَر",
    urdu: "ظفر",
    gender: "boy",
    meaningEn: "Victory, triumph, conqueror over adversity",
    meaningUr: "فتح، کامیابی، کامرانی، نصرت",
    origin: "Arabic",
    tags: ["Victory", "Popular"]
  },
  {
    name: "Zahid",
    arabic: "زَاهِد",
    urdu: "زاہد",
    gender: "boy",
    meaningEn: "Devout, ascetic, worshipper who abstains from worldly vanity",
    meaningUr: "عبادت گزار، پارسا، دنیا سے بے رغبت متقی انسان",
    origin: "Arabic",
    tags: ["Pious", "Virtue"]
  },
  {
    name: "Zaid",
    arabic: "زَيْد",
    urdu: "زید",
    gender: "boy",
    meaningEn: "Growth, abundance, only Sahabi explicitly named in the Quran",
    meaningUr: "بڑھوتری، کثرت، حضرت زید بن حارثہ (رض) جن کا نام قرآن میں ہے",
    origin: "Arabic / Quranic",
    tags: ["Sahabi", "Quranic"],
    blessedNote: "Hazrat Zaid ibn Harithah (RA), the only companion mentioned by name in the Quran (Surah Al-Ahzab 33:37)."
  },
  {
    name: "Zain",
    arabic: "زَيْن",
    urdu: "زین",
    gender: "boy",
    meaningEn: "Beauty, grace, adornment, excellence",
    meaningUr: "خوبصورتی، زینت، جمال، شائستگی",
    origin: "Arabic",
    tags: ["Beauty", "Popular", "Trending"]
  },
  {
    name: "Zakariya",
    arabic: "زَكَرِيَّا",
    urdu: "زکریا",
    gender: "boy",
    meaningEn: "God has remembered, noble Prophet of Allah and guardian of Maryam",
    meaningUr: "اللہ نے یاد فرمایا، حضرت زکریا علیہ السلام (پیغمبرِ خدا)",
    origin: "Hebrew / Arabic",
    tags: ["Prophet", "Quranic"]
  },
  {
    name: "Zeeshan",
    arabic: "ذِي شَان",
    urdu: "ذیشان",
    gender: "boy",
    meaningEn: "Magnificent, dignified, of high status and glory",
    meaningUr: "شان والا، پرشکوہ، صاحبِ وقار و مرتبت",
    origin: "Persian / Arabic",
    tags: ["Noble", "Popular"]
  },
  {
    name: "Aalia",
    arabic: "عَالِيَة",
    urdu: "عالیہ",
    gender: "girl",
    meaningEn: "Exalted, noble, sublime, of highest station",
    meaningUr: "بلند مرتبہ، اونچی، باوقار، عالی نسب",
    origin: "Arabic",
    tags: ["Noble", "Popular"]
  },
  {
    name: "Aamna",
    arabic: "آمِنَة",
    urdu: "آمنہ",
    gender: "girl",
    meaningEn: "Peaceful, secure, mother of Prophet Muhammad ﷺ",
    meaningUr: "پرامن، محفوظ، حضرت سیدہ آمنہ رضی اللہ عنہا (مادرِ مصطفیٰ ﷺ)",
    origin: "Arabic",
    tags: ["Mother of Prophet", "Beloved", "Best Name"],
    blessedNote: "Hazrat Amina bint Wahb (RA), the pure and noble mother of the Prophet ﷺ."
  },
  {
    name: "Aasiya",
    arabic: "آسِيَة",
    urdu: "آسیہ",
    gender: "girl",
    meaningEn: "One who heals, noble queen and believer honored in the Quran",
    meaningUr: "تسلی دینے والی، ملکہ آسیہ علیہا السلام (جنت کی چار عظیم خواتین میں سے ایک)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Leader of Paradise"],
    blessedNote: "Hazrat Asiya (AS), honored in Surah At-Tahrim as the ideal of feminine faith."
  },
  {
    name: "Adeeba",
    arabic: "أَدِيبَة",
    urdu: "ادیبہ",
    gender: "girl",
    meaningEn: "Cultured, polite, courteous, woman of literature and fine manners",
    meaningUr: "باادب، شائستہ، علم و ادب والی، خوش اخلاق",
    origin: "Arabic",
    tags: ["Manners", "Wisdom"]
  },
  {
    name: "Afreen",
    arabic: "آفَرِين",
    urdu: "آفرین",
    gender: "girl",
    meaningEn: "Praise, acclaim, lucky, enchanting beauty",
    meaningUr: "شاباش، داد، تحسین، پرکشش حسن",
    origin: "Persian",
    tags: ["Popular", "Beauty"]
  },
  {
    name: "Aila",
    arabic: "آيْلَا",
    urdu: "آئلہ",
    gender: "girl",
    meaningEn: "Moonlight, bright, halo of light around the moon",
    meaningUr: "چاندنی، چاند کی روشنی کا ہالہ، خوبصورت",
    origin: "Arabic / Turkish",
    tags: ["Trending", "Modern"]
  },
  {
    name: "Aimen",
    arabic: "أَيْمَن",
    urdu: "ایمن",
    gender: "girl",
    meaningEn: "Blessed, auspicious, on the right hand of virtue",
    meaningUr: "مبارک، بابرکت، دائیں ہاتھ والی، خوش نصیب",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Blessing", "Popular"]
  },
  {
    name: "Amal",
    arabic: "أَمَل",
    urdu: "امل",
    gender: "girl",
    meaningEn: "Hope, aspiration, noble yearning",
    meaningUr: "امید، آرزو، تمنا، روشن مستقبل",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Hope"]
  },
  {
    name: "Amani",
    arabic: "أَمَانِي",
    urdu: "امانی",
    gender: "girl",
    meaningEn: "Wishes, aspirations, dreams blessed by Allah",
    meaningUr: "دلی خواہشات، تمنائیں، دعاؤں کی تکمیل",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Popular"]
  },
  {
    name: "Anabia",
    arabic: "عَنَابِيَا",
    urdu: "عنابیہ",
    gender: "girl",
    meaningEn: "Door of Paradise, turned toward Allah in repentance",
    meaningUr: "جنت کا دروازہ، اللہ کی طرف رجوع کرنے والی",
    origin: "Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Anam",
    arabic: "أَنَام",
    urdu: "انعم / انام",
    gender: "girl",
    meaningEn: "Creation, humanity, blessing mentioned in Surah Ar-Rahman",
    meaningUr: "مخلوق، انسان، اللہ کی دی ہوئی نعمتیں",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Surah Rahman"]
  },
  {
    name: "Anaya",
    arabic: "عِنَايَة",
    urdu: "عنایہ",
    gender: "girl",
    meaningEn: "Divine care, providence, protection and blessing of Allah",
    meaningUr: "اللہ کی عنایت، نگہبانی، رحمت، دیکھ بھال",
    origin: "Arabic",
    tags: ["Trending", "Popular", "Best Name"]
  },
  {
    name: "Aqsa",
    arabic: "أَقْصَى",
    urdu: "اقصیٰ",
    gender: "girl",
    meaningEn: "Farthest holy mosque in Jerusalem, noble Quranic sanctuary",
    meaningUr: "سب سے دور، مسجدِ اقصیٰ (قبلہ اول)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Sanctuary", "Popular"]
  },
  {
    name: "Areej",
    arabic: "أَرِيج",
    urdu: "اریج",
    gender: "girl",
    meaningEn: "Sweet fragrance, perfume of blooming flowers",
    meaningUr: "خوشبو، مہک، معطر ہوا",
    origin: "Arabic",
    tags: ["Fragrance", "Popular"]
  },
  {
    name: "Arooj",
    arabic: "عُرُوج",
    urdu: "عروج",
    gender: "girl",
    meaningEn: "Ascension, height, climax, glory, rising to greatness",
    meaningUr: "بلندی، ترقی، عروج، کمال",
    origin: "Arabic",
    tags: ["Glory", "Popular"]
  },
  {
    name: "Arwa",
    arabic: "أَرْوَى",
    urdu: "ارویٰ",
    gender: "girl",
    meaningEn: "Mountain gazelle, graceful beauty, aunt of Prophet ﷺ",
    meaningUr: "خوبصورت ہرن، تروتازہ، حضور ﷺ کی پھوپھی حضرت ارویٰ (رض)",
    origin: "Arabic",
    tags: ["Sahabiya", "Grace"]
  },
  {
    name: "Ayat",
    arabic: "آيَات",
    urdu: "آیات",
    gender: "girl",
    meaningEn: "Divine signs, verses of the Holy Quran, miracles of Allah",
    meaningUr: "اللہ کی نشانیاں، قرآنِ مجید کی مبارک آیات",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Trending"]
  },
  {
    name: "Azka",
    arabic: "أَزْكَى",
    urdu: "ازکیٰ",
    gender: "girl",
    meaningEn: "Purer, most virtuous, pious, righteous (Quranic)",
    meaningUr: "سب سے زیادہ پاکیزہ، پارسا، نیک سیرت (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Purity"]
  },
  {
    name: "Bareera",
    arabic: "بَرِيرَة",
    urdu: "بریرہ",
    gender: "girl",
    meaningEn: "Pious, virtuous, devoted companion of Ayesha (RA)",
    meaningUr: "نیکوکار، پرہیزگار، جلیل القدر صحابیہ (رض)",
    origin: "Arabic",
    tags: ["Sahabiya", "Virtue"]
  },
  {
    name: "Barkat",
    arabic: "بَرَكَة",
    urdu: "برکت",
    gender: "girl",
    meaningEn: "Blessing, abundance, prosperity from Allah",
    meaningUr: "اللہ کی رحمت، افزائش، فراوانی",
    origin: "Arabic / Quranic",
    tags: ["Blessing", "Classic"]
  },
  {
    name: "Batool",
    arabic: "بَتُول",
    urdu: "بتول",
    gender: "girl",
    meaningEn: "Pure ascetic, devoted entirely to God, title of Fatima (RA) and Maryam (AS)",
    meaningUr: "دنیا سے بے نیاز، عبادت گزار، سیدہ فاطمہ اور سیدہ مریم کا لقب",
    origin: "Arabic",
    tags: ["Ahl al-Bayt", "Purity", "Beloved"]
  },
  {
    name: "Bushra",
    arabic: "بُشْرَى",
    urdu: "بشریٰ",
    gender: "girl",
    meaningEn: "Glad tidings, good news from Allah mentioned in Quran",
    meaningUr: "خوشخبری، نویدِ مسرت (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Good News", "Popular"]
  },
  {
    name: "Dania",
    arabic: "دَانِيَة",
    urdu: "دانیہ",
    gender: "girl",
    meaningEn: "Close, near at hand, fruits of Paradise near to harvest",
    meaningUr: "قریب، جنت کے جھکے ہوئے پھل (قرآنی صفت)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Paradise"]
  },
  {
    name: "Emaan",
    arabic: "إِيمَان",
    urdu: "ایمان",
    gender: "girl",
    meaningEn: "Faith, belief in Allah, conviction, peace of heart",
    meaningUr: "اللہ پر کامل یقین، سچا عقیدہ، دل کا سکون",
    origin: "Arabic / Quranic",
    tags: ["Faith", "Quranic", "Popular"]
  },
  {
    name: "Eshal",
    arabic: "إِشْعَال",
    urdu: "ایشل",
    gender: "girl",
    meaningEn: "Flower of Paradise, gentle radiant bloom",
    meaningUr: "جنت کا خوبصورت پھول، مہکتا ہوا شگوفہ",
    origin: "Arabic",
    tags: ["Paradise", "Trending", "Popular"]
  },
  {
    name: "Faiza",
    arabic: "فَائِزَة",
    urdu: "فائزہ",
    gender: "girl",
    meaningEn: "Victorious, triumphant, winner of divine reward",
    meaningUr: "کامیاب، فتح پانے والی، مراد پانے والی",
    origin: "Arabic / Quranic",
    tags: ["Victory", "Popular"]
  },
  {
    name: "Fajr",
    arabic: "فَجْر",
    urdu: "فجر",
    gender: "girl",
    meaningEn: "Dawn, morning light, first prayer of the day",
    meaningUr: "صبحِ صادق، پو پھٹنے کا وقت، سورۃ الفجر",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Surah Fajr", "Light"]
  },
  {
    name: "Farwa",
    arabic: "فَرْوَة",
    urdu: "فروہ",
    gender: "girl",
    meaningEn: "Crown, wealthy, abundance, noble Sahabiya",
    meaningUr: "تاج، دولت مند، فراوانی، صحابیہ کا مبارک نام",
    origin: "Arabic",
    tags: ["Sahabiya", "Popular"]
  },
  {
    name: "Faryal",
    arabic: "فَرْيَال",
    urdu: "فریال",
    gender: "girl",
    meaningEn: "Angel, having beautiful eyes, royal princess",
    meaningUr: "خوبصورت آنکھوں والی پری، شہزادی",
    origin: "Persian / Arabic",
    tags: ["Beauty", "Popular"]
  },
  {
    name: "Fizza",
    arabic: "فِضَّة",
    urdu: "فضہ",
    gender: "girl",
    meaningEn: "Silver, pure, devoted companion of Sayyida Fatima (RA)",
    meaningUr: "چاندی، خالص، سیدہ فاطمہ الزہراء کی وفادار خادمہ حضرت فضہ (رض)",
    origin: "Arabic / Quranic",
    tags: ["Ahl al-Bayt", "Devotion", "Popular"]
  },
  {
    name: "Haleema",
    arabic: "حَلِيمَة",
    urdu: "حلیمہ",
    gender: "girl",
    meaningEn: "Gentle, patient, compassionate foster mother of the Prophet ﷺ",
    meaningUr: "بردبار، صابر، حضرت حلیمہ سعدیہ رضی اللہ عنہا",
    origin: "Arabic",
    tags: ["Foster Mother", "Patience", "Beloved"],
    blessedNote: "Hazrat Halima As-Sa'diyah (RA), blessed foster mother of Prophet Muhammad ﷺ."
  },
  {
    name: "Hareem",
    arabic: "حَرِيم",
    urdu: "حریم",
    gender: "girl",
    meaningEn: "Sacred sanctuary, protected honorable realm",
    meaningUr: "مقدس مقام، حرمِ پاک کی فضا، باعزت چاردیواری",
    origin: "Arabic",
    tags: ["Sacred", "Trending"]
  },
  {
    name: "Haya",
    arabic: "حَيَاء",
    urdu: "حیا",
    gender: "girl",
    meaningEn: "Modesty, decency, shyness, hallmark of faith in Islam",
    meaningUr: "شرم و حیا، پاکدامنی، ایمان کا خاص حصہ",
    origin: "Arabic / Hadith",
    tags: ["Modesty", "Virtue", "Trending"],
    blessedNote: "The Prophet ﷺ said: 'Haya (modesty) is an essential part of faith.' (Sahih Bukhari)"
  },
  {
    name: "Hina",
    arabic: "حِنَّاء",
    urdu: "حنا",
    gender: "girl",
    meaningEn: "Henna, fragrant auspicious dye used in festivities",
    meaningUr: "مہندی، مبارک اور خوشنما رنگ",
    origin: "Arabic",
    tags: ["Fragrance", "Popular"]
  },
  {
    name: "Hira",
    arabic: "حِرَاء",
    urdu: "حراء",
    gender: "girl",
    meaningEn: "The sacred mountain cave where first Quranic revelation occurred",
    meaningUr: "غارِ حرا، وہ مقدس غار جہاں پہلی وحی نازل ہوئی",
    origin: "Arabic",
    tags: ["Sacred", "First Revelation", "Trending"]
  },
  {
    name: "Humaira",
    arabic: "حُمَيْرَاء",
    urdu: "حمیرا",
    gender: "girl",
    meaningEn: "Red-cheeked beauty, affectionate pet name of Ayesha (RA) given by Prophet ﷺ",
    meaningUr: "گلابی گالوں والی، حضور ﷺ کا سیدہ عائشہ (رض) کے لیے پیار بھرا لقب",
    origin: "Arabic",
    tags: ["Umm al-Mu'minin", "Beloved"]
  },
  {
    name: "Irha",
    arabic: "إِرْهَاء",
    urdu: "ارحا",
    gender: "girl",
    meaningEn: "God gifted, peaceful, calm tranquility",
    meaningUr: "اللہ کا تحفہ، پرسکون، مطمئن دل",
    origin: "Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Irum",
    arabic: "إِرَم",
    urdu: "ارم",
    gender: "girl",
    meaningEn: "Garden of Paradise, magnificent historic city mentioned in Quran",
    meaningUr: "جنت کا باغ، شداد کی بنائی ہوئی پرشکوہ جنت (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Surah Fajr"]
  },
  {
    name: "Isra",
    arabic: "إِسْرَاء",
    urdu: "اسراء",
    gender: "girl",
    meaningEn: "Nocturnal journey of the Prophet ﷺ to the Heavens",
    meaningUr: "رات کا سفر، حضور ﷺ کا سفرِ معراج (سورۃ الاسراء)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Miracle"]
  },
  {
    name: "Javeria",
    arabic: "جُوَيْرِيَة",
    urdu: "جویریہ",
    gender: "girl",
    meaningEn: "Bringer of joy, youthful rose, Mother of the Believers",
    meaningUr: "خوشیاں لانے والی، ام المؤمنین سیدہ جویریہ بنت حارث (رض)",
    origin: "Arabic",
    tags: ["Umm al-Mu'minin", "Beloved"]
  },
  {
    name: "Kinza",
    arabic: "كِنْزَة",
    urdu: "کنزہ",
    gender: "girl",
    meaningEn: "Hidden treasure, wealthy bounty",
    meaningUr: "چھپا ہوا خزانہ، بیش قیمت دولت",
    origin: "Arabic / Quranic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Kulsoom",
    arabic: "كُلْثُوم",
    urdu: "کلثوم",
    gender: "girl",
    meaningEn: "Full cheeks, healthy and handsome, daughter of the Prophet ﷺ",
    meaningUr: "بھرے گالوں والی، حضور ﷺ کی صاحبزادی حضرت ام کلثوم (رض)",
    origin: "Arabic",
    tags: ["Prophetic Lineage", "Daughter of Prophet"]
  },
  {
    name: "Laiba",
    arabic: "لَاعِبَة",
    urdu: "لائبہ",
    gender: "girl",
    meaningEn: "Angel of Paradise, gorgeous and gentle fairy",
    meaningUr: "جنت کی حور یا فرشتہ، انتہائی خوبصورت",
    origin: "Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Laila",
    arabic: "لَيْلَى",
    urdu: "لیلیٰ",
    gender: "girl",
    meaningEn: "Night beauty, dark mystique of night",
    meaningUr: "رات کا حسن، سیاہ زلفوں والی حسین لڑکی",
    origin: "Arabic",
    tags: ["Classic", "Popular"]
  },
  {
    name: "Maira",
    arabic: "مَائِرَة",
    urdu: "مائرہ",
    gender: "girl",
    meaningEn: "Moon, swift, light, energetic provider",
    meaningUr: "چاند، تیز رفتار، خوراک فراہم کرنے والی",
    origin: "Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Malaika",
    arabic: "مَلَائِكَة",
    urdu: "ملائکہ",
    gender: "girl",
    meaningEn: "Angels, pure heavenly beings of light",
    meaningUr: "فرشتے، پاکیزہ آسمانی ہستیاں (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Purity", "Popular"]
  },
  {
    name: "Manahil",
    arabic: "مَنَاهِل",
    urdu: "مناہل",
    gender: "girl",
    meaningEn: "Springs of fresh sweet water, fountains of knowledge",
    meaningUr: "تازہ میٹھے پانی کے چشمے، علم کے سرچشمے",
    origin: "Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Meerab",
    arabic: "مِيرَاب",
    urdu: "میرب",
    gender: "girl",
    meaningEn: "Water distributor of Paradise, flower of Jannah",
    meaningUr: "پانی تقسیم کرنے والی، جنت کا پھول",
    origin: "Arabic / Persian",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Minahil",
    arabic: "مِنَاهِل",
    urdu: "مناہل",
    gender: "girl",
    meaningEn: "Fresh springs of pure water",
    meaningUr: "چشمے، میٹھے پانی کے سوتے",
    origin: "Arabic",
    tags: ["Popular", "Trending"]
  },
  {
    name: "Muqaddas",
    arabic: "مُقَدَّس",
    urdu: "مقدس",
    gender: "girl",
    meaningEn: "Sacred, holy, pure, consecrated",
    meaningUr: "پاک، پاکیزہ، متبرک، لائقِ احترام",
    origin: "Arabic",
    tags: ["Sacred", "Purity"]
  },
  {
    name: "Nadia",
    arabic: "نَادِيَة",
    urdu: "نادیہ",
    gender: "girl",
    meaningEn: "Caller, announcer, moist with dew, generous",
    meaningUr: "پکارنے والی، شبنم سے تر، سخی",
    origin: "Arabic",
    tags: ["Popular", "Classic"]
  },
  {
    name: "Nimra",
    arabic: "نَمِرَة",
    urdu: "نمرہ",
    gender: "girl",
    meaningEn: "Clean pure water, famous historic mosque at Mount Arafat (Masjid-e-Nimra)",
    meaningUr: "صاف پانی، میدانِ عرفات کی تاریخی مسجد (مسجدِ نمرہ)",
    origin: "Arabic",
    tags: ["Sacred Site", "Hajj", "Popular"]
  },
  {
    name: "Qurratulain",
    arabic: "قُرَّةُ العَيْن",
    urdu: "قرة العین",
    gender: "girl",
    meaningEn: "Delight of the eye, source of joy and peace for parents",
    meaningUr: "آنکھوں کی ٹھنڈک، دل کا سرور (قرآنی دعا)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Beloved"]
  },
  {
    name: "Rabia",
    arabic: "رَابِعَة",
    urdu: "رابعہ",
    gender: "girl",
    meaningEn: "Fourth, springtime, saintly ascetic Rabia Basri (RA)",
    meaningUr: "چوتھی، بہار کا موسم، عظیم صوفیہ رابعہ بصری (رح)",
    origin: "Arabic",
    tags: ["Spiritual", "Pious"]
  },
  {
    name: "Rida",
    arabic: "رِدَاء",
    urdu: "ردا",
    gender: "girl",
    meaningEn: "Modest cloak, sheet of dignity, veil of honor",
    meaningUr: "چادر، پردہ، حیا و وقار کا لباس",
    origin: "Arabic",
    tags: ["Modesty", "Popular"]
  },
  {
    name: "Romaisa",
    arabic: "رُمَيْثَة",
    urdu: "رمیسہ",
    gender: "girl",
    meaningEn: "Bouquet of heavenly flowers, noble Sahabiya Umm Sulaym",
    meaningUr: "جنت کے پھولوں کا گلدستہ، جلیل القدر صحابیہ ام سلیم (رض)",
    origin: "Arabic",
    tags: ["Sahabiya", "Trending", "Popular"]
  },
  {
    name: "Saadia",
    arabic: "سَعْدِيَّة",
    urdu: "سعدیہ",
    gender: "girl",
    meaningEn: "Blessed, fortunate, belonging to the noble Banu Saad tribe",
    meaningUr: "نیک بخت، خوش نصیب، قبیلہ بنو سعد سے منسوب",
    origin: "Arabic",
    tags: ["Blessed", "Popular"]
  },
  {
    name: "Saba",
    arabic: "صَبَا",
    urdu: "صبا",
    gender: "girl",
    meaningEn: "Gentle morning breeze, fresh spring zephyr",
    meaningUr: "صبح کی ٹھنڈی ہوا، بادِ صبا، شادابی",
    origin: "Arabic",
    tags: ["Breeze", "Popular"]
  },
  {
    name: "Sana",
    arabic: "سَنَاء",
    urdu: "ثناء",
    gender: "girl",
    meaningEn: "Praise, radiance, brilliant flash of lightning (Quranic)",
    meaningUr: "تعریف، چمک، بجلی کا کوندہ (سورۃ النور)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Praise", "Popular"]
  },
  {
    name: "Sara",
    arabic: "سَارَة",
    urdu: "سارہ",
    gender: "girl",
    meaningEn: "Pure, princess, noble wife of Prophet Ibrahim (AS)",
    meaningUr: "خالص، خوش رہنے والی، حضرت ابراہیم (ع) کی زوجہ محترمہ",
    origin: "Hebrew / Arabic",
    tags: ["Prophetic Family", "Princess", "Popular"]
  },
  {
    name: "Sumayya",
    arabic: "سُمَيَّة",
    urdu: "سمیہ",
    gender: "girl",
    meaningEn: "High above, first martyr of Islam Hazrat Sumayya (RA)",
    meaningUr: "بلند مرتبہ، اسلام کی سب سے پہلی شہیدہ خاتون (رض)",
    origin: "Arabic",
    tags: ["Sahabiya", "First Martyr of Islam"],
    blessedNote: "Hazrat Sumayya bint Khabbat (RA), the glorious first martyr of Islam."
  },
  {
    name: "Tayyaba",
    arabic: "طَيِّبَة",
    urdu: "طیبہ",
    gender: "girl",
    meaningEn: "Pure, fragrant, clean, blessed holy title of Madinah Munawwarah",
    meaningUr: "پاکیزہ، مدینہ منورہ کا پیارا نام (مدینۃ الطیبہ)",
    origin: "Arabic",
    tags: ["Purity", "Madinah", "Popular"]
  },
  {
    name: "Tooba",
    arabic: "طُوبَى",
    urdu: "طوبیٰ",
    gender: "girl",
    meaningEn: "Blessed bliss, tree in Paradise offering eternal shade and fruit",
    meaningUr: "مبارک، جنت کا سایہ دار درخت، دائمی خوشخبری (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Paradise", "Popular"]
  },
  {
    name: "Urwa",
    arabic: "عُرْوَة",
    urdu: "عروہ",
    gender: "girl",
    meaningEn: "Firm handhold, unbreakable bond with Allah mentioned in Quran",
    meaningUr: "مضبوط سہارا، عروۃ الوثقیٰ (اللہ کی مضبوط رسی)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Trending"]
  },
  {
    name: "Yusra",
    arabic: "يُسْرَى",
    urdu: "یسریٰ",
    gender: "girl",
    meaningEn: "Ease, comfort, relief after hardship promised in Surah Ash-Sharh",
    meaningUr: "آسانی، فراخی، تنگی کے بعد آنے والی آسانی (قرآنی وعدہ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Ease", "Popular"]
  },
  {
    name: "Zahra",
    arabic: "زَهْرَاء",
    urdu: "زہراء",
    gender: "girl",
    meaningEn: "Radiant, blooming flower, luminous title of Sayyida Fatima (RA)",
    meaningUr: "چمکدار چہرہ، کھلتا ہوا پھول، سیدہ فاطمہ الزہراء کا لقب",
    origin: "Arabic",
    tags: ["Ahl al-Bayt", "Radiant", "Best Name"],
    blessedNote: "Sayyida Fatima az-Zahra (RA), radiant lady of Jannah."
  },
  {
    name: "Zunaira",
    arabic: "زُنَيْرَة",
    urdu: "زنیرہ",
    gender: "girl",
    meaningEn: "Flower found in Paradise, heroic Sahabiya who stood firm for Islam",
    meaningUr: "جنت کا نازک پھول، جلیل القدر صحابیہ حضرت زنیرہ (رض)",
    origin: "Arabic",
    tags: ["Sahabiya", "Hero of Islam", "Trending"]
  }
,
  {
    name: "Afan",
    arabic: "عَفَّان",
    urdu: "عفان",
    gender: "boy",
    meaningEn: "Chaste, modest, one who refrains from evil",
    meaningUr: "پاکدامن، باحیا، گناہوں سے بچنے والا",
    origin: "Arabic",
    tags: ["Popular", "Virtue"]
  },
  {
    name: "Faraz",
    arabic: "فَرَاز",
    urdu: "فراز",
    gender: "boy",
    meaningEn: "Elevation, height, high altitude, ascending summit",
    meaningUr: "بلندی، اونچائی، اوجِ کمال",
    origin: "Persian",
    tags: ["Popular", "Honor"]
  },
  {
    name: "Gohar",
    arabic: "جَوْهَر",
    urdu: "گوہر",
    gender: "boy",
    meaningEn: "Precious gemstone, diamond, essence of pure nobility",
    meaningUr: "قیمتی موتی، ہیرا، جوہر، نایاب صفت",
    origin: "Persian",
    tags: ["Classic", "Gem"]
  },
  {
    name: "Gulzar",
    arabic: "گُلْزَار",
    urdu: "گلزار",
    gender: "boy",
    meaningEn: "Rose garden, blooming orchard, flourishing paradise",
    meaningUr: "چمن، پھولوں کا باغ، سرسبز و شاداب",
    origin: "Persian",
    tags: ["Classic", "Garden"]
  },
  {
    name: "Javed",
    arabic: "جَاوِيد",
    urdu: "جاوید",
    gender: "boy",
    meaningEn: "Eternal, everlasting, perpetual, immortal legacy",
    meaningUr: "ہمیشہ رہنے والا، لازوال، سدا بہار",
    origin: "Persian",
    tags: ["Classic", "Popular"]
  },
  {
    name: "Kashan",
    arabic: "كَاشَان",
    urdu: "کاشان",
    gender: "boy",
    meaningEn: "Palace, mansion, glorious dwelling",
    meaningUr: "محل، شاندار حویلی، خوبصورت ٹھکانہ",
    origin: "Persian",
    tags: ["Popular", "Trending"]
  },
  {
    name: "Mirza",
    arabic: "مِيرْزَا",
    urdu: "مرزا",
    gender: "boy",
    meaningEn: "Prince of noble descent, aristocrat, high-born gentleman",
    meaningUr: "شہزادہ، امیر زادہ، شریف اور معزز انسان",
    origin: "Persian",
    tags: ["Noble", "Classic"]
  },
  {
    name: "Naveed",
    arabic: "نَوِيد",
    urdu: "نوید",
    gender: "boy",
    meaningEn: "Good news, joyful announcement, glad tidings",
    meaningUr: "خوشخبری، مبارکباد، نویدِ مسرت",
    origin: "Persian",
    tags: ["Happiness", "Popular"]
  },
  {
    name: "Rashid",
    arabic: "رَاشِد",
    urdu: "راشد",
    gender: "boy",
    meaningEn: "Rightly guided, follower of truth, righteous thinker",
    meaningUr: "ہدایت یافتہ، سیدھے راستے پر چلنے والا، دانشمند",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Rightly Guided", "Popular"]
  },
  {
    name: "Rauf",
    arabic: "رَؤُوف",
    urdu: "رؤف",
    gender: "boy",
    meaningEn: "Affectionate, tender, deeply caring and kind",
    meaningUr: "نہایت مہربان، شفیق، درد مند دل رکھنے والا",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Kindness"]
  },
  {
    name: "Shahbaz",
    arabic: "شَاهْبَاز",
    urdu: "شہباز",
    gender: "boy",
    meaningEn: "Royal white falcon, king of the skies, fearless warrior",
    meaningUr: "شاہین، شاہی باز، بلند پرواز بہادر",
    origin: "Persian",
    tags: ["Brave", "Popular"]
  },
  {
    name: "Shahzad",
    arabic: "شَهْزَاد",
    urdu: "شہزاد",
    gender: "boy",
    meaningEn: "Son of a king, royal prince, handsome heir",
    meaningUr: "بادشاہ کا بیٹا، شہزادہ، باوقار نوجوان",
    origin: "Persian",
    tags: ["Prince", "Popular"]
  },
  {
    name: "Shehryar",
    arabic: "شَهْرِيَار",
    urdu: "شہریار",
    gender: "boy",
    meaningEn: "Sovereign ruler, king, guardian of the metropolis",
    meaningUr: "شہر کا حکمران، بادشاہ، صاحبِ اقتدار",
    origin: "Persian",
    tags: ["Royal", "Popular"]
  },
  {
    name: "Sikandar",
    arabic: "سِكَنْدَر",
    urdu: "سکندر",
    gender: "boy",
    meaningEn: "Defender of mankind, glorious conqueror",
    meaningUr: "فاتح، بہادر، انسانوں کا محافظ و نگہبان",
    origin: "Greek / Persian",
    tags: ["Classic", "Warrior"]
  },
  {
    name: "Tanveer",
    arabic: "تَنْوِير",
    urdu: "تنویر",
    gender: "boy",
    meaningEn: "Enlightenment, ray of divine dawn, illumination",
    meaningUr: "روشنی، چمک، منور کرنا، صبح کا اجالا",
    origin: "Arabic",
    tags: ["Light", "Classic"]
  },
  {
    name: "Tauseef",
    arabic: "تَوْصِيف",
    urdu: "توصیف",
    gender: "boy",
    meaningEn: "Praise, tribute, describing glorious virtues",
    meaningUr: "تعریف و توصیف، خوبیوں کا بیان، مدح سرائی",
    origin: "Arabic",
    tags: ["Praise", "Classic"]
  },
  {
    name: "Waqar",
    arabic: "وَقَار",
    urdu: "وقار",
    gender: "boy",
    meaningEn: "Dignity, solemn majesty, grace, self-respect",
    meaningUr: "عزت، تمکنت، سنجیدگی، شان و شوکت",
    origin: "Arabic",
    tags: ["Dignity", "Popular"]
  },
  {
    name: "Zia",
    arabic: "ضِيَاء",
    urdu: "ضیاء",
    gender: "boy",
    meaningEn: "Radiance, brilliant beam of light, glowing source",
    meaningUr: "روشنی، چمک، نور، تابندگی",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Light", "Popular"]
  },
  {
    name: "Anila",
    arabic: "أَنِيلَة",
    urdu: "انیلہ",
    gender: "girl",
    meaningEn: "Graceful breeze, sweet air, charming nature",
    meaningUr: "ٹھنڈی ہوا، بادِ نسیم، پیاری اور دلکش",
    origin: "Arabic",
    tags: ["Popular"]
  },
  {
    name: "Atiqa",
    arabic: "عَتِيقَة",
    urdu: "عتیقہ",
    gender: "girl",
    meaningEn: "Ancient, pure, noble and emancipated woman",
    meaningUr: "آزاد، پاکیزہ، قدیم شریف النسب خاتون",
    origin: "Arabic",
    tags: ["Sahabiya", "Noble"]
  },
  {
    name: "Benazir",
    arabic: "بِينَاظِير",
    urdu: "بے نظیر",
    gender: "girl",
    meaningEn: "Incomparable, matchless, peerless beauty and leader",
    meaningUr: "جس کی کوئی مثال نہ ہو، لاجواب، بے مثال",
    origin: "Persian",
    tags: ["Leader", "Historic"]
  },
  {
    name: "Farhana",
    arabic: "فَرْحَانَة",
    urdu: "فرحانہ",
    gender: "girl",
    meaningEn: "Joyful, ecstatic, cheerful, radiant with laughter",
    meaningUr: "خوش و خرم، مسرور، شادمان رہنے والی",
    origin: "Arabic",
    tags: ["Happiness", "Popular"]
  },
  {
    name: "Farhat",
    arabic: "فَرْحَة",
    urdu: "فرحت",
    gender: "girl",
    meaningEn: "Delight, refreshment, heart's satisfaction",
    meaningUr: "خوشی، تازگی، دلی مسرت اور سکون",
    origin: "Arabic",
    tags: ["Happiness", "Classic"]
  },
  {
    name: "Habiba",
    arabic: "حَبِيبَة",
    urdu: "حبیبہ",
    gender: "girl",
    meaningEn: "Beloved, sweetheart, dearest daughter or friend",
    meaningUr: "محبوبہ، پیاری، دل کو بھانے والی",
    origin: "Arabic",
    tags: ["Beloved", "Sahabiya"]
  },
  {
    name: "Hijab",
    arabic: "حِجَاب",
    urdu: "حجاب",
    gender: "girl",
    meaningEn: "Modest veil, sacred protection, crown of Islamic dignity",
    meaningUr: "پردہ، حیا کا لباس، پاکیزگی کی علامت",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Modesty"]
  },
  {
    name: "Huma",
    arabic: "هُومَا",
    urdu: "ہما",
    gender: "girl",
    meaningEn: "Legendary bird of good fortune and royal blessing",
    meaningUr: "خوش نصیبی کا پرندہ، مبارک سایہ ڈالنے والا پرندہ",
    origin: "Persian",
    tags: ["Classic", "Blessing"]
  },
  {
    name: "Komal",
    arabic: "كُومَل",
    urdu: "کومل",
    gender: "girl",
    meaningEn: "Soft, delicate, sweet, tender-hearted",
    meaningUr: "نازک، نرم مزاج، میٹھی اور پیاری",
    origin: "Urdu",
    tags: ["Delicate", "Popular"]
  },
  {
    name: "Maham",
    arabic: "مَاهَم",
    urdu: "ماہم",
    gender: "girl",
    meaningEn: "Full moon, radiantly beautiful queen",
    meaningUr: "چودہویں کا چاند، چاندنی جیسی خوبصورت",
    origin: "Persian / Turkish",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Mehreen",
    arabic: "مِهْرِين",
    urdu: "مہرین",
    gender: "girl",
    meaningEn: "Loving, affectionate, nature of the warm sun",
    meaningUr: "محبت کرنے والی، سورج جیسی روشن اور شفیق",
    origin: "Persian",
    tags: ["Affection", "Popular"]
  },
  {
    name: "Mehwish",
    arabic: "مَهْوِش",
    urdu: "مہوش",
    gender: "girl",
    meaningEn: "Moon-faced beauty, lovely like the lunar glow",
    meaningUr: "چاند جیسے خوبصورت چہرے والی، ماہ رخ",
    origin: "Persian",
    tags: ["Beauty", "Popular"]
  },
  {
    name: "Misbah",
    arabic: "مِصْبَاح",
    urdu: "مصباح",
    gender: "girl",
    meaningEn: "Luminous lamp, beacon of truth described in Surah An-Nur",
    meaningUr: "چراغ، قندیل، نور کا چراغ (آیت النور)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Surah Nur", "Light"]
  },
  {
    name: "Nafeesa",
    arabic: "نَفِيسَة",
    urdu: "نفیسہ",
    gender: "girl",
    meaningEn: "Exquisite, refined, precious gem, great scholar Sayyida Nafeesa",
    meaningUr: "عمدہ، قیمتی، نایاب، سیدہ نفیسہ (عظیم عالمہ)",
    origin: "Arabic",
    tags: ["Scholar", "Purity"]
  },
  {
    name: "Nargis",
    arabic: "نَرْجِس",
    urdu: "نرگس",
    gender: "girl",
    meaningEn: "Narcissus blossom, captivating blossom with enchanting eye",
    meaningUr: "نرگس کا خوبصورت پھول، حسین آنکھوں والی",
    origin: "Persian / Arabic",
    tags: ["Flower", "Classic"]
  },
  {
    name: "Nasreen",
    arabic: "نَسْرِين",
    urdu: "نسرین",
    gender: "girl",
    meaningEn: "Wild white rose, fresh floral breeze",
    meaningUr: "سفید گلاب، خوشبودار پھول",
    origin: "Persian",
    tags: ["Flower", "Classic"]
  },
  {
    name: "Nazia",
    arabic: "نَازِيَة",
    urdu: "نازیہ",
    gender: "girl",
    meaningEn: "Proud, pride of parents, graceful with dignity",
    meaningUr: "فخر کرنے والی، ناز والی، والدین کا فخر",
    origin: "Persian",
    tags: ["Pride", "Popular"]
  },
  {
    name: "Neelam",
    arabic: "نِيلَم",
    urdu: "نیلم",
    gender: "girl",
    meaningEn: "Sapphire gem, deep heavenly blue jewel",
    meaningUr: "نیلم کا قیمتی پتھر، نایاب ہیرا",
    origin: "Persian",
    tags: ["Gem", "Classic"]
  },
  {
    name: "Nida",
    arabic: "نِدَاء",
    urdu: "ندا",
    gender: "girl",
    meaningEn: "Call, sacred voice, holy summons mentioned in Quran",
    meaningUr: "آواز، پکار، اذانِ حق (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Voice", "Popular"]
  },
  {
    name: "Noreen",
    arabic: "نُورِين",
    urdu: "نورین",
    gender: "girl",
    meaningEn: "Bright, shining with double light, luminous aura",
    meaningUr: "روشنی سے بھری ہوئی، چمکدار، دوہرا نور",
    origin: "Arabic",
    tags: ["Light", "Popular"]
  },
  {
    name: "Parveen",
    arabic: "پَرْوِين",
    urdu: "پروین",
    gender: "girl",
    meaningEn: "Pleiades constellation of stars, brilliant cluster",
    meaningUr: "ثریّا، ستاروں کا جھمکا، روشن ستارے",
    origin: "Persian",
    tags: ["Stars", "Classic"]
  },
  {
    name: "Qudsia",
    arabic: "قُدْسِيَّة",
    urdu: "قدسیہ",
    gender: "girl",
    meaningEn: "Holy, heavenly, celestial, blessed with angelic purity",
    meaningUr: "مقدس، آسمانی، فرشتوں جیسی پاکیزہ",
    origin: "Arabic",
    tags: ["Sacred", "Purity"]
  },
  {
    name: "Rafia",
    arabic: "رَفِيعَة",
    urdu: "رفیعہ",
    gender: "girl",
    meaningEn: "Exalted, sublime, high station, elevated in rank",
    meaningUr: "بلند مرتبہ، اعلیٰ مقام والی، معزز",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Noble"]
  },
  {
    name: "Rania",
    arabic: "رَانِيَة",
    urdu: "رانیہ",
    gender: "girl",
    meaningEn: "Gazing with admiration, queenly, delightful observer",
    meaningUr: "غور سے دیکھنے والی، ملکہ، نگاہیں جمانے والی",
    origin: "Arabic",
    tags: ["Royal", "Popular"]
  },
  {
    name: "Rashida",
    arabic: "رَاشِدَة",
    urdu: "راشدہ",
    gender: "girl",
    meaningEn: "Rightly guided woman, mature and prudent believer",
    meaningUr: "سیدھے راستے پر چلنے والی، عقلمند، نیک بخت",
    origin: "Arabic",
    tags: ["Virtue", "Wisdom"]
  },
  {
    name: "Rubina",
    arabic: "رُوبِينَا",
    urdu: "روبینہ",
    gender: "girl",
    meaningEn: "Blessed with waterfall / red ruby, compassionate woman",
    meaningUr: "یاقوت، سرخ نگینہ، پیار کرنے والی",
    origin: "Arabic / Persian",
    tags: ["Classic", "Popular"]
  },
  {
    name: "Saima",
    arabic: "صَائِمَة",
    urdu: "صائمہ",
    gender: "girl",
    meaningEn: "Fasting woman, devout servant who observes holy fasts",
    meaningUr: "روزہ رکھنے والی، عبادت گزار عورت",
    origin: "Arabic",
    tags: ["Pious", "Fasting", "Popular"]
  },
  {
    name: "Saleha",
    arabic: "صَالِحَة",
    urdu: "صالحہ",
    gender: "girl",
    meaningEn: "Righteous, virtuous, chaste and dutiful believer",
    meaningUr: "نیک کردار، پارسا، صالح عورت",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Pious"]
  },
  {
    name: "Samina",
    arabic: "ثَمِينَة",
    urdu: "ثمینہ",
    gender: "girl",
    meaningEn: "Precious, priceless, invaluable gem",
    meaningUr: "قیمتی، بیش بہا، نایاب اور گراں قدر",
    origin: "Arabic",
    tags: ["Precious", "Popular"]
  },
  {
    name: "Sania",
    arabic: "سَانِيَة",
    urdu: "ثانیہ",
    gender: "girl",
    meaningEn: "Brilliant, radiant, moment of grace, second to none",
    meaningUr: "چمکدار، روشن، لمحہ، تابندہ",
    origin: "Arabic",
    tags: ["Popular", "Light"]
  },
  {
    name: "Sawera",
    arabic: "سَوِيرَا",
    urdu: "سویرا",
    gender: "girl",
    meaningEn: "Morning dawn, daybreak, early light of day",
    meaningUr: "صبح، پو پھٹنے کا وقت، نیا اجالا",
    origin: "Urdu",
    tags: ["Morning", "Popular"]
  },
  {
    name: "Shanza",
    arabic: "شَانْزَا",
    urdu: "شانزہ",
    gender: "girl",
    meaningEn: "Dignified woman, noble jewel with regal poise",
    meaningUr: "باوقار، شریف خاتون، قیمتی نگینہ",
    origin: "Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Shanzay",
    arabic: "شَانْزَاي",
    urdu: "شانزے",
    gender: "girl",
    meaningEn: "Princess, perfumed flower of Paradise",
    meaningUr: "شہزادی، جنت کی معطر کلی",
    origin: "Arabic",
    tags: ["Trending", "Popular"]
  },
  {
    name: "Shumaila",
    arabic: "شُمَيْلَة",
    urdu: "شمائلہ",
    gender: "girl",
    meaningEn: "Beautiful countenance, fine moral character and manners",
    meaningUr: "حسین چہرہ، اچھے اخلاق و عادات والی",
    origin: "Arabic",
    tags: ["Character", "Popular"]
  },
  {
    name: "Sobia",
    arabic: "ثُوَيْبَة",
    urdu: "ثوبیہ",
    gender: "girl",
    meaningEn: "Rewarding, nurse who nurtured the Prophet ﷺ in infancy",
    meaningUr: "ثواب پانے والی، حضور ﷺ کی پہلی رضاعی والدہ حضرت ثوبیہ (رض)",
    origin: "Arabic",
    tags: ["Foster Mother", "Sahabiya", "Popular"]
  },
  {
    name: "Sumaira",
    arabic: "سُمَيْرَاء",
    urdu: "سمیرا",
    gender: "girl",
    meaningEn: "Delightful evening conversationalist, brownish beauty",
    meaningUr: "رات کو گفتگو کرنے والی سہیلی، گندمی رنگ کی خوبصورت",
    origin: "Arabic",
    tags: ["Popular", "Friendship"]
  },
  {
    name: "Sundas",
    arabic: "سُنْدُس",
    urdu: "سندس",
    gender: "girl",
    meaningEn: "Fine green silk of Paradise mentioned in Surah Al-Kahf",
    meaningUr: "جنت کا باریک سبز ریشم (قرآنی لباسِ جنت)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Surah Kahf", "Silk of Paradise"]
  },
  {
    name: "Tahira",
    arabic: "طَاهِرَة",
    urdu: "طاہرہ",
    gender: "girl",
    meaningEn: "Chaste, immaculate, pure, title of Sayyida Khadija (RA)",
    meaningUr: "پاکباز، پاکدامن، سیدہ خدیجۃ الکبریٰ کا لقب",
    origin: "Arabic",
    tags: ["Purity", "Tahira", "Umm al-Mu'minin"]
  },
  {
    name: "Tanzeela",
    arabic: "تَنْزِيلَة",
    urdu: "تنزیلہ",
    gender: "girl",
    meaningEn: "Revelation sent down from the heavens, Quranic descent",
    meaningUr: "آسمان سے نازل شدہ کلام، اتاری ہوئی وحی",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Revelation"]
  },
  {
    name: "Umme Kulsoom",
    arabic: "أُمّ كُلْثُوم",
    urdu: "ام کلثوم",
    gender: "girl",
    meaningEn: "Mother of full cheeks, noble daughter of Prophet Muhammad ﷺ",
    meaningUr: "حضور ﷺ کی چوتھی صاحبزادی اور زوجہ عثمان غنی (رض)",
    origin: "Arabic",
    tags: ["Daughter of Prophet", "Prophetic Lineage"]
  },
  {
    name: "Uzma",
    arabic: "عُظْمَى",
    urdu: "عظمیٰ",
    gender: "girl",
    meaningEn: "Greatest, most supreme, grandest station",
    meaningUr: "سب سے بڑی، عظیم الشان، عالی مرتبت",
    origin: "Arabic / Quranic",
    tags: ["Greatness", "Popular"]
  },
  {
    name: "Wajiha",
    arabic: "وَجِيهَة",
    urdu: "وجیہہ",
    gender: "girl",
    meaningEn: "Distinguished, eminent, respected lady with striking grace",
    meaningUr: "باعزت، وجاہت والی، باوقار چہرے والی",
    origin: "Arabic",
    tags: ["Eminent", "Dignity"]
  },
  {
    name: "Wardah",
    arabic: "وَرْدَة",
    urdu: "وردہ",
    gender: "girl",
    meaningEn: "Rose, delicate blossom, radiant flower described in Quran",
    meaningUr: "گلاب کا پھول، سرخ کلی (قرآنی لفظ)",
    origin: "Arabic / Quranic",
    tags: ["Quranic", "Rose", "Popular"]
  },
  {
    name: "Yasmeen",
    arabic: "يَاسَمِين",
    urdu: "یاسمین",
    gender: "girl",
    meaningEn: "Jasmine flower, sweet-scented white bloom",
    meaningUr: "چنبیلی کا خوشبودار پھول، یاسمین",
    origin: "Arabic / Persian",
    tags: ["Flower", "Popular"]
  },
  {
    name: "Zubaida",
    arabic: "زُبَيْدَة",
    urdu: "زبیدہ",
    gender: "girl",
    meaningEn: "Pure essence, cream of goodness, famous philanthropist queen",
    meaningUr: "عمدہ، مکھن، خالص جوہر، ملکہ زبیدہ (نہر زبیدہ والی)",
    origin: "Arabic",
    tags: ["Historic", "Generous"]
  },
  {
    name: "Zulaikha",
    arabic: "زُلَيْخَا",
    urdu: "زلیخا",
    gender: "girl",
    meaningEn: "Brilliant beauty, graceful woman of Egyptian history",
    meaningUr: "حسین و جمیل، صاحبِ حسن، حضرت یوسف (ع) کے دور کی خاتون",
    origin: "Arabic / Hebrew",
    tags: ["Historic", "Beauty"]
  }
];

// STATE FOR MUSLIM NAMES
let muslimNamesState = {
  genderFilter: 'all', // 'all', 'boy', 'girl', 'quranic', 'prophet'
  activeLetter: 'ALL',
  searchQuery: ''
};

/**
 * Filter and Search Muslim Names
 */
function searchMuslimNames() {
  const q = muslimNamesState.searchQuery.toLowerCase().trim();
  const gender = muslimNamesState.genderFilter;
  const letter = muslimNamesState.activeLetter;

  return MUSLIM_NAMES_DB.filter(item => {
    // Gender / Category filter
    if (gender === 'boy' && item.gender !== 'boy') return false;
    if (gender === 'girl' && item.gender !== 'girl') return false;
    if (gender === 'quranic' && (!item.origin.includes('Quranic') && !item.tags.includes('Quranic'))) return false;
    if (gender === 'prophet' && (!item.tags.includes('Prophet') && !item.tags.includes('Sahabi') && !item.tags.includes('Sahabiya') && !item.tags.includes('Umm al-Mu\'minin'))) return false;

    // Letter filter
    if (letter !== 'ALL') {
      if (!item.name.toUpperCase().startsWith(letter)) return false;
    }

    // Text search query
    if (q) {
      const matchName = item.name.toLowerCase().includes(q);
      const matchUrdu = item.urdu.includes(q);
      const matchArabic = item.arabic.includes(q);
      const matchMeaningEn = item.meaningEn.toLowerCase().includes(q);
      const matchMeaningUr = item.meaningUr.includes(q);
      if (!matchName && !matchUrdu && !matchArabic && !matchMeaningEn && !matchMeaningUr) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Render Muslim Names in View (#view-muslim-names)
 */
function renderMuslimNamesUI() {
  const container = document.getElementById('muslim-names-results-list');
  const countBadge = document.getElementById('names-results-count-badge');
  if (!container) return;

  const matches = searchMuslimNames();

  if (countBadge) {
    countBadge.textContent = `${matches.length} Names Found`;
  }

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted); background:var(--card-bg); border-radius:16px; border:1px solid var(--card-border);">
        <div style="font-size:2.5rem; margin-bottom:0.5rem;">🔍</div>
        <div style="font-weight:700; font-size:1.05rem; color:var(--text-primary);">کوئی نام نہیں ملا (No Names Found)</div>
        <div style="font-size:0.85rem; margin-top:0.35rem;">Try another keyword or change gender / letter filter.</div>
      </div>
    `;
    return;
  }

  const html = matches.map(item => {
    const isBoy = item.gender === 'boy';
    const genderIcon = isBoy ? '👦' : '👧';
    const genderBadgeClass = isBoy ? 'badge-name-boy' : 'badge-name-girl';
    const genderLabel = isBoy ? 'لڑکا (Boy)' : 'لڑکی (Girl)';

    const tagBadges = (item.tags || []).map(t => `<span class="name-sub-tag">${t}</span>`).join('');

    return `
      <div class="name-card-item">
        <div class="name-card-top-row">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="${genderBadgeClass}">${genderIcon} ${genderLabel}</span>
            <span class="name-origin-pill">${item.origin}</span>
          </div>
          <div style="display:flex; gap:0.4rem;">
            <button class="name-icon-btn" onclick="copyMuslimName('${item.name}', '${escapeHtml(item.urdu)}', '${escapeHtml(item.meaningUr)}', '${escapeHtml(item.meaningEn)}')" title="Copy Name & Meaning">📋</button>
            <button class="name-icon-btn" onclick="shareMuslimName('${item.name}', '${escapeHtml(item.urdu)}', '${escapeHtml(item.meaningUr)}', '${escapeHtml(item.meaningEn)}')" title="Share Name">📤</button>
          </div>
        </div>

        <div class="name-card-titles">
          <div>
            <div class="name-title-en">${item.name}</div>
          </div>
          <div style="text-align:right;">
            <div class="name-title-ar" dir="rtl">${item.arabic}</div>
            <div class="name-title-ur" dir="rtl">${item.urdu}</div>
          </div>
        </div>

        <div class="name-meanings-box">
          <div class="name-meaning-ur" dir="rtl">
            <strong>اردو معنی:</strong> ${item.meaningUr}
          </div>
          <div class="name-meaning-en">
            <strong>English:</strong> ${item.meaningEn}
          </div>
        </div>

        ${item.blessedNote ? `
          <div class="name-blessed-note">
            <span>✨</span> <span>${item.blessedNote}</span>
          </div>
        ` : ''}

        <div class="name-tags-row">
          ${tagBadges}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}
window.renderMuslimNamesUI = renderMuslimNamesUI;

/**
 * Filter Setters
 */
function setNamesGenderFilter(gender) {
  muslimNamesState.genderFilter = gender;
  document.querySelectorAll('.name-filter-chip').forEach(c => c.classList.remove('active'));
  const btn = document.getElementById(`names-filter-${gender}`);
  if (btn) btn.classList.add('active');
  renderMuslimNamesUI();
}
window.setNamesGenderFilter = setNamesGenderFilter;

function setNamesLetterFilter(letter) {
  muslimNamesState.activeLetter = letter;
  document.querySelectorAll('.letter-picker-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`letter-btn-${letter}`);
  if (btn) btn.classList.add('active');
  renderMuslimNamesUI();
}
window.setNamesLetterFilter = setNamesLetterFilter;

function onMuslimNameSearchInput(val) {
  muslimNamesState.searchQuery = val;
  renderMuslimNamesUI();
}
window.onMuslimNameSearchInput = onMuslimNameSearchInput;

function clearMuslimNameSearch() {
  const input = document.getElementById('muslim-name-search-input');
  if (input) input.value = '';
  muslimNamesState.searchQuery = '';
  renderMuslimNamesUI();
}
window.clearMuslimNameSearch = clearMuslimNameSearch;

/**
 * Copy & Share Helpers
 */
function copyMuslimName(name, urdu, meaningUr, meaningEn) {
  const text = `🌟 اسلامی نام (Muslim Name):\n\nنام: ${name} (${urdu})\nاردو معنی: ${meaningUr}\nEnglish Meaning: ${meaningEn}\n\n— نور الإسلام (Noor Al-Islam App)`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    if (typeof showAppToast === 'function') showAppToast(`✓ ${name} کا معنی کاپی ہو گیا!`);
  } else {
    if (typeof showAppToast === 'function') showAppToast(`✓ ${name} - ${meaningUr}`);
  }
}
window.copyMuslimName = copyMuslimName;

function shareMuslimName(name, urdu, meaningUr, meaningEn) {
  const text = `🌟 اسلامی نام (Muslim Name):\n\nنام: ${name} (${urdu})\nاردو معنی: ${meaningUr}\nEnglish Meaning: ${meaningEn}\n\n— نور الإسلام (Noor Al-Islam App)`;
  if (navigator.share) {
    navigator.share({ title: `Muslim Name: ${name}`, text: text });
  } else {
    copyMuslimName(name, urdu, meaningUr, meaningEn);
  }
}
window.shareMuslimName = shareMuslimName;

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
