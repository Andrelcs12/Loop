import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { radius, semanticColors, spacing, typography } from '@loop/design-tokens';

type PrimaryButtonProps = { label: string; onPress: () => void; variant?: 'primary' | 'secondary' };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PrimaryButton({ label, onPress, variant = 'primary' }: PrimaryButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const isPrimary = variant === 'primary';

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.98, { damping: 18, stiffness: 400 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 18, stiffness: 400 }); }}
      style={[styles.button, isPrimary ? styles.primary : styles.secondary, animatedStyle]}>
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', borderRadius: radius.lg, justifyContent: 'center', minHeight: 56, paddingHorizontal: spacing[5] },
  primary: { backgroundColor: semanticColors.primary },
  secondary: { backgroundColor: semanticColors.surface, borderColor: semanticColors.border, borderWidth: 1 },
  label: { fontFamily: typography.fontFamily.semibold, fontSize: typography.fontSize.base },
  primaryLabel: { color: semanticColors.textInverse },
  secondaryLabel: { color: semanticColors.textPrimary },
});
