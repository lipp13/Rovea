# Rovea — Complete Mobile UX Architecture Specification

> **Platform:** Mobile Application (React Native + Expo)  
> **Product Category:** Premium Travel Companion & Itinerary Planner  
> **Visual & Brand Foundation:** `design-system/MASTER.md` & `design-system/BRAND.md`  
> **Source of Truth:** `design-system/UX-ARCHITECTURE.md`

---

## 1. Executive UX Philosophy & Guidelines

Rovea's UX architecture is designed around four mobile-first principles:

1. **Thumb-Driven Ergonomics:** 85% of primary actions (trip creation, adding spots, filtering, toggling dates) are located within the lower 60% of the screen (the "Thumb Zone"). Primary CTAs sit floating or docked above safe-area indicators.
2. **Progressive Disclosure:** Complex trip details (expenses, daily timelines, packing items) are revealed through natural layered hierarchy (Overview $\rightarrow$ Day Timeline $\rightarrow$ Spot Detail Modal) to keep initial cognitive load light.
3. **Modal Bottom Sheets over Full Scene Pushes:** Contextual actions (adding a spot to Day 2, adding an expense, filtering destinations) open as sheet overlays, preserving the user's navigational anchor and mental model.
4. **Resilient Offline Architecture:** Every screen degrades gracefully when offline, presenting cached itineraries and clear local state indicators without intrusive full-screen blockades.

---

## 2. Information Architecture (IA)

```
ROVEA APP
├── 0. Auth & Onboarding Stack (Modal / First-Run Only)
│   ├── 0.1 Splash Screen
│   ├── 0.2 Onboarding Carousel
│   ├── 0.3 Login Screen
│   └── 0.4 Register Screen
│
├── 1. Home Tab Stack (Tab 1: Active Trip & Snapshot)
│   ├── 1.1 Home Screen (Active Trip Card, Weather Widget, Quick Saved Spots)
│   └── 1.2 Weather Detail Bottom Sheet
│
├── 2. Explore Tab Stack (Tab 2: Discovery & Inspiration)
│   ├── 2.1 Explore Screen (Editorial Destinations, Curated Collections)
│   ├── 2.2 Search & Filter Overlay / Screen
│   ├── 2.3 Destination Detail Screen
│   └── 2.4 Place Detail Modal Sheet
│
├── 3. Trips Tab Stack (Tab 3: Management & Planning Engine)
│   ├── 3.1 Trips Screen (Active, Upcoming, Past Trips List)
│   ├── 3.2 Create Trip Flow (Multi-Step Bottom Sheet / Screen)
│   ├── 3.3 Trip Overview Screen (Trip Hub: Countdown, Progress, Tools Grid)
│   ├── 3.4 Daily Itinerary Screen (Day-by-Day Drag Timeline)
│   ├── 3.5 Add Place to Itinerary Modal Sheet
│   ├── 3.6 Expense Tracker Screen (Budget Bar, Expense List, Add Sheet)
│   └── 3.7 Packing Checklist Screen (Categorized Items, Progress, Add Sheet)
│
└── 4. Profile Tab Stack (Tab 4: Traveler Identity & Settings)
    ├── 4.1 Profile Screen (Travel Stats, Saved Trips, Bookmarks)
    ├── 4.2 Saved Places Screen (Bookmarked Spots Grid)
    └── 4.3 Settings Screen (Theme Toggle, Account, Offline Sync)
```

---

## 3. Primary Navigation Structure

The primary navigation utilizes a **4-Tab Docked Floating Bottom Bar**:

* **Dock Specs:** `16px` side margins, `radius-pill` (28px rounded corners), `12px` bottom inset above `useSafeAreaInsets()`.
* **Tab Items:**
  1. **Home (`House` icon):** Active trip snapshot, daily countdown, quick weather pill, next scheduled activity.
  2. **Explore (`Compass` icon):** Editorial magazine discovery, destination collections, search bar.
  3. **Trips (`SuitcaseSimple` icon):** Central hub for all planned, upcoming, and past travel itineraries.
  4. **Profile (`User` icon):** Saved places, personal travel statistics, settings access.

