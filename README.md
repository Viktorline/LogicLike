# LogicLike

A React Native mobile application built with Expo for educational games and logic puzzles.

## 🚀 Technologies Used

### Core Technologies

- **React Native** (0.79.5) - Cross-platform mobile development framework
- **Expo** (53.0.20) - Development platform and build service
- **TypeScript** (5.8.3) - Type-safe JavaScript

## 🛠 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd LogicLike
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on specific platforms**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

## 🏗 Build & Deployment

### EAS Build

This project uses EAS Build for creating production builds.

**Project ID:** `cb79d0f3-3be8-402a-950e-7777e5e9d50d`

### Build Commands

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Build for Android (APK)
eas build --platform android

# Build for iOS
eas build --platform ios
```
