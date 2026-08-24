import { View } from "react-native-css/components";

import { OptionCard } from "../components/option-card";
import { SetupStepHeader } from "../components/setup-step-header";

export const GOAL_OPTIONS = [
  "Ser mais produtivo",
  "Estudar melhor",
  "Criar hábitos saudáveis",
  "Ter mais tempo livre",
  "Organizar minha vida",
] as const;

export type Goal = (typeof GOAL_OPTIONS)[number];

type GoalStepProps = { value?: Goal; onChange: (value: Goal) => void };

export function GoalStep({ value, onChange }: GoalStepProps) {
  return (
    <View>
      <SetupStepHeader
        title="Qual é o seu principal objetivo agora?"
        description="Vamos adaptar o Loop ao momento que você está vivendo."
      />
      <View className="mt-7 gap-3">
        {GOAL_OPTIONS.map((option) => (
          <OptionCard key={option} label={option} selected={value === option} onPress={() => onChange(option)} />
        ))}
      </View>
    </View>
  );
}
