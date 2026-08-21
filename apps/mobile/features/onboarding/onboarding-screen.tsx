import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeInDown, FadeInRight, FadeOutLeft, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';

import { radius, semanticColors, spacing, typography } from '@loop/design-tokens';

import { BrandLogo } from './components/brand-logo';
import { OnboardingLayout } from './components/onboarding-layout';
import { OnboardingProgress } from './components/onboarding-progress';
import { PrimaryButton } from './components/primary-button';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

export function OnboardingScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(0);

  if (showSplash) {
    return <AnimatedSplash onFinish={() => setShowSplash(false)} />;
  }

  const nextStep = () => setStep((currentStep) => Math.min(currentStep + 1, 3));

  return (
    <OnboardingLayout footer={<Footer step={step} onPress={nextStep} />}>
      <Animated.View key={step} entering={FadeInRight.duration(360).easing(Easing.out(Easing.cubic))} exiting={FadeOutLeft.duration(220)} style={styles.stepContent}>
        {step === 0 ? <WelcomeStep /> : null}
        {step === 1 ? <PromiseStep /> : null}
        {step === 2 ? <HowItWorksStep /> : null}
        {step === 3 ? <AccountStep /> : null}
      </Animated.View>
    </OnboardingLayout>
  );
}

function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  const symbolOpacity = useSharedValue(0);
  const symbolScale = useSharedValue(0.85);
  const rotation = useSharedValue(0);
  const wordmarkOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    symbolOpacity.value = withDelay(120, withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }));
    symbolScale.value = withDelay(120, withSpring(1, { damping: 14, stiffness: 170 }));
    rotation.value = withDelay(720, withSequence(withTiming(7, { duration: 170 }), withTiming(0, { duration: 280, easing: Easing.out(Easing.cubic) })));
    wordmarkOpacity.value = withDelay(820, withTiming(1, { duration: 340 }));
    taglineOpacity.value = withDelay(1120, withTiming(1, { duration: 360 }));
    const timer = setTimeout(onFinish, 2050);
    return () => clearTimeout(timer);
  }, [onFinish, rotation, symbolOpacity, symbolScale, taglineOpacity, wordmarkOpacity]);

  const symbolStyle = useAnimatedStyle(() => ({ opacity: symbolOpacity.value, transform: [{ scale: symbolScale.value }, { rotate: `${rotation.value}deg` }] }));
  const wordmarkStyle = useAnimatedStyle(() => ({ opacity: wordmarkOpacity.value }));
  const taglineStyle = useAnimatedStyle(() => ({ opacity: taglineOpacity.value, transform: [{ translateY: (1 - taglineOpacity.value) * 12 }] }));

  return (
    <OnboardingLayout>
      <View style={styles.splashContent}>
        <Animated.View style={symbolStyle}><BrandLogo size={126} /></Animated.View>
        <Animated.View style={[styles.splashWordmark, wordmarkStyle]}><BrandLogo size={92} wordmark /></Animated.View>
      </View>
      <Animated.Text style={[styles.splashTagline, taglineStyle]}>Seu dia.{`\n`}Menos decisão.{`\n`}Mais ação.</Animated.Text>
    </OnboardingLayout>
  );
}

function WelcomeStep() {
  return <><VisualCue icon="calendar-month" label="Tempo para o que importa" /><Text style={styles.title}>Bem-vindo ao{`\n`}Loop!</Text><Text style={styles.description}>O app que transforma o tempo disponível na melhor ação para o momento que você vive.</Text></>;
}

function PromiseStep() {
  return <><Text style={styles.title}>Em segundos,{`\n`}você sabe o que{`\n`}fazer <Text style={styles.highlight}>agora.</Text></Text><View style={styles.featureList}><FeatureItem icon="schedule" text="Considera o tempo que você tem" delay={80} /><FeatureItem icon="low-priority" text="Prioriza o que realmente importa" delay={150} /><FeatureItem icon="play-circle-filled" text="Te mostra a melhor próxima ação" delay={220} /></View></>;
}

function HowItWorksStep() {
  const items = ['Adicione suas tarefas e compromissos', 'Diga quanto tempo você tem', 'Receba a melhor ação para o momento', 'Comece, conclua e avance'];
  return <><Text style={styles.title}>É simples assim:</Text><View style={styles.instructions}>{items.map((text, index) => <View key={text} style={styles.instruction}><View style={styles.number}><Text style={styles.numberText}>{index + 1}</Text></View><Text style={styles.instructionText}>{text}</Text></View>)}</View></>;
}

