import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, ArrowRight } from 'lucide-react-native';
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

  const featuredDestination = destinations[0];
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
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Editorial Header */}
      <Animated.View entering={FadeInUp.duration(450)} style={styles.headerStack}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Explore
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
          ]}
        >
          Find somewhere worth going.
        </Text>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View entering={FadeInUp.duration(400).delay(80)} style={styles.searchRow}>
        <View
          style={[
            styles.searchInputContainer,
            {
              backgroundColor: theme.colors.bgSurface,
              borderColor: theme.colors.borderSubtle,
              borderRadius: theme.radii.pill,
            },
          ]}
        >
          <Search size={18} color={theme.colors.textMuted} style={{ marginRight: 10 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search cities, countries..."
            placeholderTextColor={theme.colors.textMuted}
            style={[
              styles.searchInput,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansRegular },
            ]}
            returnKeyType="search"
          />
        </View>
      </Animated.View>

      {/* Category Chips */}
      <Animated.View entering={FadeInUp.duration(400).delay(120)} style={styles.categoryRow}>
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

      {/* Featured Destination — magazine cover */}
      {!searchQuery && selectedCategory === 'All' && featuredDestination && (
        <Animated.View entering={FadeInUp.duration(500).delay(180)} style={styles.featuredSection}>
          <Pressable
            onPress={() => handleDestinationPress(featuredDestination)}
            accessibilityRole="button"
            accessibilityLabel={`View ${featuredDestination.title}`}
          >
            <View style={styles.featuredImageContainer}>
              <Image
                source={{ uri: featuredDestination.coverImage }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredScrim}>
                <View style={styles.featuredTag}>
                  <Text style={styles.featuredTagText}>FEATURED</Text>
                </View>
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

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

      {/* All Destinations */}
      <Animated.View entering={FadeInDown.duration(400).delay(260)}>
        <SectionHeader
          overline="COLLECTION"
          title={`All Destinations`}
        />

        {filteredDestinations.map((dest, index) => (
          <Animated.View
            key={dest.id}
            entering={FadeInDown.duration(350).delay(280 + index * 40)}
          >
            <Pressable
              onPress={() => handleDestinationPress(dest)}
              accessibilityRole="button"
              accessibilityLabel={`View ${dest.title} in ${dest.country}`}
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
              <ArrowRight size={16} color={theme.colors.textMuted} />
            </Pressable>
          </Animated.View>
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
    paddingHorizontal: 24,
  },
  headerStack: {
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  searchRow: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 46,
    borderWidth: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  categoryRow: {
    marginBottom: 28,
  },
  featuredSection: {
    marginBottom: 8,
  },
  featuredImageContainer: {
    height: 340,
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
  featuredScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  featuredTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  featuredTextStack: {
    paddingHorizontal: 2,
  },
  featuredCountry: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  featuredSub: {
    fontSize: 14,
    lineHeight: 21,
  },
  divider: {
    height: 0.5,
    width: '100%',
    marginVertical: 28,
  },
  editorialDestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 0.5,
  },
  destThumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginRight: 16,
  },
  destInfoStack: {
    flex: 1,
    paddingRight: 12,
  },
  destCountry: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 3,
  },
  destTitle: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 4,
  },
  destSub: {
    fontSize: 13,
    lineHeight: 18,
  },
});
