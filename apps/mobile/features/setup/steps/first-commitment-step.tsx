import { TextInput } from "react-native";
import { Pressable, Text, View } from "react-native-css/components";

export type FirstCommitment = {
  title: string;
  date: string;
  time: string;
};

type FirstCommitmentStepProps = {
  value: FirstCommitment;
  onChange: (value: FirstCommitment) => void;
  onSkip: () => void;
};

export function FirstCommitmentStep({ value, onChange, onSkip }: FirstCommitmentStepProps) {
  function updateField(field: keyof FirstCommitment, fieldValue: string) {
    onChange({ ...value, [field]: fieldValue });
  }

  return (
    <View>
      <Text className="font-loop-bold text-3xl leading-9 tracking-[-0.8px] text-loop-text-primary">Qual é seu próximo compromisso?</Text>
      <Text className="mt-3 font-loop-regular text-base leading-6 text-loop-text-secondary">Você pode adicionar algo que já está marcado no seu dia.</Text>

      <View className="mt-8 gap-4">
        <Field label="Título" value={value.title} placeholder="Aula" onChangeText={(text) => updateField("title", text)} />
        <View className="flex-row gap-3">
          <View className="flex-1"><Field label="Data" value={value.date} placeholder="Hoje" onChangeText={(text) => updateField("date", text)} /></View>
          <View className="flex-1"><Field label="Horário" value={value.time} placeholder="15:30" onChangeText={(text) => updateField("time", text)} /></View>
        </View>
      </View>

      <Pressable accessibilityRole="button" className="mt-6 self-start py-2 active:opacity-70" onPress={onSkip}>
        <Text className="font-loop-semibold text-base text-loop-primary">Pular por agora</Text>
      </Pressable>
    </View>
  );
}

type FieldProps = { label: string; value: string; placeholder: string; onChangeText: (value: string) => void };

function Field({ label, value, placeholder, onChangeText }: FieldProps) {
  return (
    <View>
      <Text className="mb-2 font-loop-medium text-sm text-loop-text-secondary">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className="h-14 rounded-loop-lg border border-loop-border bg-loop-surface px-4 font-loop-regular text-base text-loop-text-primary"
        placeholder={placeholder}
        placeholderTextColor="#71717A"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
