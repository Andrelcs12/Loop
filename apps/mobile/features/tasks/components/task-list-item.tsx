import type { Task } from "@loop/types";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native-css/components";

import { semanticColors } from "@loop/design-tokens";

const priorityLabel = { HIGH: "Alta", MEDIUM: "Média", LOW: "Baixa" } as const;

export function TaskListItem({ task }: { task: Task }) {
  const completed = task.status === "COMPLETED";
  return <View className="flex-row items-center rounded-[20px] border border-loop-border bg-loop-surface p-4"><View className={`mr-4 h-10 w-10 items-center justify-center rounded-full ${completed ? "bg-loop-primary" : "bg-loop-background"}`}>{completed ? <Check color={semanticColors.textInverse} size={19} /> : null}</View><View className="flex-1"><Text className={`font-loop-semibold text-base ${completed ? "text-loop-text-muted line-through" : "text-loop-text-primary"}`}>{task.title}</Text><Text className="mt-1 font-loop-regular text-sm text-loop-text-secondary">{task.estimatedMinutes} min · {priorityLabel[task.priority]} prioridade</Text></View></View>;
}
