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
              theme.typography.overline,
              { color: theme.colors.accentBrand, marginBottom: 4 },
            ]}
          >
            {overline}
          </Text>
        )}
        <Text
          style={[
            theme.typography.headingMd,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          {title}
        </Text>
      </View>
      {actionText && onActionPress && (
        <Pressable
          onPress={onActionPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
  actionText: {
    fontSize: 13,
  },
});
