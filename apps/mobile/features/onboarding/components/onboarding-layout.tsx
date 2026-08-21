import type { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type OnboardingLayoutProps = PropsWithChildren<{ footer?: ReactNode }>;

export function OnboardingLayout({ children, footer }: OnboardingLayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-loop-background" edges={['top', 'bottom']}>
      <View className="flex-1 px-6 pt-8">{children}</View>
      {footer ? <View className="px-6 pb-4">{footer}</View> : null}
    </SafeAreaView>
  );
}
