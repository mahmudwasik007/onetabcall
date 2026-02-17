# One Tap Call - Design System

## 🎨 Color Palette

### Primary Colors
```
Emergency Green (Primary)
- Primary 500: #00C853 (Main brand color)
- Primary 600: #00B248 (Hover/Active states)
- Primary 700: #009E3D (Dark variant)
- Primary 400: #00E676 (Light variant)
- Primary 100: #B9F6CA (Very light/backgrounds)
```

### Secondary Colors
```
White & Neutrals
- White: #FFFFFF (Backgrounds, cards)
- Gray 50: #FAFAFA (Light background)
- Gray 100: #F5F5F5 (Subtle backgrounds)
- Gray 300: #E0E0E0 (Borders, dividers)
- Gray 500: #9E9E9E (Secondary text)
- Gray 700: #616161 (Body text)
- Gray 900: #212121 (Headings, primary text)
```

### Semantic Colors
```
Police Blue: #2196F3
Fire Red: #F44336
Hospital/Ambulance: #FF9800
Success: #4CAF50
Warning: #FFC107
Danger: #F44336
```

### Gradients
```
Primary Gradient: linear-gradient(135deg, #00E676 0%, #00C853 100%)
Splash Gradient: linear-gradient(180deg, #00E676 0%, #00B248 100%)
```

---

## 📝 Typography

### Font Family
- **Primary**: System Default (iOS: SF Pro, Android: Roboto)
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Sizes & Weights
```
Display Large: 48px / 700 (Bold) - App logo, hero text
Display Small: 36px / 700 (Bold) - Screen titles

Heading 1: 32px / 700 (Bold) - Main headings
Heading 2: 24px / 600 (SemiBold) - Section titles
Heading 3: 20px / 600 (SemiBold) - Card titles

Body Large: 18px / 400 (Regular) - Important body text
Body Medium: 16px / 400 (Regular) - Standard body text
Body Small: 14px / 400 (Regular) - Secondary text

Label Large: 16px / 600 (SemiBold) - Button labels
Label Medium: 14px / 600 (SemiBold) - Small button labels
Label Small: 12px / 500 (Medium) - Captions, hints

Emergency Number: 28px / 700 (Bold) - Phone numbers
```

### Line Heights
- Headings: 1.2
- Body text: 1.5
- Labels: 1.4

---

## 📏 Spacing System

Using 8px base unit:
```
xs: 4px   (0.5 unit)
sm: 8px   (1 unit)
md: 16px  (2 units)
lg: 24px  (3 units)
xl: 32px  (4 units)
2xl: 48px (6 units)
3xl: 64px (8 units)
```

### Screen Padding
- Horizontal: 20px (2.5 units)
- Vertical: 24px (3 units)

### Component Spacing
- Card gap: 16px
- Section gap: 24px
- Element gap: 12px

---

## 🎯 Component Specifications

### Buttons

#### Primary Button (Call Now)
- Size: 240px × 240px (circular)
- Background: #00C853
- Shadow: 0px 8px 24px rgba(0, 200, 83, 0.4)
- Icon size: 80px
- Press state: Scale 0.95, darker background

#### Card Button (Emergency Service)
- Size: Full width × 120px
- Border radius: 16px
- Background: #FFFFFF
- Border: 2px solid #E0E0E0
- Selected: Border #00C853, background #B9F6CA
- Shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
- Icon size: 48px
- Padding: 20px

#### Secondary Button
- Height: 56px
- Border radius: 28px
- Background: #FFFFFF
- Border: 2px solid #00C853
- Text color: #00C853
- Min width: 160px

### Cards
```
Standard Card:
- Border radius: 20px
- Background: #FFFFFF
- Shadow: 0px 4px 16px rgba(0, 0, 0, 0.1)
- Padding: 24px

Emergency Service Card:
- Border radius: 16px
- Min height: 120px
- Icon container: 64px × 64px circle
- Icon color: Service-specific
```

### Icons
```
Large: 80px (Call button)
Medium: 48px (Service cards)
Small: 24px (UI icons)
Stroke width: 2px
Style: Rounded, friendly
```

---

## 📱 Screen Layouts

### Safe Areas
- Top safe area: iOS notch/Android status bar
- Bottom safe area: iOS home indicator
- Minimum side padding: 20px

### Touch Targets
- Minimum: 60px × 60px
- Recommended: 80px × 80px
- Call button: 240px × 240px

### Screen Structure
```
┌─────────────────────┐
│  Status Bar         │
├─────────────────────┤
│  Header (60px)      │
├─────────────────────┤
│                     │
│  Main Content       │
│  (Scrollable)       │
│                     │
├─────────────────────┤
│  Bottom Safe Area   │
└─────────────────────┘
```

---

## 🎭 Animation & Motion

### Timing Functions
- Standard: 300ms ease-in-out
- Fast: 200ms ease-out
- Slow: 400ms ease-in-out

### Transitions
- Screen navigation: Slide (300ms)
- Card selection: Scale + color (200ms)
- Button press: Scale 0.95 (100ms)
- Loading: Fade (400ms)

### Micro-interactions
- Touch feedback: Immediate (<50ms)
- Haptic feedback: On card selection and button press
- Success feedback: Checkmark animation (500ms)

---

## ♿ Accessibility

### Contrast Ratios
- Normal text: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- Interactive elements: Minimum 4.5:1

### Touch Targets
- All interactive elements: Minimum 44px × 44px
- Critical actions (call button): Much larger (240px)

### Screen Reader Support
- All buttons: Descriptive labels
- Emergency numbers: Announced clearly
- Service names: Full names, not abbreviations

### Color Blindness
- Never rely on color alone
- Use icons + text labels
- High contrast throughout

---

## 🚨 Emergency UX Principles

### 1. Speed
- Maximum 2 taps to make a call
- No loading delays on critical path
- Pre-fetch location data

### 2. Clarity
- Large text and buttons
- Clear visual hierarchy
- No ambiguous language

### 3. Stress-Friendly
- Minimal cognitive load
- Single action per screen
- Clear back/cancel options

### 4. Error Prevention
- Confirmation for actual call
- Clear service indication
- Cannot accidentally dismiss

### 5. Universal Design
- Works in bright sunlight
- Works one-handed
- Works under stress/panic

---

## 📦 Component Library Structure

```
/src
  /components
    /atoms
      - Button.tsx
      - Icon.tsx
      - Text.tsx
      - Spacer.tsx
    /molecules
      - ServiceCard.tsx
      - LocationDisplay.tsx
      - EmergencyNumber.tsx
    /organisms
      - ServiceSelector.tsx
      - CallConfirmation.tsx
  /screens
    - SplashScreen.tsx
    - HomeScreen.tsx
    - LocationScreen.tsx
    - CallScreen.tsx
  /theme
    - colors.ts
    - typography.ts
    - spacing.ts
    - shadows.ts
  /utils
    - location.ts
    - emergency-numbers.ts
    - permissions.ts
```

---

## 🌍 Localization Considerations

- Support for RTL languages
- Emergency numbers vary by country
- Service names may differ (Ambulance vs Medical Emergency)
- Use location-aware number database

---

## 🔒 Privacy & Safety

- Location permission request: Clear, honest messaging
- Data storage: Minimal, local only
- No analytics on emergency calls
- Offline capability: Stored emergency numbers by region
- Clear emergency use disclaimer
