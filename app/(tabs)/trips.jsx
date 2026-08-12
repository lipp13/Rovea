import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, ArrowRight } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { Chip } from '../../components/ui/Chip';
import { Button } from '../../components/ui/Button';

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const getActiveTrip = useAppStore((state) => state.getActiveTrip);
  const activeTrip = getActiveTrip();
  const trips = useAppStore((state) => state.trips);
  const theme = getTheme(themeMode);

  const [activeTab, setActiveTab] = useState('Active');

  const upcomingTrips = trips.filter((t) => t.id !== activeTrip?.id && t.status !== 'Completed');
  const pastTrips = trips.filter((t) => t.status === 'Completed');

  const handleCreateTrip = () => {
    router.push('/create-trip');
  };

  const handleTripOverview = (tripId) => {
    router.push({
      pathname: '/trip-overview',
      params: { id: tripId || activeTrip?.id },
    });
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
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(450)} style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            My Trips
          </Text>
        </View>
        <Pressable
          onPress={handleCreateTrip}
          accessibilityRole="button"
          accessibilityLabel="Create new trip"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[styles.addBtn, { backgroundColor: theme.colors.accentSubtle }]}
        >
          <Plus size={20} color={theme.colors.accentBrand} />
        </Pressable>
      </Animated.View>

      {/* Filter Tabs */}
      <Animated.View entering={FadeInUp.duration(400).delay(80)} style={styles.tabRow}>
        <Chip
          label="Active"
          active={activeTab === 'Active'}
          onPress={() => setActiveTab('Active')}
        />
        <Chip
          label="Past"
          active={activeTab === 'Past'}
          onPress={() => setActiveTab('Past')}
        />
      </Animated.View>

      {activeTab === 'Active' && (
        <>
          {/* Active Trip Hero */}
          {activeTrip && (
            <Animated.View entering={FadeInDown.duration(450).delay(160)} style={styles.activeSection}>
              <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
                IN PROGRESS
              </Text>

              <Pressable
                onPress={() => handleTripOverview(activeTrip.id)}
                accessibilityRole="button"
                accessibilityLabel={`View ${activeTrip.title}`}
                style={styles.heroCard}
              >
                <Image source={{ uri: activeTrip.coverImage }} style={styles.heroImage} />
                <View style={styles.heroScrim}>
                  <View style={styles.dayTag}>
                    <Text style={styles.dayTagText}>
                      Day {activeTrip.currentDay || 1} / {activeTrip.totalDays || 7}
                    </Text>
                  </View>
                  <Text style={styles.heroDestination}>
                    {activeTrip.destination.toUpperCase()}
                  </Text>
                  <Text style={styles.heroTitle}>{activeTrip.title}</Text>
                  <Text style={styles.heroDates}>
                    {activeTrip.startDate} — {activeTrip.endDate}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          )}

          {/* Upcoming */}
          {upcomingTrips.length > 0 && (
            <Animated.View entering={FadeInDown.duration(400).delay(240)} style={styles.upcomingSection}>
              <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
                UPCOMING
              </Text>
              {upcomingTrips.map((trip) => (
                <Pressable
                  key={trip.id}
                  onPress={() => handleTripOverview(trip.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`View ${trip.title}`}
                  style={[styles.tripRow, { borderBottomColor: theme.colors.borderSubtle }]}
                >
                  <Image source={{ uri: trip.coverImage }} style={styles.rowThumbnail} />
                  <View style={styles.rowInfo}>
                    <Text style={[styles.rowDest, { color: theme.colors.accentBrand }]}>
                      {trip.destination.toUpperCase()}
                    </Text>
                    <Text
                      style={[
                        styles.rowTitle,
                        { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                      ]}
                    >
                      {trip.title}
                    </Text>
                    <Text style={[styles.rowDates, { color: theme.colors.textSecondary }]}>
                      {trip.startDate} — {trip.endDate}
                    </Text>
                  </View>
                  <ArrowRight size={16} color={theme.colors.textMuted} />
                </Pressable>
              ))}
            </Animated.View>
          )}
        </>
      )}

      {activeTab === 'Past' && (
        <Animated.View entering={FadeInDown.duration(400)} style={styles.pastSection}>
          <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
            COMPLETED
          </Text>
          {pastTrips.length === 0 && (
            <View style={styles.emptyState}>
              <Text
                style={[
                  styles.emptyTitle,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                ]}
              >
                No completed trips yet
              </Text>
              <Text
                style={[
                  styles.emptyDesc,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                Finished trips will appear here as part of your travel journal.
              </Text>
            </View>
          )}
          {pastTrips.map((trip) => (
            <Pressable
              key={trip.id}
              onPress={() => handleTripOverview(trip.id)}
              accessibilityRole="button"
              accessibilityLabel={`View ${trip.title}`}
              style={[styles.tripRow, { borderBottomColor: theme.colors.borderSubtle }]}
            >
              <Image source={{ uri: trip.coverImage }} style={styles.rowThumbnail} />
              <View style={styles.rowInfo}>
                <Text style={[styles.rowDest, { color: theme.colors.accentBrand }]}>
                  {trip.destination.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.rowTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                  ]}
                >
                  {trip.title}
                </Text>
                <Text style={[styles.rowDates, { color: theme.colors.textSecondary }]}>
                  {trip.startDate} — {trip.endDate}
                </Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.4,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  activeSection: {
    marginBottom: 32,
  },
  sectionOverline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  heroCard: {
    height: 260,
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  dayTag: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  dayTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  heroDestination: {
    color: '#E07A5F',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 32,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    marginBottom: 4,
  },
  heroDates: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  upcomingSection: {
    marginBottom: 24,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  rowThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 14,
  },
  rowInfo: {
    flex: 1,
    paddingRight: 10,
  },
  rowDest: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 2,
  },
  rowTitle: {
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 2,
  },
  rowDates: {
    fontSize: 12,
  },
  pastSection: {
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
  emptyDesc: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 20,
  },
});
