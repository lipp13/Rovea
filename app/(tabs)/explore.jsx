import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Chip } from '../../components/ui/Chip';
import { DestinationHeroCard } from '../../components/explore/DestinationHeroCard';
import { exploreCategories } from '../../data/mockData';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const themeMode = useAppStore((state) => state.themeMode);
  const destinations = useAppStore((state) => state.destinations);
  const theme = getTheme(themeMode);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = destinations.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleDestinationPress = (destination) => {
    Alert.alert(
      `${destination.title}, ${destination.country}`,
      `"${destination.subtitle}"\n\nCategory: ${destination.category}\nBest Time: ${destination.bestTime}\nCurated Spots: ${destination.spotCount}`,
      [
        { text: 'Close', style: 'cancel' },
        {
          text: 'Plan a Trip Here',
          onPress: () =>
            Alert.alert(
              'Create Trip',
              `Trip creation pre-filled for ${destination.title}. (Available in Phase 2)`
            ),
        },
      ]
    );
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
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.headerStack}>
        <Text
          style={[
            styles.overline,
            { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
          ]}
        >
          CURATED GUIDES
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
          Made for slow wanderlust, rich culture, and thoughtful travel.
        </Text>
      </Animated.View>

      {/* Search Input Bar */}
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

      {/* Category Chips Horizontal Scroll */}
      <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.categoryRow}>
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

      {/* Destination Grid */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)}>
        <SectionHeader
          overline="HANDPICKED"
          title={`Destinations (${filteredDestinations.length})`}
        />

        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest) => (
            <DestinationHeroCard
              key={dest.id}
              destination={dest}
              onPress={() => handleDestinationPress(dest)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
              No destinations found
            </Text>
            <Text style={[styles.emptySub, { color: theme.colors.textSecondary }]}>
              Try tweaking your search query or selected category filter.
            </Text>
          </View>
        )}
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
    marginBottom: 16,
  },
  overline: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
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
    marginBottom: 20,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
  },
});
