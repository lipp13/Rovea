import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { Card } from '../ui/Card';

export const NextActivityCard = ({ activity, onPress }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  if (!activity) return null;

  return (
    <Card onPress={onPress} style={styles.cardContainer} elevation="subtle">
      <View style={styles.contentRow}>
        <Image source={{ uri: activity.image }} style={styles.image} />
        <View style={styles.infoStack}>
          <View style={styles.timeBadgeRow}>
            <View
              style={[
                styles.timeBadge,
                { backgroundColor: theme.colors.accentSubtle },
              ]}
            >
              <Clock size={12} color={theme.colors.accentBrand} style={{ marginRight: 4 }} />
              <Text
                style={[
                  styles.timeText,
                  { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {activity.time}
              </Text>
            </View>
            <Text
              style={[
                styles.durationText,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {activity.duration}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {activity.title}
          </Text>

          <View style={styles.categoryRow}>
            <MapPin size={12} color={theme.colors.textSecondary} style={{ marginRight: 4 }} />
            <Text
              style={[
                styles.categoryText,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {activity.category}
            </Text>
          </View>

          {activity.notes && (
            <Text
              numberOfLines={1}
              style={[
                styles.notes,
                { color: theme.colors.textMuted, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              "{activity.notes}"
            </Text>
          )}
        </View>

        <View style={styles.arrowContainer}>
          <ChevronRight size={18} color={theme.colors.textSecondary} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 12,
    marginBottom: 24,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
  },
  infoStack: {
    flex: 1,
  },
  timeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  timeText: {
    fontSize: 11,
  },
  durationText: {
    fontSize: 11,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
  },
  notes: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  arrowContainer: {
    paddingLeft: 8,
  },
});
