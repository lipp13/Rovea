import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { MapPin, Calendar, ArrowRight } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { Button } from '../ui/Button';
import { WeatherPill } from '../ui/WeatherPill';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

export const ActiveTripHero = ({ trip, onPlanPress, onWeatherPress }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  const imageScale = useSharedValue(1.03);
  const imageOpacity = useSharedValue(0.2);

  useEffect(() => {
    imageScale.value = withTiming(1.0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
    imageOpacity.value = withTiming(1.0, {
      duration: 600,
      easing: Easing.ease,
    });
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
    opacity: imageOpacity.value,
  }));

  if (!trip) return null;

  return (
    <View style={[styles.container, theme.shadows.card]}>
      <AnimatedImageBackground
        source={{ uri: trip.coverImage }}
        style={[styles.imageBg, animatedImageStyle]}
        imageStyle={{ borderRadius: theme.radii.lg }}
      >
        {/* Subtle Dark Scrim Overlay */}
        <View style={[styles.scrim, { borderRadius: theme.radii.lg }]}>
          {/* Top Bar inside Hero */}
          <View style={styles.topBar}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Day {trip.currentDay || 3} of {trip.totalDays || 7}
              </Text>
            </View>
            <WeatherPill weather={trip.weather} onPress={onWeatherPress} />
          </View>

          {/* Bottom Content inside Hero */}
          <View style={styles.bottomContent}>
            <View style={styles.locationRow}>
              <MapPin size={13} color="#E07A5F" style={{ marginRight: 4 }} />
              <Text style={styles.destinationText}>{trip.destination}</Text>
            </View>

            <Text style={styles.titleText}>{trip.title}</Text>

            <View style={styles.dateRow}>
              <Calendar size={13} color="rgba(255,255,255,0.75)" style={{ marginRight: 6 }} />
              <Text style={styles.dateText}>
                {trip.startDate} – {trip.endDate}
              </Text>
            </View>

            <Button
              title="View Today's Plan"
              icon={ArrowRight}
              onPress={onPlanPress}
              variant="primary"
              style={{ marginTop: 18 }}
            />
          </View>
        </View>
      </AnimatedImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 420,
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.36)',
    justifyContent: 'space-between',
    padding: 22,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bottomContent: {
    marginTop: 'auto',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  destinationText: {
    color: '#E07A5F',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 40,
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