---

## 4. User Flows

### Flow 1: First-Time User Flow (Onboarding $\rightarrow$ Discovery $\rightarrow$ Auth)
1. **Splash Screen:** Animated Rovea mark fade-in (`350ms`). Auto-detects auth token. If empty $\rightarrow$ navigate to Onboarding.
2. **Onboarding Carousel:** 3 editorial slides introducing value proposition. User swipes or taps `[Begin Journey]`.
3. **Register / Login Option:** User can sign up via Email/Apple/Google or tap `[Explore First]` (Guest mode with progressive auth prompt on saving spots).
4. **Landing on Home / Explore:** App launches directly into curated destinations with subtle warm welcome toast.

### Flow 2: Returning User Flow (Active Trip Context)
1. **Launch App:** Splash verifies token $\rightarrow$ Direct jump to **Home Screen**.
2. **Home Screen State:** If user has an active trip (e.g. *In Kyoto today*), Home displays an **Active Trip Hero Widget** showing current day itinerary, local weather (`22°C Clear`), and next spot (*Fushimi Inari at 14:00*).
3. **One-Tap Action:** Tapping *"View Today's Plan"* jumps directly into **Daily Itinerary Screen**.

### Flow 3: Trip Creation Flow
1. **Trigger:** Tap floating `[+ New Trip]` CTA on Trips Tab or Destination Detail screen.
2. **Step 1 (Destination):** Search or select destination city (e.g., *"Kyoto, Japan"*).
3. **Step 2 (Dates):** Select start & end dates on warm editorial calendar picker.
4. **Step 3 (Details):** Enter optional trip title (defaults to *"Kyoto Trip"*) and group size.
5. **Confirmation:** Bottom sheet dismisses with warm success toast; screen transitions seamlessly into **Trip Overview Screen**.

### Flow 4: Add Place to Itinerary Flow
1. **Trigger:** From **Place Detail Modal Sheet** or `[+ Add Spot]` button on **Daily Itinerary Screen**.
2. **Selector Sheet:** Bottom sheet pops up listing user's saved spots for that city + quick search bar.
3. **Day Assignment:** User selects target day (e.g., *"Day 2 — Oct 14"*) and optional time slot.
4. **State Update:** Spot drops into the chronological timeline node; timeline updates inline without page refresh.

### Flow 5: Expense Tracking Flow
1. **Trigger:** Tap *"Expense Tracker"* tool card from **Trip Overview Screen**.
2. **Overview:** View total budget, progress bar, and category breakdown.
3. **Add Expense:** Tap floating `[+ Add Expense]` bottom button.
4. **Quick Input Sheet:** Enter amount (`$32.00`), title (`"Lunch at Ramen Alley"`), category pill (`Food & Dining`), and optional split tag.
5. **Update:** Sheet closes; budget progress bar recalculates with smooth animated fill.

### Flow 6: Packing Checklist Flow
1. **Trigger:** Tap *"Packing Checklist"* tool card from **Trip Overview Screen**.
2. **View List:** Categorized accordions (*Documents*, *Clothing*, *Electronics*, *Toiletries*).
3. **Interactive Check:** Tap checkbox item $\rightarrow$ smooth strike-through animation + progress indicator increases (`8 / 14 packed`).
4. **Add Custom Item:** Tap `[+ Add Item]` inline button under category or via bottom bar input sheet.

### Flow 7: Trip Completion Flow
1. **Automatic / Manual Trigger:** Final day passes or user taps `[Mark Trip Complete]` in Trip Settings.
2. **Completion Screen / Banner:** Congratulatory banner appears (*"A journey well traveled. 12 spots visited across 5 days."*).
3. **Archiving:** Trip shifts to "Past Trips" tab section; memories and saved itinerary remain accessible indefinitely.

---

## 5. Complete Screen Inventory & Detailed Specifications

Total Screen Count: **20 Screens / Modals**

---

