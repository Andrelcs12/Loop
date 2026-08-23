import { useEffect } from "react";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text, View } from "react-native-css/components";

import { semanticColors } from "@loop/design-tokens";

type SetupProgressProps = {
  activeStep: number;
  totalSteps: number;
};

export function SetupProgress({ activeStep, totalSteps }: SetupProgressProps) {
  return (
    <View accessibilityLabel={`Etapa ${activeStep + 1} de ${totalSteps}`}>
      <View className="flex-row gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <ProgressSegment key={index} active={index <= activeStep} />
        ))}
      </View>
      <Text className="mt-3 font-loop-medium text-xs text-loop-text-muted">
        {activeStep + 1} de {totalSteps}
      </Text>
    </View>
  );
}

function ProgressSegment({ active }: { active: boolean }) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
    });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [semanticColors.border, semanticColors.primary],
    ),
    opacity: interpolate(progress.value, [0, 1], [0.65, 1]),
  }));

  return <Animated.View className="h-1 flex-1 rounded-full" style={animatedStyle} />;
}
