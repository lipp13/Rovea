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
  const theme = getTheme(themeMode);

  const handlePlanPress = () => {
    Alert.alert(
      "Today's Itinerary",
      `Day ${activeTrip.currentDay} in Kyoto:\n\n1. Nishiki Market (09:30 AM)\n2. Kissa Soiree (12:00 PM)\n3. Fushimi Inari Shrine (02:30 PM)\n4. Gion Evening Walk (06:00 PM)`
    );
  };

  const handleWeatherPress = () => {
    Alert.alert(
      'Kyoto Weather Forecast',
      'Today: 21°C • Clear & Sunny\nHigh: 24° • Low: 14°\nHumidity: 48%\n\nPerfect weather for outdoor shrine walks and garden visits.'
    );
  };

  const handleNextActivityPress = () => {
    Alert.alert(
      'Fushimi Inari Shrine',
      'Scheduled for 02:30 PM today.\n\n"Walk past the main gates up to the Yotsutsuji intersection for panoramic views of Kyoto at sunset."'
    );
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
      {/* Top Editorial Greeting */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.headerStack}>
        <View style={styles.greetingRow}>
          <Text style={[styles.greetingTag, { color: theme.colors.accentBrand }]}>
            CURRENT JOURNEY
          </Text>
          <Sparkles size={14} color={theme.colors.accentBrand} />
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
          You're on Day {activeTrip?.currentDay} of your Kyoto adventure.
        </Text>
      </Animated.View>

      {/* Active Trip Hero (Visual Benchmark) */}
      <Animated.View entering={FadeInUp.duration(500).delay(100)}>
        <ActiveTripHero
          trip={activeTrip}
          onPlanPress={handlePlanPress}
          onWeatherPress={handleWeatherPress}
        />
      </Animated.View>

      {/* Next Up Activity Section */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)}>
        <SectionHeader
          overline="NEXT SCHEDULED SPOT"
          title="Up next today"
          actionText="View All (4)"
          onActionPress={handlePlanPress}
        />
        <NextActivityCard
          activity={activeTrip?.nextActivity}
          onPress={handleNextActivityPress}
        />
      </Animated.View>

      {/* Saved Places Carousel */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)}>
        <SectionHeader
          overline="BOOKMARKS"
          title="Saved spots in Japan"
          actionText="See All"
          onActionPress={() => router.push('/(tabs)/profile')}
        />
        <SavedPlacesRow
          places={savedPlaces}
          onPlacePress={(place) =>
            Alert.alert(place.title, `${place.category} in ${place.city} • Rating ${place.rating}`)
          }
        />
      </Animated.View>

      {/* Discover More Editorial Callout */}
      <Animated.View entering={FadeInDown.duration(400).delay(400)} style={{ marginTop: 24 }}>
        <View
          style={[
            styles.editorialCallout,
            {
              backgroundColor: theme.colors.bgSubtle,
              borderColor: theme.colors.borderSubtle,
              borderRadius: theme.radii.lg,
            },
          ]}
        >
          <Compass size={24} color={theme.colors.accentBrand} style={{ marginBottom: 8 }} />
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
            Explore curated guides for Positano, Reykjavik, and the Cotswolds in our editorial collection.
          </Text>
          <Button
            title="Explore Destinations"
            onPress={() => router.push('/(tabs)/explore')}
            variant="secondary"
            style={{ marginTop: 12 }}
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
    marginBottom: 20,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  greetingTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginRight: 6,
  },
  greetingTitle: {
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
  },
  editorialCallout: {
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  calloutTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  calloutDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
