import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {
  useFonts,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_400Regular,
} from '@expo-google-fonts/playfair-display';
import {
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_400Regular,
} from '@expo-google-fonts/plus-jakarta-sans';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';

import { PlaceDetailSheet } from '../components/sheets/PlaceDetailSheet';
import { AddPlaceSheet } from '../components/sheets/AddPlaceSheet';
import { WeatherDetailSheet } from '../components/sheets/WeatherDetailSheet';

export default function RootLayout() {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.bgPrimary }]}>
        <ActivityIndicator size="large" color={theme.colors.accentBrand} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bgPrimary }}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.bgPrimary },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="destination-detail" />
        <Stack.Screen name="create-trip" />
        <Stack.Screen name="trip-overview" />
        <Stack.Screen name="itinerary" />
        <Stack.Screen name="expense-tracker" />
        <Stack.Screen name="packing-checklist" />
      </Stack>

      {/* Global Phase 2 Modal Sheets */}
      <PlaceDetailSheet />
      <AddPlaceSheet />
      <WeatherDetailSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justify: 'center',
  },
});
