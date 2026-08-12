import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Compass, Sparkles, MapPin } from 'lucide-react-native';
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
  const activeTrip = useAppStore((state) => state.activeTrip);
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
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 90 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Editorial Top Greeting */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.headerStack}>
        <View style={styles.greetingRow}>
          <Text style={[styles.greetingTag, { color: theme.colors.accentBrand }]}>
            CURRENT JOURNEY
          </Text>
          <Sparkles size={13} color={theme.colors.accentBrand} />
        </View>
        <Text
          style={[
            styles.greetingTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Good morning, {currentUser?.name?.split(' ')[0] || 'Traveler'}
        </Text>
        <Text
          style={[
            styles.greetingSubtitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
          ]}
        >
          Day {activeTrip?.currentDay} of 7 in Kyoto • Autumn Foliage Season
        </Text>
      </Animated.View>

      {/* Large Hero Photography Card */}
      <Animated.View entering={FadeInUp.duration(400).delay(100)}>
        <ActiveTripHero
          trip={activeTrip}
          onPlanPress={handlePlanPress}
          onWeatherPress={handleWeatherPress}
        />
      </Animated.View>

      {/* Up Next Activity (Whitespace & 1px Hairline Divider) */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)} style={{ marginBottom: 32 }}>
        <SectionHeader
          overline="NEXT SCHEDULED SPOT"
          title="Up next today"
          actionText="View Full Plan"
          onActionPress={handlePlanPress}
        />
        <NextActivityCard
          activity={activeTrip?.nextActivity}
          onPress={handleNextActivityPress}
        />
      </Animated.View>

      {/* Saved Places Section */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)} style={{ marginBottom: 32 }}>
        <SectionHeader
          overline="SAVED SPOTS"
          title="Bookmarked destinations"
          actionText="See All"
          onActionPress={() => router.push('/(tabs)/profile')}
        />
        <SavedPlacesRow
          places={savedPlaces}
          onPlacePress={(place) => openModal('placeDetail', { place })}
        />
      </Animated.View>

      {/* Editorial Discover Callout */}
      <Animated.View entering={FadeInDown.duration(400).delay(400)} style={{ marginBottom: 24 }}>
        <View style={[styles.editorialCallout, { borderTopColor: theme.colors.borderSubtle }]}>
          <Compass size={24} color={theme.colors.accentBrand} style={{ marginBottom: 10 }} />
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
            Explore handpicked guides for Positano, Reykjavik, and the Cotswolds in our editorial collection.
          </Text>
          <Button
            title="Explore Destinations"
            onPress={() => router.push('/(tabs)/explore')}
            variant="secondary"
            style={{ marginTop: 14 }}
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
    paddingHorizontal: 20,
  },
  headerStack: {
    marginBottom: 24,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  greetingTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginRight: 6,
  },
  greetingTitle: {
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
  },
  editorialCallout: {
    paddingTop: 24,
    borderTopWidth: 1,
  },
  calloutTitle: {
    fontSize: 22,
    marginBottom: 4,
  },
  calloutDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
});
