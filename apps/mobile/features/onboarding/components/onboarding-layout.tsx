import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { semanticColors, spacing } from '@loop/design-tokens';

type OnboardingLayoutProps = PropsWithChildren<{ footer?: ReactNode }>;

export function OnboardingLayout({ children, footer }: OnboardingLayoutProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: semanticColors.background, flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing[6], paddingTop: spacing[8] },
  footer: { paddingHorizontal: spacing[6], paddingBottom: spacing[4] },
});
