import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";

import { semanticColors } from "@loop/design-tokens";
import { AuthProvider } from "@/features/auth/auth-provider";
import { TaskFlowProvider } from "@/features/tasks/task-flow-provider";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider
      value={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: semanticColors.background,
          border: semanticColors.border,
          card: semanticColors.surface,
          primary: semanticColors.primary,
          text: semanticColors.textPrimary,
        },
      }}
    >
      <AuthProvider>
        <TaskFlowProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/auth" options={{ headerShown: false }} />
            <Stack.Screen name="setup" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="create-task" options={{ headerShown: false }} />
            <Stack.Screen name="execution" options={{ headerShown: false }} />
          </Stack>
        </TaskFlowProvider>
      </AuthProvider>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
