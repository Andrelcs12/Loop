import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native-css/components';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type PrimaryButtonProps = { label: string; onPress: () => void; variant?: 'primary' | 'secondary'; icon?: ReactNode };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PrimaryButton({ label, onPress, variant = 'primary', icon }: PrimaryButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const isPrimary = variant === 'primary';

  return (
    <AnimatedPressable
      accessibilityRole="button"
      className={`min-h-14 items-center justify-center rounded-loop-lg px-5 ${isPrimary ? 'bg-loop-primary' : 'border border-loop-border bg-loop-surface'}`}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98, { damping: 18, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 18, stiffness: 400 });
      }}
      style={animatedStyle}>
      <View className="flex-row items-center gap-3">
        {icon}
        <Text className={`font-loop-semibold text-base ${isPrimary ? 'text-loop-text-inverse' : 'text-loop-text-primary'}`}>
          {label}
        </Text>
      </View>
    </AnimatedPressable>
  );
}
