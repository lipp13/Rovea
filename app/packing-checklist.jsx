import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Plus, Trash2, Filter } from 'lucide-react-native';
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
  const [filterMode, setFilterMode] = useState('All'); // 'All' | 'Unpacked'

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
      {/* Top Header Bar */}
      <View style={[styles.headerNav, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold }]}>
          Packing Checklist
        </Text>
        <Pressable
          onPress={() => setShowAddRow(!showAddRow)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Plus size={22} color={theme.colors.accentBrand} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Minimal Progress Header */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.topProgressSection}>
          <Text style={[styles.overlineTag, { color: theme.colors.accentBrand }]}>
            PACKING PROGRESS
          </Text>
          <View style={styles.progressCounterRow}>
            <Text
              style={[
                styles.largeCountText,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              {packed} / {total}
            </Text>
            <Text
              style={[
                styles.packedLabel,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              items packed ({percentage}%)
            </Text>
          </View>

          {/* Hairline Progress Bar */}
          <View style={[styles.progressTrack, { backgroundColor: theme.colors.bgSubtle }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(packed / total) * 100}%`,
                  backgroundColor: theme.colors.accentBrand,
                },
              ]}
            />
          </View>
        </Animated.View>

        {/* Filter Bar */}
        <View style={styles.filterRow}>
          <Chip label="All Items" active={filterMode === 'All'} onPress={() => setFilterMode('All')} />
          <Chip label="Unpacked Only" active={filterMode === 'Unpacked'} onPress={() => setFilterMode('Unpacked')} />
        </View>

        {/* Add Custom Item Box */}
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
              placeholder="New packing item (e.g. Travel Pillow)"
              placeholderTextColor={theme.colors.textMuted}
              style={[
                styles.itemInput,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.borderSubtle,
                  backgroundColor: theme.colors.bgSubtle,
                },
              ]}
            />

            <View style={{ flexDirection: 'row', gap: 6, marginBottom: 10 }}>
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

        {/* Categorized Checklist Sections */}
        {packingChecklist.sections.map((sec, secIdx) => {
          const visibleItems =
            filterMode === 'Unpacked' ? sec.items.filter((i) => !i.checked) : sec.items;

          if (visibleItems.length === 0 && filterMode === 'Unpacked') return null;

          return (
            <Animated.View
              key={sec.category}
              entering={FadeInDown.duration(400).delay(secIdx * 80)}
              style={styles.sectionBlock}
            >
              <Text
                style={[
                  styles.sectionCategoryHeader,
                  { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
                ]}
              >
                {sec.category}
              </Text>

              <View style={styles.itemList}>
                {visibleItems.map((item) => (
                  <View
                    key={item.id}
                    style={[
                      styles.itemRow,
                      { borderBottomColor: theme.colors.borderSubtle },
                    ]}
                  >
                    <Pressable
                      onPress={() => togglePackingItem(item.id)}
                      style={styles.itemRowLeft}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          {
                            backgroundColor: item.checked
                              ? theme.colors.accentBrand
                              : 'transparent',
                            borderColor: item.checked
                              ? theme.colors.accentBrand
                              : theme.colors.borderStrong,
                          },
                        ]}
                      >
                        {item.checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                      </View>

                      <Text
                        style={[
                          styles.itemNameText,
                          {
                            color: item.checked
                              ? theme.colors.textMuted
                              : theme.colors.textPrimary,
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
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Trash2 size={16} color={theme.colors.textMuted} />
                    </Pressable>
                  </View>
                ))}
              </View>
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  topProgressSection: {
    marginBottom: 16,
  },
  overlineTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  progressCounterRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  largeCountText: {
    fontSize: 36,
    lineHeight: 42,
    marginRight: 10,
  },
  packedLabel: {
    fontSize: 14,
  },
  progressTrack: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addItemBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  itemInput: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  sectionBlock: {
    marginBottom: 24,
  },
  sectionCategoryHeader: {
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  itemList: {
    gap: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justify: 'center',
    marginRight: 14,
  },
  itemNameText: {
    fontSize: 15,
    flex: 1,
  },
});
