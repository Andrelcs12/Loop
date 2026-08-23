import { View } from "react-native-css/components";

import { OnboardingProgress } from "./onboarding-progress";
import { PrimaryButton } from "./primary-button";

type OnboardingFooterProps = {
  step: number;
  onPress: () => void;
};

export function OnboardingFooter({ step, onPress }: OnboardingFooterProps) {
  const isLastStep = step === 2;

  return (
    <View className="gap-5">
      <OnboardingProgress activeStep={step} />

      <PrimaryButton
        label={isLastStep ? "Começar jornada" : "Continuar"}
        onPress={onPress}
      />
    </View>
  );
}
