import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Pressable, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Moon, Sun, Bookmark, Settings, HardDrive, Shield, LogOut, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { SavedPlacesRow } from '../../components/home/SavedPlacesRow';
import { Card } from '../../components/ui/Card';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const themeMode = useAppStore((state) => state.themeMode);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const currentUser = useAppStore((state) => state.currentUser);
  const savedPlaces = useAppStore((state) => state.savedPlaces);
  const theme = getTheme(themeMode);

  const handleOptionPress = (title) => {
    Alert.alert(title, `${title} settings & preferences view.`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 90 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Title */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.headerStack}>
        <Text
          style={[
            styles.overline,
            { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold },
          ]}
        >
          TRAVEL PROFILE
        </Text>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Traveler Journal
        </Text>
      </Animated.View>

      {/* User Profile Header Component */}
      <Animated.View entering={FadeInUp.duration(400).delay(100)}>
        <ProfileHeader user={currentUser} />
      </Animated.View>

      {/* Bookmarked Spots Section */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)}>
        <SectionHeader
          overline="COLLECTION"
          title={`Saved Spots (${savedPlaces.length})`}
        />
        <SavedPlacesRow
          places={savedPlaces}
          onPlacePress={(place) =>
            Alert.alert(place.title, `${place.category} in ${place.city}`)
          }
        />
      </Animated.View>

      {/* App Preferences & Settings */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)} style={{ marginTop: 24 }}>
        <SectionHeader overline="PREFERENCES" title="App Settings" />

        <Card style={styles.settingsGroup} elevation="subtle">
          {/* Theme Toggle Option */}
          <View
            style={[
              styles.settingRow,
              { borderBottomColor: theme.colors.borderSubtle, borderBottomWidth: 1 },
            ]}
          >
            <View style={styles.settingLeft}>
              {themeMode === 'light' ? (
                <Moon size={18} color={theme.colors.textPrimary} style={styles.settingIcon} />
              ) : (
                <Sun size={18} color={theme.colors.accentBrand} style={styles.settingIcon} />
              )}
              <View>
                <Text
                  style={[
                    styles.settingTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium },
                  ]}
                >
                  Appearance
                </Text>
                <Text
                  style={[
                    styles.settingSub,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  {themeMode === 'light' ? 'Warmed Sandstone (Light)' : 'Dusk Obsidian (Dark)'}
                </Text>
              </View>
            </View>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.colors.borderSubtle, true: theme.colors.accentBrand }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Offline Storage Info */}
          <Pressable
            onPress={() => handleOptionPress('Offline Cache & Storage')}
            style={[
              styles.settingRow,
              { borderBottomColor: theme.colors.borderSubtle, borderBottomWidth: 1 },
            ]}
          >
            <View style={styles.settingLeft}>
              <HardDrive size={18} color={theme.colors.textPrimary} style={styles.settingIcon} />
              <View>
                <Text
                  style={[
                    styles.settingTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium },
                  ]}
                >
                  Offline Sync & Cache
                </Text>
                <Text
                  style={[
                    styles.settingSub,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  12 MB cached for offline trip access
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </Pressable>

          {/* Privacy & Safety */}
          <Pressable
            onPress={() => handleOptionPress('Privacy & Security')}
            style={styles.settingRow}
          >
            <View style={styles.settingLeft}>
              <Shield size={18} color={theme.colors.textPrimary} style={styles.settingIcon} />
              <View>
                <Text
                  style={[
                    styles.settingTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium },
                  ]}
                >
                  Privacy & Data
                </Text>
                <Text
                  style={[
                    styles.settingSub,
                    { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular },
                  ]}
                >
                  Manage local permissions & backups
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </Pressable>
        </Card>

        {/* Log Out Button */}
        <Pressable
          onPress={() => Alert.alert('Log Out', 'You are currently in guest/demo mode.')}
          style={[styles.logoutButton, { borderColor: theme.colors.borderSubtle }]}
        >
          <LogOut size={16} color={theme.colors.destructive} style={{ marginRight: 8 }} />
          <Text
            style={[
              styles.logoutText,
              { color: theme.colors.destructive, fontFamily: theme.fonts.sansMedium },
            ]}
          >
            Sign Out
          </Text>
        </Pressable>
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
  headerStack: {
    marginBottom: 20,
  },
  overline: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
  },
  settingsGroup: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  settingSub: {
    fontSize: 11,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 24,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 14,
  },
});
