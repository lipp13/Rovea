import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Card = ({
  children,
  style,
  onPress,
  variant = 'surface', // 'surface' | 'subtle' | 'outline'
  elevation = 'subtle', // 'none' | 'subtle' | 'card'
}) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!onPress) return;
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    if (!onPress) return;
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'surface':
        return theme.colors.bgSurface;
      case 'subtle':
        return theme.colors.bgSubtle;
      case 'outline':
        return theme.colors.bgSurface;
      default:
        return theme.colors.bgSurface;
    }
  };

  const shadowStyle = elevation !== 'none' ? theme.shadows[elevation] : {};

  const cardContainerStyle = [
    styles.card,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: theme.colors.borderSubtle,
      borderWidth: variant === 'outline' ? 1 : 0.5,
      borderRadius: theme.radii.md,
    },
    shadowStyle,
    style,
  ];

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[cardContainerStyle, animatedStyle]}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return <View style={cardContainerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
