import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Heart, Sun, MapPin, Calendar, Compass, Plus } from 'lucide-react-native';
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

  // Dynamic destination lookup by param id
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
        {/* Large Full-Bleed Destination Image Header */}
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: destination.coverImage }} style={styles.heroImage} />

          {/* Top Bar Header Navigation */}
          <View style={[styles.navHeader, { paddingTop: insets.top + 8 }]}>
            <Pressable
              onPress={() => router.back()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.backButton}
            >
              <ArrowLeft size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Content Body (Editorial Typography & Whitespace - No Card Containers) */}
        <View style={styles.bodyContent}>
          {/* Country Tag */}
          <Text style={[styles.countryTag, { color: theme.colors.accentBrand }]}>
            {destination.country.toUpperCase()} • {destination.category.toUpperCase()}
          </Text>

          {/* Title */}
          <Text
            style={[
              styles.destinationTitle,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {destination.title}
          </Text>

          {/* Editorial Description */}
          <Text
            style={[
              styles.editorialSub,
              { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
            ]}
          >
            {destination.subtitle}
          </Text>

          {/* Subtle Hairline Divider */}
          <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

          {/* Meta Info Section (Best Time & Weather) */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Calendar size={16} color={theme.colors.accentBrand} style={{ marginBottom: 6 }} />
              <Text
                style={[
                  styles.metaLabel,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                Best Time to Visit
              </Text>
              <Text
                style={[
                  styles.metaValue,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {destination.bestTime}
              </Text>
            </View>

            <View style={[styles.verticalDivider, { backgroundColor: theme.colors.borderSubtle }]} />

            <View style={styles.metaItem}>
              <Sun size={16} color={theme.colors.accentBrand} style={{ marginBottom: 6 }} />
              <Text
                style={[
                  styles.metaLabel,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                Current Weather
              </Text>
              <Text
                style={[
                  styles.metaValue,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {destination.temperature} • {destination.weatherSummary || 'Clear'}
              </Text>
            </View>
          </View>

          {/* Subtle Hairline Divider */}
          <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

          {/* Curated Places Section (Editorial List) */}
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionOverline,
                { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
              ]}
            >
              PLACES TO DISCOVER
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              Curated Highlights in {destination.title}
            </Text>
          </View>

          {destination.curatedSpots?.map((spot) => (
            <Pressable
              key={spot.id}
              onPress={() => handlePlacePress(spot)}
              style={[
                styles.spotRow,
                { borderBottomColor: theme.colors.borderSubtle },
              ]}
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
                  {spot.category} • Rating {spot.rating}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Floating Bottom CTA Dock */}
      <View
        style={[
          styles.ctaDock,
          {
            backgroundColor: theme.colors.bgSurface,
            borderTopColor: theme.colors.borderSubtle,
            paddingBottom: Math.max(insets.bottom, 14),
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
    justify: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justify: 'center',
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  countryTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  destinationTitle: {
    fontSize: 36,
    lineHeight: 42,
    marginBottom: 10,
  },
  editorialSub: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-around',
  },
  metaItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  verticalDivider: {
    width: 1,
    height: 40,
    marginHorizontal: 16,
  },
  metaLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 13,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionOverline: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 22,
  },
  spotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  spotThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 14,
  },
  spotInfo: {
    flex: 1,
  },
  spotTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  spotCategory: {
    fontSize: 12,
  },
  ctaDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});
