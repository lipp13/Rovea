import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const SectionHeader = ({
  title,
  overline,
  actionText,
  onActionPress,
  style,
}) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textStack}>
        {overline && (
          <Text
            style={[
              styles.overline,
              { color: theme.colors.accentBrand },
            ]}
          >
            {overline}
          </Text>
        )}
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          {title}
        </Text>
      </View>
      {actionText && onActionPress && (
        <Pressable
          onPress={onActionPress}
          accessibilityRole="button"
          accessibilityLabel={actionText}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text
            style={[
              styles.actionText,
              { color: theme.colors.accentBrand, fontFamily: theme.fonts.sansMedium },
            ]}
          >
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  textStack: {
    flex: 1,
    paddingRight: 12,
  },
  overline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  actionText: {
    fontSize: 13,
  },
});
