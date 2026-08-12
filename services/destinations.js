import { api } from './api';
import { editorialDestinations } from '../data/mockData';

export const DestinationService = {
  async fetchDestinations() {
    try {
      const data = await api.get('/api/destinations');
      return data && data.length > 0 ? data : editorialDestinations;
    } catch (err) {
      console.warn('DestinationService: Using offline fallback data.', err.message);
      return editorialDestinations;
    }
  },

  async fetchDestinationById(id) {
    try {
      const data = await api.get(`/api/destinations/${id}`);
      return data || editorialDestinations.find((d) => d.id === id) || editorialDestinations[0];
    } catch (err) {
      console.warn('DestinationService: Using offline fallback detail.', err.message);
      return editorialDestinations.find((d) => d.id === id) || editorialDestinations[0];
    }
  },
};
