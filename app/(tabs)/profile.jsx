import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Moon, Sun, Bookmark, Settings, ShieldCheck, Info, ChevronRight, Heart } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const currentUser = useAppStore((state) => state.currentUser);
  const savedPlaces = useAppStore((state) => state.savedPlaces);
  const theme = getTheme(themeMode);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 90 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Profile Identity */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.profileHeader}>
        <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text
            style={[
              styles.userName,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {currentUser.name}
          </Text>
          <Text
            style={[
              styles.userBio,
              { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
            ]}
          >
            {currentUser.bio}
          </Text>
        </View>
      </Animated.View>

      {/* Stats Counter Strip */}
      <Animated.View
        entering={FadeInUp.duration(400).delay(100)}
        style={[styles.statsRow, { borderBottomColor: theme.colors.borderSubtle }]}
      >
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {currentUser.tripsCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Trips</Text>
        </View>
        <View style={[styles.verticalDivider, { backgroundColor: theme.colors.borderSubtle }]} />
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {currentUser.citiesCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Cities</Text>
        </View>
        <View style={[styles.verticalDivider, { backgroundColor: theme.colors.borderSubtle }]} />
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
            ]}
          >
            {savedPlaces.length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Saved</Text>
        </View>
      </Animated.View>

      {/* Settings & Preferences List */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.settingsSection}>
        <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
          PREFERENCES & IDENTITY
        </Text>

        {/* Dark Mode Toggle Row */}
        <View style={[styles.settingRow, { borderBottomColor: theme.colors.borderSubtle }]}>
          <View style={styles.settingLeft}>
            {themeMode === 'dark' ? (
              <Moon size={18} color={theme.colors.accentBrand} style={{ marginRight: 12 }} />
            ) : (
              <Sun size={18} color={theme.colors.accentBrand} style={{ marginRight: 12 }} />
            )}
            <Text
              style={[
                styles.settingLabel,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
              ]}
            >
              Dusk Obsidian Dark Mode
            </Text>
          </View>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#D6CEBE', true: '#C25E38' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Saved Places Link */}
        <View style={[styles.settingRow, { borderBottomColor: theme.colors.borderSubtle }]}>
          <View style={styles.settingLeft}>
            <Bookmark size={18} color={theme.colors.accentBrand} style={{ marginRight: 12 }} />
            <Text
              style={[
                styles.settingLabel,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
              ]}
            >
              Saved Bookmarks ({savedPlaces.length})
            </Text>
          </View>
          <ChevronRight size={16} color={theme.colors.textSecondary} />
        </View>

        {/* Privacy & Guidelines */}
        <View style={[styles.settingRow, { borderBottomColor: theme.colors.borderSubtle }]}>
          <View style={styles.settingLeft}>
            <ShieldCheck size={18} color={theme.colors.accentBrand} style={{ marginRight: 12 }} />
            <Text
              style={[
                styles.settingLabel,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
              ]}
            >
              Privacy & Data Policy
            </Text>
          </View>
          <ChevronRight size={16} color={theme.colors.textSecondary} />
        </View>

        {/* About Rovea */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Info size={18} color={theme.colors.accentBrand} style={{ marginRight: 12 }} />
            <Text
              style={[
                styles.settingLabel,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
              ]}
            >
              Rovea Travel Companion v1.0.0
            </Text>
          </View>
          <ChevronRight size={16} color={theme.colors.textSecondary} />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 4,
  },
  userBio: {
    fontSize: 13,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-around',
    paddingVertical: 18,
    borderBottomWidth: 1,
    marginBottom: 28,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  verticalDivider: {
    width: 1,
    height: 32,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionOverline: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
  },
});
