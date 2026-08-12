import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Compass, Sparkles } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ActiveTripHero } from '../../components/home/ActiveTripHero';
import { NextActivityCard } from '../../components/home/NextActivityCard';
import { SavedPlacesRow } from '../../components/home/SavedPlacesRow';
import { Button } from '../../components/ui/Button';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const currentUser = useAppStore((state) => state.currentUser);
  const getActiveTrip = useAppStore((state) => state.getActiveTrip);
  const activeTrip = getActiveTrip();
  const savedPlaces = useAppStore((state) => state.savedPlaces);
  const openModal = useAppStore((state) => state.openModal);
  const theme = getTheme(themeMode);

  const handlePlanPress = () => {
    router.push('/itinerary');
  };

  const handleWeatherPress = () => {
    openModal('weather');
  };

  const handleNextActivityPress = () => {
    if (activeTrip?.nextActivity) {
      openModal('placeDetail', { place: activeTrip.nextActivity });
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting */}
      <Animated.View entering={FadeInUp.duration(450)} style={styles.headerStack}>
        <Text
          style={[
            styles.greetingTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Good morning,{'\n'}
          {currentUser?.name?.split(' ')[0] || 'Traveler'}
        </Text>
        <Text
          style={[
            styles.greetingSubtitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
          ]}
        >
          {activeTrip
            ? `Day ${activeTrip?.currentDay || 3} of ${activeTrip?.totalDays || 7} in ${activeTrip?.destination || 'Kyoto'}`
            : 'Where will you go next?'}
        </Text>
      </Animated.View>

      {/* Current Journey Label */}
      {activeTrip && (
        <Animated.View entering={FadeInUp.duration(400).delay(60)} style={styles.journeyLabel}>
          <Sparkles size={12} color={theme.colors.accentBrand} style={{ marginRight: 6 }} />
          <Text style={[styles.journeyLabelText, { color: theme.colors.accentBrand }]}>
            CURRENT JOURNEY
          </Text>
        </Animated.View>
      )}

      {/* Hero Photography */}
      <Animated.View entering={FadeInUp.duration(500).delay(120)}>
        <ActiveTripHero
          trip={activeTrip}
          onPlanPress={handlePlanPress}
          onWeatherPress={handleWeatherPress}
        />
      </Animated.View>

      {/* Up Next */}
      <Animated.View entering={FadeInDown.duration(400).delay(240)} style={styles.sectionSpacing}>
        <SectionHeader
          overline="NEXT"
          title="Up next today"
          actionText="View Plan"
          onActionPress={handlePlanPress}
        />
        <NextActivityCard
          activity={activeTrip?.nextActivity}
          onPress={handleNextActivityPress}
        />
      </Animated.View>

      {/* Saved Places */}
      <Animated.View entering={FadeInDown.duration(400).delay(340)} style={styles.sectionSpacing}>
        <SectionHeader
          overline="SAVED"
          title="Bookmarked places"
          actionText="See All"
          onActionPress={() => router.push('/(tabs)/profile')}
        />
        <SavedPlacesRow
          places={savedPlaces}
          onPlacePress={(place) => openModal('placeDetail', { place })}
        />
      </Animated.View>

      {/* Editorial Callout */}
      <Animated.View entering={FadeInDown.duration(400).delay(440)} style={styles.sectionSpacing}>
        <View style={[styles.editorialCallout, { borderTopColor: theme.colors.borderSubtle }]}>
          <Compass size={22} color={theme.colors.accentBrand} style={{ marginBottom: 12 }} />
          <Text
            style={[
              styles.calloutTitle,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            Planning your next retreat?
          </Text>
          <Text
            style={[
              styles.calloutDesc,
              { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
            ]}
          >
            Explore handpicked guides for Positano, Reykjavik, and the Cotswolds.
          </Text>
          <Button
            title="Explore Destinations"
            onPress={() => router.push('/(tabs)/explore')}
            variant="secondary"
            style={{ marginTop: 16 }}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  headerStack: {
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  greetingSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  journeyLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  journeyLabelText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  sectionSpacing: {
    marginBottom: 40,
  },
  editorialCallout: {
    paddingTop: 32,
    borderTopWidth: 0.5,
  },
  calloutTitle: {
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 6,
  },
  calloutDesc: {
    fontSize: 14,
    lineHeight: 21,
  },
});
