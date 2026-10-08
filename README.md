# 🌙 Noor Al-Islam (نور الإسلام) — Islamic Mobile App & Web Prototype

Assalam-o-Alaikum! Welcome to the **Noor Al-Islam** project repository. This folder is cleanly organized, modular, and built to ensure **100% Islamic accuracy** and modern aesthetics.

---

## 📁 Project Directory Structure

```
noor-al-islam-apk/
│
├── index.html                     # 🌟 Main Interactive Web Dashboard & App UI
│
├── css/
│   └── style.css                  # 🎨 Luxury Islamic Design System (Emerald & Gold)
│
├── js/
│   ├── prayer-engine.js           # ⏰ 100% Verified Astronomical Prayer & Qibla Math
│   ├── quran-data.js              # 📖 Uthmani Quran, Sahih Hadiths, Salawat & Azan audio
│   └── app.js                     # ⚡ Interactive UI logic, tabs, audio, and live countdown
│
├── android-guide/
│   └── APK_BUILD_GUIDE.md         # 📱 Step-by-step instructions to compile Android APK
│
└── README.md                      # 📄 Project documentation & overview
```

---

## 🕌 Features Included & Verified

1. **Exact Prayer Times (Namaz Schedule)**:
   - Astronomical calculations (solar altitude & declination).
   - Worldwide city presets (Karachi, Lahore, Islamabad, Makkah, Madinah, Dubai, London, Istanbul, etc.).
   - Instant toggle for **Hanafi** (Asr shadow ratio = 2) vs **Shafi'i/Maliki/Hanbali** (Asr shadow ratio = 1).
   - Live real-time countdown to the next prayer with glowing badge on the current prayer.

2. **Qibla Direction Compass**:
   - Exact spherical trigonometry bearing formula pointing to the Holy Kaaba (`21.4225° N, 39.8262° E`).
   - Real-time compass dial animation, degree angle indicator, and distance to Makkah in Kilometers.

3. **Holy Quran Majeed Explorer**:
   - Authentic Uthmani Arabic script with diacritics (tashkeel).
   - Authentic Urdu translation by **Maulana Fateh Muhammad Jalandhari**.
   - Authentic English translation by **Sahih International**.
   - Streaming audio recitation for each Ayah.

4. **Authentic Hadith of Prophet Muhammad ﷺ**:
   - Verified references from **Sahih al-Bukhari**, **Sahih Muslim**, and **Jami' at-Tirmidhi**.
   - Arabic, Urdu, and English text with Sanad / book references.

5. **Digital Tasbih & Salawat (Durood Sharif)**:
   - Preset Azkar: *Durood-e-Ibrahimi*, *SubhanAllah*, *Alhamdulillah*, *Allahu Akbar*, *Astaghfirullah*, and *Tasbih-e-Fatimah*.
   - Tap counter circle with haptic vibration, reset button, and target tracker.

6. **Nearby Mosque (Masjid) Finder**:
   - Nearest Jamia Masajid list with walking time, distance, and direct Google Maps navigation link.

7. **Multi-Muezzin Azan Audio Player**:
   - Playable Azan samples from **Makkah Mukarrama (Sheikh Ali Mulla)**, **Madinah Munawwara**, **Masjid Al-Aqsa**, and **Mishary Rashid Al-Afasy**.

---

## 🚀 How to Run the Web Prototype

You can open `index.html` directly in any web browser, or serve it locally using a light server:

```bash
# Using Python:
python3 -m http.server 8080

# Or using Node.js npx:
npx serve .
```
Then visit: `http://localhost:8080`

---

## 📦 How to Build the Android APK

Read the full guide inside [`android-guide/APK_BUILD_GUIDE.md`](android-guide/APK_BUILD_GUIDE.md).