function AccountStep() {
  return <><Text style={styles.title}>Vamos começar{`\n`}sua <Text style={styles.highlight}>jornada!</Text></Text><Text style={styles.description}>Crie sua conta para transformar intenção em movimento todos os dias.</Text><View style={styles.authActions}><PrimaryButton label="Continuar com Google" onPress={() => undefined} variant="secondary" /><PrimaryButton label="Continuar com Apple" onPress={() => undefined} variant="secondary" /><View style={styles.separator}><View style={styles.line} /><Text style={styles.or}>ou</Text><View style={styles.line} /></View><PrimaryButton label="Usar e-mail" onPress={() => undefined} /></View></>;
}

function Footer({ step, onPress }: { step: number; onPress: () => void }) {
  if (step === 3) return <Text style={styles.signIn}>Já tem conta? <Text style={styles.signInAccent}>Entrar</Text></Text>;
  return <View style={styles.footerContent}><OnboardingProgress activeStep={step} /><PrimaryButton label="Continuar" onPress={onPress} /></View>;
}

function VisualCue({ icon, label }: { icon: IconName; label: string }) {
  return <Animated.View entering={FadeInDown.duration(420)} style={styles.visualCue}><MaterialIcons name={icon} size={42} color={semanticColors.primary} /><Text style={styles.visualLabel}>{label}</Text></Animated.View>;
}

function FeatureItem({ icon, text, delay }: { icon: IconName; text: string; delay: number }) {
  return <Animated.View entering={FadeInDown.delay(delay).duration(360)} style={styles.feature}><MaterialIcons name={icon} size={25} color={semanticColors.primary} /><Text style={styles.featureText}>{text}</Text></Animated.View>;
}

const styles = StyleSheet.create({
  stepContent: { flex: 1, justifyContent: 'center' },
  splashContent: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  splashWordmark: { marginTop: spacing[4] },
  splashTagline: { color: semanticColors.textSecondary, fontFamily: typography.fontFamily.medium, fontSize: typography.fontSize.lg, lineHeight: 27, paddingBottom: spacing[8], textAlign: 'center' },
  visualCue: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: semanticColors.surface, borderRadius: radius.xl, gap: spacing[2], marginBottom: spacing[10], padding: spacing[5] },
  visualLabel: { color: semanticColors.textSecondary, fontFamily: typography.fontFamily.medium, fontSize: typography.fontSize.sm },
  title: { color: semanticColors.textPrimary, fontFamily: typography.fontFamily.bold, fontSize: 38, letterSpacing: -1.4, lineHeight: 44 },
  highlight: { color: semanticColors.primary },
  description: { color: semanticColors.textSecondary, fontFamily: typography.fontFamily.regular, fontSize: typography.fontSize.lg, lineHeight: 27, marginTop: spacing[5], maxWidth: 340 },
  featureList: { gap: spacing[5], marginTop: spacing[12] },
  feature: { alignItems: 'center', flexDirection: 'row', gap: spacing[4] },
  featureText: { color: semanticColors.textPrimary, flex: 1, fontFamily: typography.fontFamily.medium, fontSize: typography.fontSize.lg, lineHeight: 25 },
  instructions: { gap: spacing[5], marginTop: spacing[12] },
  instruction: { alignItems: 'center', flexDirection: 'row', gap: spacing[4] },
  number: { alignItems: 'center', backgroundColor: semanticColors.primary, borderRadius: radius.full, height: 28, justifyContent: 'center', width: 28 },
  numberText: { color: semanticColors.textInverse, fontFamily: typography.fontFamily.bold, fontSize: typography.fontSize.sm },
  instructionText: { color: semanticColors.textPrimary, flex: 1, fontFamily: typography.fontFamily.medium, fontSize: typography.fontSize.lg, lineHeight: 25 },
  authActions: { gap: spacing[3], marginTop: spacing[10] },
  separator: { alignItems: 'center', flexDirection: 'row', gap: spacing[3], marginVertical: spacing[2] },
  line: { backgroundColor: semanticColors.border, flex: 1, height: 1 },
  or: { color: semanticColors.textMuted, fontFamily: typography.fontFamily.medium, fontSize: typography.fontSize.sm },
  footerContent: { gap: spacing[5] },
  signIn: { color: semanticColors.textSecondary, fontFamily: typography.fontFamily.regular, fontSize: typography.fontSize.sm, paddingBottom: spacing[4], textAlign: 'center' },
  signInAccent: { color: semanticColors.primary, fontFamily: typography.fontFamily.semibold },
});