### Screen 1: Splash Screen
* **Purpose:** Initial app load, auth token validation, font loading, asset pre-caching.
* **Entry Points:** App launch / Cold start.
* **Exit Destinations:** Onboarding Screen (if new) OR Home Screen (if authenticated).
* **Primary Action:** None (Automatic transition).
* **Secondary Actions:** None.
* **Required Data:** Local AsyncStorage auth token, device theme preference.
* **Important UI Components:** Centered Rovea wordmark/logo, warm parchment background (`#FBF9F5`).
* **Loading State:** Minimal centered warm activity indicator if asset loading exceeds 500ms.
* **Empty State:** N/A.
* **Error State:** Asset load failure fallback $\rightarrow$ force route to Home with default system fonts.

---

### Screen 2: Onboarding Carousel Screen
* **Purpose:** Introduce Rovea's editorial philosophy, value props, and set aesthetic expectations.
* **Entry Points:** Splash screen (First launch).
* **Exit Destinations:** Register Screen, Login Screen, or Home Screen (Explore mode).
* **Primary Action:** `[Begin Journey]` CTA (Primary Terracotta button).
* **Secondary Actions:** `[Skip to Explore]` text button top-right.
* **Required Data:** Static onboarding slide content & asset images.
* **Important UI Components:** Full-bleed image carousel (`4:5`), pagination dots, display serif titles, bottom CTA dock.
* **Loading State:** Warm image shimmer placeholder while high-res assets load.
* **Empty State:** N/A.
* **Error State:** Image fail fallback to solid warm neutral background color.

---

### Screen 3: Login Screen
* **Purpose:** Authenticate returning users via email or social providers.
* **Entry Points:** Onboarding Screen, Register Screen, Profile Screen (Guest mode).
* **Exit Destinations:** Home Screen, Register Screen, Forgot Password Sheet.
* **Primary Action:** `[Sign In]` CTA button.
* **Secondary Actions:** `[Continue with Apple]`, `[Continue with Google]`, `[Create an Account]`.
* **Required Data:** Form states (Email, Password), auth API endpoint.
* **Important UI Components:** Clean input fields with 48px height, password visibility toggle, error helper text.
* **Loading State:** Disabled inputs, primary button transforms into inline spinner.
* **Empty State:** N/A.
* **Error State:** Invalid credentials toast banner (*"Incorrect email or password. Please try again."*).

---

### Screen 4: Register Screen
* **Purpose:** Create a new Rovea user account.
* **Entry Points:** Login Screen, Onboarding Screen.
* **Exit Destinations:** Home Screen (First-time welcome state), Login Screen.
* **Primary Action:** `[Create Account]` CTA button.
* **Secondary Actions:** Social auth buttons, terms of service link.
* **Required Data:** Name, Email, Password.
* **Important UI Components:** Form inputs, password strength indicator, terms checkbox.
* **Loading State:** Button spinner state.
* **Empty State:** N/A.
* **Error State:** Email already registered error toast.

---

### Screen 5: Home Tab Screen (Active Trip Snapshot)
* **Purpose:** Central hub for daily travel context, active trip countdown, and quick saved spots.
* **Entry Points:** Bottom Tab 1 tap, App cold start (Authenticated).
* **Exit Destinations:** Trip Overview Screen, Daily Itinerary Screen, Weather Sheet, Destination Detail Screen.
* **Primary Action:** `[View Today's Plan]` CTA on Active Trip Card.
* **Secondary Actions:** `[Explore Destinations]` card, Quick Weather Pill tap, Saved Spot thumbnail tap.
* **Required Data:** Active trip status, current day itinerary items, local weather API, user profile name.
* **Important UI Components:** Greeting header (*"Good morning, Alex"*), Active Trip Hero Card (Image + Scrim + Progress), Weather Pill Widget, Horizontal Saved Spots row.
* **Loading State:** Skeleton shimmers for Hero Card and Weather Pill.
* **Empty State (No Active Trip):** Warm editorial card: *"No active trips today. Discover your next destination or plan a new trip."* + `[Create Trip]` CTA.
* **Error State:** Weather API failure $\rightarrow$ display last cached temperature with muted offline icon.

