# Rovea — Master Design System & Visual Specification

> **Platform:** Mobile Application (React Native + Expo)  
> **Product Category:** Premium Travel Companion & Itinerary Planner  
> **Design Architecture:** Editorial Travel Magazine × High-Usability Mobile Utility  
> **Source of Truth:** `design-system/MASTER.md`

---

## 1. Brand Personality

Rovea is an intentional, refined travel companion built for curious, discerning travelers. It moves away from loud, chaotic travel booking engines and chaotic social feeds, creating a sanctuary for wanderlust and structured trip planning.

* **Sophisticated yet Accessible:** Refined typography and curated visual rhythm without feeling elitist.
* **Calm & Intentional:** Generous whitespace, serene warm tones, and clutter-free interfaces that reduce trip planning anxiety.
* **Modern & Editorial:** Feels like turning the pages of a high-end print travel magazine (*Kinfolk*, *Cereal*, *Monocle*).
* **Warm & Human:** Tactile imagery, organic earthy palettes, and warm sunlight tones that invoke wanderlust.
* **Cinematic & Image-Driven:** Full-bleed imagery, carefully framed aspect ratios, and subtle motion that brings destinations to life.

---

## 2. Visual Design Style

* **Core Concept:** **Editorial Travel Magazine**
* **Key Visual Characteristics:**
  * Asymmetric, structured grid layouts with high contrast typography.
  * Image-first hero cards with subtle dark scrim gradients for text legibility.
  * Elegant serif headlines paired with ultra-clean sans-serif UI elements.
  * Clean hairline dividers (`1px`) in muted warm tones to separate editorial sections.
  * Tactile, earthy color palette inspired by terracotta, warm sand, slate stone, and dusk obsidian.
  * Zero reliance on generic SaaS gradients, neon glows, or heavy glassmorphism.

---

## 3. Recommended UI Style

* **Style Name:** **Warm Editorial Minimal**
* **Target Stack:** React Native + Expo (with Tailwind CSS via `nativewind` or standard `StyleSheet`)
* **Mode Support:** Dual Tier — **Warmed Light Mode** (Default daytime reading experience) & **Obsidian Dark Mode** (Nighttime / OLED power saving).
* **Anti-Patterns & Exclusions:**
  * ❌ NO Cyberpunk, neon colors (`#00FF88`, `#FF007F`), or gaming aesthetic.
  * ❌ NO Generic SaaS dashboard charts, heavy cards, or thick saturated drop shadows.
  * ❌ NO Excessive glassmorphism or distracting blur overlays.
  * ❌ NO Emoji icons in UI controls or navigation (Strictly vector icons via Phosphor/Lucide).
  * ❌ NO Cheap, cluttered travel agency templates.

---

## 4. Color Palette

The color system uses semantic CSS/React Native variables with strict contrast ratios ($\ge 4.5:1$ for body text, $\ge 3:1$ for UI controls).

### 4.1 Light Mode — *Warmed Sandstone* (Default)
Inspired by natural parchment, warm sunlight, and terra-cotta earth.

| Token Name | Hex Code | Purpose / Usage | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| `color-bg-primary` | `#FBF9F5` | Primary app background (warm off-white/parchment) | Canvas |
| `color-bg-surface` | `#FFFFFF` | Elevating card surfaces & bottom sheet backgrounds | Surface |
| `color-bg-subtle` | `#F2ECE1` | Inputs, tags, secondary button fills | Muted fill |
| `color-text-primary` | `#1C1917` | Primary headlines, title text, major body copy | 15.8:1 (AAA) |
| `color-text-secondary` | `#78716C` | Metadata, subtitles, timestamps, inactive icons | 4.8:1 (AA) |
| `color-text-muted` | `#A8A29E` | Disabled text, placeholders, decorative elements | 3.1:1 (UI) |
| `color-accent-brand` | `#C25E38` | Primary CTA, active tab highlights, pins, key badges | 4.6:1 (AA) |
| `color-accent-hover` | `#A64B29` | Pressed state for primary CTA | Interactive |
| `color-accent-subtle` | `#FDF4F0` | Selected state highlight backgrounds, chip active fill | Accent Tint |
| `color-border-subtle` | `#E7E2D8` | Hairline dividers, card outlines, input borders | 1px border |
| `color-border-strong` | `#D6CEBE` | Focused input borders, active chips | 1.5px border |
| `color-destructive` | `#B91C1C` | Delete actions, budget overruns, alert states | 6.2:1 (AA) |
| `color-success` | `#2D6A4F` | Packing item complete, budget within limit | 5.8:1 (AA) |

