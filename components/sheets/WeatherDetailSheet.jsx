import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Sun, CloudSun, CloudRain, Wind, Droplets } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { BottomSheetModal } from './BottomSheetModal';

export const WeatherDetailSheet = () => {
  const activeModal = useAppStore((state) => state.activeModal);
  const activeTrip = useAppStore((state) => state.activeTrip);
  const closeModal = useAppStore((state) => state.closeModal);
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  const visible = activeModal === 'weather';
  const weather = activeTrip?.weather;

  if (!weather) return null;

  return (
    <BottomSheetModal visible={visible} onClose={closeModal} maxContainerHeight="85%">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Large Typography Hero Temp */}
        <View style={styles.heroWeather}>
          <Text
            style={[
              styles.locationTitle,
              { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
            ]}
          >
            {weather.city}, {weather.country}
          </Text>

          <View style={styles.tempMainRow}>
            <Text
              style={[
                styles.largeTemp,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              {weather.temp}
            </Text>
            <View style={styles.conditionMeta}>
              <Sun size={32} color={theme.colors.accentBrand} style={{ marginBottom: 4 }} />
              <Text
                style={[
                  styles.conditionText,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium },
                ]}
              >
                {weather.condition}
              </Text>
              <Text
                style={[
                  styles.highLowText,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                H: {weather.high} • L: {weather.low}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* Hourly Forecast Horizontal Strip */}
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansSemiBold },
          ]}
        >
          HOURLY FORECAST
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
          {weather.hourly.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.hourlyCard,
                { backgroundColor: theme.colors.bgSubtle, borderColor: theme.colors.borderSubtle },
              ]}
            >
              <Text
                style={[
                  styles.hourlyTime,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansMedium },
                ]}
              >
                {item.time}
              </Text>
              <Sun size={18} color={theme.colors.accentBrand} style={styles.hourlyIcon} />
              <Text
                style={[
                  styles.hourlyTemp,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {item.temp}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* 7-Day Forecast */}
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansSemiBold },
          ]}
        >
          7-DAY FORECAST
        </Text>

        <View style={styles.weeklyList}>
          {weather.weekly.map((dayItem, idx) => (
            <View
              key={idx}
              style={[
                styles.weeklyRow,
                { borderBottomColor: theme.colors.borderSubtle },
              ]}
            >
              <Text
                style={[
                  styles.weeklyDay,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {dayItem.day} ({dayItem.date})
              </Text>
              <View style={styles.weeklyRight}>
                <Text
                  style={[
                    styles.weeklyCondition,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  {dayItem.condition}
                </Text>
                <Text
                  style={[
                    styles.weeklyTemp,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold },
                  ]}
                >
                  {dayItem.temp}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  heroWeather: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  locationTitle: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  tempMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
  },
  largeTemp: {
    fontSize: 64,
    lineHeight: 70,
    marginRight: 20,
  },
  conditionMeta: {
    justify: 'center',
  },
  conditionText: {
    fontSize: 16,
    marginBottom: 2,
  },
  highLowText: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  hourlyScroll: {
    marginBottom: 4,
  },
  hourlyCard: {
    width: 68,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 10,
  },
  hourlyTime: {
    fontSize: 11,
    marginBottom: 6,
  },
  hourlyIcon: {
    marginBottom: 6,
  },
  hourlyTemp: {
    fontSize: 14,
  },
  weeklyList: {
    marginBottom: 16,
  },
  weeklyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  weeklyDay: {
    fontSize: 14,
  },
  weeklyRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklyCondition: {
    fontSize: 13,
    marginRight: 16,
  },
  weeklyTemp: {
    fontSize: 14,
  },
});
