import type { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native-css/components';
import { SafeAreaView } from 'react-native-safe-area-context';

type OnboardingLayoutProps = PropsWithChildren<{ footer?: ReactNode }>;

export function OnboardingLayout({ children, footer }: OnboardingLayoutProps) {
  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
        <View className="flex-1 px-6 pt-8">{children}</View>
        {footer ? <View className="px-6 pb-4">{footer}</View> : null}
      </SafeAreaView>
    </View>
  );
}
