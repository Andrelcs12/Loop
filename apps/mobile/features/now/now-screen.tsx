import type { TaskPriority } from "@loop/types";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Pressable, ScrollView, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTaskFlow } from "@/features/tasks/hooks/use-task-flow";

import { timeOptions } from "./now-mock-data";
import {
  recommendTask,
  type TaskRecommendation,
} from "./services/recommend-task";

const priorityLabel: Record<TaskPriority, string> = {
  HIGH: "Alta prioridade",
  MEDIUM: "Média prioridade",
  LOW: "Baixa prioridade",
};

type NowState = "TIME" | "RECOMMENDATION" | "REASON";

export function NowScreen() {
  const { tasks, startTask } = useTaskFlow();
  const [selectedMinutes, setSelectedMinutes] = useState(30);
  const [screenState, setScreenState] = useState<NowState>("TIME");
  const [recommendation, setRecommendation] =
    useState<TaskRecommendation | null>(null);
  const [message, setMessage] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      setScreenState("TIME");
      setRecommendation(null);
      setMessage(undefined);
    }, []),
  );

  function handleRecommend() {
    const result = recommendTask(tasks, selectedMinutes);
    setRecommendation(result);
    setMessage(
      result
        ? undefined
        : "Nenhuma tarefa pendente cabe nesse tempo. Tente uma janela maior.",
    );

    if (result) {
      setScreenState("RECOMMENDATION");
    }
  }

  function handleOtherOption() {
    if (!recommendation) {
      return;
    }

    const result = recommendTask(
      tasks.filter((task) => task.id !== recommendation.task.id),
      selectedMinutes,
    );

    if (result) {
      setRecommendation(result);
      setScreenState("RECOMMENDATION");
      setMessage(undefined);
      return;
    }

    setMessage("Não há outra tarefa que caiba nesse tempo.");
  }

  function handleStart() {
    if (!recommendation) {
      return;
    }

    startTask(recommendation.task.id);
    router.push("/execution");
  }

  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView
          className="flex-1 px-6 pt-8"
          contentContainerStyle={{ paddingBottom: 130 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">
            Agora
          </Text>

          {screenState === "TIME" ? (
            <TimeSelection
              message={message}
              selectedMinutes={selectedMinutes}
              onSelect={setSelectedMinutes}
              onContinue={handleRecommend}
            />
          ) : recommendation ? (
            <RecommendationCard
              recommendation={recommendation}
              showReason={screenState === "REASON"}
              message={message}
              onStart={handleStart}
              onReason={() => setScreenState("REASON")}
              onAlternatives={handleOtherOption}
              onBack={() => {
                setScreenState("TIME");
                setMessage(undefined);
              }}
            />
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

type TimeSelectionProps = {
  selectedMinutes: number;
  message?: string;
  onSelect: (value: number) => void;
  onContinue: () => void;
};

function TimeSelection({
  selectedMinutes,
  message,
  onSelect,
  onContinue,
}: TimeSelectionProps) {
  return (
    <Animated.View entering={FadeInDown.duration(300)}>
      <Text className="mt-9 font-loop-semibold text-xl text-loop-text-primary">
        Quanto tempo você tem?
      </Text>
      <View className="mt-5 flex-row flex-wrap gap-3">
        {timeOptions.map((minutes) => (
          <Pressable
            key={minutes}
            accessibilityRole="radio"
            accessibilityState={{ selected: selectedMinutes === minutes }}
            className={`min-w-[76px] items-center rounded-loop-lg border px-4 py-4 ${
              selectedMinutes === minutes
                ? "border-loop-primary bg-loop-primary/15"
                : "border-loop-border bg-loop-surface"
            }`}
            onPress={() => onSelect(minutes)}
          >
            <Text
              className={`font-loop-semibold text-base ${
                selectedMinutes === minutes
                  ? "text-loop-primary"
                  : "text-loop-text-primary"
              }`}
            >
              {minutes} min
            </Text>
          </Pressable>
        ))}
      </View>

      {message ? (
        <Text accessibilityRole="alert" className="mt-5 font-loop-medium text-sm text-loop-text-secondary">
          {message}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        className="mt-7 min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary active:opacity-80"
        onPress={onContinue}
      >
        <Text className="font-loop-semibold text-base text-loop-text-inverse">
          Ver recomendação
        </Text>
      </Pressable>
    </Animated.View>
  );
}

type RecommendationCardProps = {
  recommendation: TaskRecommendation;
  showReason: boolean;
  message?: string;
  onStart: () => void;
  onReason: () => void;
  onAlternatives: () => void;
  onBack: () => void;
};

function RecommendationCard({
  recommendation,
  showReason,
  message,
  onStart,
  onReason,
  onAlternatives,
  onBack,
}: RecommendationCardProps) {
  const { task, reason } = recommendation;

  return (
    <Animated.View entering={FadeInDown.duration(300)} className="mt-9">
      <Text className="font-loop-medium text-sm uppercase tracking-[1.2px] text-loop-primary">
        Recomendação para agora
      </Text>
      <View className="mt-4 rounded-[24px] border border-loop-primary/35 bg-loop-surface p-5">
        <Text className="font-loop-bold text-2xl text-loop-text-primary">
          {task.title}
        </Text>
        <Text className="mt-2 font-loop-medium text-base text-loop-text-secondary">
          {task.estimatedMinutes} min · {priorityLabel[task.priority]}
        </Text>
        <Text className="mt-6 font-loop-regular text-base leading-6 text-loop-text-secondary">
          {showReason
            ? reason
            : "Uma ação que faz progresso real e cabe no seu tempo."}
        </Text>
      </View>

      {message ? (
        <Text className="mt-4 font-loop-medium text-sm text-loop-text-secondary">
          {message}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        className="mt-7 min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary active:opacity-80"
        onPress={onStart}
      >
        <Text className="font-loop-semibold text-base text-loop-text-inverse">
          Começar
        </Text>
      </Pressable>
      <View className="mt-3 flex-row gap-3">
        <ActionButton label="Por que essa ação?" onPress={onReason} />
        <ActionButton label="Ver outra opção" onPress={onAlternatives} />
      </View>
      <Pressable
        accessibilityRole="button"
        className="mt-4 items-center py-3"
        onPress={onBack}
      >
        <Text className="font-loop-semibold text-sm text-loop-text-secondary">
          Alterar tempo disponível
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function ActionButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      className="flex-1 items-center rounded-loop-lg border border-loop-border bg-loop-surface px-3 py-4 active:opacity-70"
      onPress={onPress}
    >
      <Text className="font-loop-medium text-sm text-loop-text-primary">
        {label}
      </Text>
    </Pressable>
  );
}
