import type { TaskExecution, TaskExecutionOutcome } from "@loop/types";
import { ScrollView, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTaskFlow } from "@/features/tasks/hooks/use-task-flow";

const sectionTitle: Record<TaskExecutionOutcome, string> = {
  COMPLETED: "Concluídas",
  INTERRUPTED: "Interrompidas",
  SKIPPED: "Puladas",
};

export function HistoryScreen() {
  const { executions, tasks } = useTaskFlow();
  const finishedExecutions = executions.filter(
    (execution) => execution.outcome && execution.endedAt,
  );
  const completedCount = finishedExecutions.filter(
    (execution) => execution.outcome === "COMPLETED",
  ).length;
  const interruptedCount = finishedExecutions.filter(
    (execution) => execution.outcome === "INTERRUPTED",
  ).length;
  const skippedCount = finishedExecutions.filter(
    (execution) => execution.outcome === "SKIPPED",
  ).length;
  const actualMinutes = finishedExecutions.reduce(
    (total, execution) => total + (execution.actualMinutes ?? 0),
    0,
  );

  function taskTitle(execution: TaskExecution) {
    return (
      tasks.find((task) => task.id === execution.taskId)?.title ??
      "Tarefa removida"
    );
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
            Histórico
          </Text>
          <Text className="mt-7 font-loop-medium text-sm text-loop-text-secondary">
            Nesta sessão
          </Text>

          <View className="mt-3 flex-row flex-wrap gap-3">
            <Metric label="Concluídas" value={completedCount.toString()} />
            <Metric label="Interrompidas" value={interruptedCount.toString()} />
            <Metric label="Puladas" value={skippedCount.toString()} />
            <Metric label="Tempo realizado" value={`${actualMinutes} min`} />
          </View>

          {finishedExecutions.length === 0 ? (
            <View className="mt-10 rounded-[24px] border border-loop-border bg-loop-surface p-6">
              <Text className="font-loop-semibold text-lg text-loop-text-primary">
                Nenhuma execução registrada.
              </Text>
              <Text className="mt-2 font-loop-regular text-base leading-6 text-loop-text-secondary">
                Conclua, interrompa ou pule uma tarefa para vê-la aqui.
              </Text>
            </View>
          ) : (
            (["COMPLETED", "INTERRUPTED", "SKIPPED"] as const).map(
              (outcome) => (
                <HistorySection
                  key={outcome}
                  title={sectionTitle[outcome]}
                  items={finishedExecutions
                    .filter((execution) => execution.outcome === outcome)
                    .map((execution) => ({
                      id: execution.id,
                      title: taskTitle(execution),
                      minutes: execution.actualMinutes ?? 0,
                    }))}
                />
              ),
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View className="min-w-[46%] flex-1 rounded-[20px] border border-loop-border bg-loop-surface p-4">
      <Text className="font-loop-bold text-2xl text-loop-text-primary">
        {value}
      </Text>
      <Text className="mt-1 font-loop-regular text-sm text-loop-text-secondary">
        {label}
      </Text>
    </View>
  );
}

type HistoryItem = {
  id: string;
  title: string;
  minutes: number;
};

function HistorySection({
  title,
  items,
}: {
  title: string;
  items: HistoryItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View className="mt-8">
      <Text className="font-loop-semibold text-lg text-loop-text-primary">
        {title}
      </Text>
      <View className="mt-3 gap-2">
        {items.map((item) => (
          <View
            key={item.id}
            className="rounded-loop-lg border border-loop-border bg-loop-surface p-4"
          >
            <Text className="font-loop-medium text-base text-loop-text-primary">
              {item.title}
            </Text>
            <Text className="mt-1 font-loop-regular text-sm text-loop-text-secondary">
              {item.minutes} min realizados
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
