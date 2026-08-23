import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Check } from "lucide-react-native";
import { Pressable, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { semanticColors } from "@loop/design-tokens";

function formatTime(seconds: number) { const minutes = Math.floor(seconds / 60); const remainder = seconds % 60; return `${minutes.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`; }

export function ExecutionScreen() {
  const [remainingSeconds, setRemainingSeconds] = useState(32 * 60 + 47);
  const [paused, setPaused] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => { if (paused || completed) return; const interval = setInterval(() => setRemainingSeconds((value) => Math.max(0, value - 1)), 1000); return () => clearInterval(interval); }, [completed, paused]);
  if (completed) return <CompletionState onBack={() => router.replace("/home/now")} />;

  return <View className="flex-1 bg-loop-background"><SafeAreaView edges={["top", "bottom"]} className="flex-1 justify-between px-6 py-8"><View><Text className="font-loop-medium text-sm uppercase tracking-[1.2px] text-loop-primary">Em andamento</Text><Text className="mt-7 font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">Ler 20 páginas</Text></View><View className="items-center"><Text className="font-loop-bold text-6xl tracking-[-2px] text-loop-text-primary">{formatTime(remainingSeconds)}</Text><Text className="mt-3 font-loop-regular text-base text-loop-text-secondary">tempo restante</Text></View><View className="gap-3"><Pressable accessibilityRole="button" className="min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary" onPress={() => setPaused((value) => !value)}><Text className="font-loop-semibold text-base text-loop-text-inverse">{paused ? "Retomar" : "Pausar"}</Text></Pressable><Pressable accessibilityRole="button" className="min-h-14 items-center justify-center rounded-loop-lg border border-loop-border bg-loop-surface" onPress={() => setCompleted(true)}><Text className="font-loop-semibold text-base text-loop-text-primary">Concluir</Text></Pressable><Pressable accessibilityRole="button" className="items-center py-3" onPress={() => router.replace("/home/now")}><Text className="font-loop-semibold text-base text-loop-text-secondary">Interromper</Text></Pressable></View></SafeAreaView></View>;
}

function CompletionState({ onBack }: { onBack: () => void }) { return <View className="flex-1 bg-loop-background"><SafeAreaView edges={["top", "bottom"]} className="flex-1 items-center justify-center px-6"><View className="h-20 w-20 items-center justify-center rounded-full bg-loop-primary"><Check color={semanticColors.textInverse} size={42} strokeWidth={3} /></View><Text className="mt-8 font-loop-bold text-3xl text-loop-text-primary">Tarefa concluída!</Text><Pressable accessibilityRole="button" className="mt-10 min-h-14 w-full items-center justify-center rounded-loop-lg bg-loop-primary" onPress={onBack}><Text className="font-loop-semibold text-base text-loop-text-inverse">Voltar para Agora</Text></Pressable></SafeAreaView></View>; }
