import type { PropsWithChildren, ReactNode } from "react";
import { ScrollView } from "react-native";

import { View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

type OnboardingLayoutProps = PropsWithChildren<{
  footer?: ReactNode;
}>;

export function OnboardingLayout({ children, footer }: OnboardingLayoutProps) {
  return (
    <View className="relative flex-1 overflow-hidden bg-loop-background">
      <View
        pointerEvents="none"
        className="absolute -right-28 blur-2xl -top-32 h-[300px] w-[300px] rounded-full bg-[#ff6928]/10"
      />

      <View
        pointerEvents="none"
        className="absolute h-60 w-60 rounded-full bg-[#ff501e]/10 blur-2xl -bottom-28"
      />

      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {children}
        </ScrollView>

        {footer ? <View className="border-t border-loop-border bg-loop-background px-6 pb-4 pt-4">{footer}</View> : null}
      </SafeAreaView>
    </View>
  );
}
