import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Calendar, MapPin, Users } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

export default function CreateTripScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const createNewTrip = useAppStore((state) => state.createNewTrip);
  const theme = getTheme(themeMode);

  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('Kyoto, Japan');
  const [startDate, setStartDate] = useState('Oct 12, 2026');
  const [endDate, setEndDate] = useState('Oct 18, 2026');
  const [title, setTitle] = useState('Autumn in Kyoto');
  const [travelers, setTravelers] = useState('Solo Traveler');

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      createNewTrip({
        id: `trip-${Date.now()}`,
        title: title || 'New Trip',
        destination,
        startDate,
        endDate,
        totalDays: 7,
        coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        status: 'Upcoming',
      });

      Alert.alert('Trip Created', `"${title}" has been added to your itinerary hub.`);
      router.replace('/trip-overview');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
    else router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      {/* Top Navigation */}
      <View style={[styles.headerNav, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={[styles.stepIndicator, { color: theme.colors.textSecondary }]}>
          Step {step} of 3
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Destination */}
        {step === 1 && (
          <Animated.View entering={FadeInRight.duration(300)} style={styles.stepContainer}>
            <Text
              style={[
                styles.stepTag,
                { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
              ]}
            >
              DESTINATION
            </Text>
            <Text
              style={[
                styles.headline,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              Where to next?
            </Text>
            <Text style={[styles.subheadline, { color: theme.colors.textSecondary }]}>
              Enter the city or country you plan to explore.
            </Text>

            <View
              style={[
                styles.inputWrapper,
                { borderColor: theme.colors.accentBrand, backgroundColor: theme.colors.bgSurface },
              ]}
            >
              <MapPin size={20} color={theme.colors.accentBrand} style={{ marginRight: 12 }} />
              <TextInput
                value={destination}
                onChangeText={setDestination}
                placeholder="e.g., Kyoto, Japan"
                placeholderTextColor={theme.colors.textMuted}
                style={[
                  styles.inputField,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
                ]}
              />
            </View>
          </Animated.View>
        )}

        {/* Step 2: Dates */}
        {step === 2 && (
          <Animated.View entering={FadeInRight.duration(300)} style={styles.stepContainer}>
            <Text
              style={[
                styles.stepTag,
                { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
              ]}
            >
              TRAVEL DATES
            </Text>
            <Text
              style={[
                styles.headline,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              When are you wandering?
            </Text>
            <Text style={[styles.subheadline, { color: theme.colors.textSecondary }]}>
              Select your start and end dates for {destination}.
            </Text>

            <View style={styles.dateInputsRow}>
              <View style={styles.dateBlock}>
                <Text style={[styles.dateLabel, { color: theme.colors.textSecondary }]}>
                  START DATE
                </Text>
                <TextInput
                  value={startDate}
                  onChangeText={setStartDate}
                  style={[
                    styles.dateInput,
                    {
                      color: theme.colors.textPrimary,
                      borderColor: theme.colors.borderSubtle,
                      backgroundColor: theme.colors.bgSurface,
                    },
                  ]}
                />
              </View>
              <View style={styles.dateBlock}>
                <Text style={[styles.dateLabel, { color: theme.colors.textSecondary }]}>
                  END DATE
                </Text>
                <TextInput
                  value={endDate}
                  onChangeText={setEndDate}
                  style={[
                    styles.dateInput,
                    {
                      color: theme.colors.textPrimary,
                      borderColor: theme.colors.borderSubtle,
                      backgroundColor: theme.colors.bgSurface,
                    },
                  ]}
                />
              </View>
            </View>
          </Animated.View>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <Animated.View entering={FadeInRight.duration(300)} style={styles.stepContainer}>
            <Text
              style={[
                styles.stepTag,
                { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
              ]}
            >
              TRIP DETAILS
            </Text>
            <Text
              style={[
                styles.headline,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              Name your journey
            </Text>
            <Text style={[styles.subheadline, { color: theme.colors.textSecondary }]}>
              Give your trip an editorial title to inspire your planning.
            </Text>

            <View
              style={[
                styles.inputWrapper,
                { borderColor: theme.colors.borderSubtle, backgroundColor: theme.colors.bgSurface, marginBottom: 20 },
              ]}
            >
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g., Autumn in Kyoto"
                placeholderTextColor={theme.colors.textMuted}
                style={[
                  styles.inputField,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
                ]}
              />
            </View>

            <Text style={[styles.dateLabel, { color: theme.colors.textSecondary, marginBottom: 8 }]}>
              WHO IS TRAVELING?
            </Text>
            <View style={styles.travelerOptions}>
              {['Solo Traveler', 'Couple', 'Small Group'].map((opt) => (
                <Pressable
                  key={opt}
                  onPress={() => setTravelers(opt)}
                  style={[
                    styles.travelerChip,
                    {
                      backgroundColor:
                        travelers === opt
                          ? theme.colors.accentSubtle
                          : theme.colors.bgSurface,
                      borderColor:
                        travelers === opt
                          ? theme.colors.accentBrand
                          : theme.colors.borderSubtle,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        travelers === opt
                          ? theme.colors.accentBrand
                          : theme.colors.textPrimary,
                      fontFamily:
                        travelers === opt
                          ? theme.fonts.sansSemiBold
                          : theme.fonts.sansRegular,
                      fontSize: 13,
                    }}
                  >
                    {opt}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Bottom CTA Bar */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, 16), backgroundColor: theme.colors.bgPrimary },
        ]}
      >
        <Button
          title={step === 3 ? 'Create Itinerary' : 'Continue'}
          onPress={handleNext}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 20,
  },
  stepIndicator: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  contentScroll: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  stepContainer: {
    paddingTop: 8,
  },
  stepTag: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  headline: {
    fontSize: 34,
    lineHeight: 40,
    marginBottom: 10,
  },
  subheadline: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  inputField: {
    flex: 1,
    fontSize: 18,
  },
  dateInputsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateBlock: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 6,
  },
  dateInput: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  travelerOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  travelerChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  bottomDock: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});
