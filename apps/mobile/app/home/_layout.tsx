import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { User, Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { semanticColors } from "@loop/design-tokens";

const loopMark = require("../../assets/images/brand/loop-mark.png");

const TAB_BAR_HORIZONTAL_MARGIN = 18;
const TAB_BAR_HEIGHT = 64;
const TAB_BAR_PADDING = 6;

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <LoopTabBar {...props} />}
      screenOptions={{
        headerShown: false,

        // Animação da própria tela ao trocar de tab
        animation: "shift",

        // Não queremos os labels padrão
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hoje",
        }}
      />

      <Tabs.Screen
        name="teste"
        options={{
          title: "Agora",
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}

function LoopTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const [barWidth, setBarWidth] = useState(0);

  const translateX = useSharedValue(0);

  const tabWidth = barWidth > 0 ? barWidth / state.routes.length : 0;

  useEffect(() => {
    if (!tabWidth) {
      return;
    }

    translateX.value = withSpring(state.index * tabWidth, {
      damping: 18,
      stiffness: 180,
      mass: 0.75,
    });
  }, [state.index, tabWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  function handleLayout(event: LayoutChangeEvent) {
    setBarWidth(event.nativeEvent.layout.width);
  }

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          bottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      <View onLayout={handleLayout} style={styles.bar}>
        {/* Fundo glass */}
        <BlurView
          intensity={65}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
        />

        {/* Overlay para controlar melhor o glass */}
        <View pointerEvents="none" style={styles.glassOverlay} />

        {/* Fundo ativo que desliza */}
        {tabWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeIndicator,
              {
                width: tabWidth - TAB_BAR_PADDING * 2,
              },
              indicatorStyle,
            ]}
          />
        ) : null}

        {/* Tabs */}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const focused = state.index === index;

          function handlePress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }

          function handleLongPress() {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          }

          return (
            <Pressable
              key={route.key}
              onPress={handlePress}
              onLongPress={handleLongPress}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              style={styles.tab}
            >
              <TabIcon
                routeName={route.name}
                focused={focused}
                loopMark={loopMark}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function TabIcon({
  routeName,
  focused,
  loopMark,
}: {
  routeName: string;
  focused: boolean;
  loopMark: ImageSourcePropType;
}) {
  const scale = useSharedValue(focused ? 1.06 : 1);

  const opacity = useSharedValue(focused ? 1 : 0.52);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.08 : 1, {
      damping: 16,
      stiffness: 220,
    });

    opacity.value = withTiming(focused ? 1 : 0.52, {
      duration: 180,
    });
  }, [focused, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  const color = focused ? semanticColors.primary : "#8A8A91";

  if (routeName === "index") {
    return (
      <Animated.Image
        source={loopMark}
        resizeMode="contain"
        style={[styles.loopIcon, animatedStyle]}
      />
    );
  }

  if (routeName === "teste") {
    return (
      <Animated.View style={animatedStyle}>
        <Zap size={24} color={color} strokeWidth={2.2} />
      </Animated.View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <User size={24} color={color} strokeWidth={2.2} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: TAB_BAR_HORIZONTAL_MARGIN,
    right: TAB_BAR_HORIZONTAL_MARGIN,

    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 12,
  },

  bar: {
    height: TAB_BAR_HEIGHT,
    flexDirection: "row",

    borderRadius: 28,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    backgroundColor: "transparent",
  },

  glassOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(10,10,12,0.48)",
  },

  activeIndicator: {
    position: "absolute",

    top: TAB_BAR_PADDING,
    bottom: TAB_BAR_PADDING,

    left: TAB_BAR_PADDING,

    borderRadius: 22,

    backgroundColor: "rgba(255, 111, 44, 0.10)",

    borderWidth: 1,
    borderColor: "rgba(255, 111, 44, 0.14)",
  },

  tab: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    zIndex: 2,
  },

  loopIcon: {
    width: 25,
    height: 25,
  },
});
