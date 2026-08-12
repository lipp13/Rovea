import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const SavedPlacesRow = ({ places, onPlacePress }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);
  const toggleSavePlace = useAppStore((state) => state.toggleSavePlace);

  if (!places || places.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {places.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => onPlacePress && onPlacePress(item)}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.bgSurface,
              borderColor: theme.colors.borderSubtle,
              borderRadius: theme.radii.md,
            },
            theme.shadows.subtle,
          ]}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Pressable
              onPress={() => toggleSavePlace(item)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.heartButton}
            >
              <Heart
                size={16}
                color={item.saved ? theme.colors.accentBrand : '#FFFFFF'}
                fill={item.saved ? theme.colors.accentBrand : 'transparent'}
              />
            </Pressable>
          </View>
          <View style={styles.details}>
            <View style={styles.cityRow}>
              <Text
                style={[
                  styles.cityText,
                  { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {item.city}
              </Text>
              {item.rating && (
                <View style={styles.ratingRow}>
                  <Star size={11} color="#EAB308" fill="#EAB308" style={{ marginRight: 2 }} />
                  <Text
                    style={[
                      styles.ratingText,
                      { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansMedium },
                    ]}
                  >
                    {item.rating}
                  </Text>
                </View>
              )}
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.title,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.category,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {item.category}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  card: {
    width: 170,
    marginRight: 14,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    padding: 10,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  cityText: {
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 2,
  },
  category: {
    fontSize: 11,
  },
});
