import { useCallback, useState } from 'react';

import { OnboardingScreen } from '@/features/onboarding/onboarding-screen';
import { SplashScreen } from '@/features/splash/splash-screen';

export default function IndexScreen() {
  const [splashFinished, setSplashFinished] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashFinished(true), []);

  if (!splashFinished) {
    return <SplashScreen onFinish={handleSplashFinished} />;
  }

  // Esta tela passa a resolver o destino inicial quando onboarding e autenticação existirem.
  return <OnboardingScreen />;
}
