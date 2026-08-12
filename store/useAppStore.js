import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const initialTripsList = [initialActiveTrip, ...initialUpcomingTrips, ...initialPastTrips];

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Core State
      themeMode: 'light',
      hasCompletedOnboarding: false,
      currentUser: initialUser,

      // Collections
      trips: initialTripsList,
      activeTripId: initialActiveTrip.id,
      destinations: initialDestinations,
      savedPlaces: initialSavedPlaces,
      recentSearches: ['Kyoto', 'Bamboo Grove', 'Machiya'],

      // Detailed Trip State
      itineraryDays: initialItineraryDays,
      expenseTracker: initialExpenses,
      packingChecklist: initialPackingData,

      // Non-persisted UI Modal State
      activeModal: null, // 'placeDetail' | 'addPlace' | 'weather' | null
      selectedPlace: null,
      targetDayForAdd: 3,

      // Helper Getters
      getActiveTrip: () => {
        const { trips, activeTripId } = get();
        return trips.find((t) => t.id === activeTripId) || trips[0] || initialActiveTrip;
      },

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

      // --- TRIP ACTIONS ---
      createTrip: (newTripData) => {
        const currentTrips = get().trips;
        const newTrip = {
          id: `trip-${Date.now()}`,
          title: newTripData.title || `Trip to ${newTripData.destination}`,
          destination: newTripData.destination,
          country: newTripData.country || 'Japan',
          startDate: newTripData.startDate || 'Oct 12',
          endDate: newTripData.endDate || 'Oct 18',
          year: newTripData.year || '2026',
          totalDays: newTripData.totalDays || 7,
          currentDay: 1,
          currentDateLabel: newTripData.startDate || 'Oct 12',
          daysRemaining: newTripData.totalDays || 7,
          coverImage:
            newTripData.coverImage ||
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
          status: 'Upcoming',
          weather: initialActiveTrip.weather,
          nextActivity: initialActiveTrip.nextActivity,
        };

        const updatedTrips = [newTrip, ...currentTrips];

        set({
          trips: updatedTrips,
          activeTripId: newTrip.id,
        });

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        return newTrip;
      },

      setActiveTrip: (tripId) => {
        set({ activeTripId: tripId });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      },

      deleteTrip: (tripId) => {
        const currentTrips = get().trips;
        const filtered = currentTrips.filter((t) => t.id !== tripId);
        const nextActiveId = filtered[0]?.id || null;

        set({
          trips: filtered,
          activeTripId: nextActiveId,
        });

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      },

      // --- BOOKMARK ACTIONS ---
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

      isPlaceSaved: (placeId) => {
        return get().savedPlaces.some((p) => p.id === placeId);
      },

      // --- ITINERARY ACTIONS ---
      addPlaceToDay: (dayNumber, place, customTime = '14:00') => {
        const days = get().itineraryDays;
        const newSpot = {
          id: `spot-${Date.now()}`,
          time: customTime,
          title: place.title,
          category: place.category || 'Highlight',
          duration: '1.5 hrs',
          image: place.image,
          address: place.address || (place.city ? `${place.city}, Japan` : 'Kyoto'),
          description: place.subtitle || place.description || 'Added to day itinerary.',
        };

        const updatedDays = days.map((day) => {
          if (day.dayNumber === dayNumber) {
            const newSpotsList = [...day.spots, newSpot].sort((a, b) =>
              (a.time || '23:59').localeCompare(b.time || '23:59')
            );
            return { ...day, spots: newSpotsList };
          }
          return day;
        });

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

        set({
          itineraryDays: updatedDays,
          activeModal: null,
        });
      },

      deleteItineraryItem: (dayNumber, spotId) => {
        const days = get().itineraryDays;
        const updatedDays = days.map((day) => {
          if (day.dayNumber === dayNumber) {
            return { ...day, spots: day.spots.filter((s) => s.id !== spotId) };
          }
          return day;
        });

        set({ itineraryDays: updatedDays });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      },

      reorderDaySpots: (dayNumber, newSpots) => {
        const days = get().itineraryDays;
        const updatedDays = days.map((day) => {
          if (day.dayNumber === dayNumber) {
            return { ...day, spots: newSpots };
          }
          return day;
        });

        set({ itineraryDays: updatedDays });
      },

      // --- EXPENSE ACTIONS ---
      addExpense: (expenseData) => {
        const tracker = get().expenseTracker;
        const amountNum = Math.max(0, parseFloat(expenseData.amount) || 0);
        const newSpent = tracker.spentAmount + amountNum;

        const newTx = {
          id: `exp-${Date.now()}`,
          title: expenseData.title.trim(),
          category: expenseData.category || 'Other',
          amount: `${tracker.currency}${amountNum.toLocaleString()}`,
          date: 'Today',
        };

        // Recalculate categories dynamically
        const updatedCategories = tracker.categories.map((cat) => {
          if (cat.name.toLowerCase() === (expenseData.category || '').toLowerCase()) {
            const catAmount = cat.amount + amountNum;
            return {
              ...cat,
              amount: catAmount,
              formatted: `${tracker.currency}${catAmount.toLocaleString()}`,
              percentage: `${((catAmount / newSpent) * 100).toFixed(1)}%`,
            };
          }
          return cat;
        });

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

        set({
          expenseTracker: {
            ...tracker,
            spentAmount: newSpent,
            spentFormatted: `${tracker.currency}${newSpent.toLocaleString()}`,
            categories: updatedCategories,
            transactions: [newTx, ...tracker.transactions],
          },
        });
      },

      deleteExpense: (expenseId) => {
        const tracker = get().expenseTracker;
        const targetTx = tracker.transactions.find((tx) => tx.id === expenseId);
        if (!targetTx) return;

        const numVal = parseFloat(targetTx.amount.replace(/[^0-9.]/g, '')) || 0;
        const newSpent = Math.max(0, tracker.spentAmount - numVal);

        set({
          expenseTracker: {
            ...tracker,
            spentAmount: newSpent,
            spentFormatted: `${tracker.currency}${newSpent.toLocaleString()}`,
            transactions: tracker.transactions.filter((tx) => tx.id !== expenseId),
          },
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      },

      // --- PACKING ACTIONS ---
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
            packedCount: Math.max(0, newPackedCount),
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

        let foundCat = false;
        const updatedSections = packing.sections.map((sec) => {
          if (sec.category.toUpperCase() === categoryName.toUpperCase()) {
            foundCat = true;
            return { ...sec, items: [...sec.items, newItem] };
          }
          return sec;
        });

        if (!foundCat) {
          updatedSections.push({
            category: categoryName.toUpperCase(),
            items: [newItem],
          });
        }

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

        set({
          packingChecklist: {
            ...packing,
            totalItems: packing.totalItems + 1,
            sections: updatedSections,
          },
        });
      },

      deletePackingItem: (itemId) => {
        const packing = get().packingChecklist;
        let removedWasPacked = false;

        const updatedSections = packing.sections.map((sec) => {
          const itemToRemove = sec.items.find((i) => i.id === itemId);
          if (itemToRemove && itemToRemove.checked) removedWasPacked = true;
          return {
            ...sec,
            items: sec.items.filter((i) => i.id !== itemId),
          };
        });

        set({
          packingChecklist: {
            ...packing,
            totalItems: Math.max(0, packing.totalItems - 1),
            packedCount: Math.max(0, packing.packedCount - (removedWasPacked ? 1 : 0)),
            sections: updatedSections,
          },
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      },

      // --- SEARCH ACTIONS ---
      addRecentSearch: (query) => {
        if (!query.trim()) return;
        const current = get().recentSearches;
        const filtered = current.filter((q) => q.toLowerCase() !== query.toLowerCase());
        set({ recentSearches: [query.trim(), ...filtered].slice(0, 5) });
      },
    }),
    {
      name: 'rovea-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        trips: state.trips,
        activeTripId: state.activeTripId,
        savedPlaces: state.savedPlaces,
        recentSearches: state.recentSearches,
        itineraryDays: state.itineraryDays,
        expenseTracker: state.expenseTracker,
        packingChecklist: state.packingChecklist,
      }),
    }
  )
);
