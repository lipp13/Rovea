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

  async openInNativeMaps(addressOrQuery, title = '') {
    if (!addressOrQuery) return;

    const encodedQuery = encodeURIComponent(addressOrQuery);
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:0,0?q=';
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
