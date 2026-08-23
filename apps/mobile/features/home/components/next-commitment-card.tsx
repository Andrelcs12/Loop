import { Clock3 } from "lucide-react-native";
import { Text, View } from "react-native-css/components";

import { semanticColors } from "@loop/design-tokens";

type NextCommitmentCardProps = { title: string; time: string; remainingTime: string };

export function NextCommitmentCard({ title, time, remainingTime }: NextCommitmentCardProps) {
  return <View className="rounded-[24px] border border-loop-border bg-loop-surface p-5"><Text className="font-loop-medium text-sm text-loop-text-secondary">Próximo compromisso</Text><View className="mt-5 flex-row items-center justify-between"><View><Text className="font-loop-semibold text-xl text-loop-text-primary">{title}</Text><Text className="mt-1 font-loop-regular text-base text-loop-text-secondary">{remainingTime}</Text></View><View className="items-end"><Clock3 color={semanticColors.primary} size={21} /><Text className="mt-2 font-loop-bold text-xl text-loop-primary">{time}</Text></View></View></View>;
}
