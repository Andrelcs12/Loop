import { Pressable, Text, View } from "react-native-css/components";

type OptionCardProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function OptionCard({ label, selected, onPress }: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className={`min-h-[60px] flex-row items-center rounded-loop-xl border px-5 active:opacity-80 ${
        selected
          ? "border-loop-primary bg-loop-primary/15"
          : "border-loop-border bg-loop-surface"
      }`}
      onPress={onPress}
    >
      <View
        className={`mr-4 h-5 w-5 items-center justify-center rounded-full border ${
          selected ? "border-loop-primary" : "border-loop-text-muted"
        }`}
      >
        {selected ? <View className="h-2.5 w-2.5 rounded-full bg-loop-primary" /> : null}
      </View>
      <Text className="font-loop-medium text-base text-loop-text-primary">{label}</Text>
    </Pressable>
  );
}
