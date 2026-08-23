import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Pressable, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { TaskListItem } from "./components/task-list-item";
import { tasksMockData } from "./tasks-mock-data";

type Filter = "ALL" | "PENDING" | "COMPLETED";
const filters: { label: string; value: Filter }[] = [{ label: "Todas", value: "ALL" }, { label: "Pendentes", value: "PENDING" }, { label: "Concluídas", value: "COMPLETED" }];

export function TasksScreen() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const visibleTasks = useMemo(() => tasksMockData.filter((task) => filter === "ALL" || task.status === filter), [filter]);

  return <View className="flex-1 bg-loop-background"><SafeAreaView edges={["top"]} className="flex-1"><FlatList data={visibleTasks} keyExtractor={(task) => task.id} renderItem={({ item }) => <TaskListItem task={item} />} ListHeaderComponent={<View className="px-6 pb-6 pt-8"><Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">Tarefas</Text><Text className="mt-3 font-loop-regular text-base text-loop-text-secondary">Organize o que importa e deixe o Loop decidir o próximo passo.</Text><View className="mt-7 flex-row gap-2">{filters.map((item) => <Pressable key={item.value} accessibilityRole="button" accessibilityState={{ selected: filter === item.value }} className={`rounded-full px-4 py-2.5 ${filter === item.value ? "bg-loop-primary" : "bg-loop-surface"}`} onPress={() => setFilter(item.value)}><Text className={`font-loop-medium text-sm ${filter === item.value ? "text-loop-text-inverse" : "text-loop-text-secondary"}`}>{item.label}</Text></Pressable>)}</View></View>} contentContainerStyle={{ gap: 12, paddingBottom: 130, paddingHorizontal: 24 }} ListEmptyComponent={<Text className="text-center font-loop-regular text-base text-loop-text-secondary">Nenhuma tarefa ainda.</Text>} showsVerticalScrollIndicator={false} /></SafeAreaView></View>;
}
