import { Text, View } from "react-native-css/components";

type SetupStepHeaderProps = {
  title: string;
  description: string;
};

export function SetupStepHeader({
  title,
  description,
}: SetupStepHeaderProps) {
  return (
    <View>
      <Text className="font-loop-bold text-3xl leading-9 tracking-[-0.8px] text-loop-text-primary">
        {title}
      </Text>
      <Text className="mt-3 font-loop-regular text-base leading-6 text-loop-text-secondary">
        {description}
      </Text>
    </View>
  );
}
