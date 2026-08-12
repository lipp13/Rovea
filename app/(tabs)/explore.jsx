import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, MapPin, ArrowRight } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Chip } from '../../components/ui/Chip';
import { exploreCategories } from '../../data/mockData';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const destinations = useAppStore((state) => state.destinations);
  const theme = getTheme(themeMode);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDestination = destinations[0]; // Kyoto
  const otherDestinations = destinations.slice(1);

  const filteredDestinations = destinations.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category.includes(selectedCategory);
    const matchesQuery =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleDestinationPress = (dest) => {
    router.push({
      pathname: '/destination-detail',
      params: { id: dest.id },
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 90 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Editorial Header */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.headerStack}>
        <Text style={[styles.overline, { color: theme.colors.accentBrand }]}>
          EDITORIAL JOURNAL
        </Text>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Explore Destinations
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
          ]}
        >
          Curated guides for slow wanderlust and authentic local culture.
        </Text>
      </Animated.View>

      {/* Minimal Search Bar */}
      <Animated.View entering={FadeInUp.duration(400).delay(100)} style={styles.searchRow}>
        <View
          style={[
            styles.searchInputContainer,
            {
              backgroundColor: theme.colors.bgSurface,
              borderColor: theme.colors.borderSubtle,
              borderRadius: theme.radii.pill,
            },
            theme.shadows.subtle,
          ]}
        >
          <Search size={18} color={theme.colors.textSecondary} style={{ marginRight: 10 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search cities, countries, categories..."
            placeholderTextColor={theme.colors.textMuted}
            style={[
              styles.searchInput,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansRegular },
            ]}
          />
        </View>
      </Animated.View>

      {/* Minimal Category Chips */}
      <Animated.View entering={FadeInUp.duration(400).delay(150)} style={styles.categoryRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {exploreCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              active={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>
      </Animated.View>

      {/* FEATURED DESTINATION (Magazine Cover Style) */}
      {!searchQuery && selectedCategory === 'All' && featuredDestination && (
        <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.featuredSection}>
          <Pressable onPress={() => handleDestinationPress(featuredDestination)}>
            <View style={styles.featuredImageContainer}>
              <Image
                source={{ uri: featuredDestination.coverImage }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredTag}>
                <Text style={styles.featuredTagText}>FEATURED STORY</Text>
              </View>
            </View>

            <View style={styles.featuredTextStack}>
              <Text style={[styles.featuredCountry, { color: theme.colors.accentBrand }]}>
                {featuredDestination.country.toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.featuredTitle,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                ]}
              >
                {featuredDestination.title}
              </Text>
              <Text
                style={[
                  styles.featuredSub,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                {featuredDestination.subtitle}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      )}

      {/* Hairline Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

      {/* CURATED DESTINATIONS (Editorial Photography List - No SaaS Cards) */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)}>
        <SectionHeader
          overline="COLLECTION"
          title={`All Destinations (${filteredDestinations.length})`}
        />

        {filteredDestinations.map((dest) => (
          <Pressable
            key={dest.id}
            onPress={() => handleDestinationPress(dest)}
            style={[styles.editorialDestRow, { borderBottomColor: theme.colors.borderSubtle }]}
          >
            <Image source={{ uri: dest.coverImage }} style={styles.destThumbnail} />
            <View style={styles.destInfoStack}>
              <Text style={[styles.destCountry, { color: theme.colors.accentBrand }]}>
                {dest.country.toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.destTitle,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                ]}
              >
                {dest.title}
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.destSub,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                {dest.subtitle}
              </Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </Pressable>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  headerStack: {
    marginBottom: 20,
  },
  overline: {
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  searchRow: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  categoryRow: {
    marginBottom: 24,
  },
  featuredSection: {
    marginBottom: 24,
  },
  featuredImageContainer: {
    height: 320,
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredTag: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  featuredTextStack: {
    paddingHorizontal: 4,
  },
  featuredCountry: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 6,
  },
  featuredSub: {
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 24,
  },
  editorialDestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  destThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  destInfoStack: {
    flex: 1,
    paddingRight: 12,
  },
  destCountry: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  destTitle: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 4,
  },
  destSub: {
    fontSize: 13,
    lineHeight: 18,
  },
});
