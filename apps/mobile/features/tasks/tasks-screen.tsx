import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Pressable, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { semanticColors } from "@loop/design-tokens";

import { TaskListItem } from "./components/task-list-item";
import { useTaskFlow } from "./hooks/use-task-flow";

type Filter = "ALL" | "PENDING" | "COMPLETED";

const filters: { label: string; value: Filter }[] = [
  { label: "Todas", value: "ALL" },
  { label: "Pendentes", value: "PENDING" },
  { label: "Concluídas", value: "COMPLETED" },
];

export function TasksScreen() {
  const { isTasksLoading, refreshTasks, tasks, tasksError } = useTaskFlow();
  const [filter, setFilter] = useState<Filter>("ALL");
  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => filter === "ALL" || task.status === filter),
    [filter, tasks],
  );

  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top"]} className="flex-1">
        <FlatList
          data={visibleTasks}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => <TaskListItem task={item} />}
          ListHeaderComponent={
            <View className="pb-6 pt-8">
              <View className="flex-row items-center justify-between">
                <Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">
                  Tarefas
                </Text>
                <Pressable
                  accessibilityLabel="Criar nova tarefa"
                  accessibilityRole="button"
                  className="h-11 w-11 items-center justify-center rounded-full bg-loop-primary active:opacity-80"
                  onPress={() => router.push("/create-task")}
                >
                  <Plus
                    color={semanticColors.textInverse}
                    size={23}
                    strokeWidth={2.5}
                  />
                </Pressable>
              </View>
              <Text className="mt-3 font-loop-regular text-base text-loop-text-secondary">
                Organize o que importa e deixe o Loop decidir o próximo passo.
              </Text>
              <View className="mt-7 flex-row gap-2">
                {filters.map((item) => (
                  <Pressable
                    key={item.value}
                    accessibilityRole="button"
                    accessibilityState={{ selected: filter === item.value }}
                    className={`rounded-full px-4 py-2.5 ${
                      filter === item.value
                        ? "bg-loop-primary"
                        : "bg-loop-surface"
                    }`}
                    onPress={() => setFilter(item.value)}
                  >
                    <Text
                      className={`font-loop-medium text-sm ${
                        filter === item.value
                          ? "text-loop-text-inverse"
                          : "text-loop-text-secondary"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          }
          contentContainerStyle={{
            gap: 12,
            paddingBottom: 130,
            paddingHorizontal: 24,
          }}
          ListEmptyComponent={
            isTasksLoading ? (
              <Text className="text-center font-loop-regular text-base text-loop-text-secondary">Carregando tarefas...</Text>
            ) : tasksError ? (
              <View className="items-center gap-3">
                <Text className="text-center font-loop-regular text-base text-red-500">{tasksError}</Text>
                <Pressable accessibilityRole="button" className="rounded-full bg-loop-surface px-4 py-2" onPress={() => void refreshTasks()}><Text className="font-loop-semibold text-sm text-loop-text-primary">Tentar novamente</Text></Pressable>
              </View>
            ) : (
              <Text className="text-center font-loop-regular text-base text-loop-text-secondary">Nenhuma tarefa ainda.</Text>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}