---

### Screen 6: Explore Tab Screen (Editorial Discovery)
* **Purpose:** Inspire destination discovery through editorial collections and search.
* **Entry Points:** Bottom Tab 2 tap.
* **Exit Destinations:** Search Overlay, Destination Detail Screen, Place Detail Sheet.
* **Primary Action:** Tap any Destination Hero Card to view details.
* **Secondary Actions:** Tap Search Pill Bar top, filter category chips (*"Coastal", "Historic", "Culinary"*).
* **Required Data:** Featured destinations list, curated editorial collections, category tags.
* **Important UI Components:** Top Search Bar pill (`48px`), Category Filter Chips, Full-width Editorial Hero Cards (`4:5`), Asymmetric 2-column destination grid.
* **Loading State:** 2-column skeleton shimmer grid.
* **Empty State:** N/A (Curated content always present).
* **Error State:** Network failure $\rightarrow$ display offline banner with cached saved destinations.

---

### Screen 7: Search & Filter Overlay / Screen
* **Purpose:** Fast, focused search for cities, spots, activities, and categories.
* **Entry Points:** Tap Search Pill on Explore Screen or Home Screen.
* **Exit Destinations:** Destination Detail Screen, Place Detail Sheet, back to Explore.
* **Primary Action:** Select a search result item.
* **Secondary Actions:** Filter by category chips, clear search text (`X` icon).
* **Required Data:** Search index query API, recent searches history (AsyncStorage).
* **Important UI Components:** Auto-focused search input, recent searches list, live search results list with thumbnails.
* **Loading State:** Inline search spinner inside input bar.
* **Empty State:** *"No destinations or places found matching '...' Try searching for cities or categories."*
* **Error State:** Network error subtext.

---

### Screen 8: Destination Detail Screen
* **Purpose:** Provide an in-depth editorial overview of a destination city/country with highlight spots.
* **Entry Points:** Explore Screen, Search Screen, Home Saved Spots.
* **Exit Destinations:** Create Trip Flow (Pre-filled with this city), Place Detail Sheet, Map View.
* **Primary Action:** `[Plan a Trip Here]` primary CTA button in bottom dock.
* **Secondary Actions:** Bookmark destination heart icon top-right, tap highlight spot card, view map.
* **Required Data:** Destination cover image, description, best time to visit, weather preview, highlight spots list.
* **Important UI Components:** Full-bleed header image (`16:9`) with back button + save heart, editorial text overview, Weather Pill, Highlight Spots horizontal carousel, bottom CTA dock bar.
* **Loading State:** Header image skeleton + text line shimmers.
* **Empty State:** N/A.
* **Error State:** Failed to load destination details $\rightarrow$ error toast + retry button.

---

### Screen 9: Place Detail Modal Sheet
* **Purpose:** View full details for a specific spot (café, viewpoint, museum) and add to trip.
* **Entry Points:** Destination Detail Screen, Explore Screen, Search Screen, Daily Itinerary Screen.
* **Exit Destinations:** Add Place to Itinerary Modal Sheet, external map navigation link.
* **Primary Action:** `[Add to Trip]` CTA button in sheet footer.
* **Secondary Actions:** Save to bookmarks heart, tap address to open Apple/Google Maps, view photos.
* **Required Data:** Place title, category pill, rating, address, opening hours, photo gallery, notes.
* **Important UI Components:** Modal sheet handle bar, photo carousel, title + category badge, info rows (address, hours), bottom CTA footer.
* **Loading State:** Sheet content skeleton shimmer.
* **Empty State:** N/A.
* **Error State:** Inline error message if place details fail to fetch.

---

