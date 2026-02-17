# 🚀 Expo Setup Guide - One Tap Call

This app has been configured to run with **Expo** for easier development and testing.

---

## 📋 Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Expo CLI** (will be installed automatically)
- **Expo Go** app on your phone (optional, for testing on device)

---

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

This will install:
- Expo SDK 50
- React Native 0.73.4
- expo-location (for geolocation)
- expo-linking (for phone calls)
- expo-linear-gradient (for UI gradients)
- All other dependencies

---

## ▶️ Running the App

### Start the Development Server

```bash
npm start
```

Or:
```bash
npx expo start
```

This will:
1. Start the Metro bundler
2. Show a QR code in the terminal
3. Open a web interface at http://localhost:8081

### Run on iOS Simulator

```bash
npm run ios
```

Requirements:
- macOS only
- Xcode installed
- iOS Simulator configured

### Run on Android Emulator

```bash
npm run android
```

Requirements:
- Android Studio installed
- Android emulator running OR Android device connected via USB

### Run on Your Physical Device

1. Install **Expo Go** app:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Start the development server:
   ```bash
   npm start
   ```

3. Scan the QR code:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

---

## 📦 Project Structure (Expo-Specific)

```
onetabcall/
├── App.tsx                      # Main app entry point
├── app.json                     # Expo configuration
├── babel.config.js              # Expo Babel preset
├── package.json                 # Expo dependencies
├── src/
│   ├── components/              # Reusable components
│   ├── screens/                 # App screens
│   ├── theme/                   # Design system
│   └── utils/
│       ├── emergency-numbers.ts # Emergency number database
│       └── location.ts          # Expo Location integration
└── assets/                      # (Create this folder)
    ├── icon.png                 # App icon (1024x1024)
    ├── splash.png               # Splash screen
    ├── adaptive-icon.png        # Android adaptive icon
    └── favicon.png              # Web favicon
```

---

## 🎨 Required Assets

You need to create the following image assets for the app:

### 1. App Icon (`assets/icon.png`)
- **Size**: 1024 × 1024 px
- **Format**: PNG
- **Design**: Green circular icon with "1" or emergency symbol
- **Background**: Transparent or white

### 2. Splash Screen (`assets/splash.png`)
- **Size**: 1284 × 2778 px (or any size with 9:19.5 ratio)
- **Format**: PNG
- **Design**: One Tap Call logo on green background
- **Color**: #00C853 (emergency green)

### 3. Adaptive Icon (`assets/adaptive-icon.png`)
- **Size**: 1024 × 1024 px
- **Format**: PNG
- **For**: Android only
- **Design**: Same as icon.png but with safe area considerations

### 4. Favicon (`assets/favicon.png`)
- **Size**: 48 × 48 px (or larger)
- **Format**: PNG
- **For**: Web version

### Quick Placeholder Assets

For testing, you can use temporary placeholders:

```bash
# Create assets folder
mkdir assets

# You can use any 1024x1024 image as placeholder
# Or generate simple colored squares for now
```

---

## 🔧 Configuration

### Expo Configuration (`app.json`)

The app is configured with:
- **Name**: One Tap Call
- **Slug**: one-tap-call
- **Orientation**: Portrait only (for emergency use)
- **iOS Bundle ID**: com.onetapcall.app
- **Android Package**: com.onetapcall.app
- **Permissions**:
  - Location (foreground)
  - Phone calls

### Environment Variables

No environment variables needed for basic functionality. All emergency numbers are cached locally.

---

## 📱 Testing on Device

### iOS (Expo Go)

1. Ensure your phone and computer are on the same WiFi
2. Run `npm start`
3. Scan QR code with Camera app
4. App opens in Expo Go

**Note**: Some features like phone calls may be limited in Expo Go. For full functionality, build a standalone app.

### Android (Expo Go)

1. Ensure your phone and computer are on the same WiFi
2. Run `npm start`
3. Scan QR code with Expo Go app
4. App opens in Expo Go

---

## 🏗️ Building for Production

### EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure the project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Local Build (Classic)

```bash
# Build iOS (macOS only)
expo build:ios

# Build Android
expo build:android
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'expo'"

**Solution**:
```bash
npm install expo
```

### Issue: "Location permission denied"

**Solution**:
- iOS: Check `app.json` has location permissions configured
- Android: Ensure permissions are in `app.json`
- Simulator: Reset permissions in settings

### Issue: "Phone call doesn't work"

**Solution**:
- Expo Go has limitations for phone calls
- Build a standalone app for full functionality
- Or use development build: `npx expo run:ios` / `npx expo run:android`

### Issue: "Linear gradient not showing"

**Solution**:
```bash
npx expo install expo-linear-gradient
```

### Issue: "Metro bundler error"

**Solution**:
```bash
# Clear cache
npx expo start --clear

# Or
watchman watch-del-all (if watchman installed)
rm -rf node_modules
npm install
```

---

## 📊 Development vs Production

| Feature | Expo Go | Standalone Build |
|---------|---------|------------------|
| Location | ✅ Works | ✅ Works |
| Phone Calls | ⚠️ Limited | ✅ Full |
| Emergency Services | ⚠️ Limited | ✅ Full |
| App Store | ❌ No | ✅ Yes |
| Performance | Good | Excellent |

**Recommendation**: Use Expo Go for UI/UX development, build standalone app for full testing.

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Build for production
eas build --platform all
```

---

## 📚 Expo Resources

- **Expo Docs**: https://docs.expo.dev
- **Expo Location**: https://docs.expo.dev/versions/latest/sdk/location/
- **Expo Linking**: https://docs.expo.dev/versions/latest/sdk/linking/
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Expo Go App**: https://expo.dev/client

---

## 🔐 Permissions Explained

### Location Permission
- **Why**: To detect user's country and show correct emergency number
- **When**: Requested when user navigates to Location screen
- **Fallback**: If denied, app shows default international number (112)

### Phone Call Permission (Android)
- **Why**: To initiate emergency call
- **When**: Requested when user taps "Call Now" button
- **Note**: iOS doesn't require explicit permission for `tel:` links

---

## 🌍 Expo vs React Native CLI

| Aspect | Expo | React Native CLI |
|--------|------|------------------|
| Setup | Easy | Complex |
| Build | EAS Cloud | Local |
| Updates | OTA | Manual |
| Native Modules | Managed | Any |
| Best For | Rapid Dev | Full Control |

**This app uses Expo for faster development and easier deployment.**

---

## 💡 Tips for Expo Development

1. **Use Expo Go** for quick testing
2. **Use EAS Build** for production builds
3. **Enable OTA Updates** for quick fixes
4. **Test on real devices** early
5. **Check bundle size** regularly
6. **Use TypeScript** (already configured)
7. **Follow Expo best practices**

---

## 🎉 You're Ready!

Your One Tap Call app is now configured for Expo. Start developing with:

```bash
npm start
```

Press `i` for iOS, `a` for Android, or scan QR code with Expo Go!

---

**Need help?** Check [Expo Documentation](https://docs.expo.dev) or open an issue.
