import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, Compass, Luggage, User } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TabButton({ isFocused, icon: Icon, label, onPress, theme }) {
  const opacity = useSharedValue(isFocused ? 1 : 0.5);

  React.useEffect(() => {
    opacity.value = withTiming(isFocused ? 1 : 0.5, { duration: 180 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[styles.tabItem, animatedStyle]}
    >
      <Icon
        size={21}
        color={isFocused ? theme.colors.textPrimary : theme.colors.textMuted}
        strokeWidth={isFocused ? 2 : 1.5}
      />
      {isFocused && (
        <View style={[styles.activeDot, { backgroundColor: theme.colors.accentBrand }]} />
      )}
    </AnimatedPressable>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const themeMode = useAppStore((s) => s.themeMode);
  const theme = getTheme(themeMode);

  return (
    <View
      style={[
        styles.dockContainer,
        {
          bottom: Math.max(insets.bottom, 12),
          backgroundColor: theme.colors.tabDockBg,
          borderColor: theme.colors.borderSubtle,
        },
        theme.shadows.floatingNav,
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icons = { index: House, explore: Compass, trips: Luggage, profile: User };
        const labels = { index: 'Home', explore: 'Explore', trips: 'Trips', profile: 'Profile' };

        return (
          <TabButton
            key={route.key}
            isFocused={isFocused}
            icon={icons[route.name] || House}
            label={labels[route.name] || route.name}
            onPress={onPress}
            theme={theme}
          />
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="trips" options={{ title: 'Trips' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  dockContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 56,
    borderRadius: 28,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
    minHeight: 44,
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
