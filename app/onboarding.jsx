import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Travel,\nthoughtfully.',
    description:
      'Discover curated destinations, craft day-by-day itineraries, and explore the world at your own pace.',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Sanctuary\nfor wanderlust.',
    description:
      'Keep your trips, spots, daily plans, and expenses beautifully organized without clutter or distraction.',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const themeMode = useAppStore((state) => state.themeMode);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const theme = getTheme(themeMode);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: currentSlide.image }} style={styles.imageBg}>
        <View style={styles.scrim}>
          {/* Top */}
          <Animated.View
            entering={FadeInUp.duration(500)}
            style={[styles.headerBar, { paddingTop: insets.top + 16 }]}
          >
            <Text style={styles.brandTitle}>ROVEA</Text>
            <Pressable
              onPress={handleSkip}
              accessibilityRole="button"
              accessibilityLabel="Skip onboarding"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </Animated.View>

          {/* Bottom */}
          <Animated.View
            key={currentSlide.id}
            entering={FadeInDown.duration(500)}
            style={[styles.bottomCard, { paddingBottom: insets.bottom + 28 }]}
          >
            <Text style={styles.titleText}>{currentSlide.title}</Text>
            <Text style={styles.descText}>{currentSlide.description}</Text>

            {/* Pagination */}
            <View style={styles.paginationRow}>
              {slides.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    idx === currentIndex ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>

            <Button
              title={currentIndex === slides.length - 1 ? 'Begin Journey' : 'Continue'}
              onPress={handleNext}
              variant="primary"
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0E0D',
  },
  imageBg: {
    width,
    height,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.40)',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: 3,
  },
  skipText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomCard: {
    marginTop: 'auto',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 44,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  descText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 28,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  dot: {
    height: 3,
    borderRadius: 1.5,
    marginRight: 6,
  },
  activeDot: {
    width: 28,
    backgroundColor: '#E07A5F',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
});
