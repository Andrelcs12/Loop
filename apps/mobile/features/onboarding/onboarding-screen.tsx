import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, FadeInDown, FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import { semanticColors } from '@loop/design-tokens';

import { OnboardingLayout } from './components/onboarding-layout';
import { OnboardingProgress } from './components/onboarding-progress';
import { PrimaryButton } from './components/primary-button';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

export function OnboardingScreen() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((currentStep) => Math.min(currentStep + 1, 3));

  return (
    <OnboardingLayout footer={<Footer step={step} onPress={nextStep} />}>
      <Animated.View key={step} className="flex-1 justify-center" entering={FadeInRight.duration(360).easing(Easing.out(Easing.cubic))} exiting={FadeOutLeft.duration(220)}>
        {step === 0 ? <WelcomeStep /> : null}
        {step === 1 ? <PromiseStep /> : null}
        {step === 2 ? <HowItWorksStep /> : null}
        {step === 3 ? <AccountStep /> : null}
      </Animated.View>
    </OnboardingLayout>
  );
}

function WelcomeStep() {
  return <><VisualCue icon="calendar-month" label="Tempo para o que importa" /><Text className="font-loop-bold text-[38px] leading-[44px] tracking-[-1.4px] text-loop-text-primary">Bem-vindo ao{`\n`}Loop!</Text><Text className="mt-5 max-w-[340px] font-loop-regular text-lg leading-[27px] text-loop-text-secondary">O app que transforma o tempo disponível na melhor ação para o momento que você vive.</Text></>;
}

function PromiseStep() {
  return <><Text className="font-loop-bold text-[38px] leading-[44px] tracking-[-1.4px] text-loop-text-primary">Em segundos,{`\n`}você sabe o que{`\n`}fazer <Text className="text-loop-primary">agora.</Text></Text><View className="mt-12 gap-5"><FeatureItem icon="schedule" text="Considera o tempo que você tem" delay={80} /><FeatureItem icon="low-priority" text="Prioriza o que realmente importa" delay={150} /><FeatureItem icon="play-circle-filled" text="Te mostra a melhor próxima ação" delay={220} /></View></>;
}

function HowItWorksStep() {
  const items = ['Adicione suas tarefas e compromissos', 'Diga quanto tempo você tem', 'Receba a melhor ação para o momento', 'Comece, conclua e avance'];
  return <><Text className="font-loop-bold text-[38px] leading-[44px] tracking-[-1.4px] text-loop-text-primary">É simples assim:</Text><View className="mt-12 gap-5">{items.map((text, index) => <View key={text} className="flex-row items-center gap-4"><View className="h-7 w-7 items-center justify-center rounded-full bg-loop-primary"><Text className="font-loop-bold text-sm text-loop-text-inverse">{index + 1}</Text></View><Text className="flex-1 font-loop-medium text-lg leading-[25px] text-loop-text-primary">{text}</Text></View>)}</View></>;
}

function AccountStep() {
  return <><Text className="font-loop-bold text-[38px] leading-[44px] tracking-[-1.4px] text-loop-text-primary">Vamos começar{`\n`}sua <Text className="text-loop-primary">jornada!</Text></Text><Text className="mt-5 max-w-[340px] font-loop-regular text-lg leading-[27px] text-loop-text-secondary">Crie sua conta para transformar intenção em movimento todos os dias.</Text><View className="mt-10 gap-3"><PrimaryButton label="Continuar com Google" onPress={() => undefined} variant="secondary" /><PrimaryButton label="Continuar com Apple" onPress={() => undefined} variant="secondary" /><View className="my-2 flex-row items-center gap-3"><View className="h-px flex-1 bg-loop-border" /><Text className="font-loop-medium text-sm text-loop-text-muted">ou</Text><View className="h-px flex-1 bg-loop-border" /></View><PrimaryButton label="Usar e-mail" onPress={() => undefined} /></View></>;
}

function Footer({ step, onPress }: { step: number; onPress: () => void }) {
  if (step === 3) return <Text className="pb-4 text-center font-loop-regular text-sm text-loop-text-secondary">Já tem conta? <Text className="font-loop-semibold text-loop-primary">Entrar</Text></Text>;
  return <View className="gap-5"><OnboardingProgress activeStep={step} /><PrimaryButton label="Continuar" onPress={onPress} /></View>;
}

function VisualCue({ icon, label }: { icon: IconName; label: string }) {
  return <Animated.View className="mb-10 items-center self-start gap-2 rounded-loop-xl bg-loop-surface p-5" entering={FadeInDown.duration(420)}><MaterialIcons name={icon} size={42} color={semanticColors.primary} /><Text className="font-loop-medium text-sm text-loop-text-secondary">{label}</Text></Animated.View>;
}

function FeatureItem({ icon, text, delay }: { icon: IconName; text: string; delay: number }) {
  return <Animated.View className="flex-row items-center gap-4" entering={FadeInDown.delay(delay).duration(360)}><MaterialIcons name={icon} size={25} color={semanticColors.primary} /><Text className="flex-1 font-loop-medium text-lg leading-[25px] text-loop-text-primary">{text}</Text></Animated.View>;
}
