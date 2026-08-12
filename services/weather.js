import { api } from './api';
import { activeTrip } from '../data/mockData';

export const WeatherService = {
  async getWeatherByLocation(lat, lng) {
    try {
      const data = await api.get(`/api/weather?lat=${lat}&lng=${lng}`);
      return data || activeTrip.weather;
    } catch (err) {
      console.warn('WeatherService: Network unavailable. Using cached weather data.');
      return activeTrip.weather;
    }
  },

  async getWeatherByCity(cityName) {
    try {
      const data = await api.get(`/api/weather?city=${encodeURIComponent(cityName)}`);
      return data || activeTrip.weather;
    } catch (err) {
      console.warn('WeatherService: Using cached city weather fallback.');
      return activeTrip.weather;
    }
  },
};
