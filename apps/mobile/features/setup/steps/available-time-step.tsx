import { View } from "react-native-css/components";

import { OptionCard } from "../components/option-card";
import { SetupStepHeader } from "../components/setup-step-header";

export const AVAILABLE_TIME_OPTIONS = ["Menos de 30 min", "30 min a 1 hora", "1 a 2 horas", "Mais de 2 horas"] as const;
export type AvailableTime = (typeof AVAILABLE_TIME_OPTIONS)[number];
type AvailableTimeStepProps = { value?: AvailableTime; onChange: (value: AvailableTime) => void };

export function AvailableTimeStep({ value, onChange }: AvailableTimeStepProps) {
  return (
    <View>
      <SetupStepHeader
        title="Quanto tempo você costuma ter disponível por dia?"
        description="O Loop vai priorizar ações que cabem no seu tempo."
      />
      <View className="mt-7 gap-3">
        {AVAILABLE_TIME_OPTIONS.map((option) => (
          <OptionCard key={option} label={option} selected={value === option} onPress={() => onChange(option)} />
        ))}
      </View>
    </View>
  );
}
