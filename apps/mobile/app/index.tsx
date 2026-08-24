import { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";

import { OnboardingScreen } from "@/features/onboarding/onboarding-screen";
import { SplashScreen } from "@/features/splash/splash-screen";
import { useAuth } from "@/features/auth/auth-provider";

export default function IndexScreen() {
  const { isLoading, session } = useAuth();
  const [splashFinished, setSplashFinished] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashFinished(true), []);
  const handleOnboardingComplete = useCallback(() => {
    router.replace("/auth");
  }, []);

  useEffect(() => {
    if (!isLoading && session) router.replace("/setup");
  }, [isLoading, session]);

  if (!splashFinished || isLoading) {
    return <SplashScreen onFinish={handleSplashFinished} />;
  }

  return <OnboardingScreen onComplete={handleOnboardingComplete} />;
}
