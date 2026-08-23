import { useState } from "react";
import Animated, { Easing, FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { SetupFooter } from "./components/setup-footer";
import { SetupProgress } from "./components/setup-progress";
import { AvailableTime, AvailableTimeStep } from "./steps/available-time-step";
import { FirstCommitment, FirstCommitmentStep } from "./steps/first-commitment-step";
import { Goal, GoalStep } from "./steps/goal-step";
import { ReadyStep } from "./steps/ready-step";
import { Routine, RoutineStep } from "./steps/routine-step";

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

  function handleContinue() {
    if (step === LAST_STEP) {
      onComplete();
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
        <View className="pt-5"><SetupProgress activeStep={step} totalSteps={LAST_STEP + 1} /></View>
        <Animated.View key={step} entering={FadeInRight.duration(300).easing(Easing.out(Easing.cubic))} exiting={FadeOutLeft.duration(180)} className="flex-1 pt-10">
          {step === 0 ? <GoalStep value={answers.goal} onChange={(goal) => setAnswers((current) => ({ ...current, goal }))} /> : null}
          {step === 1 ? <RoutineStep value={answers.routine} onChange={(routine) => setAnswers((current) => ({ ...current, routine }))} /> : null}
          {step === 2 ? <AvailableTimeStep value={answers.availableTime} onChange={(availableTime) => setAnswers((current) => ({ ...current, availableTime }))} /> : null}
          {step === 3 ? <FirstCommitmentStep value={answers.firstCommitment ?? EMPTY_COMMITMENT} onChange={(firstCommitment) => setAnswers((current) => ({ ...current, firstCommitment }))} onSkip={handleSkipCommitment} /> : null}
          {step === 4 ? <ReadyStep /> : null}
        </Animated.View>
        <View className="pb-4"><SetupFooter step={step} onBack={() => setStep((current) => Math.max(0, current - 1))} onContinue={handleContinue} /></View>
      </SafeAreaView>
    </View>
  );
}
