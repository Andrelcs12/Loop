import { useEffect } from "react";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native-css/components";

import { semanticColors } from "@loop/design-tokens";

export function OnboardingProgress({ activeStep }: { activeStep: number }) {
  return (
    <View
      accessibilityLabel={`Etapa ${activeStep + 1} de 3`}
      className="flex-row justify-center gap-2"
    >
      {[0, 1, 2].map((step) => (
        <ProgressDot key={step} active={step === activeStep} />
      ))}
    </View>
  );
}

function ProgressDot({ active }: { active: boolean }) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [7, 20]),

    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [semanticColors.border, semanticColors.primary],
    ),
  }));

  return (
    <Animated.View className="h-[7px] rounded-full" style={animatedStyle} />
  );
}
