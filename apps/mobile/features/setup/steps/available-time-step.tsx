import { Text, View } from "react-native-css/components";

import { OptionCard } from "../components/option-card";

export const AVAILABLE_TIME_OPTIONS = ["Menos de 30 min", "30 min a 1 hora", "1 a 2 horas", "Mais de 2 horas"] as const;
export type AvailableTime = (typeof AVAILABLE_TIME_OPTIONS)[number];
type AvailableTimeStepProps = { value?: AvailableTime; onChange: (value: AvailableTime) => void };

export function AvailableTimeStep({ value, onChange }: AvailableTimeStepProps) {
  return (
    <View className="gap-3">
      <Text className="font-loop-bold text-3xl leading-9 tracking-[-0.8px] text-loop-text-primary">Quanto tempo você costuma ter disponível por dia?</Text>
      <Text className="mb-5 font-loop-regular text-base leading-6 text-loop-text-secondary">O Loop vai priorizar ações que cabem no seu tempo.</Text>
      {AVAILABLE_TIME_OPTIONS.map((option) => (
        <OptionCard key={option} label={option} selected={value === option} onPress={() => onChange(option)} />
      ))}
    </View>
  );
}
