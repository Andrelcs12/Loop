import { View } from 'react-native';

export function OnboardingProgress({ activeStep }: { activeStep: number }) {
  return (
    <View
      accessibilityLabel={`Etapa ${activeStep + 1} de 4`}
      className="flex-row justify-center gap-2">
      {[0, 1, 2, 3].map((step) => (
        <View key={step} className={`h-[7px] w-[7px] rounded-full bg-loop-text-muted ${step === activeStep ? 'w-5 bg-loop-primary' : ''}`} />
      ))}
    </View>
  );
}
