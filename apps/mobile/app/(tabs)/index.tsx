import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@loop/design-tokens';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1" contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Image source={require('@/assets/images/brand/loop-wordmark-dark.png')} style={styles.logo} />

      <View style={styles.intro}>
        <Text style={styles.eyebrow}>SEU PRÓXIMO PASSO</Text>
        <Text style={styles.title}>Menos dúvida.{`\n`}Mais movimento.</Text>
        <Text style={styles.description}>
          O Loop ajuda você a escolher e começar a melhor tarefa para agora.
        </Text>
      </View>

      <View style={styles.nowCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>FAÇA AGORA</Text>
          <Text style={styles.duration}>30 min</Text>
        </View>
        <Text style={styles.taskTitle}>Organize as prioridades de hoje</Text>
        <Text style={styles.taskDescription}>Uma ação pequena para ganhar clareza e ritmo.</Text>
        <Pressable className="active:opacity-90" style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>COMEÇAR</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>Comece pelo que importa agora.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: colors.neutral[50],
    paddingHorizontal: spacing[6],
    paddingTop: spacing[12],
    paddingBottom: spacing[16],
  },
  logo: {
    width: 126,
    height: 42,
    marginBottom: spacing[16],
  },
  intro: {
    gap: spacing[3],
    marginBottom: spacing[12],
  },
  eyebrow: {
    color: colors.brand[600],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1.2,
  },
  title: {
    color: colors.neutral[950],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    letterSpacing: -1,
    lineHeight: 42,
  },
  description: {
    color: colors.neutral[600],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    lineHeight: 24,
  },
  nowCard: {
    backgroundColor: colors.neutral[950],
    borderRadius: radius.xl,
    gap: spacing[4],
    padding: spacing[6],
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: colors.brand[400],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1.2,
  },
  duration: {
    color: colors.neutral[400],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  taskTitle: {
    color: colors.neutral[50],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 28,
  },
  taskDescription: {
    color: colors.neutral[400],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    lineHeight: 21,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.brand[500],
    borderRadius: radius.md,
    marginTop: spacing[2],
    paddingVertical: spacing[4],
  },
  primaryButtonText: {
    color: colors.neutral[0],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.8,
  },
  footer: {
    color: colors.neutral[500],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    marginTop: spacing[8],
    textAlign: 'center',
  },
});