### 4.2 Dark Mode — *Dusk Obsidian*
Warm dark theme engineered for high legibility without cold blue-black tones.

| Token Name | Hex Code | Purpose / Usage | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| `color-bg-primary` | `#141211` | Primary dark background (warm obsidian) | Canvas |
| `color-bg-surface` | `#1F1C1A` | Elevated card surfaces, bottom sheets | Surface |
| `color-bg-subtle` | `#2A2623` | Input fills, secondary buttons, tags | Muted fill |
| `color-text-primary` | `#F5F2EB` | Primary headlines, major copy | 14.9:1 (AAA) |
| `color-text-secondary` | `#A8A29E` | Metadata, subtitles, inactive tabs | 5.2:1 (AA) |
| `color-text-muted` | `#78716C` | Disabled text, placeholders | 3.2:1 (UI) |
| `color-accent-brand` | `#E07A5F` | Primary CTA, active pins, brand elements | 5.1:1 (AA) |
| `color-accent-subtle` | `#2D201B` | Selected chip background, active list item tint | Accent Tint |
| `color-border-subtle` | `#332E2A` | Hairline dividers, card borders | 1px border |
| `color-border-strong` | `#4D4640` | Active input borders, focused chips | 1.5px border |

---

## 5. Typography System & Font Pairing

Rovea uses a **Dual-Font System** combining high-end editorial display serif for headers with an ultra-legible geometric sans-serif for UI controls and dense information.

### 5.1 Recommended Font Families
* **Display / Editorial Headers:** `Playfair Display` or `Newsreader` (Fallback: `Georgia`, `serif`)
* **Body / UI Elements:** `Plus Jakarta Sans` or `Inter` (Fallback: `System`, `-apple-system`, `sans-serif`)

### 5.2 Type Scale Specification (React Native)

