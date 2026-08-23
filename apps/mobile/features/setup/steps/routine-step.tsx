import { Text, View } from "react-native-css/components";

import { OptionCard } from "../components/option-card";

export const ROUTINE_OPTIONS = ["Manhã", "Tarde", "Noite", "Dia todo"] as const;
export type Routine = (typeof ROUTINE_OPTIONS)[number];
type RoutineStepProps = { value?: Routine; onChange: (value: Routine) => void };

export function RoutineStep({ value, onChange }: RoutineStepProps) {
  return (
    <View className="gap-3">
      <Text className="font-loop-bold text-3xl leading-9 tracking-[-0.8px] text-loop-text-primary">Quando sua rotina mais acontece?</Text>
      <Text className="mb-5 font-loop-regular text-base leading-6 text-loop-text-secondary">Isso ajuda a preparar sugestões para o seu ritmo.</Text>
      {ROUTINE_OPTIONS.map((option) => (
        <OptionCard key={option} label={option} selected={value === option} onPress={() => onChange(option)} />
      ))}
    </View>
  );
}
