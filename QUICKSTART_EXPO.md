# ⚡ Quick Start - Run with Expo

Get the One Tap Call app running in under 5 minutes!

---

## 🚀 Super Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm start

# 3. Choose your platform:
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Scan QR code for your physical device
```

That's it! The app will open on your chosen platform.

---

## 📱 Run on Your Phone (Easiest!)

### Step 1: Install Expo Go
- **iPhone**: https://apps.apple.com/app/expo-go/id982107779
- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent

### Step 2: Start the Server
```bash
npm start
```

### Step 3: Scan QR Code
- **iPhone**: Open Camera app → Point at QR code → Tap notification
- **Android**: Open Expo Go app → Tap "Scan QR Code" → Point at screen

### Step 4: Test the App!
The app will load on your phone. You can now:
- Select emergency service
- See location detection
- View emergency numbers
- (Call functionality is limited in Expo Go)

---

## 💻 Run on Simulator/Emulator

### iOS (Mac only)

**Prerequisites**:
- macOS
- Xcode installed from App Store
- Xcode Command Line Tools: `xcode-select --install`

**Run**:
```bash
npm run ios
```

The iOS Simulator will open automatically with the app.

### Android

**Prerequisites**:
- Android Studio installed
- Android emulator configured
- OR Android device connected via USB with USB debugging enabled

**Run**:
```bash
npm run android
```

The app will install and run on your emulator or connected device.

---

## 🌐 Run on Web (Bonus!)

```bash
npm run web
```

Opens in your browser at http://localhost:8081

**Note**: Some features like location and phone calls have limitations on web.

---

## 🐛 Troubleshooting

### "Command not found: expo"

**Solution**:
```bash
npm install
```
This installs Expo CLI locally.

### QR Code doesn't work

**Solution**:
1. Ensure phone and computer are on same WiFi
2. Try tunnel mode: `npx expo start --tunnel`
3. Manually type the URL shown in terminal into Expo Go

### "No devices found"

**For iOS**:
```bash
# Make sure Xcode is installed
xcode-select --install

# Open Simulator manually
open -a Simulator
```

**For Android**:
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_5_API_33
```

### Port already in use

**Solution**:
```bash
# Start on different port
npx expo start --port 8082
```

### Metro bundler stuck

**Solution**:
```bash
# Clear cache and restart
npx expo start --clear
```

---

## 📦 What Gets Installed

When you run `npm install`, you get:

✅ **Expo SDK 50** - Core framework
✅ **React Native 0.73.4** - Mobile framework
✅ **expo-location** - GPS functionality
✅ **expo-linear-gradient** - UI gradients
✅ **expo-linking** - Phone call functionality
✅ **React Navigation** - Screen navigation
✅ **TypeScript** - Type safety

Total install size: ~500MB (includes all dependencies)

---

## 🎯 Next Steps

### 1. Explore the App
- Navigate through all 4 screens
- Test service selection
- View location detection
- See emergency numbers for different regions

### 2. Customize
- Edit colors in `src/theme/colors.ts`
- Modify screens in `src/screens/`
- Add new emergency services
- Change typography

### 3. Add Assets
- Create app icon: `assets/icon.png` (1024×1024)
- Create splash screen: `assets/splash.png` (1284×2778)
- See `assets/README.md` for details

### 4. Build for Production
See `EXPO_SETUP.md` for building standalone apps.

---

## 📖 Documentation

- **Full Expo Guide**: `EXPO_SETUP.md`
- **Design System**: `DESIGN_SYSTEM.md`
- **UX Rationale**: `UX_EMERGENCY_DESIGN.md`
- **Project Overview**: `PROJECT_SUMMARY.md`

---

## 🆘 Need Help?

**Expo Issues**: https://docs.expo.dev
**React Native Issues**: https://reactnative.dev/docs/troubleshooting
**App-Specific Issues**: Check the GitHub repository

---

## ✅ Checklist

- [ ] Node.js 18+ installed
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] App runs on device/simulator
- [ ] All screens are accessible
- [ ] Location permission works
- [ ] Emergency numbers display correctly

---

**🎉 Congratulations!** Your emergency calling app is now running with Expo.

For production builds and advanced features, see [EXPO_SETUP.md](EXPO_SETUP.md).
