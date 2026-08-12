import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Plus, Trash2 } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';

export default function PackingChecklistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const packingChecklist = useAppStore((state) => state.packingChecklist);
  const togglePackingItem = useAppStore((state) => state.togglePackingItem);
  const addPackingItem = useAppStore((state) => state.addPackingItem);
  const deletePackingItem = useAppStore((state) => state.deletePackingItem);
  const theme = getTheme(themeMode);

  const [newItemName, setNewItemName] = useState('');
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState('DOCUMENTS');
  const [showAddRow, setShowAddRow] = useState(false);
  const [filterMode, setFilterMode] = useState('All');

  const total = packingChecklist.totalItems || 1;
  const packed = packingChecklist.packedCount || 0;
  const percentage = Math.round((packed / total) * 100);

  const handleAddItemSubmit = () => {
    if (!newItemName.trim()) return;
    addPackingItem(selectedCategoryForAdd, newItemName);
    setNewItemName('');
    setShowAddRow(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      {/* Header */}
      <View style={[styles.headerNav, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Packing
        </Text>
        <Pressable
          onPress={() => setShowAddRow(!showAddRow)}
          accessibilityRole="button"
          accessibilityLabel="Add packing item"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[styles.addBtn, { backgroundColor: theme.colors.accentSubtle }]}
        >
          <Plus size={18} color={theme.colors.accentBrand} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.topProgressSection}>
          <View style={styles.progressCounterRow}>
            <Text
              style={[
                styles.largeCountText,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              {packed}/{total}
            </Text>
            <Text
              style={[
                styles.packedLabel,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              items packed · {percentage}%
            </Text>
          </View>

          <View style={[styles.progressTrack, { backgroundColor: theme.colors.bgSubtle }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: percentage === 100 ? theme.colors.success : theme.colors.accentBrand,
                },
              ]}
            />
          </View>
        </Animated.View>

        {/* Filter */}
        <View style={styles.filterRow}>
          <Chip label="All" active={filterMode === 'All'} onPress={() => setFilterMode('All')} />
          <Chip label="Unpacked" active={filterMode === 'Unpacked'} onPress={() => setFilterMode('Unpacked')} />
        </View>

        {/* Add Item */}
        {showAddRow && (
          <Animated.View
            entering={FadeInUp.duration(300)}
            style={[
              styles.addItemBox,
              { backgroundColor: theme.colors.bgSurface, borderColor: theme.colors.borderSubtle },
            ]}
          >
            <TextInput
              value={newItemName}
              onChangeText={setNewItemName}
              placeholder="New item (e.g. Travel Pillow)"
              placeholderTextColor={theme.colors.textMuted}
              style={[
                styles.itemInput,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.borderSubtle,
                  backgroundColor: theme.colors.bgSubtle,
                  fontFamily: theme.fonts.sansRegular,
                },
              ]}
            />

            <View style={styles.categoryChipRow}>
              {['DOCUMENTS', 'CLOTHING', 'ELECTRONICS'].map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  active={selectedCategoryForAdd === cat}
                  onPress={() => setSelectedCategoryForAdd(cat)}
                />
              ))}
            </View>

            <Button title="Add Item" onPress={handleAddItemSubmit} variant="primary" />
          </Animated.View>
        )}

        {/* Sections */}
        {packingChecklist.sections.map((sec, secIdx) => {
          const visibleItems =
            filterMode === 'Unpacked' ? sec.items.filter((i) => !i.checked) : sec.items;

          if (visibleItems.length === 0 && filterMode === 'Unpacked') return null;

          return (
            <Animated.View
              key={sec.category}
              entering={FadeInDown.duration(400).delay(secIdx * 60)}
              style={styles.sectionBlock}
            >
              <Text
                style={[
                  styles.sectionCategoryHeader,
                  { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {sec.category} ({visibleItems.length})
              </Text>

              {visibleItems.map((item, itemIdx) => (
                <View
                  key={item.id}
                  style={[
                    styles.itemRow,
                    itemIdx < visibleItems.length - 1 && {
                      borderBottomWidth: 0.5,
                      borderBottomColor: theme.colors.borderSubtle,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() => togglePackingItem(item.id)}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: item.checked }}
                    accessibilityLabel={item.name}
                    style={styles.itemRowLeft}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        {
                          backgroundColor: item.checked ? theme.colors.accentBrand : 'transparent',
                          borderColor: item.checked ? theme.colors.accentBrand : theme.colors.borderStrong,
                        },
                      ]}
                    >
                      {item.checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                    </View>

                    <Text
                      style={[
                        styles.itemNameText,
                        {
                          color: item.checked ? theme.colors.textMuted : theme.colors.textPrimary,
                          textDecorationLine: item.checked ? 'line-through' : 'none',
                          fontFamily: theme.fonts.sansRegular,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => deletePackingItem(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${item.name}`}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Trash2 size={15} color={theme.colors.textMuted} />
                  </Pressable>
                </View>
              ))}
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  topProgressSection: {
    marginBottom: 20,
  },
  progressCounterRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  largeCountText: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.3,
    marginRight: 10,
  },
  packedLabel: {
    fontSize: 14,
  },
  progressTrack: {
    height: 3,
    width: '100%',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1.5,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addItemBox: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 0.5,
    marginBottom: 24,
  },
  itemInput: {
    height: 46,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 10,
  },
  categoryChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  sectionBlock: {
    marginBottom: 28,
  },
  sectionCategoryHeader: {
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  itemRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
    minHeight: 44,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemNameText: {
    fontSize: 15,
    flex: 1,
  },
});
