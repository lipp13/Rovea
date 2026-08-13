# Rovea ✈️ ✨
> **Craft Your Next Journey** — An editorial-inspired, aesthetic travel companion app built for modern wanderers.

[![Expo SDK](https://img.shields.io/badge/Expo-v57.0-000000.svg?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-v0.86-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![Expo Router](https://img.shields.io/badge/Expo_Router-v57.0-black.style=for-the-badge&logo=expo)](https://docs.expo.dev/router/introduction/)
[![Zustand](https://img.shields.io/badge/State-Zustand_v5.0-764ABC.svg?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**Rovea** is a premium, full-featured mobile and web travel application crafted with React Native and Expo Router. Designed with an editorial aesthetic—featuring warm organic color tones, Playfair Display headers, and buttery-smooth micro-interactions—Rovea elevates every phase of travel: from dreaming and planning to budgeting and exploring on the ground.

---

## ✨ Key Features

- 🗺️ **Editorial Itinerary Planner**
  - Multi-day structured timeline navigation.
  - Interactive activity management with custom bottom sheets.
  - Quick place status toggling and location details.

- 🔍 **Curated Destination Exploration**
  - Searchable discovery hub featuring category filters (*Culture, Architecture, Nature, Gastronomy*).
  - High-resolution editorial cards with curated tips, best visit times, and atmosphere highlights.
  - One-tap wishlist & place bookmarking.

- 💰 **Smart Budgeting & Expense Tracker**
  - Real-time spending breakdown categorized by *Accommodation, Dining, Transport, Activities, and Shopping*.
  - Visual budget progress indicator with target threshold alerts.
  - Multi-currency support and instant transaction logging.

- 🎒 **Interactive Packing Checklist**
  - Segmented checklist for *Essentials, Wardrobe, Tech & Electronics, and Travel Documents*.
  - Dynamic progress indicator with completion stats.
  - Add, check, and reset packing items on the fly.

- ⛅ **Trip Dashboard & Live Weather Insights**
  - Overview screen featuring active trip countdown, current activity highlights, and localized weather forecasts.
  - Filterable trip management tab (*Active, Upcoming, and Past Trips*).
  - Quick access modal for creating custom new trips.

- 🎨 **Luxury Design System & Theme Engine**
  - Custom typography pair: **Playfair Display** (Editorial Serif) & **Plus Jakarta Sans** (Modern Sans).
  - **Dark & Light Mode** support out-of-the-box with persistent theme preferences.
  - Integrated **Expo Haptics** for tactile user feedback.

---

## 📱 Tech Stack

- **Framework**: [React Native 0.86](https://reactnative.dev/) with [Expo SDK 57](https://expo.dev/)
- **Routing**: [Expo Router v57](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **State Management**: [Zustand v5](https://github.com/pmndrs/zustand) with `@react-native-async-storage/async-storage` persistence
- **UI Components & Icons**: [Lucide React Native](https://lucide.dev/), `react-native-svg`
- **Animations & Haptics**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/), `expo-haptics`
- **Fonts**: `@expo-google-fonts/playfair-display`, `@expo-google-fonts/plus-jakarta-sans`

---

## 📂 Project Structure

```
Rovea/
├── app/                      # Expo Router File-Based Navigation
│   ├── (tabs)/               # Main Tab Screens (Home, Explore, Trips, Profile)
│   ├── _layout.jsx           # Root Navigation & Theme Provider
│   ├── index.jsx             # Entry Point & Redirect Handler
│   ├── onboarding.jsx        # First-time User Onboarding Screen
│   ├── create-trip.jsx       # New Trip Wizard Modal
│   ├── trip-overview.jsx     # Active Trip Hub Dashboard
│   ├── itinerary.jsx         # Detailed Day-by-Day Timeline
│   ├── expense-tracker.jsx   # Budget & Spending Tracker
│   ├── packing-checklist.jsx # Luggage & Gear Checklist
│   └── destination-detail.jsx# Editorial Destination Viewer
├── components/               # Modular & Reusable Components
│   ├── explore/              # Search bar, category chips, place cards
│   ├── home/                 # Banner cards, quick actions, weather widgets
│   ├── profile/              # Travel stats, preferences, theme switch
│   ├── sheets/               # Bottom Sheet Modals (Add Place, Details)
│   ├── trips/                # Trip cards, summary widgets, itinerary items
│   └── ui/                   # Buttons, badges, inputs, headers
├── constants/                # Design Tokens
│   ├── colors.js             # Warm Light & Dark theme palettes
│   ├── spacing.js            # Standardized spacing scales
│   ├── typography.js        # Font families and typographic hierarchy
│   └── theme.js              # Combined theme design system
├── data/                     # Mock Data & Editorial Content
│   └── mockData.js           # Pre-loaded destinations, trips, & checklists
├── services/                 # API & Integration Layers
│   ├── api.js                # Base API client
│   ├── location.js           # Geo-location & place search
│   └── weather.js            # Weather forecast service
├── store/                    # Global State
│   └── useAppStore.js        # Persistent Zustand store
└── assets/                   # App icons, splash screens, and images
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device (iOS/Android) or an Emulator/Simulator.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lipp13/Rovea.git
   cd Rovea
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables (Optional):**
   Copy `.env.example` to `.env` if custom API keys are needed:
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server:**
   ```bash
   npm start
   ```

### Running on Specific Platforms

- **Android (Emulator or Device):**
  ```bash
  npm run android
  ```
- **iOS (Simulator or Device):**
  ```bash
  npm run ios
  ```
- **Web Browser:**
  ```bash
  npm run web
  ```

---

## 📜 Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm start` | Launches the Metro bundler & Expo dev server |
| `npm run android` | Starts dev server and opens Android build |
| `npm run ios` | Starts dev server and opens iOS Simulator |
| `npm run web` | Launches the application on localhost browser |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p center>
  Designed & Built with ❤️ for Travelers around the Globe.
</p>
