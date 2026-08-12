import { api } from './api';

export const SyncService = {
  async syncLocalData(localData) {
    try {
      const payload = {
        trips: localData.trips,
        savedPlaces: localData.savedPlaces,
        expenses: localData.expenseTracker,
        packing: localData.packingChecklist,
        lastSyncedAt: new Date().toISOString(),
      };

      const response = await api.post('/api/sync', payload);
      return { status: 'synced', timestamp: response.syncedAt || payload.lastSyncedAt };
    } catch (err) {
      console.warn('SyncService: Background sync deferred (Offline or Server unavailable).');
      return { status: 'offline', timestamp: new Date().toISOString() };
    }
  },
};
