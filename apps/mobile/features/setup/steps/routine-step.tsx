import { View } from "react-native-css/components";

import { OptionCard } from "../components/option-card";
import { SetupStepHeader } from "../components/setup-step-header";

export const ROUTINE_OPTIONS = ["Manhã", "Tarde", "Noite", "Dia todo"] as const;
export type Routine = (typeof ROUTINE_OPTIONS)[number];
type RoutineStepProps = { value?: Routine; onChange: (value: Routine) => void };

export function RoutineStep({ value, onChange }: RoutineStepProps) {
  return (
    <View>
      <SetupStepHeader
        title="Quando sua rotina mais acontece?"
        description="Isso ajuda a preparar sugestões para o seu ritmo."
      />
      <View className="mt-7 gap-3">
        {ROUTINE_OPTIONS.map((option) => (
          <OptionCard key={option} label={option} selected={value === option} onPress={() => onChange(option)} />
        ))}
      </View>
    </View>
  );
}
