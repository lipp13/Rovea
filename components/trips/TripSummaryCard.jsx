import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Calendar, MapPin, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { Card } from '../ui/Card';

export const TripSummaryCard = ({ trip, onPress }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  if (!trip) return null;

  const isCompleted = trip.status === 'Completed';

  return (
    <Card onPress={onPress} style={styles.card} elevation="subtle">
      <View style={styles.contentRow}>
        <Image source={{ uri: trip.coverImage }} style={styles.coverImage} />
        <View style={styles.details}>
          <View style={styles.statusBadgeRow}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isCompleted
                    ? theme.colors.bgSubtle
                    : theme.colors.accentSubtle,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: isCompleted
                      ? theme.colors.textSecondary
                      : theme.colors.accentBrand,
                    fontFamily: theme.fonts.sansSemiBold,
                  },
                ]}
              >
                {trip.status || 'Active'}
              </Text>
            </View>
            <Text
              style={[
                styles.durationText,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {trip.totalDays} Days
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {trip.title}
          </Text>

          <View style={styles.locationRow}>
            <MapPin size={12} color={theme.colors.accentBrand} style={{ marginRight: 4 }} />
            <Text
              style={[
                styles.destinationText,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansMedium },
              ]}
            >
              {trip.destination}
            </Text>
          </View>

          <View style={styles.dateRow}>
            <Calendar size={12} color={theme.colors.textMuted} style={{ marginRight: 4 }} />
            <Text
              style={[
                styles.dateText,
                { color: theme.colors.textMuted, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {trip.startDate}
            </Text>
          </View>
        </View>
        <View style={styles.arrowIcon}>
          <ChevronRight size={18} color={theme.colors.textSecondary} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: 84,
    height: 84,
    borderRadius: 10,
    marginRight: 14,
  },
  details: {
    flex: 1,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  statusText: {
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  durationText: {
    fontSize: 11,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  destinationText: {
    fontSize: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
  },
  arrowIcon: {
    paddingLeft: 6,
  },
});
