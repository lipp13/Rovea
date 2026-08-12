import { create } from 'zustand';
import * as Haptics from 'expo-haptics';
import {
  activeTrip as initialActiveTrip,
  upcomingTrips as initialUpcomingTrips,
  pastTrips as initialPastTrips,
  editorialDestinations as initialDestinations,
  savedPlaces as initialSavedPlaces,
  currentUser as initialUser,
} from '../data/mockData';

export const useAppStore = create((set, get) => ({
  themeMode: 'light',
  hasCompletedOnboarding: false,
  currentUser: initialUser,
  activeTrip: initialActiveTrip,
  upcomingTrips: initialUpcomingTrips,
  pastTrips: initialPastTrips,
  destinations: initialDestinations,
  savedPlaces: initialSavedPlaces,

  // Theme actions
  toggleTheme: () => {
    const nextMode = get().themeMode === 'light' ? 'dark' : 'light';
    set({ themeMode: nextMode });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },

  // Onboarding actions
  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  },

  // Bookmark actions
  toggleSavePlace: (place) => {
    const saved = get().savedPlaces;
    const exists = saved.some((p) => p.id === place.id);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    if (exists) {
      set({ savedPlaces: saved.filter((p) => p.id !== place.id) });
    } else {
      set({ savedPlaces: [{ ...place, saved: true }, ...saved] });
    }
  },

  // Add Trip mock action
  createNewTrip: (newTrip) => {
    const upcoming = get().upcomingTrips;
    set({
      upcomingTrips: [newTrip, ...upcoming],
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  },
}));
