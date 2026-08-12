import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, ArrowRight, MapPin, Calendar, Clock } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { Chip } from '../../components/ui/Chip';
import { Button } from '../../components/ui/Button';

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const activeTrip = useAppStore((state) => state.activeTrip);
  const upcomingTrips = useAppStore((state) => state.upcomingTrips);
  const pastTrips = useAppStore((state) => state.pastTrips);
  const theme = getTheme(themeMode);

  const [activeTab, setActiveTab] = useState('Active'); // 'Active' | 'Past'

  const handleCreateTrip = () => {
    router.push('/create-trip');
  };

  const handleTripOverview = () => {
    router.push('/trip-overview');
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
      {/* Header Bar */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.headerRow}>
        <View>
          <Text style={[styles.overline, { color: theme.colors.accentBrand }]}>
            YOUR JOURNEYS
          </Text>
          <Text
            style={[
              styles.title,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            Trips & Itineraries
          </Text>
        </View>
        <Pressable
          onPress={handleCreateTrip}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[styles.addNavBtn, { backgroundColor: theme.colors.accentSubtle }]}
        >
          <Plus size={20} color={theme.colors.accentBrand} />
        </Pressable>
      </Animated.View>

      {/* Filter Tabs */}
      <Animated.View entering={FadeInUp.duration(400).delay(100)} style={styles.tabRow}>
        <Chip
          label="Active & Upcoming"
          active={activeTab === 'Active'}
          onPress={() => setActiveTab('Active')}
        />
        <Chip
          label="Past Journeys"
          active={activeTab === 'Past'}
          onPress={() => setActiveTab('Past')}
        />
      </Animated.View>

      {activeTab === 'Active' && (
        <>
          {/* Active Trip Hero Banner */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.activeSection}>
            <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
              CURRENT TRIP IN PROGRESS
            </Text>

            <Pressable onPress={handleTripOverview} style={styles.heroCard}>
              <Image source={{ uri: activeTrip.coverImage }} style={styles.heroImage} />
              <View style={styles.heroScrim}>
                <View style={styles.dayTag}>
                  <Text style={styles.dayTagText}>
                    Day {activeTrip.currentDay} of {activeTrip.totalDays}
                  </Text>
                </View>
                <Text style={styles.heroDestination}>{activeTrip.destination.toUpperCase()}</Text>
                <Text style={styles.heroTitle}>{activeTrip.title}</Text>
                <Text style={styles.heroDates}>
                  {activeTrip.startDate} — {activeTrip.endDate} ({activeTrip.daysRemaining} days remaining)
                </Text>
              </View>
            </Pressable>
          </Animated.View>

          {/* Upcoming Trips List */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)} style={styles.upcomingSection}>
            <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
              UPCOMING RETREATS
            </Text>

            {upcomingTrips.map((trip) => (
              <Pressable
                key={trip.id}
                onPress={handleTripOverview}
                style={[
                  styles.tripRow,
                  { borderBottomColor: theme.colors.borderSubtle },
                ]}
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
                    {trip.startDate} — {trip.endDate} ({trip.totalDays} Days)
                  </Text>
                </View>
                <ArrowRight size={18} color={theme.colors.textSecondary} />
              </Pressable>
            ))}
          </Animated.View>
        </>
      )}

      {activeTab === 'Past' && (
        <Animated.View entering={FadeInDown.duration(400)} style={styles.pastSection}>
          <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
            COMPLETED JOURNEYS
          </Text>

          {pastTrips.map((trip) => (
            <View
              key={trip.id}
              style={[
                styles.tripRow,
                { borderBottomColor: theme.colors.borderSubtle },
              ]}
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
                  {trip.startDate} — {trip.endDate} • {trip.placesVisited} places visited
                </Text>
              </View>
            </View>
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
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justify: 'space-between',
    marginBottom: 16,
  },
  overline: {
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
  },
  addNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justify: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  activeSection: {
    marginBottom: 32,
  },
  sectionOverline: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  heroCard: {
    height: 280,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justify: 'flex-end',
    padding: 20,
  },
  dayTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  dayTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  heroDestination: {
    color: '#E07A5F',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    marginBottom: 4,
  },
  heroDates: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  upcomingSection: {
    marginBottom: 24,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  rowThumbnail: {
    width: 68,
    height: 68,
    borderRadius: 10,
    marginRight: 14,
  },
  rowInfo: {
    flex: 1,
    paddingRight: 10,
  },
  rowDest: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  rowTitle: {
    fontSize: 18,
    marginBottom: 2,
  },
  rowDates: {
    fontSize: 12,
  },
  pastSection: {
    marginBottom: 24,
  },
});
