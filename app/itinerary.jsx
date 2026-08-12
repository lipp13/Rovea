import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

export default function DailyItineraryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const itineraryDays = useAppStore((state) => state.itineraryDays);
  const openModal = useAppStore((state) => state.openModal);
  const deleteItineraryItem = useAppStore((state) => state.deleteItineraryItem);
  const theme = getTheme(themeMode);

  const [selectedDayNumber, setSelectedDayNumber] = useState(3);

  const currentDayData =
    itineraryDays.find((d) => d.dayNumber === selectedDayNumber) || itineraryDays[0];

  const handleDaySelect = (dayNum) => {
    setSelectedDayNumber(dayNum);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handleAddPlace = () => {
    openModal('addPlace', { dayNumber: selectedDayNumber });
  };

  const handleSpotPress = (spot) => {
    openModal('placeDetail', { place: spot });
  };

  const handleDeleteSpot = (spotId) => {
    deleteItineraryItem(selectedDayNumber, spotId);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      {/* Header */}
      <View style={[styles.headerNav, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Itinerary
        </Text>
        <Pressable
          onPress={handleAddPlace}
          accessibilityRole="button"
          accessibilityLabel="Add place"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[styles.addNavBtn, { backgroundColor: theme.colors.accentSubtle }]}
        >
          <Plus size={18} color={theme.colors.accentBrand} />
        </Pressable>
      </View>

      {/* Day Selector Strip */}
      <View style={[styles.dayStripWrapper, { borderBottomColor: theme.colors.borderSubtle }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayScrollContent}
        >
          {itineraryDays.map((day) => {
            const isActive = day.dayNumber === selectedDayNumber;
            return (
              <Pressable
                key={day.dayNumber}
                onPress={() => handleDaySelect(day.dayNumber)}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Day ${day.dayNumber}`}
                style={[
                  styles.dayTab,
                  { borderBottomColor: isActive ? theme.colors.accentBrand : 'transparent' },
                ]}
              >
                <Text
                  style={[
                    styles.dayTabNum,
                    {
                      color: isActive ? theme.colors.accentBrand : theme.colors.textSecondary,
                      fontFamily: isActive ? theme.fonts.sansSemiBold : theme.fonts.sansMedium,
                    },
                  ]}
                >
                  {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
                </Text>
                <Text
                  style={[
                    styles.dayTabDate,
                    {
                      color: isActive ? theme.colors.textPrimary : theme.colors.textMuted,
                      fontFamily: theme.fonts.sansRegular,
                    },
                  ]}
                >
                  {day.dateLabel}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Timeline */}
      <ScrollView
        contentContainerStyle={[styles.timelineContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Header */}
        <Animated.View entering={FadeInUp.duration(350)} style={styles.dayHeaderTitleStack}>
          <Text style={[styles.dayHeaderOverline, { color: theme.colors.accentBrand }]}>
            DAY {currentDayData.dayNumber < 10 ? `0${currentDayData.dayNumber}` : currentDayData.dayNumber} · {currentDayData.dateLabel}
          </Text>
          <Text
            style={[
              styles.dayHeaderHeadline,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {currentDayData.dayTitle || 'Daily Exploration'}
          </Text>
        </Animated.View>

        {/* Timeline Items */}
        <View style={styles.timelineList}>
          {currentDayData.spots?.map((spot, index) => (
            <Animated.View
              key={spot.id}
              entering={FadeInDown.duration(400).delay(index * 50)}
              style={styles.timelineRow}
            >
              {/* Time Column */}
              <View style={styles.timelineLeftCol}>
                <Text
                  style={[
                    styles.timeLabel,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold },
                  ]}
                >
                  {spot.time}
                </Text>
                <View
                  style={[styles.nodeDot, { backgroundColor: theme.colors.accentBrand }]}
                />
                {index < currentDayData.spots.length - 1 && (
                  <View
                    style={[styles.verticalLine, { backgroundColor: theme.colors.borderSubtle }]}
                  />
                )}
              </View>

              {/* Spot Content */}
              <Pressable
                onPress={() => handleSpotPress(spot)}
                accessibilityRole="button"
                accessibilityLabel={`View ${spot.title}`}
                style={[styles.spotCard, { borderBottomColor: theme.colors.borderSubtle }]}
              >
                {spot.image && (
                  <Image source={{ uri: spot.image }} style={styles.spotImage} />
                )}
                <View style={styles.spotDetails}>
                  <Text
                    style={[
                      styles.spotCategory,
                      { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                    ]}
                  >
                    {spot.category.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.spotTitle,
                      { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                    ]}
                  >
                    {spot.title}
                  </Text>
                  {spot.duration && (
                    <Text
                      style={[
                        styles.spotDuration,
                        { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                      ]}
                    >
                      {spot.duration}
                    </Text>
                  )}
                </View>
                <Pressable
                  onPress={() => handleDeleteSpot(spot.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${spot.title}`}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={15} color={theme.colors.textMuted} />
                </Pressable>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        <Button
          title="Add Spot"
          icon={Plus}
          onPress={handleAddPlace}
          variant="secondary"
          style={{ marginTop: 28 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
  addNavBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayStripWrapper: {
    borderBottomWidth: 0.5,
  },
  dayScrollContent: {
    paddingHorizontal: 24,
  },
  dayTab: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 12,
    borderBottomWidth: 2,
    alignItems: 'center',
    minWidth: 48,
  },
  dayTabNum: {
    fontSize: 16,
    marginBottom: 2,
  },
  dayTabDate: {
    fontSize: 11,
  },
  timelineContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  dayHeaderTitleStack: {
    marginBottom: 28,
  },
  dayHeaderOverline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  dayHeaderHeadline: {
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  timelineList: {
    position: 'relative',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  timelineLeftCol: {
    width: 64,
    alignItems: 'center',
    position: 'relative',
    paddingTop: 2,
  },
  timeLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  nodeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  verticalLine: {
    position: 'absolute',
    top: 30,
    bottom: -24,
    width: 1,
  },
  spotCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    paddingLeft: 8,
  },
  spotImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },
  spotDetails: {
    flex: 1,
  },
  spotCategory: {
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 2,
  },
  spotTitle: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 2,
  },
  spotDuration: {
    fontSize: 12,
  },
  deleteBtn: {
    padding: 6,
  },
});
