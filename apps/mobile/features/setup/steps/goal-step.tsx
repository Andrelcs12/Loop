import { Text, View } from "react-native-css/components";

import { OptionCard } from "../components/option-card";

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
    <View className="gap-3">
      <Text className="font-loop-bold text-3xl leading-9 tracking-[-0.8px] text-loop-text-primary">
        Qual é o seu principal objetivo agora?
      </Text>
      <Text className="mb-5 font-loop-regular text-base leading-6 text-loop-text-secondary">
        Vamos adaptar o Loop ao momento que você está vivendo.
      </Text>
      {GOAL_OPTIONS.map((option) => (
        <OptionCard key={option} label={option} selected={value === option} onPress={() => onChange(option)} />
      ))}
    </View>
  );
}