### Screen 10: Create Trip Flow (Multi-Step Sheet / Screen)
* **Purpose:** Guide user through creating a new trip (Destination $\rightarrow$ Dates $\rightarrow$ Title & Details).
* **Entry Points:** Trips Tab `[+ New Trip]`, Destination Detail `[Plan a Trip Here]`, Home empty state.
* **Exit Destinations:** Trip Overview Screen (On completion), Cancel back to caller.
* **Primary Action:** `[Continue]` / `[Create Itinerary]` CTA button.
* **Secondary Actions:** Step navigation back arrow, close `X`.
* **Required Data:** Selected destination, start date, end date, trip title string.
* **Important UI Components:** Step progress indicator (`Step 1 of 3`), Destination search input, Warm editorial calendar date picker range, Title input field.
* **Loading State:** Button loading spinner on submission.
* **Empty State:** N/A.
* **Error State:** Date validation error (*"End date must be after start date"*).

---

### Screen 11: Trips Tab Screen (Itinerary Management Hub)
* **Purpose:** List and organize all active, upcoming, and past travel trips.
* **Entry Points:** Bottom Tab 3 tap.
* **Exit Destinations:** Trip Overview Screen, Create Trip Flow.
* **Primary Action:** `[+ New Trip]` floating action CTA or header button.
* **Secondary Actions:** Switch section tabs (*Active*, *Upcoming*, *Past*), swipe trip card to archive/delete.
* **Required Data:** User's trip list array (Active, Upcoming, Past).
* **Important UI Components:** Header title *"My Trips"*, Section Segmented Control, Trip Summary Cards (Thumbnail, title, date range badge, spot count, progress bar).
* **Loading State:** Card list skeleton shimmer.
* **Empty State:** Warm illustration + copy: *"No upcoming trips. Your next adventure starts with a single destination."* + `[Create New Trip]` CTA.
* **Error State:** Offline cached list displayed with subtle warning toast.

---

### Screen 12: Trip Overview Screen (Trip Hub)
* **Purpose:** Central command center for a specific trip, linking to Itinerary, Expenses, Packing, and Weather.
* **Entry Points:** Trips Tab Screen, Home Active Trip Card.
* **Exit Destinations:** Daily Itinerary Screen, Expense Tracker Screen, Packing Checklist Screen, Weather Sheet, Trip Settings.
* **Primary Action:** `[View Daily Itinerary]` CTA button.
* **Secondary Actions:** Tap tool cards (*Expenses*, *Packing*, *Weather*), edit trip cover, share trip.
* **Required Data:** Trip title, cover photo, date range, countdown days, daily plan summary array, total budget vs spent, packing progress ratio.
* **Important UI Components:** Hero trip header with cover photo, Countdown badge (*"In 12 Days"*), Quick Tool Cards Grid (Itinerary, Expenses, Packing, Weather), Days horizontal summary strip.
* **Loading State:** Header + grid skeleton shimmers.
* **Empty State:** N/A.
* **Error State:** Network sync error banner with retry.

---

### Screen 13: Daily Itinerary Screen (Day-by-Day Timeline)
* **Purpose:** Detailed chronological view of activities and spots scheduled for each day of the trip.
* **Entry Points:** Trip Overview Screen, Home Active Trip Card.
* **Exit Destinations:** Add Place to Itinerary Sheet, Place Detail Sheet, Map View.
* **Primary Action:** `[+ Add Place]` CTA button at bottom of current day timeline.
* **Secondary Actions:** Tap day selector tab (Day 1, Day 2...), drag-to-reorder activity node, tap activity item to view details/delete.
* **Required Data:** Trip days array, scheduled spots per day (time, spot info, duration, notes).
* **Important UI Components:** Top horizontal day selector strip, Timeline vertical line nodes, Activity spot cards (thumbnail, title, category, time badge, duration, drag handle).
* **Loading State:** Timeline node shimmer skeletons.
* **Empty State (No spots for selected day):** *"No activities planned for Day 2 yet. Add coffee spots, sights, or notes to your day."* + `[+ Add Spot]` CTA.
* **Error State:** Reorder sync error toast with auto-revert.

---