| Token | Size | Line Height | Letter Spacing | Weight | Font Family | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xl` | 36px | 44px | -0.5px | SemiBold (600) | Display Serif | Onboarding Hero, City Cover Title |
| `display-lg` | 28px | 34px | -0.3px | Medium (500) | Display Serif | Screen Titles (Destination Detail, Trip Overview) |
| `heading-md` | 22px | 28px | -0.2px | SemiBold (600) | Display Serif / Sans | Section Headers, Modal Titles |
| `heading-sm` | 18px | 24px | 0px | Medium (500) | Sans-Serif | Card Titles, Subheadings |
| `body-large` | 16px | 24px | 0px | Regular (400) | Sans-Serif | Main Narrative Copy, Description Texts |
| `body-regular` | 14px | 20px | 0px | Regular (400) | Sans-Serif | Standard UI Text, List Items, Inputs |
| `caption` | 12px | 16px | +0.2px | Medium (500) | Sans-Serif | Metadata, Category Tags, Weather Subtext |
| `overline` | 11px | 14px | +1.2px | Bold (700) | Sans-Serif | UPPERCASE Section Badges, Dates, Category Caps |

---

## 6. Spacing Scale

Rovea enforces a strict **4pt / 8pt Spatial Scale** to guarantee thumb comfort and consistent visual breathing room across all screen densities.

| Token | Value | React Native Density | Usage Context |
| :--- | :--- | :--- | :--- |
| `space-xxs` | 4px | `4` | Icon-to-text gap, badge internal padding |
| `space-xs` | 8px | `8` | Chip padding, list item internal spacing |
| `space-sm` | 12px | `12` | Form input internal padding, card gap tight |
| `space-md` | 16px | `16` | Standard screen horizontal margin, card padding |
| `space-lg` | 24px | `24` | Section gap, bottom sheet content padding |
| `space-xl` | 32px | `32` | Major section divider spacing, header top margin |
| `space-xxl` | 48px | `48` | Splash screen hero spacing, empty state top offset |

---

## 7. Border Radius System

To prevent the "overly-rounded toy app" look, Rovea uses structured, restrained radii:

* **`radius-xs` (4px):** Badges, category pills, small tags.
* **`radius-sm` (8px):** Form text inputs, buttons, map popup cards.
* **`radius-md` (12px):** Standard content cards, itinerary list cards, weather widgets.
* **`radius-lg` (16px):** Destination hero cards, bottom sheet top corners.
* **`radius-pill` (9999px):** Circular icon action buttons, search pill bar, user avatars.

---

## 8. Shadow & Elevation System (React Native)

Soft, warm ambient drop shadows engineered specifically for React Native (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, and Android `elevation`).

### 8.1 Elevation Tiers

```javascript
export const shadows = {
  none: {
    shadowColor: 'transparent',
    elevation: 0,
  },
  subtle: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  card: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  floatingNav: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  modalBottomSheet: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 16,
  }
};
```

---

## 9. Iconography Guidelines

* **Icon Library:** **Phosphor Icons** (`@phosphor-icons/react-native`) or **Lucide React Native** (`lucide-react-native`).
* **Icon Weight & Style:**
  * Navigation & Default Controls: **Regular** (`strokeWidth = 1.5` or `2.0`).
  * Active Navigation & Saved States: **Fill** or **Bold**.
* **Icon Sizes:**
  * `icon-sm`: 16px (Inline metadata, weather icons, rating stars)
  * `icon-md`: 24px (Standard buttons, inputs, list icons, tab icons)
  * `icon-lg`: 32px (Header quick actions, empty state focal points)
* **Strict Rule:** Emojis are **prohibited** as functional UI icons or tab bar controls.

---

## 10. Button System

All interactive buttons adhere to a **minimum 44x44pt touch target** to guarantee thumb accessibility.

### 10.1 Button Variants

1. **Primary CTA (Terracotta Fill):**
   * Background: `color-accent-brand` (`#C25E38`)
   * Text Color: `#FFFFFF` (`body-regular`, SemiBold)
   * Pressed State: Opacity `0.85` or scale `0.98`
   * Height: 52px (Full width or main action)
2. **Secondary Button (Warm Subtle Fill):**
   * Background: `color-bg-subtle` (`#F2ECE1` / `#2A2623`)
   * Text Color: `color-text-primary`
   * Border: 1px `color-border-subtle`
   * Height: 48px
3. **Ghost / Text Button:**
   * Background: `transparent`
   * Text Color: `color-text-primary` or `color-accent-brand`
   * Pressed State: Background tint `color-bg-subtle`
4. **Floating Action Icon Button (Circle):**
   * Dimensions: 48x48px (Touch Target expanded to 56x56px via `hitSlop`)
   * Background: `color-bg-surface` with `shadows.card`

---

## 11. Input System

Text fields, search bars, and pickers designed for fast mobile data entry.

* **Height:** 48px minimum
* **Background:** `color-bg-surface` or `color-bg-subtle`
* **Border:** `1px` `color-border-subtle` (Default) $\rightarrow$ `1.5px` `color-accent-brand` (Focus)
* **Typography:** `body-regular` (14px)
* **Placeholder:** `color-text-muted`
* **Left Icon:** `icon-md` (20-24px) in `color-text-secondary`
* **Error State:** Border `1.5px` `color-destructive`, subtext helper in `color-destructive`.

---

## 12. Card System

Editorial layouts use asymmetric card proportions and subtle warm surface styling.

### 12.1 Card Variants
1. **Editorial Destination Hero Card (Aspect Ratio 4:5 or 16:9):**
   * Full-bleed cover photo with a bottom linear gradient scrim (`rgba(0,0,0,0.65)` to `transparent`).
   * White display title, location tag, and save heart icon floating top-right.
