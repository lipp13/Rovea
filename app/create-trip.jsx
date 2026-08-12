import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Check, Calendar, MapPin, Users, AlertCircle } from 'lucide-react-native';
import Animated, { FadeInRight, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

export default function CreateTripScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const themeMode = useAppStore((state) => state.themeMode);
  const destinations = useAppStore((state) => state.destinations);
  const createTrip = useAppStore((state) => state.createTrip);
  const theme = getTheme(themeMode);

  const initialDest = params.destination || 'Kyoto, Japan';

  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState(initialDest);
  const [startDate, setStartDate] = useState('Oct 12, 2026');
  const [endDate, setEndDate] = useState('Oct 18, 2026');
  const [title, setTitle] = useState(`Trip to ${initialDest.split(',')[0]}`);
  const [travelers, setTravelers] = useState('Solo Traveler');
  const [validationError, setValidationError] = useState('');

  const handleNext = () => {
    setValidationError('');

    if (step === 1) {
      if (!destination.trim()) {
        setValidationError('Please enter or select a destination.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!startDate.trim() || !endDate.trim()) {
        setValidationError('Please specify both start and end dates.');
        return;
      }
      setStep(3);
    } else {
      // Step 3 Submit
      const created = createTrip({
        title: title || `Wanderlust in ${destination.split(',')[0]}`,
        destination,
        country: destination.includes(',') ? destination.split(',')[1].trim() : 'Japan',
        startDate,
        endDate,
        year: '2026',
        totalDays: 7,
      });

      router.replace('/trip-overview');
    }
  };

  const handleBack = () => {
    setValidationError('');
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
        {/* Inline Error Banner if Validation Fails */}
        {validationError !== '' && (
          <Animated.View
            entering={FadeInDown.duration(200)}
            style={[
              styles.errorBanner,
              { backgroundColor: theme.colors.accentSubtle, borderColor: theme.colors.accentBrand },
            ]}
          >
            <AlertCircle size={16} color={theme.colors.accentBrand} style={{ marginRight: 8 }} />
            <Text style={[styles.errorText, { color: theme.colors.accentBrand }]}>
              {validationError}
            </Text>
          </Animated.View>
        )}

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
              Where are you wandering?
            </Text>
            <Text style={[styles.subheadline, { color: theme.colors.textSecondary }]}>
              Enter or select a curated destination to build your itinerary.
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
                onChangeText={(text) => {
                  setDestination(text);
                  setTitle(`Trip to ${text.split(',')[0]}`);
                }}
                placeholder="e.g. Kyoto, Japan"
                placeholderTextColor={theme.colors.textMuted}
                style={[
                  styles.inputField,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
                ]}
              />
            </View>

            {/* Destination Presets */}
            <Text style={[styles.presetLabel, { color: theme.colors.textSecondary }]}>
              SUGGESTED RETREATS
            </Text>
            <View style={styles.presetList}>
              {destinations.map((d) => (
                <Pressable
                  key={d.id}
                  onPress={() => {
                    const full = `${d.title}, ${d.country}`;
                    setDestination(full);
                    setTitle(`Trip to ${d.title}`);
                  }}
                  style={[
                    styles.presetChip,
                    {
                      backgroundColor:
                        destination.includes(d.title)
                          ? theme.colors.accentSubtle
                          : theme.colors.bgSurface,
                      borderColor:
                        destination.includes(d.title)
                          ? theme.colors.accentBrand
                          : theme.colors.borderSubtle,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: destination.includes(d.title)
                        ? theme.colors.accentBrand
                        : theme.colors.textPrimary,
                      fontFamily: theme.fonts.sansMedium,
                      fontSize: 13,
                    }}
                  >
                    {d.title}, {d.country}
                  </Text>
                </Pressable>
              ))}
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
              When are you traveling?
            </Text>
            <Text style={[styles.subheadline, { color: theme.colors.textSecondary }]}>
              Select departure and return dates for {destination}.
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
              Title your retreat
            </Text>
            <Text style={[styles.subheadline, { color: theme.colors.textSecondary }]}>
              Name your journey and specify your travel party style.
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
                placeholder="e.g. Autumn in Kyoto"
                placeholderTextColor={theme.colors.textMuted}
                style={[
                  styles.inputField,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
                ]}
              />
            </View>

            <Text style={[styles.dateLabel, { color: theme.colors.textSecondary, marginBottom: 8 }]}>
              TRAVEL PARTY
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

      {/* Bottom Action CTA Dock */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, 16), backgroundColor: theme.colors.bgPrimary },
        ]}
      >
        <Button
          title={step === 3 ? 'Create & Open Trip' : 'Continue'}
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
    marginBottom: 16,
  },
  stepIndicator: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  contentScroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
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
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
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
    fontSize: 17,
  },
  presetLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 10,
  },
  presetList: {
    gap: 8,
  },
  presetChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
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
