import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TextInput } from 'react-native';
import { Search, Plus, Check } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { BottomSheetModal } from './BottomSheetModal';
import { Chip } from '../ui/Chip';

export const AddPlaceSheet = () => {
  const activeModal = useAppStore((state) => state.activeModal);
  const selectedPlace = useAppStore((state) => state.selectedPlace);
  const targetDayForAdd = useAppStore((state) => state.targetDayForAdd);
  const closeModal = useAppStore((state) => state.closeModal);
  const addPlaceToDay = useAppStore((state) => state.addPlaceToDay);
  const savedPlaces = useAppStore((state) => state.savedPlaces);
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  const [activeTab, setActiveTab] = useState('Saved'); // 'Saved' | 'Search'
  const [searchQuery, setSearchQuery] = useState('');

  const visible = activeModal === 'addPlace';

  const placesList = activeTab === 'Saved' ? savedPlaces : savedPlaces;
  const filteredList = placesList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPlace = (place) => {
    addPlaceToDay(targetDayForAdd, place);
  };

  return (
    <BottomSheetModal visible={visible} onClose={closeModal} maxContainerHeight="85%">
      <View style={styles.headerStack}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Add Place to Day {targetDayForAdd}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
          ]}
        >
          Select from your saved bookmarks or search places in Kyoto.
        </Text>

        {/* Tab Selection */}
        <View style={styles.tabRow}>
          <Chip
            label="Saved Bookmarks"
            active={activeTab === 'Saved'}
            onPress={() => setActiveTab('Saved')}
          />
          <Chip
            label="Search All Spots"
            active={activeTab === 'Search'}
            onPress={() => setActiveTab('Search')}
          />
        </View>

        {/* Search Bar if Search tab active */}
        {activeTab === 'Search' && (
          <View
            style={[
              styles.searchBar,
              { backgroundColor: theme.colors.bgSubtle, borderColor: theme.colors.borderSubtle },
            ]}
          >
            <Search size={16} color={theme.colors.textSecondary} style={{ marginRight: 8 }} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search spots..."
              placeholderTextColor={theme.colors.textMuted}
              style={[
                styles.searchInput,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansRegular },
              ]}
            />
          </View>
        )}
      </View>

      <ScrollView style={styles.listScrollView} showsVerticalScrollIndicator={false}>
        {filteredList.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handleSelectPlace(item)}
            style={[
              styles.placeItemRow,
              { borderBottomColor: theme.colors.borderSubtle },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text
                numberOfLines={1}
                style={[
                  styles.itemTitle,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.itemSub,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                ]}
              >
                {item.category} • {item.city || 'Kyoto'}
              </Text>
            </View>
            <View
              style={[
                styles.addButton,
                { backgroundColor: theme.colors.accentSubtle },
              ]}
            >
              <Plus size={16} color={theme.colors.accentBrand} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  headerStack: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 12,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  listScrollView: {
    maxHeight: 340,
  },
  placeItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    marginBottom: 2,
  },
  itemSub: {
    fontSize: 12,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justify: 'center',
  },
});
