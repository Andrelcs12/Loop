import { Pressable, ScrollView, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { DaySummaryCard } from "./components/day-summary-card";
import { NextCommitmentCard } from "./components/next-commitment-card";
import { homeMockData } from "./home-mock-data";

type HomeScreenProps = { onViewNow: () => void };

export function HomeScreen({ onViewNow }: HomeScreenProps) {
  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-8" contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
          <Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">{homeMockData.greeting}</Text>
          <Text className="mt-3 font-loop-regular text-base text-loop-text-secondary">O melhor próximo passo começa por aqui.</Text>
          <View className="mt-9"><NextCommitmentCard {...homeMockData.nextCommitment} /></View>
          <View className="mt-4"><DaySummaryCard {...homeMockData.summary} /></View>
          <Pressable accessibilityRole="button" className="mt-7 min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary px-5 active:opacity-80" onPress={onViewNow}><Text className="font-loop-semibold text-base text-loop-text-inverse">Ver o que fazer agora</Text></Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
