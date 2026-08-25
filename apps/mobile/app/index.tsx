import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native-css/components";
import { router } from "expo-router";

import { OnboardingScreen } from "@/features/onboarding/onboarding-screen";
import { SplashScreen } from "@/features/splash/splash-screen";
import { useAuth } from "@/features/auth/auth-provider";

export default function IndexScreen() {
  const { currentUser, error, isLoading, refreshCurrentUser, session } = useAuth();
  const [splashFinished, setSplashFinished] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashFinished(true), []);
  const handleOnboardingComplete = useCallback(() => {
    router.replace("/auth");
  }, []);

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace(currentUser.setupCompleted ? "/home" : "/setup");
    }
  }, [currentUser, isLoading]);

  if (!splashFinished || isLoading) {
    return <SplashScreen onFinish={handleSplashFinished} />;
  }

  if (session && !currentUser) {
    return (
      <View className="flex-1 items-center justify-center bg-loop-background px-6">
        <Text className="font-loop-semibold text-lg text-loop-text-primary">Não foi possível validar sua sessão.</Text>
        <Text className="mt-2 text-center font-loop-regular text-base text-loop-text-secondary">{error ?? "Tente novamente."}</Text>
        <Pressable className="mt-6 rounded-loop-lg bg-loop-primary px-5 py-4" onPress={() => void refreshCurrentUser()}>
          <Text className="font-loop-semibold text-base text-loop-text-inverse">Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return <OnboardingScreen onComplete={handleOnboardingComplete} />;
}
