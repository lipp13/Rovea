import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Sun, CloudSun, CloudRain } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const WeatherPill = ({ weather, onPress, style }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  if (!weather) return null;

  const renderIcon = () => {
    switch (weather.icon) {
      case 'Rain':
        return <CloudRain size={16} color={theme.colors.accentBrand} />;
      case 'CloudSun':
        return <CloudSun size={16} color={theme.colors.accentBrand} />;
      default:
        return <Sun size={16} color={theme.colors.accentBrand} />;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      style={[
        styles.pill,
        {
          backgroundColor: theme.colors.bgSubtle,
          borderColor: theme.colors.borderSubtle,
          borderRadius: theme.radii.pill,
        },
        style,
      ]}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <Text style={[styles.tempText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold }]}>
        {weather.temp}
      </Text>
      <Text style={[styles.conditionText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}>
        {weather.condition}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    marginRight: 6,
  },
  tempText: {
    fontSize: 13,
    marginRight: 6,
  },
  conditionText: {
    fontSize: 12,
  },
});
