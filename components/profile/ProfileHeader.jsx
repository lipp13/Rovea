import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Moon, Sun, MapPin, Bookmark, Compass } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const ProfileHeader = ({ user, onEditPress }) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const theme = getTheme(themeMode);

  if (!user) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgSurface, borderColor: theme.colors.borderSubtle, borderRadius: theme.radii.md }, theme.shadows.subtle]}>
      <View style={styles.topRow}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={[styles.name, { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold }]}>
            {user.name}
          </Text>
          <Text numberOfLines={2} style={[styles.bio, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}>
            {user.bio}
          </Text>
        </View>
        <Pressable
          onPress={toggleTheme}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[styles.themeToggle, { backgroundColor: theme.colors.bgSubtle }]}
        >
          {themeMode === 'light' ? (
            <Moon size={18} color={theme.colors.textPrimary} />
          ) : (
            <Sun size={18} color={theme.colors.accentBrand} />
          )}
        </Pressable>
      </View>

      <View style={[styles.statsRow, { borderTopColor: theme.colors.borderSubtle }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold }]}>
            {user.tripsCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}>
            Trips
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold }]}>
            {user.citiesCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}>
            Cities
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansSemiBold }]}>
            {user.savedPlacesCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}>
            Saved Spots
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 4,
  },
  bio: {
    fontSize: 12,
    lineHeight: 16,
  },
  themeToggle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justify: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-around',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: 24,
  },
});
