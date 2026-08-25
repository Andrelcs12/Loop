import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Animated, { Easing, FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { SetupFooter } from "./components/setup-footer";
import { SetupProgress } from "./components/setup-progress";
import { AvailableTime, AvailableTimeStep } from "./steps/available-time-step";
import { FirstCommitment, FirstCommitmentStep } from "./steps/first-commitment-step";
import { Goal, GoalStep } from "./steps/goal-step";
import { ReadyStep } from "./steps/ready-step";
import { Routine, RoutineStep } from "./steps/routine-step";
import { completeSetup, getSetup, updateSetup } from "@/lib/setup";
import { useAuth } from "@/features/auth/auth-provider";

type SetupAnswers = {
  goal?: Goal;
  routine?: Routine;
  availableTime?: AvailableTime;
  firstCommitment?: FirstCommitment;
};

type SetupScreenProps = { onComplete: () => void };

const LAST_STEP = 4;
const EMPTY_COMMITMENT: FirstCommitment = { title: "", date: "", time: "" };

export function SetupScreen({ onComplete }: SetupScreenProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SetupAnswers>({});
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(true);
  const { currentUser, refreshCurrentUser } = useAuth();
  const firstName = useMemo(() => currentUser?.name?.trim().split(/\s+/)[0], [currentUser?.name]);

  useEffect(() => {
    void getSetup().then(({ setup }) => {
      if (!setup) return;
      setStep(setup.currentStep);
      setAnswers({
        goal: setup.goal ? GOAL_FROM_API[setup.goal] : undefined,
        routine: setup.routine ? ROUTINE_FROM_API[setup.routine] : undefined,
        availableTime: setup.availableTime ? AVAILABLE_TIME_FROM_API[setup.availableTime] : undefined,
      });
    }).catch(() => setError("Não foi possível carregar seu setup. Tente novamente."))
      .finally(() => setIsSaving(false));
  }, []);

  async function handleContinue() {
    setError(null);
    setIsSaving(true);

    try {
      if (step === 4) {
        if (!answers.goal || !answers.routine || !answers.availableTime) throw new Error("Preencha as etapas anteriores para concluir.");
        await completeSetup({
          goal: API_GOAL[answers.goal],
          routine: API_ROUTINE[answers.routine],
          availableTime: API_AVAILABLE_TIME[answers.availableTime],
          initialCommitment: toInitialCommitment(answers.firstCommitment),
        });
        await refreshCurrentUser();
        onComplete();
        return;
      }

      await updateSetup({
        currentStep: step + 1,
        ...(answers.goal ? { goal: API_GOAL[answers.goal] } : {}),
        ...(answers.routine ? { routine: API_ROUTINE[answers.routine] } : {}),
        ...(answers.availableTime ? { availableTime: API_AVAILABLE_TIME[answers.availableTime] } : {}),
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível salvar o setup.");
      return;
    } finally {
      setIsSaving(false);
    }

    if (step === LAST_STEP) {
      return;
    }
    setStep((currentStep) => currentStep + 1);
  }

  function handleSkipCommitment() {
    setAnswers((current) => ({ ...current, firstCommitment: undefined }));
    setStep(4);
  }

  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top", "bottom"]} className="flex-1 px-6">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
          <View className="pt-6"><SetupProgress activeStep={step} totalSteps={LAST_STEP + 1} /></View>
          {step === 0 ? <Text className="mt-6 font-loop-semibold text-lg text-loop-text-primary">{firstName ? `Vamos configurar seu Loop, ${firstName}.` : "Vamos configurar seu Loop."}</Text> : null}
          <Animated.View key={step} entering={FadeInRight.duration(300).easing(Easing.out(Easing.cubic))} exiting={FadeOutLeft.duration(180)} className="flex-1">
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingTop: 28, paddingBottom: 32 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              {step === 0 ? <GoalStep value={answers.goal} onChange={(goal) => setAnswers((current) => ({ ...current, goal }))} /> : null}
              {step === 1 ? <RoutineStep value={answers.routine} onChange={(routine) => setAnswers((current) => ({ ...current, routine }))} /> : null}
              {step === 2 ? <AvailableTimeStep value={answers.availableTime} onChange={(availableTime) => setAnswers((current) => ({ ...current, availableTime }))} /> : null}
              {step === 3 ? <FirstCommitmentStep value={answers.firstCommitment ?? EMPTY_COMMITMENT} onChange={(firstCommitment) => setAnswers((current) => ({ ...current, firstCommitment }))} onSkip={handleSkipCommitment} /> : null}
              {step === 4 ? <ReadyStep /> : null}
            </ScrollView>
          </Animated.View>
          {error ? <Text className="pb-2 font-loop-regular text-sm text-red-400">{error}</Text> : null}
          <View className="border-t border-loop-border bg-loop-background pb-4 pt-4"><SetupFooter step={step} isLoading={isSaving} onBack={() => setStep((current) => Math.max(0, current - 1))} onContinue={() => void handleContinue()} /></View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const API_GOAL = { "Ser mais produtivo": "PRODUCTIVITY", "Estudar melhor": "STUDY", "Criar hábitos saudáveis": "HEALTHY_HABITS", "Ter mais tempo livre": "MORE_FREE_TIME", "Organizar minha vida": "LIFE_ORGANIZATION" } as const;
const API_ROUTINE = { "Manhã": "MORNING", "Tarde": "AFTERNOON", "Noite": "EVENING", "Dia todo": "ALL_DAY" } as const;
const API_AVAILABLE_TIME = { "Menos de 30 min": "UNDER_30_MINUTES", "30 min a 1 hora": "FROM_30_TO_60_MINUTES", "1 a 2 horas": "FROM_1_TO_2_HOURS", "Mais de 2 horas": "OVER_2_HOURS" } as const;
const GOAL_FROM_API = Object.fromEntries(Object.entries(API_GOAL).map(([label, value]) => [value, label])) as Record<string, Goal>;
const ROUTINE_FROM_API = Object.fromEntries(Object.entries(API_ROUTINE).map(([label, value]) => [value, label])) as Record<string, Routine>;
const AVAILABLE_TIME_FROM_API = Object.fromEntries(Object.entries(API_AVAILABLE_TIME).map(([label, value]) => [value, label])) as Record<string, AvailableTime>;

function toInitialCommitment(commitment?: FirstCommitment) {
  if (!commitment?.title.trim() && !commitment?.date.trim() && !commitment?.time.trim()) return undefined;
  if (!commitment?.title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(commitment.date) || !/^\d{2}:\d{2}$/.test(commitment.time)) {
    throw new Error("Informe título, data (AAAA-MM-DD) e horário (HH:MM), ou pule o compromisso.");
  }
  const [year, month, day] = commitment.date.split("-").map(Number);
  const [hour, minute] = commitment.time.split(":").map(Number);
  const startsAt = new Date(year, month - 1, day, hour, minute);
  if (Number.isNaN(startsAt.valueOf())) throw new Error("A data do compromisso é inválida.");
  return { title: commitment.title.trim(), startsAt: startsAt.toISOString() };
}
