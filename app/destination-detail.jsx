import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Heart, Sun, Calendar, Compass } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

export default function DestinationDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const themeMode = useAppStore((state) => state.themeMode);
  const destinations = useAppStore((state) => state.destinations);
  const openModal = useAppStore((state) => state.openModal);
  const theme = getTheme(themeMode);

  const destId = params.id || 'dest-kyoto';
  const destination = destinations.find((d) => d.id === destId) || destinations[0];

  const handlePlanTrip = () => {
    router.push({
      pathname: '/create-trip',
      params: { destination: `${destination.title}, ${destination.country}` },
    });
  };

  const handlePlacePress = (spot) => {
    openModal('placeDetail', { place: spot });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Full-Bleed Hero */}
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: destination.coverImage }} style={styles.heroImage} />

          {/* Navigation */}
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
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.bodyContent}>
          <Animated.View entering={FadeInUp.duration(400)}>
            <Text style={[styles.countryTag, { color: theme.colors.accentBrand }]}>
              {destination.country.toUpperCase()}
            </Text>
            <Text
              style={[
                styles.destinationTitle,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              {destination.title}
            </Text>
            <Text
              style={[
                styles.editorialSub,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {destination.subtitle}
            </Text>
          </Animated.View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

          {/* Meta Info */}
          <Animated.View entering={FadeInUp.duration(400).delay(80)} style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Calendar size={16} color={theme.colors.accentBrand} style={{ marginBottom: 6 }} />
              <Text
                style={[styles.metaLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}
              >
                Best Time
              </Text>
              <Text
                style={[styles.metaValue, { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium }]}
              >
                {destination.bestTime}
              </Text>
            </View>
            <View style={[styles.verticalDivider, { backgroundColor: theme.colors.borderSubtle }]} />
            <View style={styles.metaItem}>
              <Sun size={16} color={theme.colors.accentBrand} style={{ marginBottom: 6 }} />
              <Text
                style={[styles.metaLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}
              >
                Weather
              </Text>
              <Text
                style={[styles.metaValue, { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium }]}
              >
                {destination.temperature} · {destination.weatherSummary || 'Clear'}
              </Text>
            </View>
          </Animated.View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

          {/* Places to Discover */}
          <Animated.View entering={FadeInDown.duration(400).delay(160)} style={styles.sectionHeader}>
            <Text
              style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}
            >
              PLACES TO DISCOVER
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              Curated in {destination.title}
            </Text>
          </Animated.View>

          {destination.curatedSpots?.map((spot, index) => (
            <Animated.View
              key={spot.id}
              entering={FadeInDown.duration(350).delay(200 + index * 50)}
            >
              <Pressable
                onPress={() => handlePlacePress(spot)}
                accessibilityRole="button"
                accessibilityLabel={`View ${spot.title}`}
                style={[styles.spotRow, { borderBottomColor: theme.colors.borderSubtle }]}
              >
                <Image source={{ uri: spot.image }} style={styles.spotThumbnail} />
                <View style={styles.spotInfo}>
                  <Text
                    style={[
                      styles.spotTitle,
                      { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                    ]}
                  >
                    {spot.title}
                  </Text>
                  <Text
                    style={[
                      styles.spotCategory,
                      { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                    ]}
                  >
                    {spot.category} · {spot.rating} ★
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Floating CTA */}
      <View
        style={[
          styles.ctaDock,
          {
            backgroundColor: theme.colors.bgSurface,
            borderTopColor: theme.colors.borderSubtle,
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        <Button
          title={`Plan a Trip to ${destination.title}`}
          onPress={handlePlanTrip}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImageContainer: {
    height: 400,
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
  bodyContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  countryTag: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  destinationTitle: {
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  editorialSub: {
    fontSize: 15,
    lineHeight: 23,
  },
  divider: {
    height: 0.5,
    width: '100%',
    marginVertical: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  metaItem: {
    flex: 1,
  },
  verticalDivider: {
    width: 0.5,
    height: 48,
    marginHorizontal: 20,
  },
  metaLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionOverline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  spotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  spotThumbnail: {
    width: 68,
    height: 68,
    borderRadius: 10,
    marginRight: 14,
  },
  spotInfo: {
    flex: 1,
  },
  spotTitle: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  spotCategory: {
    fontSize: 13,
  },
  ctaDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    borderTopWidth: 0.5,
  },
});
