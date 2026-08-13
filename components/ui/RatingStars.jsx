import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const RatingStars = ({ rating = 4.8, reviewsCount = null, starSize = 14, style }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  return (
    <View style={[styles.container, style]}>
      <Star size={starSize} color="#E07A5F" fill="#E07A5F" />
      <Text style={[styles.ratingText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold }]}>
        {rating.toFixed(1)}
      </Text>
      {reviewsCount !== null && (
        <Text style={[styles.reviewText, { color: theme.colors.textMuted, fontFamily: theme.fonts.sansRegular }]}>
          ({reviewsCount})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    marginLeft: 2,
  },
  reviewText: {
    fontSize: 12,
  },
});
