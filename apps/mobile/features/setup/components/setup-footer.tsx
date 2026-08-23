import { Pressable, Text, View } from "react-native-css/components";

import { PrimaryButton } from "@/features/onboarding/components/primary-button";

type SetupFooterProps = {
  step: number;
  onBack: () => void;
  onContinue: () => void;
};

const LAST_STEP = 4;

export function SetupFooter({ step, onBack, onContinue }: SetupFooterProps) {
  return (
    <View className="flex-row items-center gap-4">
      {step > 0 ? (
        <Pressable
          accessibilityLabel="Voltar para a etapa anterior"
          accessibilityRole="button"
          className="min-h-14 items-center justify-center rounded-loop-lg border border-loop-border px-5 active:opacity-70"
          onPress={onBack}
        >
          <Text className="font-loop-semibold text-base text-loop-text-primary">Voltar</Text>
        </Pressable>
      ) : null}
      <View className="flex-1">
        <PrimaryButton
          label={step === LAST_STEP ? "Ver agora" : "Continuar"}
          onPress={onContinue}
        />
      </View>
    </View>
  );
}
