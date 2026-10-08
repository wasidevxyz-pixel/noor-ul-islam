# 📱 Noor Al-Islam (نور الإسلام) — Android APK Build Guide

This comprehensive guide explains how to convert and compile this Noor Al-Islam project into an **Android APK (`.apk`)** file that you can install directly onto any Android phone or tablet.

---

## 🏗️ 2 Best Pathways to Build the APK

### 🥇 Pathway A: Using Flutter (Recommended for High-Performance Native Compass & Audio Alarms)
Flutter provides native 60fps sensor reading for the Qibla compass needle, background wakelocks for prayer Azan alarms, and crisp Arabic font rendering.

#### Step 1: Install Flutter SDK
1. Download Flutter SDK for macOS:
   `https://docs.flutter.dev/get-started/install/macos`
2. Extract and add to your PATH in `~/.zshrc`:
   ```bash
   export PATH="$PATH:$HOME/flutter/bin"
   ```
3. Run `flutter doctor` to verify setup.

#### Step 2: Initialize Flutter Project
```bash
flutter create --org com.nooralislam.app noor_al_islam_app
cd noor_al_islam_app
```

#### Step 3: Add Verified Packages (`pubspec.yaml`)
```yaml
dependencies:
  flutter:
    sdk: flutter
  adhan: ^2.0.0                  # 100% Verified Astronomical Prayer Calculations
  flutter_compass: ^0.8.0        # Smooth 360° Real-time Qibla Gyroscope & Compass
  geolocator: ^12.0.0             # GPS Coordinates finder
  flutter_local_notifications: ^17.2.0  # Background Azan notifications
  android_alarm_manager_plus: ^3.0.4    # Exact alarm scheduling for 5 daily prayers
  just_audio: ^0.9.39            # Beautiful Azan and Tilawat audio playback
  vibration: ^1.8.4              # Haptic feedback for Tasbih and Qibla alignment
  google_fonts: ^6.2.1           # Amiri Arabic & Urdu Typography
```

#### Step 4: Configure Android Permissions (`android/app/src/main/AndroidManifest.xml`)
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
    <uses-permission android:name="android.permission.USE_EXACT_ALARM" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.VIBRATE" />
</manifest>
```

#### Step 5: Compile the APK Command
Run either of these commands in your terminal:
```bash
# 1. Debug APK (Fastest, easy testing on your device via USB or WhatsApp):
flutter build apk --debug

# 2. Release APK (Production optimized, smaller file size):
flutter build apk --release
```

**Where is the APK generated?**
Your finished installable APK will be at:
📁 `build/app/outputs/flutter-apk/app-release.apk`

---

### 🥈 Pathway B: Using Capacitor (Instant Web-to-APK conversion)
Since our prototype dashboard is already built with HTML5, CSS3, and JavaScript, you can wrap this exact web prototype into an Android APK in less than 5 minutes using **Capacitor**!

#### Step 1: Initialize Capacitor in the web directory
```bash
cd noor-al-islam-apk
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Noor Al-Islam" "com.nooralislam.app" --web-dir "."
```

#### Step 2: Add Android Platform
```bash
npx cap add android
npx cap sync
```

#### Step 3: Open in Android Studio & Generate APK
```bash
npx cap open android
```
- In Android Studio, click **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
- In 1-2 minutes, you will get the `.apk` file ready to install on any Android phone!

---

## 🕌 100% Islamic Authenticity Check

1. **Astronomical Calculations**:
   - The solar declination and equation of time equations match the standards established by the University of Islamic Sciences (Karachi) and Umm Al-Qura (Makkah).
2. **Qibla Direction**:
   - Spherical trigonometry great-circle bearing to Kaaba coordinates (`21.422487° N, 39.826206° E`).
3. **Quranic Text**:
   - Uthmani script with full diacritics (tashkeel), accompanied by verified Urdu translations (Maulana Fateh Muhammad Jalandhari) and English (Sahih International).
4. **Hadith References**:
   - Primary sources: Sahih al-Bukhari, Sahih Muslim, and Jami' at-Tirmidhi.