### Screen 14: Add Place to Itinerary Modal Sheet
* **Purpose:** Select a place from saved bookmarks or search results and assign it to a specific trip day.
* **Entry Points:** Daily Itinerary Screen `[+ Add Place]`, Place Detail Sheet `[Add to Trip]`.
* **Exit Destinations:** Returns to Daily Itinerary Screen.
* **Primary Action:** `[Add to Day X]` CTA button.
* **Secondary Actions:** Switch tab (*Saved Spots* / *Search New*), select time slot picker.
* **Required Data:** Saved spots list, trip days list, selected place ID.
* **Important UI Components:** Search input bar, Saved spots selection list with checkboxes, Day selector dropdown/chips, Time picker.
* **Loading State:** List loading spinner.
* **Empty State:** *"No saved places for Kyoto. Search for places above to add them."*
* **Error State:** Add place API failure toast.

---

### Screen 15: Expense Tracker Screen
* **Purpose:** Log, categorize, and monitor trip spending and group budget limits.
* **Entry Points:** Trip Overview Screen tool card.
* **Exit Destinations:** Add Expense Modal Sheet, Trip Overview Screen.
* **Primary Action:** `[+ Add Expense]` floating CTA button.
* **Secondary Actions:** Filter by category chips (*Food*, *Transport*, *Stay*), tap expense item to edit/delete.
* **Required Data:** Total trip budget, total spent, expenses array (merchant, category, amount, date, split info).
* **Important UI Components:** Budget Progress Bar Card (Spent vs Remaining in large bold type), Category Filter Pills, Chronological expense item rows.
* **Loading State:** Budget card shimmer + row list skeleton.
* **Empty State:** *"No expenses logged yet. Keep your travel budget on track by logging your first expense."* + `[+ Add Expense]` CTA.
* **Error State:** Expense submission error toast.

---

### Screen 16: Packing Checklist Screen
* **Purpose:** Categorized interactive packing checklist for stress-free prep.
* **Entry Points:** Trip Overview Screen tool card.
* **Exit Destinations:** Add Custom Item Sheet, Trip Overview Screen.
* **Primary Action:** Tap item checkbox to mark as packed.
* **Secondary Actions:** `[+ Add Item]` inline button, expand/collapse category accordion, toggle filter (*All* / *Unpacked*).
* **Required Data:** Packing categories array, item list (name, checked boolean, category ID).
* **Important UI Components:** Progress Bar Header (*"14 of 22 items packed (63%)"*), Category Accordions (*Documents*, *Clothing*, *Electronics*, *Toiletries*), Interactive checkbox list items with strikethrough animation.
* **Loading State:** Accordion skeleton loader.
* **Empty State:** *"Your packing list is empty. Generate recommended travel items or add custom items."* + `[Generate Essentials]` CTA.
* **Error State:** Toggle state rollback on sync failure.

---

### Screen 17: Weather Detail View / Sheet
* **Purpose:** Provide detailed climate forecasts, hourly trends, and packing recommendations for destination.
* **Entry Points:** Home Screen Weather Pill, Destination Detail Screen, Trip Overview Screen.
* **Exit Destinations:** Dismiss sheet back to caller.
* **Primary Action:** Dismiss sheet (`X` or swipe down).
* **Secondary Actions:** Switch temperature unit (°C / °F), view multi-day forecast strip.
* **Required Data:** Weather API (Current temp, conditions, 7-day forecast array, hourly precipitation).
* **Important UI Components:** Large current temperature display + condition icon, Short editorial summary (*"Clear & sunny. Perfect for outdoor sightseeing."*), Hourly temperature scroll strip, 7-Day forecast list rows.
* **Loading State:** Weather widget skeleton pulse.
* **Empty State:** N/A.
* **Error State:** Weather offline notice (*"Showing cached weather from 2 hours ago."*).

---

