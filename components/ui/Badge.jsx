import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const Badge = ({ label, variant = 'brand', style, textStyle }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          bg: themeMode === 'dark' ? 'rgba(52, 211, 153, 0.15)' : '#E6F4EA',
          text: theme.colors.success,
        };
      case 'subtle':
        return {
          bg: theme.colors.bgSubtle,
          text: theme.colors.textSecondary,
        };
      case 'destructive':
        return {
          bg: themeMode === 'dark' ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2',
          text: theme.colors.destructive,
        };
      case 'brand':
      default:
        return {
          bg: theme.colors.accentSubtle,
          text: theme.colors.accentBrand,
        };
    }
  };

  const colors = getVariantStyles();

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg, borderRadius: theme.radii.pill }, style]}>
      <Text style={[styles.text, { color: colors.text, fontFamily: theme.fonts.sansMedium }, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