2. **Trip Summary Card:**
   * Surface background `color-bg-surface`, `radius-md` (12px), `shadows.subtle`.
   * Left thumbnail image (80x80px), right content stack (Trip Title, Date Range badge, Progress Bar).
3. **Place / Spot Detail Card:**
   * Horizontal strip card: 64x64px rounded image, place title, category pill (e.g. "Café", "Viewpoint"), rating, and add to day `+` button.

---

## 13. Bottom Navigation Bar

A floating, thumb-friendly dock bar positioned safely above system gesture indicators.

* **Layout:** Floating Bar with 16px horizontal margin and 12px bottom inset from `useSafeAreaInsets()`.
* **Background:** `color-bg-surface` with `shadows.floatingNav` and 1px top border `color-border-subtle`.
* **Border Radius:** `radius-pill` (28px) or `16px`.
* **Items (4 Tabs):**
  1. **Home** (`House` icon)
  2. **Explore** (`Compass` icon)
  3. **Trips** (`SuitcaseSimple` or `MapTrifold` icon)
  4. **Profile** (`User` icon)
* **Active Indicator:** Accent color icon (`color-accent-brand`) with a small warm indicator dot below.

---

## 14. Bottom Sheet Guidelines

Used for quick interactions (Add Place to Trip, Filter Destinations, Expense Breakdown, Packing Item Quick Add).

* **Libraries:** `@gorhom/bottom-sheet` or React Native Native Modal Sheet.
* **Top Radius:** 20px (`radius-lg`).
* **Handle Indicator:** 36x4px pill, color `color-border-strong`, centered 8px from top.
* **Backdrop Scrim:** 50% opacity black (`rgba(0,0,0,0.5)`).
* **Snap Points:** Standard tiers — `25%` (Peek), `50%` (Half View), `85%` (Full Content Focus).

---

## 15. Image Treatment

Images drive the emotional narrative of Rovea.

* **Curated Aspect Ratios:**
  * Hero Banners: `4:5` (Vertical mobile editorial) or `16:9` (Wide landscape)
  * Spot Thumbnails: `1:1` Square with `8px` rounded corners
* **Gradient Overlay Rule:** All text placed over images **MUST** have a 2-stop linear scrim:
  * Top text: Gradients down from `rgba(0,0,0,0.4)` to `transparent`.
  * Bottom text: Gradients up from `rgba(0,0,0,0.7)` to `transparent`.
* **Placeholder:** Subtle warm gray shimmer animation (`color-bg-subtle`) while loading images.

---

## 16. Map UI Guidelines

Custom map styling that integrates naturally with the editorial palette rather than standard bright satellite maps.

* **Map Style:** Warm Minimal / Muted Gray & Taupe (Using Mapbox or React Native Maps custom style JSON).
* **Custom Pins:**
  * Selected Pin: `36x36px` Terracotta circular pin with place category icon inside.
  * Unselected Pin: `24x24px` Muted warm stone pin.
* **Bottom Carousel:** Horizontal snap carousel over the map for place previews (Swipe to pan map focus).

---

## 17. Timeline & Itinerary Components

The engine for day-by-day travel planning.

* **Day Selector Header:** Horizontal scrollable date strip with day numbers, dates, and active warm underline.
* **Chronological Timeline Node:**
  * Vertical hairline (`1.5px` `color-border-subtle`) connecting activities chronologically.
  * Node Dots: Small circle with time badge (e.g., `09:00 AM`).
* **Activity Card Item:** Contains place thumbnail, duration estimate (e.g. `2 hrs`), notes snippet, and drag handle for reordering.

---

## 18. Expense Tracker Components

Clean financial overview without looking like a complex corporate banking dashboard.

* **Budget Summary Card:**
  * Warm progress bar: Track background `color-bg-subtle`, active fill `color-accent-brand`.
  * Remaining budget metric in large bold typography.
