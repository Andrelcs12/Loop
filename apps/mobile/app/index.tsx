import { useCallback, useState } from "react";
import { router } from "expo-router";

import { OnboardingScreen } from "@/features/onboarding/onboarding-screen";
import { SplashScreen } from "@/features/splash/splash-screen";

export default function IndexScreen() {
  const [splashFinished, setSplashFinished] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashFinished(true), []);
  const handleOnboardingComplete = useCallback(() => {
    router.replace("/auth");
  }, []);

  if (!splashFinished) {
    return <SplashScreen onFinish={handleSplashFinished} />;
  }

  return <OnboardingScreen onComplete={handleOnboardingComplete} />;
}
