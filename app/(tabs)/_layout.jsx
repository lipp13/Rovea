import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, Compass, Luggage, User } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../../store/useAppStore';
import { getTheme } from '../../constants/theme';

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const themeMode = useAppStore((state) => state.themeMode);
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

        const renderIcon = () => {
          const color = isFocused ? theme.colors.accentBrand : theme.colors.textSecondary;
          const strokeWidth = isFocused ? 2.0 : 1.5;

          switch (route.name) {
            case 'index':
              return <House size={20} color={color} strokeWidth={strokeWidth} />;
            case 'explore':
              return <Compass size={20} color={color} strokeWidth={strokeWidth} />;
            case 'trips':
              return <Luggage size={20} color={color} strokeWidth={strokeWidth} />;
            case 'profile':
              return <User size={20} color={color} strokeWidth={strokeWidth} />;
            default:
              return <House size={20} color={color} strokeWidth={strokeWidth} />;
          }
        };

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.tabItem}
          >
            {renderIcon()}
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? theme.colors.accentBrand : theme.colors.textSecondary,
                  fontFamily: isFocused ? theme.fonts.sansSemiBold : theme.fonts.sansRegular,
                },
              ]}
            >
              {label}
            </Text>
            {isFocused && (
              <View
                style={[
                  styles.activeDot,
                  { backgroundColor: theme.colors.accentBrand },
                ]}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
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
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-around',
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justify: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  activeDot: {
    position: 'absolute',
    bottom: 1,
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
});
