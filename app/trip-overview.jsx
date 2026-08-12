import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, Wallet, CheckSquare, Sun, ChevronRight, Trash2 } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';

function TripToolRow({ icon: Icon, label, title, subtitle, onPress, theme, isLast }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        styles.hubRowItem,
        !isLast && { borderBottomWidth: 0.5, borderBottomColor: theme.colors.borderSubtle },
      ]}
    >
      <View style={styles.hubItemLeft}>
        <View style={[styles.iconCircle, { backgroundColor: theme.colors.accentSubtle }]}>
          <Icon size={18} color={theme.colors.accentBrand} />
        </View>
        <View style={styles.hubTextStack}>
          <Text
            style={[styles.hubTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium }]}
          >
            {title}
          </Text>
          <Text
            style={[styles.hubSubtext, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}
          >
            {subtitle}
          </Text>
        </View>
      </View>
      <ChevronRight size={16} color={theme.colors.textMuted} />
    </Pressable>
  );
}

export default function TripOverviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const themeMode = useAppStore((state) => state.themeMode);
  const trips = useAppStore((state) => state.trips);
  const activeTripId = useAppStore((state) => state.activeTripId);
  const getActiveTrip = useAppStore((state) => state.getActiveTrip);
  const deleteTrip = useAppStore((state) => state.deleteTrip);
  const expenseTracker = useAppStore((state) => state.expenseTracker);
  const packingChecklist = useAppStore((state) => state.packingChecklist);
  const openModal = useAppStore((state) => state.openModal);
  const theme = getTheme(themeMode);

  const targetId = params.id || activeTripId;
  const activeTrip = trips.find((t) => t.id === targetId) || getActiveTrip();

  if (!activeTrip) return null;

  const handleDelete = () => {
    deleteTrip(activeTrip.id);
    router.replace('/(tabs)/trips');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Photography */}
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: activeTrip.coverImage }} style={styles.heroImage} />

          {/* Nav */}
          <View style={[styles.navHeader, { paddingTop: insets.top + 8 }]}>
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.navBtn}
            >
              <ArrowLeft size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable
              onPress={handleDelete}
              accessibilityRole="button"
              accessibilityLabel="Delete trip"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.navBtn}
            >
              <Trash2 size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Hero Text */}
          <View style={styles.heroScrimContent}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>
                Day {activeTrip.currentDay || 1} of {activeTrip.totalDays || 7}
              </Text>
            </View>
            <Text style={styles.destinationHeader}>{activeTrip.destination.toUpperCase()}</Text>
            <Text style={styles.tripTitleText}>{activeTrip.title}</Text>
            <Text style={styles.dateRangeText}>
              {activeTrip.startDate} — {activeTrip.endDate}
            </Text>
          </View>
        </View>

        {/* Trip Tools */}
        <View style={styles.bodyContent}>
          <Animated.View entering={FadeInUp.duration(400)}>
            <Text style={[styles.toolsSectionLabel, { color: theme.colors.accentBrand }]}>
              TRIP TOOLS
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(400).delay(80)}
            style={[styles.toolsCard, { backgroundColor: theme.colors.bgSurface, borderColor: theme.colors.borderSubtle }]}
          >
            <TripToolRow
              icon={Clock}
              label="Today's Itinerary"
              title={`Day 0${activeTrip.currentDay || 3} Itinerary`}
              subtitle={`Up next: ${activeTrip.nextActivity?.title || 'Exploration'}`}
              onPress={() => router.push('/itinerary')}
              theme={theme}
            />
            <TripToolRow
              icon={Wallet}
              label="Expense Tracker"
              title={`${expenseTracker.spentFormatted} spent`}
              subtitle={`of ${expenseTracker.budgetFormatted} budget`}
              onPress={() => router.push('/expense-tracker')}
              theme={theme}
            />
            <TripToolRow
              icon={CheckSquare}
              label="Packing Checklist"
              title={`${packingChecklist.packedCount} of ${packingChecklist.totalItems} packed`}
              subtitle={`${Math.round((packingChecklist.packedCount / (packingChecklist.totalItems || 1)) * 100)}% complete`}
              onPress={() => router.push('/packing-checklist')}
              theme={theme}
            />
            <TripToolRow
              icon={Sun}
              label="Local Weather"
              title={`${activeTrip.weather?.temp || '18°C'} · ${activeTrip.weather?.condition || 'Clear'}`}
              subtitle={`High ${activeTrip.weather?.high || '22°C'} · Low ${activeTrip.weather?.low || '14°C'}`}
              onPress={() => openModal('weather')}
              theme={theme}
              isLast
            />
          </Animated.View>
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
    height: 380,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroScrimContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  dayBadge: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  dayBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  destinationHeader: {
    color: '#E07A5F',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  tripTitleText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 36,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  dateRangeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  bodyContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  toolsSectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  toolsCard: {
    borderRadius: 14,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  hubRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  hubItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  hubTextStack: {
    flex: 1,
  },
  hubTitle: {
    fontSize: 15,
    marginBottom: 2,
  },
  hubSubtext: {
    fontSize: 12,
  },
});
