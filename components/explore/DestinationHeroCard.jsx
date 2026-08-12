import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { MapPin, Compass } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const DestinationHeroCard = ({ destination, onPress, style }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  if (!destination) return null;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, theme.shadows.card, style]}
    >
      <ImageBackground
        source={{ uri: destination.coverImage }}
        style={styles.imageBg}
        imageStyle={{ borderRadius: theme.radii.md }}
      >
        <View style={[styles.scrim, { borderRadius: theme.radii.md }]}>
          <View style={styles.topBadgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{destination.category}</Text>
            </View>
            <View style={styles.tempBadge}>
              <Text style={styles.tempText}>{destination.temperature}</Text>
            </View>
          </View>

          <View style={styles.bottomInfo}>
            <View style={styles.countryRow}>
              <MapPin size={12} color="#E07A5F" style={{ marginRight: 4 }} />
              <Text style={styles.countryText}>{destination.country}</Text>
            </View>
            <Text style={styles.titleText}>{destination.title}</Text>
            <Text numberOfLines={2} style={styles.subtitleText}>
              {destination.subtitle}
            </Text>
            <View style={styles.footerRow}>
              <Text style={styles.bestTimeText}>Best: {destination.bestTime}</Text>
              <Text style={styles.spotCountText}>{destination.spotCount} spots</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.36)',
    padding: 16,
    justifyContent: 'space-between',
  },
  topBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tempBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tempText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomInfo: {
    marginTop: 'auto',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  countryText: {
    color: '#E07A5F',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    marginBottom: 4,
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 8,
  },
  bestTimeText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
  },
  spotCountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
});
