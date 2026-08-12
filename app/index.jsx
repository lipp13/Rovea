import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);
  const theme = getTheme(themeMode);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(1, { duration: 600 });

    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      <Animated.View style={[styles.logoStack, logoStyle]}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          ROVEA
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansMedium },
          ]}
        >
          Travel, thoughtfully.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStack: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    letterSpacing: 4,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
