import { useState } from "react";
import Animated, {
  Easing,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";
import { View } from 'react-native-css/components';

import { OnboardingFooter } from "./components/onboarding-footer";
import { OnboardingLayout } from "./components/onboarding-layout";
import { AccountStep } from "./steps/account-step";
import { HowItWorksStep } from "./steps/how-it-works-step";
import { PromiseStep } from "./steps/promise-step";
import { WelcomeStep } from "./steps/welcome-step";

const LAST_STEP = 3;

export function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const nextStep = () =>
    setStep((currentStep) => Math.min(currentStep + 1, LAST_STEP));

  return (
    <OnboardingLayout
      footer={<OnboardingFooter step={step} onPress={nextStep} />}
    >
      <Animated.View
        key={step}
        entering={FadeInRight.duration(360).easing(Easing.out(Easing.cubic))}
        exiting={FadeOutLeft.duration(220)}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-start pt-4">
          {step === 0 ? <WelcomeStep /> : null}
          {step === 1 ? <PromiseStep /> : null}
          {step === 2 ? <HowItWorksStep /> : null}
          {step === 3 ? <AccountStep /> : null}
        </View>
      </Animated.View>
    </OnboardingLayout>
  );
}
