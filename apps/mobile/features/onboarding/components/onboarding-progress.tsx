import { StyleSheet, View } from 'react-native';

import { semanticColors, spacing } from '@loop/design-tokens';

export function OnboardingProgress({ activeStep }: { activeStep: number }) {
  return <View accessibilityLabel={`Etapa ${activeStep + 1} de 4`} style={styles.container}>{[0, 1, 2, 3].map((step) => <View key={step} style={[styles.dot, step === activeStep && styles.activeDot]} />)}</View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: spacing[2], justifyContent: 'center' },
  dot: { backgroundColor: semanticColors.textMuted, borderRadius: 999, height: 7, width: 7 },
  activeDot: { backgroundColor: semanticColors.primary, width: 20 },
});
