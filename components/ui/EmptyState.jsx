import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const EmptyState = ({
  icon: Icon,
  title = 'No items found',
  description = 'Try adjusting your search or add a new entry to get started.',
  actionLabel,
  onAction,
  style,
}) => {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  return (
    <View style={[styles.container, style]}>
      {Icon && (
        <View style={[styles.iconWrapper, { backgroundColor: theme.colors.bgSubtle }]}>
          <Icon size={32} color={theme.colors.accentBrand} />
        </View>
      )}
      <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifBold }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary, fontFamily: theme.fonts.sansRegular }]}>
        {description}
      </Text>
      {actionLabel && onAction && (
        <Button title={actionLabel} onPress={onAction} size="medium" variant="primary" style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 280,
  },
  button: {
    minWidth: 140,
  },
});
