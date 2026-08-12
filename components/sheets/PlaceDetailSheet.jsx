import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { MapPin, Clock, Star, Heart, Plus } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { BottomSheetModal } from './BottomSheetModal';
import { Button } from '../ui/Button';

export const PlaceDetailSheet = () => {
  const activeModal = useAppStore((state) => state.activeModal);
  const selectedPlace = useAppStore((state) => state.selectedPlace);
  const closeModal = useAppStore((state) => state.closeModal);
  const openModal = useAppStore((state) => state.openModal);
  const toggleSavePlace = useAppStore((state) => state.toggleSavePlace);
  const isPlaceSaved = useAppStore((state) => state.isPlaceSaved);
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  const visible = activeModal === 'placeDetail' && !!selectedPlace;
  if (!selectedPlace) return null;

  const isSaved = isPlaceSaved(selectedPlace.id);

  const handleAddToTrip = () => {
    closeModal();
    openModal('addPlace', { place: selectedPlace, dayNumber: 3 });
  };

  return (
    <BottomSheetModal visible={visible} onClose={closeModal} maxContainerHeight="90%">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Large Dominating Photography */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedPlace.image }} style={styles.image} />
          {selectedPlace.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{selectedPlace.category}</Text>
            </View>
          )}
        </View>

        {/* Place Header */}
        <View style={styles.headerRow}>
          <View style={styles.titleStack}>
            <Text
              style={[
                styles.title,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              {selectedPlace.title}
            </Text>
            {selectedPlace.rating && (
              <View style={styles.ratingRow}>
                <Star size={13} color="#EAB308" fill="#EAB308" style={{ marginRight: 4 }} />
                <Text
                  style={[
                    styles.ratingText,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansMedium },
                  ]}
                >
                  {selectedPlace.rating} rating
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Short Description */}
        <Text
          style={[
            styles.description,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
          ]}
        >
          {selectedPlace.description || selectedPlace.notes || 'Curated travel spot in Kyoto.'}
        </Text>

        {/* Hairline Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* Info Items Rows (Subtle Dividers) */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MapPin size={16} color={theme.colors.accentBrand} style={{ marginRight: 10 }} />
            <Text
              style={[
                styles.infoText,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {selectedPlace.address || `${selectedPlace.city || 'Kyoto'}, Japan`}
            </Text>
          </View>

          {selectedPlace.hours && (
            <View style={styles.infoRow}>
              <Clock size={16} color={theme.colors.accentBrand} style={{ marginRight: 10 }} />
              <Text
                style={[
                  styles.infoText,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                {selectedPlace.hours}
              </Text>
            </View>
          )}
        </View>

        {/* Hairline Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* CTAs */}
        <View style={styles.actionRow}>
          <Button
            title={isSaved ? 'Saved' : 'Save Spot'}
            icon={Heart}
            onPress={() => toggleSavePlace(selectedPlace)}
            variant={isSaved ? 'secondary' : 'secondary'}
            fullWidth={false}
            style={styles.secondarySaveBtn}
          />
          <Button
            title="Add to Itinerary"
            icon={Plus}
            onPress={handleAddToTrip}
            variant="primary"
            fullWidth={false}
            style={styles.primaryAddBtn}
          />
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 220,
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerRow: {
    marginBottom: 8,
  },
  titleStack: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    flex: 1,
    marginRight: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 14,
  },
  infoSection: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginTop: 8,
    marginBottom: 12,
    gap: 12,
  },
  secondarySaveBtn: {
    flex: 1,
  },
  primaryAddBtn: {
    flex: 2,
  },
});
