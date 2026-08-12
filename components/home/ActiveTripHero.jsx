import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { MapPin, Calendar, ArrowRight } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { Button } from '../ui/Button';
import { WeatherPill } from '../ui/WeatherPill';

export const ActiveTripHero = ({ trip, onPlanPress, onWeatherPress }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  if (!trip) return null;

  return (
    <View style={[styles.container, theme.shadows.card]}>
      <ImageBackground
        source={{ uri: trip.coverImage }}
        style={styles.imageBg}
        imageStyle={{ borderRadius: theme.radii.lg }}
      >
        {/* Scrim Overlay */}
        <View
          style={[
            styles.scrim,
            { borderRadius: theme.radii.lg },
          ]}
        >
          {/* Top Bar inside Hero */}
          <View style={styles.topBar}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Day {trip.currentDay} of {trip.totalDays}
              </Text>
            </View>
            <WeatherPill weather={trip.weather} onPress={onWeatherPress} />
          </View>

          {/* Bottom Content inside Hero */}
          <View style={styles.bottomContent}>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#E07A5F" style={{ marginRight: 4 }} />
              <Text style={styles.destinationText}>{trip.destination}</Text>
            </View>

            <Text style={styles.titleText}>{trip.title}</Text>

            <View style={styles.dateRow}>
              <Calendar size={13} color="rgba(255,255,255,0.7)" style={{ marginRight: 6 }} />
              <Text style={styles.dateText}>
                {trip.startDate} – {trip.endDate}
              </Text>
            </View>

            <Button
              title="View Today's Plan"
              icon={ArrowRight}
              onPress={onPlanPress}
              variant="primary"
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 380,
    borderRadius: 16,
    marginBottom: 24,
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justify: 'space-between',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomContent: {
    marginTop: 'auto',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  destinationText: {
    color: '#E07A5F',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
  },
});
