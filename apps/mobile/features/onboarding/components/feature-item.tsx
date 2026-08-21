import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { semanticColors } from '@loop/design-tokens';

type FeatureItemProps = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  text: string;
  delay: number;
};

export function FeatureItem({ icon, text, delay }: FeatureItemProps) {
  return (
    <Animated.View className="flex-row items-center gap-4" entering={FadeInDown.delay(delay).duration(360)}>
      <MaterialIcons color={semanticColors.primary} name={icon} size={24} />
      <Text className="flex-1 font-loop-medium text-base leading-6 text-loop-text-primary">{text}</Text>
    </Animated.View>
  );
}
