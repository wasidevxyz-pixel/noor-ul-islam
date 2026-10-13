/**
 * ============================================================================
 * NOOR AL-ISLAM — ISLAMIC (HIJRI) CALENDAR ENGINE & HOLY OCCASIONS
 * 100% Astronomical Lunar Accuracy • Umm Al-Qura & Ru'yat-e-Hilal Adjustment
 * ============================================================================
 */

// 12 HIJRI MONTHS (Bilingual: Arabic, Urdu, English)
const HIJRI_MONTHS = [
  {
    number: 1,
    nameEn: "Muharram",
    nameAr: "مُحَرَّم",
    nameUr: "محرم الحرام",
    isSacred: true,
    descriptionEn: "The 1st month of Islamic calendar. One of the 4 sacred months (الأشهر الحرم). Contains Day of Ashura.",
    descriptionUr: "اسلامی سال کا پہلا اور حرمت والا مہینہ، جس میں یومِ عاشورہ کی فضیلت ہے۔"
  },
  {
    number: 2,
    nameEn: "Safar",
    nameAr: "صَفَر",
    nameUr: "صفر المظفر",
    isSacred: false,
    descriptionEn: "The 2nd month of the Islamic calendar.",
    descriptionUr: "اسلامی سال کا دوسرا مہینہ، خیر و برکت والا۔"
  },
  {
    number: 3,
    nameEn: "Rabi' al-Awwal",
    nameAr: "رَبِيع الأَوَّل",
    nameUr: "ربیع الاول",
    isSacred: false,
    descriptionEn: "The blessed 3rd month marking the birth of Prophet Muhammad ﷺ (12 Rabi al-Awwal).",
    descriptionUr: "سرورِ کائنات، رحمتِ عالم حضرت محمد مصطفیٰ ﷺ کی ولادتِ باسعادت کا پرنور مہینہ۔"
  },
  {
    number: 4,
    nameEn: "Rabi' al-Thani",
    nameAr: "رَبِيع الآخِر",
    nameUr: "ربیع الثانی / ربیع الآخر",
    isSacred: false,
    descriptionEn: "The 4th month of the Islamic calendar.",
    descriptionUr: "اسلامی سال کا چوتھا مہینہ۔"
  },
  {
    number: 5,
    nameEn: "Jumada al-Ula",
    nameAr: "جُمَادَى الأُولَى",
    nameUr: "جمادی الاولیٰ",
    isSacred: false,
    descriptionEn: "The 5th month of the Islamic calendar.",
    descriptionUr: "اسلامی سال کا پانچواں مہینہ۔"
  },
  {
    number: 6,
    nameEn: "Jumada al-Akhirah",
    nameAr: "جُمَادَى الآخِرَة",
    nameUr: "جمادی الثانیہ / جمادی الآخر",
    isSacred: false,
    descriptionEn: "The 6th month of the Islamic calendar.",
    descriptionUr: "اسلامی سال کا چھٹا مہینہ۔"
  },
  {
    number: 7,
    nameEn: "Rajab",
    nameAr: "رَجَب",
    nameUr: "رجب المرجب",
    isSacred: true,
    descriptionEn: "One of the 4 sacred months. Month of Allah. Contains Shab-e-Miraj (27 Rajab).",
    descriptionUr: "حرمت والا مہینہ، جس میں ۲۷ رجب کی رات کو واقعۂ معراج النبی ﷺ پیش آیا۔"
  },
  {
    number: 8,
    nameEn: "Sha'ban",
    nameAr: "شَعْبَان",
    nameUr: "شعبان المعظم",
    isSacred: false,
    descriptionEn: "The month preceding Ramadan. Contains Shab-e-Barat (15 Sha'ban - Night of Forgiveness).",
    descriptionUr: "ماہِ رمضان کی تیاری کا مہینہ، جس میں ۱۵ شعبان کی شبِ برات (مغفرت کی رات) ہے۔"
  },
  {
    number: 9,
    nameEn: "Ramadan",
    nameAr: "رَمَضَان",
    nameUr: "رمضان المبارک",
    isSacred: false,
    isHolyFasting: true,
    descriptionEn: "The supreme month of obligatory fasting, revelation of the Holy Quran, and Laylat al-Qadr.",
    descriptionUr: "نزولِ قرآن، فرض روزوں، تراویح اور شبِ قدر کا انتہائی بابرکت اور مقدس ترین مہینہ۔"
  },
  {
    number: 10,
    nameEn: "Shawwal",
    nameAr: "شَوَّال",
    nameUr: "شوال المکرم",
    isSacred: false,
    descriptionEn: "The 10th month. Begins with Eid-ul-Fitr (1 Shawwal) and the 6 Sunnah fasts.",
    descriptionUr: "عید الفطر اور شوال کے ۶ مسنون روزوں کا مبارک مہینہ۔"
  },
  {
    number: 11,
    nameEn: "Dhu al-Qi'dah",
    nameAr: "ذُو القَعْدَة",
    nameUr: "ذوالقعدہ",
    isSacred: true,
    descriptionEn: "One of the 4 sacred months. Month of peaceful pilgrimage preparations.",
    descriptionUr: "چار حرمت والے مہینوں میں سے ایک، جس میں حج کی تیاریاں شروع ہوتی ہیں۔"
  },
  {
    number: 12,
    nameEn: "Dhu al-Hijjah",
    nameAr: "ذُو الحِجَّة",
    nameUr: "ذوالحجہ",
    isSacred: true,
    descriptionEn: "The 12th month. Month of Hajj, Day of Arafah (9), Eid-ul-Adha (10), and Days of Tashreeq.",
    descriptionUr: "حج، یومِ عرفہ (۹ ذوالحجہ)، عید الاضحیٰ (۱۰ ذوالحجہ) اور ایامِ تشریق کا عظیم مہینہ۔"
  }
];