### Screen 18: Saved Places Screen
* **Purpose:** Hub for all bookmarked spots and favorite destinations organized by collection/tags.
* **Entry Points:** Profile Tab Screen, Explore Screen header.
* **Exit Destinations:** Place Detail Sheet, Destination Detail Screen.
* **Primary Action:** Tap any saved place card to view details.
* **Secondary Actions:** Filter by city/category tag chips, search within saved spots, remove bookmark.
* **Required Data:** User's bookmarked spots array, city tags list.
* **Important UI Components:** Category Filter Chips, 2-Column grid or horizontal card list of saved spots (image thumbnail, title, rating, city label, heart active).
* **Loading State:** Grid skeleton shimmers.
* **Empty State:** *"No saved places yet. Tap the heart icon on any spot while exploring to save it here."* + `[Explore Spots]` CTA.
* **Error State:** Local storage fetch error message.

---

### Screen 19: Profile Tab Screen
* **Purpose:** View user travel statistics, saved trips, preferences, and access app settings.
* **Entry Points:** Bottom Tab 4 tap.
* **Exit Destinations:** Saved Places Screen, Settings Screen, Edit Profile Sheet.
* **Primary Action:** Tap `[Saved Places]` or `[Settings]`.
* **Secondary Actions:** Edit avatar/bio, view travel stats badges (*3 Countries, 12 Cities, 45 Spots*).
* **Required Data:** User profile (Name, Avatar, Travel stats counts, saved places count).
* **Important UI Components:** User Avatar + Name display, Travel Stats Metric Row (Trips, Cities, Spots), Quick Links List (Saved Places, Past Trips, App Settings, Support).
* **Loading State:** Profile header skeleton.
* **Empty State:** Guest Mode state: *"Sign in to sync your itineraries across devices and save your favorite places."* + `[Sign In / Register]` CTA.
* **Error State:** Profile fetch error notice.

---

### Screen 20: Settings Screen
* **Purpose:** App settings, theme toggle (Sandstone Light / Obsidian Dark), notification preferences, data management.
* **Entry Points:** Profile Tab Screen top-right gear icon.
* **Exit Destinations:** Log out to Login Screen, Legal links, Back to Profile.
* **Primary Action:** Toggle Theme or Notification switches.
* **Secondary Actions:** `[Clear Offline Cache]`, `[Log Out]`, `[Privacy Policy]`.
* **Required Data:** Local app settings (Theme state, Notifications boolean, Cache size).
* **Important UI Components:** Categorized Settings List (Appearance, Notifications, Storage & Offline, Account), Theme Segmented Control (Light, Dark, System), Log Out destructive button.
* **Loading State:** N/A.
* **Empty State:** N/A.
* **Error State:** Cache clear confirmation toast.

---

## 6. Mobile Interaction & Gesture Patterns

1. **Bottom Sheet Swipe-to-Dismiss:** All modal sheets support continuous drag-down gestures with velocity threshold physics.
2. **Horizontal Swipe Strips:** Date selectors, category chips, and destination carousels use snap-to-alignment horizontal scrolling.
3. **Reorder Drag Gestures:** Activity items in **Daily Itinerary** use long-press (`200ms` haptic feedback trigger) to enter drag-and-drop mode.
4. **Swipe-to-Action:** Expense items and packing list items support subtle left-swipe to reveal delete/edit actions.
5. **Haptic Feedback:** Light tactile haptics (`Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)`) on checkbox taps, bookmarking, and tab switching.

---

## 7. State Handling Matrix

| State Type | Visual Manifestation | UX Objective |
| :--- | :--- | :--- |
| **Loading** | Warm Skeleton Shimmer (`color-bg-subtle` pulse) | Maintain visual layout structure and prevent cumulative layout shift (CLS). |
| **Empty** | Warm line-art graphic + clear headline + actionable primary CTA | Guide user directly to the next logical step (e.g. `[Create First Trip]`). |
| **Error** | Non-blocking inline toast or subtle offline warning banner | Inform user cleanly without destroying cached offline itinerary data. |
| **Offline** | Subtle top banner: *"Offline Mode — Showing local cached data"* | Reassure traveler that their plans are safe without network connection. |

---
*Persisted Source of Truth for Rovea Mobile UX Architecture.*
