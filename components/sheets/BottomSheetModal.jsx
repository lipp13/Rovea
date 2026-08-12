import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

export const BottomSheetModal = ({ visible, onClose, children, maxContainerHeight = '85%' }) => {
  const insets = useSafeAreaInsets();
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = getTheme(themeMode);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Backdrop Scrim */}
        <Animated.View entering={FadeIn.duration(220)} style={styles.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        {/* Sheet Content Container */}
        <Animated.View
          entering={SlideInDown.springify().damping(22).stiffness(240)}
          exiting={SlideOutDown.duration(200)}
          style={[
            styles.sheetContainer,
            {
              backgroundColor: theme.colors.bgSurface,
              borderColor: theme.colors.borderSubtle,
              paddingBottom: Math.max(insets.bottom, 16),
              maxHeight: maxContainerHeight,
            },
            theme.shadows.modalBottomSheet,
          ]}
        >
          {/* Handle Indicator Bar */}
          <View style={styles.handleContainer}>
            <View style={[styles.handleBar, { backgroundColor: theme.colors.borderStrong }]} />
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.closeButton}
            >
              <X size={18} color={theme.colors.textSecondary} />
            </Pressable>
          </View>

          {/* Children View */}
          <View style={styles.contentView}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justify: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  handleBar: {
    width: 38,
    height: 4,
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 8,
  },
  contentView: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
});
