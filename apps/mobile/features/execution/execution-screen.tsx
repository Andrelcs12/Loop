import type { TaskExecutionOutcome } from "@loop/types";
import { router } from "expo-router";
import { Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Pressable, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { semanticColors } from "@loop/design-tokens";
import { useTaskFlow } from "@/features/tasks/hooks/use-task-flow";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainder
    .toString()
    .padStart(2, "0")}`;
}

export function ExecutionScreen() {
  const { tasks, activeExecution, finishActiveExecution } = useTaskFlow();
  const task = tasks.find((item) => item.id === activeExecution?.taskId);
  const [remainingSeconds, setRemainingSeconds] = useState(
    () => (task?.estimatedMinutes ?? 0) * 60,
  );
  const [paused, setPaused] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (paused || completed) {
      return;
    }

    const interval = setInterval(
      () => setRemainingSeconds((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => clearInterval(interval);
  }, [completed, paused]);

  function finish(outcome: TaskExecutionOutcome) {
    finishActiveExecution(outcome);

    if (outcome === "COMPLETED") {
      setCompleted(true);
      return;
    }

    router.replace("/home/now");
  }

  if (completed) {
    return <CompletionState onBack={() => router.replace("/home/now")} />;
  }

  if (!activeExecution || !task) {
    return <NoActiveExecution onBack={() => router.replace("/home/now")} />;
  }

  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView
        edges={["top", "bottom"]}
        className="flex-1 px-6"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 24, paddingTop: 32 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            <Text className="font-loop-medium text-sm uppercase tracking-[1.2px] text-loop-primary">
              Em andamento
            </Text>
            <Text className="mt-7 font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">
              {task.title}
            </Text>

            <View className="flex-1 items-center justify-center">
              <Text className="font-loop-bold text-6xl tracking-[-2px] text-loop-text-primary">
                {formatTime(remainingSeconds)}
              </Text>
              <Text className="mt-3 font-loop-regular text-base text-loop-text-secondary">
                tempo restante
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="bg-loop-background pb-4 pt-3">
          <View className="gap-3">
            <Pressable
              accessibilityRole="button"
              className="min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary"
              onPress={() => setPaused((value) => !value)}
            >
              <Text className="font-loop-semibold text-base text-loop-text-inverse">
                {paused ? "Retomar" : "Pausar"}
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              className="min-h-14 items-center justify-center rounded-loop-lg border border-loop-border bg-loop-surface"
              onPress={() => finish("COMPLETED")}
            >
              <Text className="font-loop-semibold text-base text-loop-text-primary">
                Concluir
              </Text>
            </Pressable>
            <View className="flex-row gap-3">
              <SecondaryAction
                label="Interromper"
                onPress={() => finish("INTERRUPTED")}
              />
              <SecondaryAction
                label="Pular"
                onPress={() => finish("SKIPPED")}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function SecondaryAction({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      className="flex-1 items-center py-3"
      onPress={onPress}
    >
      <Text className="font-loop-semibold text-base text-loop-text-secondary">
        {label}
      </Text>
    </Pressable>
  );
}

function CompletionState({ onBack }: { onBack: () => void }) {
  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView
        edges={["top", "bottom"]}
        className="flex-1 items-center justify-center px-6"
      >
        <View className="h-20 w-20 items-center justify-center rounded-full bg-loop-primary">
          <Check
            color={semanticColors.textInverse}
            size={42}
            strokeWidth={3}
          />
        </View>
        <Text className="mt-8 font-loop-bold text-3xl text-loop-text-primary">
          Tarefa concluída!
        </Text>
        <Pressable
          accessibilityRole="button"
          className="mt-10 min-h-14 w-full items-center justify-center rounded-loop-lg bg-loop-primary"
          onPress={onBack}
        >
          <Text className="font-loop-semibold text-base text-loop-text-inverse">
            Voltar para Agora
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

function NoActiveExecution({ onBack }: { onBack: () => void }) {
  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView
        edges={["top", "bottom"]}
        className="flex-1 items-center justify-center px-6"
      >
        <Text className="text-center font-loop-semibold text-xl text-loop-text-primary">
          Nenhuma tarefa em andamento.
        </Text>
        <Pressable
          accessibilityRole="button"
          className="mt-8 min-h-14 w-full items-center justify-center rounded-loop-lg bg-loop-primary"
          onPress={onBack}
        >
          <Text className="font-loop-semibold text-base text-loop-text-inverse">
            Voltar para Agora
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
