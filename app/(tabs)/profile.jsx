import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Moon, Sun, Bookmark, ShieldCheck, Info, ChevronRight, UserCheck, Sparkles } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

function SettingRow({ icon: Icon, label, subtitle, onPress, trailing, theme, isLast }) {
  const content = (
    <View
      style={[
        styles.settingRow,
        !isLast && { borderBottomWidth: 0.5, borderBottomColor: theme.colors.borderSubtle },
      ]}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIconWrap, { backgroundColor: theme.colors.accentSubtle }]}>
          <Icon size={18} color={theme.colors.accentBrand} />
        </View>
        <View style={styles.settingTextStack}>
          <Text
            style={[
              styles.settingLabel,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium },
            ]}
          >
            {label}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.settingSubtitle,
                { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.settingRight}>
        {trailing || <ChevronRight size={16} color={theme.colors.textMuted} />}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      >
        {content}
      </Pressable>
    );
  }
  return content;
}

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
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 110 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Tag */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.topBar}>
        <Sparkles size={13} color={theme.colors.accentBrand} style={{ marginRight: 6 }} />
        <Text style={[styles.topTagText, { color: theme.colors.accentBrand }]}>
          TRAVELER PROFILE
        </Text>
      </Animated.View>

      {/* Profile Hero Avatar & Bio */}
      <Animated.View entering={FadeInUp.duration(450).delay(60)} style={styles.profileHeader}>
        <View style={[styles.avatarContainer, { borderColor: theme.colors.borderStrong }]}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <View style={[styles.verifiedBadge, { backgroundColor: theme.colors.accentBrand }]}>
            <UserCheck size={12} color="#FFFFFF" />
          </View>
        </View>

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
      </Animated.View>

      {/* Typographic Stat Cards Strip */}
      <Animated.View
        entering={FadeInUp.duration(450).delay(120)}
        style={[styles.statsRow, { borderColor: theme.colors.borderSubtle, backgroundColor: theme.colors.bgSurface }]}
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
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
            ]}
          >
            TRIPS
          </Text>
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
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
            ]}
          >
            CITIES
          </Text>
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
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
            ]}
          >
            SAVED
          </Text>
        </View>
      </Animated.View>

      {/* Preferences Section */}
      <Animated.View entering={FadeInDown.duration(450).delay(180)} style={styles.settingsSection}>
        <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
          APPEARANCE & SETTINGS
        </Text>

        <View
          style={[
            styles.settingsCard,
            { backgroundColor: theme.colors.bgSurface, borderColor: theme.colors.borderSubtle },
          ]}
        >
          <SettingRow
            icon={themeMode === 'dark' ? Moon : Sun}
            label="Appearance Theme"
            subtitle={themeMode === 'dark' ? 'Dusk Obsidian Mode' : 'Warm Sandstone Mode'}
            theme={theme}
            trailing={
              <Switch
                value={themeMode === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.colors.borderStrong, true: theme.colors.accentBrand }}
                thumbColor="#FFFFFF"
                accessibilityLabel="Toggle dark mode"
                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
              />
            }
          />

          <SettingRow
            icon={Bookmark}
            label="Saved Bookmarks"
            subtitle={`${savedPlaces.length} destinations saved`}
            onPress={() => router.push('/(tabs)/explore')}
            theme={theme}
          />

          <SettingRow
            icon={ShieldCheck}
            label="Privacy & Data Policy"
            subtitle="Local storage encrypted"
            onPress={() => {}}
            theme={theme}
          />

          <SettingRow
            icon={Info}
            label="About Rovea Travel"
            subtitle="Version 1.0.0 (Phase 5.5 Edition)"
            theme={theme}
            isLast
          />
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
    paddingHorizontal: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  topTagText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
    padding: 3,
    borderRadius: 50,
    borderWidth: 1,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  userBio: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 290,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 0.5,
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 26,
    lineHeight: 30,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
  },
  verticalDivider: {
    width: 0.5,
    height: 32,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionOverline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  settingsCard: {
    borderRadius: 16,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 16,
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingTextStack: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  settingRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
