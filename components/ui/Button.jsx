import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'icon'
  icon: Icon,
  style,
  textStyle,
  disabled = false,
  fullWidth = true,
}) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (onPress) onPress();
  };

  const getContainerStyle = () => {
    const base = [styles.baseButton, { borderRadius: theme.radii.pill }];

    if (fullWidth && variant !== 'icon') {
      base.push(styles.fullWidth);
    }

    switch (variant) {
      case 'primary':
        return [
          ...base,
          { backgroundColor: theme.colors.accentBrand, height: 52 },
          disabled && { opacity: 0.5 },
        ];
      case 'secondary':
        return [
          ...base,
          {
            backgroundColor: theme.colors.bgSubtle,
            borderColor: theme.colors.borderSubtle,
            borderWidth: 1,
            height: 48,
          },
          disabled && { opacity: 0.5 },
        ];
      case 'ghost':
        return [
          ...base,
          { backgroundColor: 'transparent', height: 44, paddingHorizontal: 12 },
        ];
      case 'icon':
        return [
          styles.iconButton,
          {
            backgroundColor: theme.colors.bgSurface,
            borderColor: theme.colors.borderSubtle,
            borderWidth: 1,
            borderRadius: theme.radii.pill,
          },
          theme.shadows.subtle,
        ];
      default:
        return base;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          color: '#FFFFFF',
          fontFamily: theme.fonts.sansSemiBold,
          fontSize: 15,
        };
      case 'secondary':
        return {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.sansMedium,
          fontSize: 14,
        };
      case 'ghost':
        return {
          color: theme.colors.accentBrand,
          fontFamily: theme.fonts.sansMedium,
          fontSize: 14,
        };
      default:
        return {};
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={[getContainerStyle(), animatedStyle, style]}
    >
      {Icon && (
        <View style={variant !== 'icon' ? styles.iconMargin : null}>
          <Icon
            size={variant === 'icon' ? 20 : 18}
            color={
              variant === 'primary'
                ? '#FFFFFF'
                : variant === 'ghost'
                ? theme.colors.accentBrand
                : theme.colors.textPrimary
            }
          />
        </View>
      )}
      {variant !== 'icon' && title && (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    minHeight: 44,
  },
  fullWidth: {
    width: '100%',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMargin: {
    marginRight: 8,
  },
});
