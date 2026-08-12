import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Suitcase } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Chip } from '../../components/ui/Chip';
import { Button } from '../../components/ui/Button';
import { TripSummaryCard } from '../../components/trips/TripSummaryCard';

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const themeMode = useAppStore((state) => state.themeMode);
  const activeTrip = useAppStore((state) => state.activeTrip);
  const upcomingTrips = useAppStore((state) => state.upcomingTrips);
  const pastTrips = useAppStore((state) => state.pastTrips);
  const theme = getTheme(themeMode);

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Upcoming' | 'Past'

  const allTrips = [
    { ...activeTrip, status: 'Active' },
    ...upcomingTrips.map((t) => ({ ...t, status: 'Upcoming' })),
    ...pastTrips.map((t) => ({ ...t, status: 'Completed' })),
  ];

  const displayedTrips = allTrips.filter((t) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Upcoming') return t.status === 'Active' || t.status === 'Upcoming';
    if (activeTab === 'Past') return t.status === 'Completed';
    return true;
  });

  const handleTripPress = (trip) => {
    Alert.alert(
      trip.title,
      `${trip.destination}\n${trip.startDate} – ${trip.endDate}\nTotal Days: ${trip.totalDays}\nStatus: ${trip.status}`,
      [
        { text: 'Close', style: 'cancel' },
        {
          text: 'View Itinerary',
          onPress: () =>
            Alert.alert('Trip Itinerary', `Viewing full itinerary for ${trip.title}`),
        },
      ]
    );
  };

  const handleNewTrip = () => {
    Alert.alert(
      'New Trip Planner',
      'Create Trip modal sheet will open here. (Available in Phase 2)'
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
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.headerStack}>
        <View style={styles.headerTopRow}>
          <View>
            <Text
              style={[
                styles.overline,
                { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
              ]}
            >
              ITINERARY HUB
            </Text>
            <Text
              style={[
                styles.title,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              My Journeys
            </Text>
          </View>
          <Button
            title="New Trip"
            icon={Plus}
            onPress={handleNewTrip}
            variant="primary"
            fullWidth={false}
          />
        </View>
      </Animated.View>

      {/* Filter Tabs */}
      <Animated.View entering={FadeInUp.duration(400).delay(100)} style={styles.tabRow}>
        <Chip
          label={`All (${allTrips.length})`}
          active={activeTab === 'All'}
          onPress={() => setActiveTab('All')}
        />
        <Chip
          label="Upcoming"
          active={activeTab === 'Upcoming'}
          onPress={() => setActiveTab('Upcoming')}
        />
        <Chip
          label="Past"
          active={activeTab === 'Past'}
          onPress={() => setActiveTab('Past')}
        />
      </Animated.View>

      {/* Trip Cards List */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)}>
        <SectionHeader
          overline="SCHEDULED TRIPS"
          title={`${activeTab} Itineraries (${displayedTrips.length})`}
        />

        {displayedTrips.length > 0 ? (
          displayedTrips.map((trip) => (
            <TripSummaryCard
              key={trip.id}
              trip={trip}
              onPress={() => handleTripPress(trip)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Suitcase size={36} color={theme.colors.textMuted} style={{ marginBottom: 12 }} />
            <Text
              style={[
                styles.emptyTitle,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              No trips in this view
            </Text>
            <Text
              style={[
                styles.emptySub,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              Your planned travel itineraries will appear here.
            </Text>
            <Button
              title="Create New Trip"
              onPress={handleNewTrip}
              variant="secondary"
              style={{ marginTop: 16 }}
            />
          </View>
        )}
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
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  overline: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
  },
});
