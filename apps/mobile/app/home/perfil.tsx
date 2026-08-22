import * as ImagePicker from "expo-image-picker";
import {
  Bell,
  Camera,
  ChevronRight,
  CircleHelp,
  Clock3,
  Crown,
  Fingerprint,
  LogOut,
  Moon,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { semanticColors } from "@loop/design-tokens";

export default function PerfilScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  async function handleSelectImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Acesso à galeria",
        "O Loop precisa dessa permissão para alterar sua foto.",
      );

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: semanticColors.background,
      }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pb-5 pt-4">
          <Text
            style={{ color: semanticColors.textPrimary }}
            className="text-[30px] font-bold tracking-tight"
          >
            Perfil
          </Text>

          <Text className="mt-1 text-[15px] text-neutral-500">
            Sua conta e experiência no Loop.
          </Text>
        </View>

        {/* Usuário */}
        <View className="px-5">
          <View
            className="rounded-[28px] border p-5"
            style={{
              backgroundColor: semanticColors.surface,
              borderColor: semanticColors.border,
            }}
          >
            <View className="flex-row items-center">
              <View className="relative">
                <View className="h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full bg-neutral-800">
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <UserRound size={32} color="#99999f" strokeWidth={1.8} />
                  )}
                </View>

                <Pressable
                  onPress={handleSelectImage}
                  style={{
                    backgroundColor: semanticColors.primary,
                  }}
                  className="absolute -bottom-1 -right-1 h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-950 active:scale-95"
                >
                  <Camera size={15} color="#ffffff" strokeWidth={2.4} />
                </Pressable>
              </View>

              <View className="ml-4 flex-1">
                <Text
                  style={{
                    color: semanticColors.textPrimary,
                  }}
                  className="text-xl font-semibold"
                >
                  André Lucas
                </Text>

                <Text className="mt-1 text-sm text-neutral-500">
                  andre@loop.app
                </Text>

                <View className="mt-3 flex-row items-center">
                  <View
                    style={{
                      backgroundColor: `${semanticColors.primary}18`,
                    }}
                    className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
                  >
                    <Sparkles size={12} color={semanticColors.primary} />

                    <Text
                      style={{
                        color: semanticColors.primary,
                      }}
                      className="text-xs font-semibold"
                    >
                      LOOP FREE
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable
              className="mt-5 items-center rounded-2xl border py-3.5 active:opacity-70"
              style={{
                borderColor: semanticColors.border,
              }}
            >
              <Text
                style={{
                  color: semanticColors.textPrimary,
                }}
                className="font-semibold"
              >
                Editar perfil
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Resumo */}
        <View className="mt-4 flex-row gap-3 px-5">
          <StatCard
            value="24"
            label="Concluídas"
            icon={<Target size={17} color={semanticColors.primary} />}
          />

          <StatCard
            value="7h 32m"
            label="Em foco"
            icon={<Clock3 size={17} color={semanticColors.primary} />}
          />

          <StatCard
            value="82%"
            label="Acerto"
            icon={<Sparkles size={17} color={semanticColors.primary} />}
          />
        </View>

        {/* Loop Pro */}
        <View className="mt-7 px-5">
          <Pressable
            className="overflow-hidden rounded-[26px] border p-5 active:opacity-90"
            style={{
              backgroundColor: `${semanticColors.primary}12`,
              borderColor: `${semanticColors.primary}40`,
            }}
          >
            <View className="flex-row items-start">
              <View
                className="h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: `${semanticColors.primary}25`,
                }}
              >
                <Crown size={21} color={semanticColors.primary} />
              </View>

              <View className="ml-4 flex-1">
                <Text
                  style={{
                    color: semanticColors.textPrimary,
                  }}
                  className="text-base font-semibold"
                >
                  Loop Pro
                </Text>

                <Text className="mt-1 text-sm leading-5 text-neutral-500">
                  Mais automações, recomendações e histórico completo.
                </Text>
              </View>

              <ChevronRight size={19} color={semanticColors.primary} />
            </View>
          </Pressable>
        </View>

        {/* Experiência */}
        <Section title="Experiência">
          <SettingItem
            icon={<Sparkles size={19} color={semanticColors.primary} />}
            title="Como o Loop decide"
            subtitle="Preferências das recomendações"
          />

          <Divider />

          <SettingItem
            icon={<Clock3 size={19} color="#e5e5e5" />}
            title="Tempo e duração"
            subtitle="Durações padrão das tarefas"
          />

          <Divider />

          <SettingItem
            icon={<Bell size={19} color="#e5e5e5" />}
            title="Notificações"
            subtitle="Lembretes e sugestões inteligentes"
          />
        </Section>

        {/* Aplicativo */}
        <Section title="Aplicativo">
          <SettingItem
            icon={<Moon size={19} color="#e5e5e5" />}
            title="Aparência"
            subtitle="Escuro"
          />

          <Divider />

          <SettingItem
            icon={<Fingerprint size={19} color="#e5e5e5" />}
            title="Conta"
            subtitle="Login e dispositivos"
          />

          <Divider />

          <SettingItem
            icon={<ShieldCheck size={19} color="#e5e5e5" />}
            title="Privacidade"
            subtitle="Dados e segurança"
          />
        </Section>

        {/* Ajuda */}
        <Section title="Suporte">
          <SettingItem
            icon={<CircleHelp size={19} color="#e5e5e5" />}
            title="Ajuda e feedback"
          />
        </Section>

        {/* Logout */}
        <View className="mt-8 px-5">
          <Pressable
            onPress={() =>
              Alert.alert("Sair do Loop", "Essa ação encerrará sua sessão.")
            }
            className="flex-row items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 py-4 active:opacity-60"
          >
            <LogOut size={18} color="#ef4444" />

            <Text className="font-semibold text-red-500">Sair da conta</Text>
          </Pressable>
        </View>

        <Text className="mt-6 text-center text-xs text-neutral-700">
          Loop • v0.1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-8 px-5">
      <Text className="mb-3 px-1 text-xs font-semibold uppercase tracking-[1.4px] text-neutral-600">
        {title}
      </Text>

      <View
        className="overflow-hidden rounded-[24px] border"
        style={{
          backgroundColor: semanticColors.surface,
          borderColor: semanticColors.border,
        }}
      >
        {children}
      </View>
    </View>
  );
}

function SettingItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <Pressable className="flex-row items-center px-4 py-4 active:bg-white/5">
      <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-white/5">
        {icon}
      </View>

      <View className="ml-3 flex-1">
        <Text
          style={{ color: semanticColors.textPrimary }}
          className="text-[15px] font-medium"
        >
          {title}
        </Text>

        {subtitle ? (
          <Text className="mt-0.5 text-[13px] text-neutral-600">
            {subtitle}
          </Text>
        ) : null}
      </View>

      <ChevronRight size={18} color="#63636a" strokeWidth={2} />
    </Pressable>
  );
}

function Divider() {
  return <View className="ml-[68px] h-px bg-white/5" />;
}

function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <View
      className="flex-1 rounded-[22px] border p-3.5"
      style={{
        backgroundColor: semanticColors.surface,
        borderColor: semanticColors.border,
      }}
    >
      <View className="mb-3">{icon}</View>

      <Text
        style={{ color: semanticColors.textPrimary }}
        className="text-lg font-bold"
        numberOfLines={1}
      >
        {value}
      </Text>

      <Text className="mt-1 text-[11px] text-neutral-600">{label}</Text>
    </View>
  );
}