* **Category Breakdown Chips:** Muted color pills (e.g. `Food & Dining`, `Transport`, `Stay`, `Activities`).
* **Expense Row Item:** Merchant/place name, category icon badge, split-with indicator, and bold currency value (e.g., `$24.50`).

---

## 19. Weather Components

Minimalist, glanceable climate indicators.

* **Daily Weather Pill:** Temperature badge (`24°C`), weather condition icon (`Sun`, `CloudSun`, `Rain`), and short forecast phrase (e.g. "Clear & Sunny").
* **Hourly Strip:** Horizontal scroll row showing hourly temperature progression and rain probability.

---

## 20. Empty States

* **Visual:** Warm line-art illustration or clean 48px Phosphor icon inside a subtle circular background tint.
* **Headline:** Engaging, inspiring editorial copy (e.g., *"No trips planned yet. Your next adventure starts with a single destination."*).
* **Primary Action:** Clear CTA button (e.g. `[Explore Destinations]` or `[Create New Trip]`).

---

## 21. Loading States

* **Skeleton Loading:** Animated pulse or shimmer on text blocks, card thumbnails, and header elements matching `color-bg-subtle`.
* **Spinner:** Minimal circular indicator in `color-accent-brand`.

---

## 22. Error States

* **Inline Error Toast:** Warm banner with red-tinted background (`#FEF2F2` in light mode), destructive text color, and a quick `[Retry]` button.
* **Network / Offline View:** Clean screen alert informing the user that cached trip data is available offline.

---

## 23. Animation & Motion Principles

* **Library:** `react-native-reanimated` & `moti`.
* **Timing Scale:**
  * Micro-interactions (Press feedback, toggle): `150ms` (`Easing.out(Easing.quad)`)
  * Component transitions (Bottom sheet, tab switch): `250ms` (`Easing.bezier(0.25, 0.1, 0.25, 1)`)
  * Screen transitions / Hero reveals: `350ms`
* **Rule:** Exit animations execute **20% faster** than entrance animations to keep mobile responsiveness feeling snappy.

---

## 24. Accessibility Rules

* **Touch Targets:** All pressable surfaces comply with $\ge 44 \times 44\text{pt}$ (enforced via `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`).
* **Contrast Ratios:** Checked against WCAG 2.1 AA standard ($\ge 4.5:1$ for body copy, $\ge 3:1$ for UI glyphs).
* **Screen Reader Labels:** All icon-only buttons include `accessibilityLabel` and `accessibilityRole="button"`.
* **Dynamic Type Scaling:** Text components support iOS/Android system font scaling up to $150\%$ without layout breakage.

---

## 25. Light / Dark Mode System Rules

* **Token Uniformity:** Component styles consume semantic color tokens (`color-bg-primary`, `color-text-primary`) rather than hardcoded hex values.
* **Image Contrast in Dark Mode:** Images receive a subtle `5%` dark overlay in dark mode to prevent glare.
* **Smooth Transition:** Theme toggles animate smoothly over `200ms`.

---

## 26. Screen Mapping & Core Component Registry

| Screen Name | Primary Components Used | Key UX Goal |
| :--- | :--- | :--- |
| **Splash / Onboarding** | Full-bleed Image Carousel, Display Serif, Primary CTA | Introduce editorial visual tone & value proposition |
| **Home** | Trip Summary Card, Weather Pill, Quick Saved Spots | Instant access to active trips & daily trip snapshot |
| **Explore / Search** | Editorial Hero Card, Category Filter Chips, Search Input | Destination discovery with high visual impact |
| **Destination Detail** | Hero Image + Gradient Scrim, Weather Pill, Saved Heart | Deep destination overview & highlight spots |
| **Create Trip / Itinerary** | Date Picker, Search Spot Modal, Drag-and-Drop Timeline | Effortless day-by-day trip construction |
| **Expense Tracker** | Progress Bar Card, Category Filter Chips, Expense Rows | Clear, stress-free travel spending tracking |
| **Packing Checklist** | Checkbox Item Rows, Category Accordion, Add Custom Item | Interactive offline-ready packing manager |

---
*Persisted Source of Truth for Rovea Mobile Application.*
