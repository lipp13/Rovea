import { create } from 'zustand';
import * as Haptics from 'expo-haptics';
import {
  activeTrip as initialActiveTrip,
  upcomingTrips as initialUpcomingTrips,
  pastTrips as initialPastTrips,
  editorialDestinations as initialDestinations,
  savedPlaces as initialSavedPlaces,
  currentUser as initialUser,
  kyotoItineraryDays as initialItineraryDays,
  expenseSummary as initialExpenses,
  packingChecklistData as initialPackingData,
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

  // Phase 2 State
  itineraryDays: initialItineraryDays,
  expenseTracker: initialExpenses,
  packingChecklist: initialPackingData,

  // Modal / Sheet State
  activeModal: null, // 'placeDetail' | 'addPlace' | 'weather' | null
  selectedPlace: null,
  targetDayForAdd: 3,

  // Onboarding actions
  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  },

  // Theme actions
  toggleTheme: () => {
    const nextMode = get().themeMode === 'light' ? 'dark' : 'light';
    set({ themeMode: nextMode });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },

  // Modal actions
  openModal: (modalName, payload = {}) => {
    set({
      activeModal: modalName,
      selectedPlace: payload.place || get().selectedPlace,
      targetDayForAdd: payload.dayNumber || get().targetDayForAdd,
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },

  closeModal: () => {
    set({ activeModal: null });
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

  // Packing actions
  togglePackingItem: (itemId) => {
    const packing = get().packingChecklist;
    let newPackedCount = packing.packedCount;

    const updatedSections = packing.sections.map((sec) => {
      const updatedItems = sec.items.map((item) => {
        if (item.id === itemId) {
          const nextChecked = !item.checked;
          if (nextChecked) newPackedCount += 1;
          else newPackedCount -= 1;
          return { ...item, checked: nextChecked };
        }
        return item;
      });
      return { ...sec, items: updatedItems };
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    set({
      packingChecklist: {
        ...packing,
        packedCount: newPackedCount,
        sections: updatedSections,
      },
    });
  },

  addPackingItem: (categoryName, itemName) => {
    if (!itemName.trim()) return;
    const packing = get().packingChecklist;
    const newItem = {
      id: `p-${Date.now()}`,
      name: itemName.trim(),
      checked: false,
    };

    const updatedSections = packing.sections.map((sec) => {
      if (sec.category.toUpperCase() === categoryName.toUpperCase()) {
        return { ...sec, items: [...sec.items, newItem] };
      }
      return sec;
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    set({
      packingChecklist: {
        ...packing,
        totalItems: packing.totalItems + 1,
        sections: updatedSections,
      },
    });
  },

  // Expense actions
  addExpense: (expenseData) => {
    const tracker = get().expenseTracker;
    const amountNum = parseFloat(expenseData.amount) || 0;
    const newSpent = tracker.spentAmount + amountNum;
    const newTx = {
      id: `exp-${Date.now()}`,
      title: expenseData.title,
      category: expenseData.category,
      amount: `${tracker.currency}${amountNum.toLocaleString()}`,
      date: 'Today',
    };

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    set({
      expenseTracker: {
        ...tracker,
        spentAmount: newSpent,
        spentFormatted: `${tracker.currency}${newSpent.toLocaleString()}`,
        transactions: [newTx, ...tracker.transactions],
      },
    });
  },

  // Itinerary actions
  addPlaceToDay: (dayNumber, place) => {
    const days = get().itineraryDays;
    const newSpot = {
      id: `spot-${Date.now()}`,
      time: '16:00',
      title: place.title,
      category: place.category || 'Spot',
      duration: '1.5 hrs',
      image: place.image,
      address: place.city ? `${place.city}, Japan` : 'Kyoto',
      description: place.subtitle || 'Added to itinerary.',
    };

    const updatedDays = days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return { ...day, spots: [...day.spots, newSpot] };
      }
      return day;
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    set({
      itineraryDays: updatedDays,
      activeModal: null,
    });
  },

  // Trip creation mock action
  createNewTrip: (newTrip) => {
    const upcoming = get().upcomingTrips;
    set({
      upcomingTrips: [newTrip, ...upcoming],
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  },
}));
