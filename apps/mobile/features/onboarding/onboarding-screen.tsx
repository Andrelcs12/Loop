import { useState } from "react";
import Animated, {
  Easing,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native-css/components";

import { OnboardingFooter } from "./components/onboarding-footer";
import { OnboardingLayout } from "./components/onboarding-layout";
import { AccountStep } from "./steps/account-step";
import { HowItWorksStep } from "./steps/how-it-works-step";
import { PromiseStep } from "./steps/promise-step";
import { WelcomeStep } from "./steps/welcome-step";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { Pressable } from "react-native";

const LAST_STEP = 3;

const styles = StyleSheet.create({
  teste: {
    backgroundColor: "red",
  },
});

export function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const nextStep = () =>
    setStep((currentStep) => Math.min(currentStep + 1, LAST_STEP));

  const handleClick = () => {
    router.push("/home/teste");
  };

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
        <Text style={styles.teste}>oiii</Text>

        <Pressable className="bg-green-300 px-4 py-2 " onPress={handleClick}>
          Ir pro home
        </Pressable>

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
