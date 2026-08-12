import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Travel, thoughtfully.',
    description:
      'Discover curated destinations, craft day-by-day itineraries, and explore the world at your own pace.',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    tag: 'EDITORIAL CURATION',
  },
  {
    id: 2,
    title: 'Sanctuary for wanderlust.',
    description:
      'Keep your trips, spots, daily plans, and expenses beautifully organized without clutter or distraction.',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    tag: 'SERENE PLANNING',
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
        {/* Dark Scrim */}
        <View style={styles.scrim}>
          {/* Header Bar */}
          <View style={[styles.headerBar, { paddingTop: insets.top + 12 }]}>
            <Text style={styles.brandTitle}>ROVEA</Text>
            <Pressable onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>

          {/* Bottom Card Content */}
          <Animated.View
            key={currentSlide.id}
            entering={FadeInDown.duration(400)}
            style={[styles.bottomCard, { paddingBottom: insets.bottom + 24 }]}
          >
            <Text style={styles.tagText}>{currentSlide.tag}</Text>
            <Text style={styles.titleText}>{currentSlide.title}</Text>
            <Text style={styles.descText}>{currentSlide.description}</Text>

            {/* Pagination Dots */}
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
    backgroundColor: '#141211',
  },
  imageBg: {
    width,
    height,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: 2,
  },
  skipText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomCard: {
    marginTop: 'auto',
  },
  tagText: {
    color: '#E07A5F',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 40,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    marginBottom: 12,
  },
  descText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginRight: 6,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#E07A5F',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
