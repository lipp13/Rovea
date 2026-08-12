import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(false);
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  if (!isOffline) return null;

  return (
    <View
      style={[
        styles.bannerContainer,
        { backgroundColor: theme.colors.bgSubtle, borderColor: theme.colors.borderSubtle },
      ]}
    >
      <WifiOff size={14} color={theme.colors.accentBrand} style={{ marginRight: 8 }} />
      <Text
        style={[
          styles.bannerText,
          { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansMedium },
        ]}
      >
        Offline Mode • Accessing locally persisted travel data
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  bannerText: {
    fontSize: 11,
  },
});