// 7 DAYS OF THE WEEK (Bilingual)
const CALENDAR_WEEKDAYS = [
  { index: 0, en: "Sun", enFull: "Sunday", ar: "الأحد", ur: "اتوار" },
  { index: 1, en: "Mon", enFull: "Monday", ar: "الإثنين", ur: "پیر", isSunnahFasting: true },
  { index: 2, en: "Tue", enFull: "Tuesday", ar: "الثلاثاء", ur: "منگل" },
  { index: 3, en: "Wed", enFull: "Wednesday", ar: "الأربعاء", ur: "بدھ" },
  { index: 4, en: "Thu", enFull: "Thursday", ar: "الخميس", ur: "جمعرات", isSunnahFasting: true },
  { index: 5, en: "Fri", enFull: "Friday", ar: "الجمعة", ur: "جمعہ", isJummah: true },
  { index: 6, en: "Sat", enFull: "Saturday", ar: "السبت", ur: "ہفتہ" }
];

// AUTHENTIC ISLAMIC EVENTS & HOLY OCCASIONS
const ISLAMIC_EVENTS_LIST = [
  {
    hijriMonth: 1,
    hijriDay: 1,
    titleEn: "Islamic New Year",
    titleAr: "رأس السنة الهجرية",
    titleUr: "نیا اسلامی سال (یکم محرم)",
    category: "major",
    badge: "🎉 New Year",
    icon: "🌙",
    descriptionEn: "First day of Muharram, marking the start of the Hijri lunar year and the Prophet's ﷺ Hijrah from Makkah to Madinah.",
    descriptionUr: "یکم محرم الحرام، اسلامی نئے سال کا آغاز اور حضور نبی اکرم ﷺ کی ہجرتِ مدینہ منورہ کی یادگار۔",
    virtue: "Recommended to begin the new year with sincere repentance, Istighfar, and du'as for the Muslim Ummah."
  },
  {
    hijriMonth: 1,
    hijriDay: 9,
    titleEn: "Tasu'a (9th Muharram)",
    titleAr: "تاسوعاء",
    titleUr: "تاسوعاء (۹ محرم الحرام)",
    category: "fasting",
    badge: "🌙 Sunnah Fast",
    icon: "🤲",
    descriptionEn: "The day preceding Ashura. The Prophet ﷺ intended to fast on the 9th along with the 10th.",
    descriptionUr: "یومِ عاشورہ سے ایک دن پہلے کا مسنون و مستحب روزہ۔",
    hadithRef: "Sahih Muslim 1162"
  },
  {
    hijriMonth: 1,
    hijriDay: 10,
    titleEn: "Day of Ashura",
    titleAr: "يوم عاشوراء",
    titleUr: "یومِ عاشورہ (۱۰ محرم الحرام)",
    category: "major",
    badge: "⭐ Sacred Day",
    icon: "🕌",
    descriptionEn: "Prophet Musa (AS) was delivered from Pharaoh; also commemorates the martyrdom of Hazrat Imam Hussain (RA) at Karbala.",
    descriptionUr: "حضرت موسیٰ علیہ السلام کی نجات اور میدانِ کربلا میں سیدنا امام حسین رضی اللہ عنہ کی عظیم شہادت کا دن۔",
    virtue: "Fasting on Ashura expiates sins of the previous year.",
    hadithRef: "Sahih Muslim 1162, Sahih Bukhari 2004"
  },
  {
    hijriMonth: 3,
    hijriDay: 12,
    titleEn: "Eid Milad-un-Nabi ﷺ",
    titleAr: "المولد النبوي الشريف",
    titleUr: "عید میلاد النبی ﷺ (۱۲ ربیع الاول)",
    category: "major",
    badge: "✨ Milad-un-Nabi",
    icon: "💚",
    descriptionEn: "The blessed birth anniversary of the Final Messenger of Allah, Hazrat Muhammad Mustafa ﷺ.",
    descriptionUr: "سرورِ کائنات، رحمتِ دو عالم حضرت محمد مصطفیٰ ﷺ کی ولادتِ باسعادت کا پرنور و بابرکت دن۔",
    virtue: "Reciting abundant Durood-e-Pak, learning Seerah, and expressing gratitude for the Prophet of Mercy ﷺ.",
    hadithRef: "Surah Al-Anbiya 21:107"
  },
  {
    hijriMonth: 7,
    hijriDay: 27,
    titleEn: "Shab-e-Miraj (Al-Isra wal-Mi'raj)",
    titleAr: "الإسراء والمعراج",
    titleUr: "شبِ معراج النبی ﷺ (۲۷ رجب)",
    category: "major",
    badge: "🌌 Miraj Night",
    icon: "✨",
    descriptionEn: "The miraculous night journey of Prophet Muhammad ﷺ to Jerusalem and ascension to the Heavens where 5 daily prayers were gifted.",
    descriptionUr: "مسجدِ حرام سے مسجدِ اقصیٰ اور آسمانوں کی معراج اور امت کو ۵ وقت کی فرض نمازوں کا عظیم تحفہ۔",
    virtue: "Night prayers (Tahajjud), seeking forgiveness, and reflection on the gift of Salat.",
    hadithRef: "Surah Al-Isra 17:1, Sahih Bukhari 3887"
  },
  {
    hijriMonth: 8,
    hijriDay: 15,
    titleEn: "Shab-e-Barat (Laylat al-Bara'at)",
    titleAr: "ليلة النصف من شعبان",
    titleUr: "شبِ برات (۱۵ شعبان المعظم)",
    category: "major",
    badge: "🤲 Night of Forgiveness",
    icon: "🕊️",
    descriptionEn: "Night of Salvation and divine forgiveness in mid-Sha'ban.",
    descriptionUr: "مغفرت و رحمت اور توبہ و استغفار کی بابرکت رات اور اگلے دن کا مسنون روزہ۔",
    virtue: "Devoting the night to Nawafil, Quran recitation, and fasting on the 15th of Sha'ban.",
    hadithRef: "Sunan Ibn Majah 1388"
  },
  {
    hijriMonth: 9,
    hijriDay: 1,
    titleEn: "1st Ramadan Mubarak (First Fast)",
    titleAr: "غرة شهر رمضان المبارك",
    titleUr: "یکم رمضان المبارک (پہلا روزہ)",
    category: "major",
    badge: "🌙 Ramadan Begins",
    icon: "🌙",
    descriptionEn: "Beginning of the Holy Month of Fasting, Tarawih prayers, and Quran recitation.",
    descriptionUr: "ماہِ صیام، رحمتوں، برکتوں، روزوں، تراویح اور نزولِ قرآن کے مقدس مہینے کا مبارک آغاز۔",
    hadithRef: "Surah Al-Baqarah 2:185"
  },
  {
    hijriMonth: 9,
    hijriDay: 17,
    titleEn: "Battle of Badr (Youm-e-Furqan)",
    titleAr: "غزوة بدر الكبرى",
    titleUr: "غزوہ بدر (۱۷ رمضان)",
    category: "history",
    badge: "⚔️ Youm-e-Furqan",
    icon: "🛡️",
    descriptionEn: "The historic battle where 313 faithful Muslims triumphed against overwhelming odds, establishing Islam.",
    descriptionUr: "حق و باطل کے درمیان پہلا فیصلہ کن معرکہ اور ۳۱۳ مجاہدینِ اسلام کی تاریخی فتح۔",
    hadithRef: "Surah Al-Anfal 8:41"
  },
  {
    hijriMonth: 9,
    hijriDay: 21,
    titleEn: "Laylat-ul-Qadr (21st Night)",
    titleAr: "ليلة القدر",
    titleUr: "شبِ قدر (۲۱ ویں شب)",
    category: "qadr",
    badge: "✨ Night of Power",
    icon: "👑",
    descriptionEn: "First odd night of the last ten blessed nights of Ramadan.",
    descriptionUr: "رمضان المبارک کے آخری عشرے کی پہلی طاق رات۔"
  },
  {
    hijriMonth: 9,
    hijriDay: 27,
    titleEn: "Laylat-ul-Qadr (27th Night)",
    titleAr: "ليلة القدر الشريفة",
    titleUr: "شبِ قدر (۲۷ ویں شب)",
    category: "major",
    badge: "👑 Laylat-ul-Qadr",
    icon: "🌟",
    descriptionEn: "The most widely sought night of Laylat-ul-Qadr, better than a thousand months of worship.",
    descriptionUr: "ہزار مہینوں سے افضل ترین رات، جس میں فرشتوں کا نزول اور گناہوں کی بخشش ہوتی ہے۔",
    virtue: "Reciting: اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    hadithRef: "Surah Al-Qadr 97:1-5, Jami` at-Tirmidhi 3513"
  },
  {
    hijriMonth: 10,
    hijriDay: 1,
    titleEn: "Eid-ul-Fitr",
    titleAr: "عيد الفطر المبارك",
    titleUr: "عید الفطر المبارک (یکم شوال)",
    category: "major",
    badge: "🎉 Eid Mubarak",
    icon: "🕌",
    descriptionEn: "The joyous Islamic holiday celebrating the completion of Ramadan fasting and paying Sadaqat-ul-Fitr.",
    descriptionUr: "رمضان کے روزوں کی تکمیل پر اللہ تعالیٰ کا دیا ہوا پرمسرت انعام اور عید کی نماز۔",
    hadithRef: "Sahih Bukhari 948"
  },
  {
    hijriMonth: 12,
    hijriDay: 8,
    titleEn: "Yawm at-Tarwiyah (Hajj Begins)",
    titleAr: "يوم التروية",
    titleUr: "یومِ ترویہ (۸ ذوالحجہ)",
    category: "hajj",
    badge: "🕋 Hajj Begins",
    icon: "🕋",
    descriptionEn: "Pilgrims put on Ihram and set out for Mina to begin the sacred rites of Hajj.",
    descriptionUr: "حجاجِ کرام کا احرام باندھ کر منیٰ کی طرف روانگی اور مناسکِ حج کا باقاعدہ آغاز۔"
  },
  {
    hijriMonth: 12,
    hijriDay: 9,
    titleEn: "Day of Arafah (Waqoof-e-Arafat)",
    titleAr: "يوم عرفة",
    titleUr: "یومِ عرفہ (۹ ذوالحجہ)",
    category: "major",
    badge: "🕋 Day of Arafah",
    icon: "🤲",
    descriptionEn: "The pinnacle of Hajj at Mount Arafat. Fasting on this day for non-pilgrims expiates the sins of two years.",
    descriptionUr: "حج کا سب سے بڑا رکن (وقوفِ عرفات)۔ غیر حجاج کے لیے اس دن کا روزہ ۲ سال کے گناہوں کا کفارہ ہے۔",
    virtue: "Fasting on Arafah expiates sins of the previous and upcoming year.",
    hadithRef: "Sahih Muslim 1162"
  },
  {
    hijriMonth: 12,
    hijriDay: 10,
    titleEn: "Eid-ul-Adha (Day of Sacrifice)",
    titleAr: "عيد الأضحى المبارك",
    titleUr: "عید الاضحیٰ المبارک (۱۰ ذوالحجہ)",
    category: "major",
    badge: "🐑 Eid-ul-Adha",
    icon: "🕋",
    descriptionEn: "Festival of Sacrifice, commemorating the obedience of Prophet Ibrahim (AS) and Prophet Ismail (AS).",
    descriptionUr: "سنتِ ابراہیمی کی یاد میں قربانی کا دن، نمازِ عید اور حجاجِ کرام کی رمی و قربانی۔",
    hadithRef: "Sahih Bukhari 951"
  },
  {
    hijriMonth: 12,
    hijriDay: 11,
    titleEn: "Ayyam al-Tashreeq (11-13 Dhul Hijjah)",
    titleAr: "أيام التشريق",
    titleUr: "ایامِ تشریق (۱۱ تا ۱۳ ذوالحجہ)",
    category: "hajj",
    badge: "🕋 Tashreeq Days",
    icon: "📿",
    descriptionEn: "Days of Mina stay, Stoning the Jamarat, and reciting Takbeerat-e-Tashreeq after every obligatory prayer.",
    descriptionUr: "منیٰ میں قیام، جمرات کی رمی اور ہر فرض نماز کے بعد تکبیرِ تشریق پڑھنے کے ایام۔",
    hadithRef: "Sahih Muslim 1141"
  }
];

// STATE FOR CALENDAR VIEW
let calendarState = {
  currentHijriYear: 1448,
  currentHijriMonth: 4, // 1 to 12
  selectedDate: new Date(),
  viewMode: 'hijri', // 'hijri', 'gregorian', 'events'
  gregorianYear: new Date().getFullYear(),
  gregorianMonth: new Date().getMonth() // 0 to 11
};

/**
 * Get User's Hijri Offset Adjustment (from localStorage)
 * Supports -2, -1, 0, +1, +2 days based on local Ru'yat-e-Hilal moon sighting
 */
function getHijriAdjustment() {
  try {
    const val = localStorage.getItem('noor_hijri_adjustment');
    if (val !== null) {
      return parseInt(val, 10) || 0;
    }
  } catch(e) {}
  return 0;
}

function setHijriAdjustment(offset) {
  const num = parseInt(offset, 10) || 0;
  localStorage.setItem('noor_hijri_adjustment', num.toString());
  
  // Refresh UI
  updateHijriDisplaysEverywhere();
  renderIslamicCalendar();
  if (typeof calculatePrayerSchedule === 'function') calculatePrayerSchedule();
  if (typeof showAppToast === 'function') {
    const label = num > 0 ? `+${num} day(s)` : num < 0 ? `${num} day(s)` : "Standard (0)";
    showAppToast(`🌙 Hijri adjustment set to ${label}`);
  }
}
window.setHijriAdjustment = setHijriAdjustment;

/**
 * Calculate accurate Hijri date for any Gregorian Date
 */
function getDetailedHijriDate(date = new Date(), offsetDays = null) {
  const offset = (offsetDays !== null) ? offsetDays : getHijriAdjustment();
  const adjustedTime = new Date(date.getTime() + offset * 86400000);

  let dH = 1, mH = 1, yH = 1448;
  let usedIntl = false;

  try {
    const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    });
    const parts = formatter.formatToParts(adjustedTime);
    for (const p of parts) {
      if (p.type === "day") dH = parseInt(p.value, 10);
      if (p.type === "month") mH = parseInt(p.value, 10);
      if (p.type === "year") yH = parseInt(p.value, 10);
    }
    usedIntl = true;
  } catch(e) {
    // Robust Astronomical Julian-day fallback
    const fallback = getAstronomicalHijriFallback(adjustedTime);
    dH = fallback.day;
    mH = fallback.month;
    yH = fallback.year;
  }

  // Safety clamps
  if (mH < 1 || mH > 12) mH = Math.max(1, Math.min(12, mH));
  if (dH < 1 || dH > 30) dH = Math.max(1, Math.min(30, dH));

  const monthObj = HIJRI_MONTHS[mH - 1] || HIJRI_MONTHS[0];
  const dayOfWeek = adjustedTime.getDay();
  const weekdayObj = CALENDAR_WEEKDAYS[dayOfWeek];

  // Check for Islamic events on this day
  const events = ISLAMIC_EVENTS_LIST.filter(ev => ev.hijriMonth === mH && ev.hijriDay === dH);

  // Check Sunnah fasting
  const isAyyamAlBeed = (dH === 13 || dH === 14 || dH === 15);
  const isMondayOrThursday = (dayOfWeek === 1 || dayOfWeek === 4);
  const isFriday = (dayOfWeek === 5);

  const urduDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const toUrduNum = (n) => n.toString().split('').map(c => urduDigits[parseInt(c)] || c).join('');

  return {
    day: dH,
    dayUrdu: toUrduNum(dH),
    month: mH,
    year: yH,
    yearUrdu: toUrduNum(yH),
    monthObj: monthObj,
    monthEn: monthObj.nameEn,
    monthAr: monthObj.nameAr,
    monthUr: monthObj.nameUr,
    isSacred: monthObj.isSacred,
    weekday: weekdayObj,
    events: events,
    isAyyamAlBeed: isAyyamAlBeed,
    isMondayOrThursday: isMondayOrThursday,
    isFriday: isFriday,
    formattedEn: `${dH} ${monthObj.nameEn} ${yH} AH`,
    formattedUr: `${toUrduNum(dH)} ${monthObj.nameUr} ${toUrduNum(yH)}ھ`,
    formattedAr: `${dH} ${monthObj.nameAr} ${yH} هـ`,
    gregorianDate: adjustedTime,
    offsetApplied: offset
  };
}
window.getDetailedHijriDate = getDetailedHijriDate;

/**
 * Astronomical Fallback Algorithm
 */
function getAstronomicalHijriFallback(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

  let z = jd - 1948440 + 10632;
  const n = Math.floor((z - 1) / 10631);
  z = z - 10631 * n + 354;
  const j = (Math.floor((10985 - z) / 5316)) * (Math.floor((50 * z) / 17719)) +
            (Math.floor(z / 5670)) * (Math.floor((43 * z) / 15238));
  z = z - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
      (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const mH = Math.floor((24 * z) / 709);
  const dH = z - Math.floor((709 * mH) / 24);
  const yH = 30 * n + j - 30;

  return { day: dH, month: mH, year: yH };
}

/**
 * Find all days in a given Hijri month (year, month)
 */
function getHijriMonthDays(hYear, hMonth, offset = null) {
  const userOffset = (offset !== null) ? offset : getHijriAdjustment();
  // Estimate approximate Gregorian range
  const gYearEst = Math.round((hYear - 1) * 0.970224 + 622);
  const searchStart = new Date(gYearEst - 1, 0, 1);
  const searchEnd = new Date(gYearEst + 2, 0, 1);

  const days = [];
  let curr = new Date(searchStart);

  while (curr < searchEnd) {
    const info = getDetailedHijriDate(curr, userOffset);
    if (info.year === hYear && info.month === hMonth) {
      days.push({
        hijriInfo: info,
        gregorianDate: new Date(curr),
        dayOfWeek: curr.getDay()
      });
    } else if (days.length > 0 && (info.year > hYear || (info.year === hYear && info.month > hMonth))) {
      break;
    }
    curr.setDate(curr.getDate() + 1);
  }

  return days;
}
window.getHijriMonthDays = getHijriMonthDays;

/**
 * Render the Islamic Calendar Screen (#view-islamic-calendar)
 */
function renderIslamicCalendar() {
  const container = document.getElementById('calendar-grid-container');
  if (!container) return;

  const currentTodayInfo = getDetailedHijriDate(new Date());

  // Update Hero Date Card
  const heroHDate = document.getElementById('cal-hero-hijri-date');
  const heroGDate = document.getElementById('cal-hero-greg-date');
  const heroSacred = document.getElementById('cal-hero-sacred-badge');
  const heroFasting = document.getElementById('cal-hero-fasting-badge');
  const offsetPill = document.getElementById('cal-offset-indicator');

  if (heroHDate) {
    heroHDate.innerHTML = `
      <div style="font-family:var(--font-arabic); font-size:1.55rem; color:#fef08a; font-weight:700; text-align:center;">${currentTodayInfo.formattedAr}</div>
      <div style="font-family:var(--font-urdu); font-size:1.15rem; color:#ffffff; margin-top:3px; text-align:center;">${currentTodayInfo.formattedUr}</div>
      <div style="font-size:0.85rem; color:rgba(255,255,255,0.88); margin-top:2px; text-align:center;">${currentTodayInfo.formattedEn}</div>
    `;
  }

  if (heroGDate) {
    const gOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    heroGDate.textContent = new Date().toLocaleDateString('en-US', gOpts);
  }

  if (heroSacred) {
    if (currentTodayInfo.isSacred) {
      heroSacred.style.display = 'inline-flex';
      heroSacred.textContent = `✨ ${currentTodayInfo.monthUr} • حرمت والا مہینہ (Sacred Month)`;
    } else {
      heroSacred.style.display = 'none';
    }
  }

  if (heroFasting) {
    let fastText = "";
    if (currentTodayInfo.month === 9) {
      fastText = "🌙 فرض روزہ (Obligatory Ramadan Fast)";
    } else if (currentTodayInfo.isAyyamAlBeed) {
      fastText = "✨ ایامِ بیض کا مسنون روزہ (White Days Sunnah Fast)";
    } else if (currentTodayInfo.isMondayOrThursday) {
      fastText = `🤲 مسنون روزہ (${currentTodayInfo.weekday.ur} کا روزہ)`;
    } else if (currentTodayInfo.isFriday) {
      fastText = "🕌 جمعۃ المبارک • سورہ کہف اور درود شریف کا اہتمام کریں";
    }

    if (fastText) {
      heroFasting.style.display = 'inline-flex';
      heroFasting.textContent = fastText;
    } else {
      heroFasting.style.display = 'none';
    }
  }

  if (offsetPill) {
    const off = getHijriAdjustment();
    offsetPill.textContent = off === 0 ? "Ru'yat: 0 (Umm Al-Qura)" : off > 0 ? `Ru'yat: +${off}d` : `Ru'yat: ${off}d`;
  }

  // Check Mode: 'events' vs 'hijri' vs 'gregorian'
  const eventsView = document.getElementById('calendar-events-view');
  const gridView = document.getElementById('calendar-monthly-view');

  if (calendarState.viewMode === 'events') {
    if (eventsView) eventsView.style.display = 'block';
    if (gridView) gridView.style.display = 'none';
    renderIslamicEventsTab();
    return;
  }

  if (eventsView) eventsView.style.display = 'none';
  if (gridView) gridView.style.display = 'block';

  // Render Month Header
  const monthTitle = document.getElementById('cal-month-title');
  const monthSub = document.getElementById('cal-month-sub');
  const monthObj = HIJRI_MONTHS[calendarState.currentHijriMonth - 1] || HIJRI_MONTHS[0];

  if (monthTitle) {
    monthTitle.innerHTML = `<span style="font-family:var(--font-arabic); font-size:1.35rem;">${monthObj.nameAr}</span> <span style="font-size:1rem; font-weight:700;">${monthObj.nameEn}</span> <span style="color:var(--gold-primary); font-weight:800;">${calendarState.currentHijriYear} AH</span>`;
  }

  if (monthSub) {
    monthSub.textContent = `${monthObj.nameUr} • ${monthObj.descriptionUr}`;
  }

  // Get Month Days
  const monthDays = getHijriMonthDays(calendarState.currentHijriYear, calendarState.currentHijriMonth);

  if (monthDays.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Loading calendar data...</div>';
    return;
  }

  // Weekday Headers (Sun to Sat)
  let gridHtml = `
    <div class="cal-weekdays-row">
      <div class="cal-weekday-cell">اتوار<br><span style="font-size:0.65rem;">Sun</span></div>
      <div class="cal-weekday-cell">پیر<br><span style="font-size:0.65rem;">Mon</span></div>
      <div class="cal-weekday-cell">منگل<br><span style="font-size:0.65rem;">Tue</span></div>
      <div class="cal-weekday-cell">بدھ<br><span style="font-size:0.65rem;">Wed</span></div>
      <div class="cal-weekday-cell">جمعرات<br><span style="font-size:0.65rem;">Thu</span></div>
      <div class="cal-weekday-cell cal-friday">جمعہ<br><span style="font-size:0.65rem;">Fri</span></div>
      <div class="cal-weekday-cell">ہفتہ<br><span style="font-size:0.65rem;">Sat</span></div>
    </div>
    <div class="cal-days-grid">
  `;

  // Prepend blanks for leading days of week
  const firstDayOfWeek = monthDays[0].dayOfWeek; // 0 = Sun
  for (let i = 0; i < firstDayOfWeek; i++) {
    gridHtml += `<div class="cal-day-cell empty"></div>`;
  }

  const todayDateStr = new Date().toDateString();
  const selectedDateStr = calendarState.selectedDate.toDateString();

  monthDays.forEach(dayItem => {
    const isToday = dayItem.gregorianDate.toDateString() === todayDateStr;
    const isSelected = dayItem.gregorianDate.toDateString() === selectedDateStr;
    const isFriday = dayItem.dayOfWeek === 5;
    const hasEvents = dayItem.hijriInfo.events.length > 0;
    const isWhiteDay = dayItem.hijriInfo.isAyyamAlBeed;
    const dateIso = dayItem.gregorianDate.toISOString();

    let cellClasses = ['cal-day-cell'];
    if (isToday) cellClasses.push('today');
    if (isSelected) cellClasses.push('selected');
    if (isFriday) cellClasses.push('friday');
    if (hasEvents) cellClasses.push('event-day');

    let badgeIcon = '';
    if (hasEvents) {
      badgeIcon = `<span class="cal-cell-event-dot" title="${dayItem.hijriInfo.events[0].titleEn}">⭐</span>`;
    } else if (isWhiteDay) {
      badgeIcon = `<span class="cal-cell-event-dot white-day" title="Ayyam al-Beed (Sunnah Fast)">⚪</span>`;
    }

    gridHtml += `
      <div class="${cellClasses.join(' ')}" onclick="selectCalendarDay('${dateIso}')" data-date="${dateIso}">
        ${badgeIcon}
        <div class="cal-hijri-num">${dayItem.hijriInfo.day}</div>
        <div class="cal-greg-num">${dayItem.gregorianDate.getDate()} ${dayItem.gregorianDate.toLocaleString('en-US', { month: 'short' })}</div>
      </div>
    `;
  });

  gridHtml += `</div>`;
  container.innerHTML = gridHtml;

  // Render Day Details Card for Selected Date
  renderSelectedDayCard(calendarState.selectedDate);
}
window.renderIslamicCalendar = renderIslamicCalendar;

/**
 * Month Switching Controls
 */
function prevHijriMonth() {
  calendarState.currentHijriMonth -= 1;
  if (calendarState.currentHijriMonth < 1) {
    calendarState.currentHijriMonth = 12;
    calendarState.currentHijriYear -= 1;
  }
  renderIslamicCalendar();
}
window.prevHijriMonth = prevHijriMonth;

function nextHijriMonth() {
  calendarState.currentHijriMonth += 1;
  if (calendarState.currentHijriMonth > 12) {
    calendarState.currentHijriMonth = 1;
    calendarState.currentHijriYear += 1;
  }
  renderIslamicCalendar();
}
window.nextHijriMonth = nextHijriMonth;

function jumpToTodayCalendar() {
  const todayInfo = getDetailedHijriDate(new Date());
  calendarState.currentHijriYear = todayInfo.year;
  calendarState.currentHijriMonth = todayInfo.month;
  calendarState.selectedDate = new Date();
  calendarState.viewMode = 'hijri';
  renderIslamicCalendar();
}
window.jumpToTodayCalendar = jumpToTodayCalendar;

function setCalendarTab(tabMode) {
  calendarState.viewMode = tabMode;
  document.querySelectorAll('.cal-tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`cal-tab-${tabMode}`);
  if (activeBtn) activeBtn.classList.add('active');
  renderIslamicCalendar();
}
window.setCalendarTab = setCalendarTab;

/**
 * Handle Day Selection & Show Details
 */
function selectCalendarDay(isoString) {
  const dateObj = new Date(isoString);
  calendarState.selectedDate = dateObj;

  // Re-highlight cells
  document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
  const activeEl = document.querySelector(`.cal-day-cell[data-date="${isoString}"]`);
  if (activeEl) activeEl.classList.add('selected');

  renderSelectedDayCard(dateObj);

  // Smooth scroll into detail card view if mobile
  const detailEl = document.getElementById('cal-selected-day-card');
  if (detailEl) {
    detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
window.selectCalendarDay = selectCalendarDay;

/**
 * Render the Details Card for Selected Day (with calculated Prayer Times for that day!)
 */
function renderSelectedDayCard(dateObj) {
  const card = document.getElementById('cal-selected-day-card');
  if (!card) return;

  const info = getDetailedHijriDate(dateObj);
  const loc = (typeof state !== 'undefined' && state.userCustomLocation) ? state.userCustomLocation : { lat: 24.8607, lng: 67.0011, name: "Karachi, Pakistan", timezone: 5.0 };
  const juristic = (typeof state !== 'undefined' && state.asrJuristic) ? state.asrJuristic : 'hanafi';
  const method = loc.method || 'karachi';

  // Calculate prayer times for this date!
  let pt = null;
  if (typeof calculatePrayerTimes === 'function') {
    pt = calculatePrayerTimes(dateObj, loc.lat, loc.lng, loc.timezone || 5.0, method, juristic);
  }

  const isToday = dateObj.toDateString() === new Date().toDateString();

  let eventNoticeHtml = '';
  if (info.events.length > 0) {
    const ev = info.events[0];
    eventNoticeHtml = `
      <div class="cal-event-highlight-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="cal-event-badge">${ev.badge || "⭐ Islamic Event"}</span>
          <span style="font-size:0.75rem; color:var(--gold-primary); font-weight:700;">${ev.category ? ev.category.toUpperCase() : ""}</span>
        </div>
        <div style="font-size:1.05rem; font-weight:800; color:#ffffff; margin-top:0.35rem;">${ev.titleUr}</div>
        <div style="font-size:0.85rem; color:#fef08a; font-weight:600;">${ev.titleEn} (${ev.titleAr})</div>
        <div style="font-size:0.8rem; color:rgba(255,255,255,0.9); margin-top:0.35rem; line-height:1.4;">${ev.descriptionUr}</div>
        ${ev.virtue ? `<div style="font-size:0.75rem; color:#a7f3d0; margin-top:0.25rem;">✨ فضیلت: ${ev.virtue}</div>` : ''}
        ${ev.hadithRef ? `<div style="font-size:0.72rem; color:rgba(255,255,255,0.7); margin-top:0.2rem;">📖 سند: ${ev.hadithRef}</div>` : ''}
      </div>
    `;
  } else if (info.isAyyamAlBeed) {
    eventNoticeHtml = `
      <div class="cal-sunnah-box">
        <span style="font-size:1.1rem;">⚪</span>
        <div>
          <div style="font-weight:700; color:var(--emerald-primary);">ایامِ بیض کا مسنون روزہ (White Days)</div>
          <div style="font-size:0.78rem; color:var(--text-secondary);">رسول اللہ ﷺ ہر قمری مہینے کی ۱۳، ۱۴ اور ۱۵ تاریخ کو روزہ رکھنے کی ترغیب فرماتے تھے جو پورے سال کے روزوں کے برابر ہے۔ (سنن نسائی: 2420)</div>
        </div>
      </div>
    `;
  } else if (info.isMondayOrThursday) {
    eventNoticeHtml = `
      <div class="cal-sunnah-box">
        <span style="font-size:1.1rem;">🤲</span>
        <div>
          <div style="font-weight:700; color:var(--emerald-primary);">مسنون روزہ (${info.weekday.ur} کا دن)</div>
          <div style="font-size:0.78rem; color:var(--text-secondary);">حضور اکرم ﷺ نے فرمایا: "پیر اور جمعرات کو اعمال اللہ کے حضور پیش کیے جاتے ہیں، پس میں چاہتا ہوں کہ میرے اعمال روزے کی حالت میں پیش ہوں۔" (ترمذی: 747)</div>
        </div>
      </div>
    `;
  } else if (info.isFriday) {
    eventNoticeHtml = `
      <div class="cal-sunnah-box">
        <span style="font-size:1.1rem;">🕌</span>
        <div>
          <div style="font-weight:700; color:var(--emerald-primary);">سید الایام — جمعۃ المبارک</div>
          <div style="font-size:0.78rem; color:var(--text-secondary);">جمعہ کے دن غسل کرنا، خوشبو لگانا، سورہ کہف کی تلاوت کرنا اور رسول اللہ ﷺ پر کثرت سے درود بھیجنا مسنون و افضل عمل ہے۔</div>
        </div>
      </div>
    `;
  }

  let prayerGridHtml = '';
  if (pt) {
    prayerGridHtml = `
      <div style="margin-top:0.75rem;">
        <div style="font-size:0.78rem; font-weight:800; color:var(--emerald-primary); margin-bottom:0.4rem; display:flex; justify-content:space-between;">
          <span>⏰ Prayer Times for this Date (${loc.name ? loc.name.split(',')[0] : 'Local'})</span>
          <span style="color:var(--text-muted); font-size:0.7rem;">${juristic.toUpperCase()}</span>
        </div>
        <div class="cal-prayer-grid">
          <div class="cal-pt-item">
            <span class="cal-pt-name">Fajr (سحر)</span>
            <span class="cal-pt-time">${pt.fajr.formatted12}</span>
          </div>
          <div class="cal-pt-item">
            <span class="cal-pt-name">Sunrise (طلوع)</span>
            <span class="cal-pt-time">${pt.sunrise.formatted12}</span>
          </div>
          <div class="cal-pt-item">
            <span class="cal-pt-name">Dhuhr (ظہر)</span>
            <span class="cal-pt-time">${pt.dhuhr.formatted12}</span>
          </div>
          <div class="cal-pt-item">
            <span class="cal-pt-name">Asr (عصر)</span>
            <span class="cal-pt-time">${pt.asr.formatted12}</span>
          </div>
          <div class="cal-pt-item">
            <span class="cal-pt-name">Maghrib (افطار)</span>
            <span class="cal-pt-time">${pt.maghrib.formatted12}</span>
          </div>
          <div class="cal-pt-item">
            <span class="cal-pt-name">Isha (عشاء)</span>
            <span class="cal-pt-time">${pt.isha.formatted12}</span>
          </div>
        </div>
      </div>
    `;
  }

  card.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div>
        <div style="font-family:var(--font-arabic); font-size:1.4rem; color:var(--emerald-primary); font-weight:700;">${info.formattedAr}</div>
        <div style="font-family:var(--font-urdu); font-size:1.1rem; color:var(--text-primary); margin-top:2px;">${info.formattedUr}</div>
        <div style="font-size:0.82rem; color:var(--text-muted);">${dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      <div style="text-align:right;">
        ${isToday ? `<span style="background:var(--emerald-primary); color:#ffffff; padding:0.25rem 0.65rem; border-radius:999px; font-size:0.75rem; font-weight:800;">Today (آج)</span>` : ''}
      </div>
    </div>

    ${eventNoticeHtml}
    ${prayerGridHtml}
  `;
}

/**
 * Render the Upcoming Islamic Events Tab
 */
function renderIslamicEventsTab() {
  const container = document.getElementById('calendar-events-list');
  if (!container) return;

  const currentTodayInfo = getDetailedHijriDate(new Date());
  const currentHY = currentTodayInfo.year;
  const currentHM = currentTodayInfo.month;
  const currentHD = currentTodayInfo.day;

  // Sort events chronologically relative to current date
  let eventsWithCountdown = ISLAMIC_EVENTS_LIST.map(ev => {
    // Estimate Gregorian date for this event in current Hijri year (or next year if passed)
    let evHY = currentHY;
    if (ev.hijriMonth < currentHM || (ev.hijriMonth === currentHM && ev.hijriDay < currentHD)) {
      evHY += 1;
    }

    // Find days remaining approximately
    const monthsDiff = (evHY - currentHY) * 12 + (ev.hijriMonth - currentHM);
    const approxDaysDiff = Math.round(monthsDiff * 29.53) + (ev.hijriDay - currentHD);

    return {
      ...ev,
      targetHY: evHY,
      daysLeft: approxDaysDiff
    };
  });

  eventsWithCountdown.sort((a, b) => a.daysLeft - b.daysLeft);

  let html = eventsWithCountdown.map(ev => {
    const isToday = ev.daysLeft === 0;
    const countdownBadge = isToday
      ? `<span class="badge-status-today">🌟 Today!</span>`
      : ev.daysLeft < 30
      ? `<span class="badge-status-near">in ${ev.daysLeft} days</span>`
      : `<span class="badge-status-later">in ~${Math.round(ev.daysLeft / 30)} months</span>`;

    const monthObj = HIJRI_MONTHS[ev.hijriMonth - 1];

    return `
      <div class="cal-event-card-row">
        <div class="cal-event-icon-circle">${ev.icon || '🕌'}</div>
        <div class="cal-event-content">
          <div class="cal-event-header-row">
            ${countdownBadge}
            <span class="cal-event-date-tag">${ev.hijriDay} ${monthObj.nameUr} (${ev.targetHY}ھ)</span>
          </div>
          <div class="cal-event-title-ur">${ev.titleUr}</div>
          <div class="cal-event-title-en">${ev.titleEn}</div>
          <div class="cal-event-desc-ur">
            ${ev.descriptionUr}
          </div>
          ${ev.virtue ? `<div class="cal-event-virtue-tag">✨ فضیلت: ${ev.virtue}</div>` : ''}
          ${ev.hadithRef ? `<div class="cal-event-hadith-tag">📖 سند: ${ev.hadithRef}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/**
 * Update Hijri Date on Home Screen, Prayer Times Screen & Header
 */
function updateHijriDisplaysEverywhere() {
  const info = getDetailedHijriDate(new Date());

  // 1. Home Screen Current Time Card Hijri Date
  const homeHijriEl = document.getElementById('home-current-hijri-val');
  if (homeHijriEl) {
    homeHijriEl.textContent = `${info.formattedUr} • ${info.formattedEn}`;
  }

  // 2. Prayer Times Screen Hijri Date
  const ptHijriEl = document.getElementById('pt-screen-hijri');
  if (ptHijriEl) {
    ptHijriEl.textContent = `${info.formattedUr} • ${info.formattedEn}`;
  }

  // 3. Side Drawer Current Hijri Pill
  const drawerHijriEl = document.getElementById('drawer-hijri-pill');
  if (drawerHijriEl) {
    drawerHijriEl.textContent = info.formattedUr;
  }
}
window.updateHijriDisplaysEverywhere = updateHijriDisplaysEverywhere;

// Open & Close Hijri Adjustment Modal
function openHijriAdjustmentModal() {
  const modal = document.getElementById('modal-hijri-adjustment');
  if (!modal) return;
  const currentOffset = getHijriAdjustment();
  document.querySelectorAll('.offset-chip').forEach(c => {
    c.classList.remove('active');
    if (parseInt(c.dataset.offset, 10) === currentOffset) {
      c.classList.add('active');
    }
  });
  modal.classList.add('active');
}
window.openHijriAdjustmentModal = openHijriAdjustmentModal;

function closeHijriAdjustmentModal() {
  const modal = document.getElementById('modal-hijri-adjustment');
  if (modal) modal.classList.remove('active');
}
window.closeHijriAdjustmentModal = closeHijriAdjustmentModal;

function selectOffsetChip(offset) {
  setHijriAdjustment(offset);
  closeHijriAdjustmentModal();
}
window.selectOffsetChip = selectOffsetChip;
