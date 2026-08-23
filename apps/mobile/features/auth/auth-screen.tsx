import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/features/onboarding/components/primary-button";

type AuthScreenProps = {
  onAuthenticate: () => void;
};

export function AuthScreen({ onAuthenticate }: AuthScreenProps) {
  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top", "bottom"]} className="flex-1 px-6">
        <View className="flex-1 justify-center">
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
              label="Continuar com Google"
              onPress={onAuthenticate}
              variant="secondary"
            />
            <PrimaryButton
              icon={<FontAwesome color="#FAFAFA" name="apple" size={22} />}
              label="Continuar com Apple"
              onPress={onAuthenticate}
              variant="secondary"
            />
            <View className="my-2 flex-row items-center gap-3">
              <View className="h-px flex-1 bg-loop-border" />
              <Text className="font-loop-medium text-sm text-loop-text-muted">ou</Text>
              <View className="h-px flex-1 bg-loop-border" />
            </View>
            <PrimaryButton label="Continuar com e-mail" onPress={onAuthenticate} />
          </View>
        </View>

        <PrimaryButton
          label="Já tenho conta"
          onPress={onAuthenticate}
          variant="secondary"
        />
      </SafeAreaView>
    </View>
  );
}
