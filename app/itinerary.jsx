import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Clock, MapPin, ChevronRight, Trash2 } from 'lucide-react-native';
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
      {/* Top Header Bar */}
      <View style={[styles.headerNav, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold }]}>
          Daily Itinerary
        </Text>
        <Pressable
          onPress={handleAddPlace}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.addNavBtn}
        >
          <Plus size={20} color={theme.colors.accentBrand} />
        </Pressable>
      </View>

      {/* Horizontal Day Selector Strip */}
      <View style={[styles.dayStripWrapper, { borderBottomColor: theme.colors.borderSubtle }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayScrollContent}>
          {itineraryDays.map((day) => {
            const isActive = day.dayNumber === selectedDayNumber;
            return (
              <Pressable
                key={day.dayNumber}
                onPress={() => handleDaySelect(day.dayNumber)}
                style={[
                  styles.dayTab,
                  {
                    borderBottomColor: isActive ? theme.colors.accentBrand : 'transparent',
                  },
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
                  DAY {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
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

      {/* Timeline Content View */}
      <ScrollView
        contentContainerStyle={[styles.timelineContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Header Title */}
        <Animated.View entering={FadeInUp.duration(300)} style={styles.dayHeaderTitleStack}>
          <Text style={[styles.dayHeaderOverline, { color: theme.colors.accentBrand }]}>
            DAY {currentDayData.dayNumber < 10 ? `0${currentDayData.dayNumber}` : currentDayData.dayNumber} • {currentDayData.dateLabel}
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
              entering={FadeInDown.duration(400).delay(index * 60)}
              style={styles.timelineRow}
            >
              {/* Left Column: Time & Subtle Node Line */}
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
                  style={[
                    styles.nodeDot,
                    { backgroundColor: theme.colors.accentBrand },
                  ]}
                />
                {index < currentDayData.spots.length - 1 && (
                  <View style={[styles.verticalLine, { backgroundColor: theme.colors.borderSubtle }]} />
                )}
              </View>

              {/* Right Column: Spot Card Content */}
              <Pressable
                onPress={() => handleSpotPress(spot)}
                style={[
                  styles.spotCard,
                  { borderBottomColor: theme.colors.borderSubtle },
                ]}
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
                      Duration: {spot.duration}
                    </Text>
                  )}
                </View>
                <Pressable
                  onPress={() => handleDeleteSpot(spot.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  style={{ padding: 4 }}
                >
                  <Trash2 size={16} color={theme.colors.textMuted} />
                </Pressable>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Add Spot Button at end of timeline */}
        <Button
          title={`Add Spot to Day ${selectedDayNumber}`}
          icon={Plus}
          onPress={handleAddPlace}
          variant="secondary"
          style={{ marginTop: 24 }}
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
  addNavBtn: {
    padding: 4,
  },
  dayStripWrapper: {
    borderBottomWidth: 1,
  },
  dayScrollContent: {
    paddingHorizontal: 20,
  },
  dayTab: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 16,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  dayTabNum: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 2,
  },
  dayTabDate: {
    fontSize: 12,
  },
  timelineContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  dayHeaderTitleStack: {
    marginBottom: 24,
  },
  dayHeaderOverline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  dayHeaderHeadline: {
    fontSize: 26,
    lineHeight: 32,
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
    width: 68,
    alignItems: 'center',
    position: 'relative',
    paddingTop: 2,
  },
  timeLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  nodeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  verticalLine: {
    position: 'absolute',
    top: 30,
    bottom: -24,
    width: 1.5,
  },
  spotCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
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
    marginBottom: 2,
  },
  spotDuration: {
    fontSize: 12,
  },
});
