# 🚨 One Tap Call - Emergency Calling App

> Emergency help, one tap away

A production-ready React Native app that helps users quickly call emergency services (Police, Fire, Hospital) based on their current location with just one tap.

![App Purpose](https://img.shields.io/badge/Purpose-Emergency_Calling-red)
![Platform](https://img.shields.io/badge/Platform-React_Native-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-green)

---

## 🎯 Features

- **One-Tap Emergency Calling**: Maximum 2 taps to initiate an emergency call
- **Location-Based Numbers**: Automatically detects your location and shows the correct emergency number
- **Three Services**: Quick access to Police, Fire Service, and Hospital/Ambulance
- **Clean UI**: Green & white theme, minimal design, easy to use under stress
- **Offline Support**: Emergency numbers stored locally for offline access
- **Accessibility**: Large touch targets (240px call button), high contrast, one-hand friendly
- **Multi-Country Support**: Pre-configured emergency numbers for 20+ countries

---

## 🎨 Design System

### Color Palette
- **Primary Green**: `#00C853` - Trust, safety, help
- **White**: `#FFFFFF` - Clean backgrounds
- **Service Colors**:
  - Police: `#2196F3` (Blue)
  - Fire: `#F44336` (Red)
  - Medical: `#FF9800` (Orange)

### Typography
- **Font Family**: System default (SF Pro on iOS, Roboto on Android)
- **Sizes**: 12px - 48px with clear hierarchy
- **Emergency Number**: 28px bold with letter spacing

### Components
- **Large Call Button**: 240px × 240px circular button with pulse animation
- **Service Cards**: 120px height with icons and clear labels
- **Touch Targets**: Minimum 60px for all interactive elements

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete design documentation.

---

## 📱 Screens

1. **Splash Screen** - Welcome screen with app logo and tagline
2. **Home Screen** - Service selection with 3 large cards
3. **Location Screen** - Shows detected location and emergency number
4. **Call Screen** - Large call button with confirmation and warning

---

## 🛠️ Tech Stack

- **Framework**: React Native 0.73
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **UI**: Custom component library with theme system
- **Location**: react-native-geolocation-service
- **Gradients**: react-native-linear-gradient
- **Storage**: AsyncStorage (for offline data)

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd onetabcall

# Install dependencies
npm install

# iOS specific
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Development

```bash
# Start Metro bundler
npm start

# Run tests
npm test

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📂 Project Structure

```
onetabcall/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic components (Button, Text, Icon)
│   │   └── molecules/       # Composed components (ServiceCard)
│   ├── screens/             # App screens
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LocationScreen.tsx
│   │   └── CallScreen.tsx
│   ├── theme/               # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── shadows.ts
│   └── utils/               # Utilities
│       ├── emergency-numbers.ts  # Emergency number database
│       └── location.ts           # Location services
├── App.tsx                  # Main app component
├── index.js                 # Entry point
├── package.json
├── tsconfig.json
├── DESIGN_SYSTEM.md         # Complete design documentation
└── README.md
```

---

## 🌍 Supported Countries

Emergency numbers for 20+ countries including:
- 🇺🇸 United States (911)
- 🇬🇧 United Kingdom (999/112)
- 🇮🇳 India (112/100/101/102)
- 🇵🇰 Pakistan (15/16/1122)
- 🇦🇺 Australia (000)
- 🇨🇦 Canada (911)
- 🇩🇪 Germany (110/112)
- 🇯🇵 Japan (110/119)
- And more...

Default fallback: 112 (International emergency number)

---

## 🔒 Permissions

### iOS (Info.plist)
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>One Tap Call needs your location to find the nearest emergency services.</string>
```

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.CALL_PHONE" />
```

---

## ⚠️ Safety Features

- **Confirmation Dialog**: Prevents accidental calls
- **Clear Warning**: "Use only in real emergencies"
- **Legal Notice**: Warns about false emergency call consequences
- **Visual Feedback**: Pulse animation and touch feedback
- **Easy Back Navigation**: Can cancel at any step

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run e2e tests (requires Detox setup)
npm run test:e2e
```

---

## 📱 Platform-Specific Notes

### iOS
- Uses `telprompt:` URL scheme for call confirmation
- Requires location permission in Info.plist
- Supports haptic feedback

### Android
- Uses `tel:` URL scheme
- Runtime permission requests for location
- Supports vibration feedback

---

## 🚧 Future Enhancements

- [ ] Real-time location updates
- [ ] Integration with Google Maps Geocoding API for accurate location
- [ ] Call history (with privacy considerations)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Voice command activation
- [ ] Widget for even faster access
- [ ] Apple Watch / Android Wear support
- [ ] Share location with emergency services

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⚖️ Legal Disclaimer

This app is designed to facilitate emergency calls. Users are responsible for using it appropriately and only in genuine emergency situations. False or prank emergency calls may be punishable by law in many jurisdictions.

---

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Email: support@onetapcall.app

---

## 🙏 Acknowledgments

- Emergency number data compiled from official government sources
- Icons: Material Design / Lucide Icons
- Inspiration: Making emergency services more accessible worldwide

---

**Made with ❤️ for public safety**
