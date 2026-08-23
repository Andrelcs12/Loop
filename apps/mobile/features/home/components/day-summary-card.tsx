import { Text, View } from "react-native-css/components";

type DaySummaryCardProps = { tasks: string; important: string; estimatedTime: string };

export function DaySummaryCard({ tasks, important, estimatedTime }: DaySummaryCardProps) {
  return <View className="rounded-[24px] border border-loop-border bg-loop-surface p-5"><Text className="font-loop-medium text-sm text-loop-text-secondary">Seu dia em resumo</Text><View className="mt-5 gap-3"><Text className="font-loop-semibold text-lg text-loop-text-primary">{tasks}</Text><Text className="font-loop-regular text-base text-loop-text-secondary">{important}</Text><Text className="font-loop-regular text-base text-loop-text-secondary">{estimatedTime}</Text></View></View>;
}
