import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/features/onboarding/components/primary-button";

type AuthScreenProps = {
  error: string | null;
  isSubmitting: boolean;
  notice: string | null;
  onEmailAuthenticate: (mode: "login" | "signup", name: string, email: string, password: string) => void;
  onGoogleAuthenticate: () => void;
};

export function AuthScreen({ error, isSubmitting, notice, onEmailAuthenticate, onGoogleAuthenticate }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim().length > 0 && password.length >= 6 && (mode === "login" || name.trim().length > 0);
  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top", "bottom"]} className="flex-1 px-6">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingVertical: 32 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View className="h-14 w-14 items-center justify-center rounded-full bg-loop-primary/15">
            <MaterialIcons color="#FF6A00" name="bolt" size={28} />
          </View>

          <Text className="mt-8 font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
            Vamos deixar seu dia mais leve.
          </Text>
          <Text className="mt-4 font-loop-regular text-base leading-6 text-loop-text-secondary">
            Entre para começar a transformar intenção em ação.
          </Text>

          <View className="mt-10 gap-3">
            <PrimaryButton
              icon={<FontAwesome color="#FAFAFA" name="google" size={20} />}
              label={isSubmitting ? "Entrando..." : "Continuar com Google"}
              onPress={isSubmitting ? () => undefined : onGoogleAuthenticate}
              variant="secondary"
            />
            <View className="my-2 flex-row items-center gap-3">
              <View className="h-px flex-1 bg-loop-border" />
              <Text className="font-loop-medium text-sm text-loop-text-muted">ou</Text>
              <View className="h-px flex-1 bg-loop-border" />
            </View>
            {mode === "signup" ? <AuthField label="Nome" value={name} onChangeText={setName} /> : null}
            <AuthField autoCapitalize="none" keyboardType="email-address" label="Email" value={email} onChangeText={setEmail} />
            <AuthField autoCapitalize="none" label="Senha" secureTextEntry value={password} onChangeText={setPassword} />
            <PrimaryButton label={isSubmitting ? "Entrando..." : mode === "login" ? "Entrar" : "Criar conta"} onPress={canSubmit && !isSubmitting ? () => onEmailAuthenticate(mode, name, email, password) : () => undefined} />
            <Pressable className="self-center py-2" onPress={() => setMode((current) => current === "login" ? "signup" : "login")}><Text className="font-loop-semibold text-sm text-loop-primary">{mode === "login" ? "Criar conta" : "Já tenho conta"}</Text></Pressable>
          </View>
          {error ? <Text className="mt-4 font-loop-regular text-sm text-red-400">{error}</Text> : null}
          {notice ? <Text className="mt-4 font-loop-regular text-sm text-loop-text-secondary">{notice}</Text> : null}
        </ScrollView>

        <View className="bg-loop-background pb-4 pt-3">
          <Text className="text-center font-loop-regular text-xs text-loop-text-muted">Ao continuar, você concorda com os termos do Loop.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

type AuthFieldProps = { autoCapitalize?: "none"; keyboardType?: "email-address"; label: string; onChangeText: (value: string) => void; secureTextEntry?: boolean; value: string };
function AuthField({ autoCapitalize, keyboardType, label, onChangeText, secureTextEntry, value }: AuthFieldProps) {
  return <View><Text className="mb-2 font-loop-medium text-sm text-loop-text-secondary">{label}</Text><TextInput autoCapitalize={autoCapitalize} className="h-14 rounded-loop-lg border border-loop-border bg-loop-surface px-4 font-loop-regular text-base text-loop-text-primary" keyboardType={keyboardType} onChangeText={onChangeText} placeholder={label} placeholderTextColor="#71717A" secureTextEntry={secureTextEntry} value={value} /></View>;
}
