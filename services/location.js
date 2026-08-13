import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';

export const LocationService = {
  async requestLocationPermission() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      console.warn('LocationService permission error:', err.message);
      return false;
    }
  },

  async getCurrentCoordinates() {
    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) return null;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (err) {
      console.warn('LocationService get location error:', err.message);
      return null;
    }
  },

  /**
   * Calculate distance between two coordinate points in kilometers using Haversine formula.
   * @param {number} lat1
   * @param {number} lon1
   * @param {number} lat2
   * @param {number} lon2
   * @returns {number} Distance in km (rounded to 1 decimal place)
   */
  calculateDistanceKm(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10;
  },

  /**
   * Reverse geocode coordinates into readable city/country string.
   */
  async getPlaceNameFromCoords(latitude, longitude) {
    try {
      const addresses = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (addresses && addresses.length > 0) {
        const item = addresses[0];
        return item.city || item.region || item.country || 'Current Location';
      }
      return 'Current Location';
    } catch (err) {
      console.warn('LocationService reverse geocode error:', err.message);
      return 'Current Location';
    }
  },

  async openInNativeMaps(addressOrQuery, title = '') {
    if (!addressOrQuery) return;

    const encodedQuery = encodeURIComponent(addressOrQuery);
    const url =
      Platform.OS === 'ios'
        ? `maps://?q=${encodedQuery}`
        : `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`);
      }
    } catch (err) {
      console.warn('Map open error:', err.message);
    }
  },
};
