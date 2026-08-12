import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Plus, Circle } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

export default function PackingChecklistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const packingChecklist = useAppStore((state) => state.packingChecklist);
  const togglePackingItem = useAppStore((state) => state.togglePackingItem);
  const addPackingItem = useAppStore((state) => state.addPackingItem);
  const theme = getTheme(themeMode);

  const [newItemName, setNewItemName] = useState('');
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState('DOCUMENTS');
  const [showAddRow, setShowAddRow] = useState(false);

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
              {packingChecklist.packedCount} / {packingChecklist.totalItems}
            </Text>
            <Text
              style={[
                styles.packedLabel,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              items packed
            </Text>
          </View>

          {/* Hairline Progress Bar */}
          <View style={[styles.progressTrack, { backgroundColor: theme.colors.bgSubtle }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(packingChecklist.packedCount / packingChecklist.totalItems) * 100}%`,
                  backgroundColor: theme.colors.accentBrand,
                },
              ]}
            />
          </View>
        </Animated.View>

        {/* Add Custom Item Row Input if Toggled */}
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
            <Button title="Add Item" onPress={handleAddItemSubmit} variant="primary" />
          </Animated.View>
        )}

        {/* Categorized Checklist Sections */}
        {packingChecklist.sections.map((sec, secIdx) => (
          <Animated.View
            key={sec.category}
            entering={FadeInDown.duration(400).delay(secIdx * 100)}
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
              {sec.items.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => togglePackingItem(item.id)}
                  style={[
                    styles.itemRow,
                    { borderBottomColor: theme.colors.borderSubtle },
                  ]}
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
              ))}
            </View>
          </Animated.View>
        ))}
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
    marginBottom: 24,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
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
