import { Text, View } from 'react-native';

import { OnboardingProgress } from './onboarding-progress';
import { PrimaryButton } from './primary-button';

type OnboardingFooterProps = {
  step: number;
  onPress: () => void;
};

export function OnboardingFooter({ step, onPress }: OnboardingFooterProps) {
  if (step === 3) {
    return (
      <Text className="pb-4 text-center font-loop-regular text-sm text-loop-text-secondary">
        Já tem conta? <Text className="font-loop-semibold text-loop-primary">Entrar</Text>
      </Text>
    );
  }

  return (
    <View className="gap-5">
      <OnboardingProgress activeStep={step} />
      <PrimaryButton label="Continuar" onPress={onPress} />
    </View>
  );
}
