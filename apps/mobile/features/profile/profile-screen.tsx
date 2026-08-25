import { ChevronRight, UserRound } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { semanticColors } from "@loop/design-tokens";
import { useAuth } from "@/features/auth/auth-provider";

const preferences = ["Aparência", "Notificações", "Compromissos", "Privacidade", "Sobre o Loop"] as const;

export function ProfileScreen() {
  const { currentUser, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace("/auth");
  }

  return <View className="flex-1 bg-loop-background"><SafeAreaView edges={["top"]} className="flex-1"><ScrollView className="flex-1 px-6 pt-8" contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}><Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">Meu perfil</Text><View className="mt-8 flex-row items-center rounded-[24px] border border-loop-border bg-loop-surface p-5"><View className="h-14 w-14 items-center justify-center rounded-full bg-loop-background"><UserRound color={semanticColors.textSecondary} size={27} /></View><View className="ml-4"><Text className="font-loop-semibold text-xl text-loop-text-primary">{currentUser?.name ?? "Seu perfil"}</Text><Text className="mt-1 font-loop-regular text-base text-loop-text-secondary">{currentUser?.email ?? ""}</Text></View></View><Text className="mt-8 font-loop-medium text-sm text-loop-text-secondary">Preferências</Text><View className="mt-3 overflow-hidden rounded-[24px] border border-loop-border bg-loop-surface">{preferences.map((item, index) => <Pressable key={item} accessibilityRole="button" className={`flex-row items-center justify-between px-5 py-5 active:bg-loop-background ${index > 0 ? "border-t border-loop-border" : ""}`}><Text className="font-loop-medium text-base text-loop-text-primary">{item}</Text><ChevronRight color={semanticColors.textMuted} size={19} /></Pressable>)}</View><Pressable accessibilityRole="button" className="mt-6 items-center rounded-loop-lg border border-loop-border py-4 active:bg-loop-surface" onPress={() => void handleSignOut()}><Text className="font-loop-semibold text-base text-loop-text-primary">Sair</Text></Pressable></ScrollView></SafeAreaView></View>;
}
