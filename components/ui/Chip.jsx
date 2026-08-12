import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const Chip = ({ label, active = false, onPress, icon: Icon, style }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (onPress) onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      style={[
        styles.chip,
        {
          backgroundColor: active ? theme.colors.accentBrand : 'transparent',
          borderColor: active ? theme.colors.accentBrand : theme.colors.borderSubtle,
          borderRadius: theme.radii.pill,
        },
        style,
      ]}
    >
      {Icon && (
        <Icon
          size={13}
          color={active ? '#FFFFFF' : theme.colors.textSecondary}
          style={styles.iconMargin}
        />
      )}
      <Text
        style={[
          styles.label,
          {
            color: active ? '#FFFFFF' : theme.colors.textPrimary,
            fontFamily: active ? theme.fonts.sansSemiBold : theme.fonts.sansMedium,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 13,
    letterSpacing: 0.1,
  },
  iconMargin: {
    marginRight: 5,
  },
});
