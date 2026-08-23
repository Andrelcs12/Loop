import { useState } from "react";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Pressable, ScrollView, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { recommendationMock, timeOptions } from "./now-mock-data";

type NowState = "TIME" | "RECOMMENDATION" | "REASON" | "ALTERNATIVES";

export function NowScreen() {
  const [selectedMinutes, setSelectedMinutes] = useState(30);
  const [screenState, setScreenState] = useState<NowState>("TIME");
  const showingRecommendation = screenState !== "TIME";

  return <View className="flex-1 bg-loop-background"><SafeAreaView edges={["top"]} className="flex-1"><ScrollView className="flex-1 px-6 pt-8" contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}><Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">Agora</Text>{!showingRecommendation ? <TimeSelection selectedMinutes={selectedMinutes} onSelect={setSelectedMinutes} onContinue={() => setScreenState("RECOMMENDATION")} /> : <Recommendation state={screenState} onStart={() => router.push("/execution")} onReason={() => setScreenState("REASON")} onAlternatives={() => setScreenState("ALTERNATIVES")} onBack={() => setScreenState("RECOMMENDATION")} />}</ScrollView></SafeAreaView></View>;
}

function TimeSelection({ selectedMinutes, onSelect, onContinue }: { selectedMinutes: number; onSelect: (value: number) => void; onContinue: () => void }) {
  return <Animated.View entering={FadeInDown.duration(300)}><Text className="mt-9 font-loop-semibold text-xl text-loop-text-primary">Quanto tempo você tem?</Text><View className="mt-5 flex-row flex-wrap gap-3">{timeOptions.map((minutes) => <Pressable key={minutes} accessibilityRole="radio" accessibilityState={{ selected: selectedMinutes === minutes }} className={`min-w-[76px] items-center rounded-loop-lg border px-4 py-4 ${selectedMinutes === minutes ? "border-loop-primary bg-loop-primary/15" : "border-loop-border bg-loop-surface"}`} onPress={() => onSelect(minutes)}><Text className={`font-loop-semibold text-base ${selectedMinutes === minutes ? "text-loop-primary" : "text-loop-text-primary"}`}>{minutes} min</Text></Pressable>)}</View><View className="mt-9 rounded-[24px] border border-loop-border bg-loop-surface p-5"><Text className="font-loop-medium text-sm text-loop-text-secondary">Próximo compromisso</Text><Text className="mt-4 font-loop-semibold text-xl text-loop-text-primary">Reunião</Text><Text className="mt-1 font-loop-regular text-base text-loop-text-secondary">15:00</Text></View><Pressable accessibilityRole="button" className="mt-7 min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary active:opacity-80" onPress={onContinue}><Text className="font-loop-semibold text-base text-loop-text-inverse">Ver recomendação</Text></Pressable></Animated.View>;
}

function Recommendation({ state, onStart, onReason, onAlternatives, onBack }: { state: NowState; onStart: () => void; onReason: () => void; onAlternatives: () => void; onBack: () => void }) {
  return <Animated.View entering={FadeInDown.duration(300)} className="mt-9"><Text className="font-loop-medium text-sm uppercase tracking-[1.2px] text-loop-primary">Recomendação para agora</Text><View className="mt-4 rounded-[24px] border border-loop-primary/35 bg-loop-surface p-5"><Text className="font-loop-bold text-2xl text-loop-text-primary">{recommendationMock.title}</Text><Text className="mt-2 font-loop-medium text-base text-loop-text-secondary">{recommendationMock.minutes} min · {recommendationMock.priority}</Text><Text className="mt-6 font-loop-regular text-base leading-6 text-loop-text-secondary">{state === "REASON" ? recommendationMock.reason : recommendationMock.description}</Text>{state === "ALTERNATIVES" ? <View className="mt-5 gap-3">{recommendationMock.alternatives.map((title) => <View key={title} className="rounded-loop-lg bg-loop-background p-4"><Text className="font-loop-medium text-base text-loop-text-primary">{title}</Text></View>)}</View> : null}</View><Pressable accessibilityRole="button" className="mt-7 min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary active:opacity-80" onPress={onStart}><Text className="font-loop-semibold text-base text-loop-text-inverse">Começar</Text></Pressable>{state === "RECOMMENDATION" ? <View className="mt-3 flex-row gap-3"><ActionButton label="Por que essa ação?" onPress={onReason} /><ActionButton label="Ver outra opção" onPress={onAlternatives} /></View> : <Pressable accessibilityRole="button" className="mt-5 self-center py-2" onPress={onBack}><Text className="font-loop-semibold text-base text-loop-primary">Voltar à recomendação</Text></Pressable>}</Animated.View>;
}

function ActionButton({ label, onPress }: { label: string; onPress: () => void }) { return <Pressable accessibilityRole="button" className="flex-1 items-center rounded-loop-lg border border-loop-border bg-loop-surface px-3 py-4 active:opacity-70" onPress={onPress}><Text className="font-loop-medium text-sm text-loop-text-primary">{label}</Text></Pressable>; }
