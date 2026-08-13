# Rovea — Architecture & Engineering Documentation

This document describes the architectural principles, state management model, UI design system tokens, and data flow patterns established in **Rovea**.

---

## 🏗️ 1. High-Level Architecture Overview

Rovea is structured as an offline-first, client-driven React Native mobile & web app powered by Expo SDK 57 and Expo Router.

```
                    ┌─────────────────────────┐
                    │      Expo Router        │
                    │ (File-based Navigation) │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      Zustand Store      │
                    │  (AsyncStorage Persist) │
                    └──────┬───────────┬──────┘
                           │           │
           ┌───────────────▼─┐       ┌─▼────────────────┐
           │ Presentation UI │       │ Service Layer    │
           │ (React Components)      │ (Location, Sync, │
           │ - Sheets        │       │  Weather, Auth)  │
           │ - Custom Cards  │       └──────────────────┘
           │ - Layout Wrappers│
           └─────────────────┘
```

---

## 🎨 2. Design Tokens & Theme Engine

All UI styling is strictly governed by pre-defined tokens in `constants/`:
- **`colors.js`**: Semantic palette supporting Light (`#FAF8F4`) and Dark (`#0F0E0D`) modes with terracotta brand accents (`#C25E38` / `#E07A5F`).
- **`typography.js`**: Pairings between Playfair Display (Serif headers) and Plus Jakarta Sans (Sans body).
- **`spacing.js`**: Standardized scale (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`) and border radii (`sm`, `md`, `lg`, `xl`, `pill`).
- **`theme.js`**: Dynamic lookup function `getTheme(mode)` returning unified tokens.

---

## 🔄 3. State Management & Storage Flow

- **Store**: Built using **Zustand v5** with `persist` middleware.
- **Persistence**: Storage driver uses `@react-native-async-storage/async-storage`.
- **Haptic Integration**: All key state mutations (completing onboarding, bookmarking, adding places, toggling theme) fire `expo-haptics` triggers automatically.

---

## 🌐 4. Service Boundaries & Fallbacks

1. **`LocationService`**: Handles location permissions, GPS coordinate retrieval, native map deep linking (Apple Maps / Google Maps), and Haversine distance calculations.
2. **`WeatherService`**: Fetches real-time weather metrics with graceful fallback to cached mock weather data when offline.
3. **`SyncService`**: Coordinates background payload syncing for trips, expenses, and packing checklists.

---

## 🛠️ 5. Coding Standards & Conventions

- Components use **PascalCase** naming.
- All pressable cards and buttons enforce accessible touch targets (`hitSlop`, `accessibilityRole`, `accessibilityLabel`).
- Re-renders are minimized through targeted Zustand selectors and `React.memo`.
