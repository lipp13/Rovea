import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Sun, Wallet, CheckSquare, Clock, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

export default function TripOverviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const activeTrip = useAppStore((state) => state.activeTrip);
  const expenseTracker = useAppStore((state) => state.expenseTracker);
  const packingChecklist = useAppStore((state) => state.packingChecklist);
  const openModal = useAppStore((state) => state.openModal);
  const theme = getTheme(themeMode);

  if (!activeTrip) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Editorial Trip Photography Hero */}
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: activeTrip.coverImage }} style={styles.heroImage} />

          {/* Top Bar Navigation */}
          <View style={[styles.navHeader, { paddingTop: insets.top + 8 }]}>
            <Pressable
              onPress={() => router.back()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.backBtn}
            >
              <ArrowLeft size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Scrim Title Content */}
          <View style={styles.heroScrimContent}>
            <View style={styles.badgeRow}>
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>Day {activeTrip.currentDay} of {activeTrip.totalDays}</Text>
              </View>
            </View>
            <Text style={styles.destinationHeader}>{activeTrip.destination.toUpperCase()}</Text>
            <Text style={styles.tripTitleText}>{activeTrip.title}</Text>
            <Text style={styles.dateRangeText}>
              {activeTrip.startDate} — {activeTrip.endDate}, {activeTrip.year}
            </Text>
          </View>
        </View>

        {/* Editorial Content Hub (Typography & Hairline Dividers - No Heavy Cards) */}
        <View style={styles.bodyContent}>
          {/* Section 1: Today's Plan */}
          <Pressable
            onPress={() => router.push('/itinerary')}
            style={[styles.hubRowItem, { borderBottomColor: theme.colors.borderSubtle }]}
          >
            <View style={styles.hubItemLeft}>
              <View style={styles.iconContainer}>
                <Clock size={20} color={theme.colors.accentBrand} />
              </View>
              <View style={styles.hubTextStack}>
                <Text
                  style={[
                    styles.hubLabel,
                    { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                  ]}
                >
                  TODAY'S ITINERARY
                </Text>
                <Text
                  style={[
                    styles.hubTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                  ]}
                >
                  Day 03 — {activeTrip.currentDateLabel}
                </Text>
                <Text
                  style={[
                    styles.hubSubtext,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  4 spots scheduled • Up next: {activeTrip.nextActivity?.title} ({activeTrip.nextActivity?.time})
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </Pressable>

          {/* Section 2: Expense Tracker */}
          <Pressable
            onPress={() => router.push('/expenses')}
            style={[styles.hubRowItem, { borderBottomColor: theme.colors.borderSubtle }]}
          >
            <View style={styles.hubItemLeft}>
              <View style={styles.iconContainer}>
                <Wallet size={20} color={theme.colors.accentBrand} />
              </View>
              <View style={styles.hubTextStack}>
                <Text
                  style={[
                    styles.hubLabel,
                    { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                  ]}
                >
                  EXPENSE TRACKER
                </Text>
                <Text
                  style={[
                    styles.hubTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                  ]}
                >
                  {expenseTracker.spentFormatted} spent of {expenseTracker.budgetFormatted}
                </Text>
                <Text
                  style={[
                    styles.hubSubtext,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  Stay & Dining represent 77% of total budget
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </Pressable>

          {/* Section 3: Packing Checklist */}
          <Pressable
            onPress={() => router.push('/packing')}
            style={[styles.hubRowItem, { borderBottomColor: theme.colors.borderSubtle }]}
          >
            <View style={styles.hubItemLeft}>
              <View style={styles.iconContainer}>
                <CheckSquare size={20} color={theme.colors.accentBrand} />
              </View>
              <View style={styles.hubTextStack}>
                <Text
                  style={[
                    styles.hubLabel,
                    { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                  ]}
                >
                  PACKING CHECKLIST
                </Text>
                <Text
                  style={[
                    styles.hubTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                  ]}
                >
                  {packingChecklist.packedCount} of {packingChecklist.totalItems} items packed
                </Text>
                <Text
                  style={[
                    styles.hubSubtext,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  Documents and electronics fully packed
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </Pressable>

          {/* Section 4: Weather Overview */}
          <Pressable
            onPress={() => openModal('weather')}
            style={styles.hubRowItem}
          >
            <View style={styles.hubItemLeft}>
              <View style={styles.iconContainer}>
                <Sun size={20} color={theme.colors.accentBrand} />
              </View>
              <View style={styles.hubTextStack}>
                <Text
                  style={[
                    styles.hubLabel,
                    { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                  ]}
                >
                  LOCAL WEATHER
                </Text>
                <Text
                  style={[
                    styles.hubTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                  ]}
                >
                  {activeTrip.weather?.temp} • {activeTrip.weather?.condition}
                </Text>
                <Text
                  style={[
                    styles.hubSubtext,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  High {activeTrip.weather?.high} • Low {activeTrip.weather?.low} • Humidity {activeTrip.weather?.humidity}
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImageContainer: {
    height: 360,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  navHeader: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justify: 'center',
  },
  heroScrimContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  dayBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  destinationHeader: {
    color: '#E07A5F',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  tripTitleText: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    marginBottom: 4,
  },
  dateRangeText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  hubRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  hubItemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    paddingRight: 12,
  },
  iconContainer: {
    marginRight: 14,
    marginTop: 2,
  },
  hubTextStack: {
    flex: 1,
  },
  hubLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  hubTitle: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 4,
  },
  hubSubtext: {
    fontSize: 13,
  },
});
