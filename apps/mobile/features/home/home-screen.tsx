import { Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top"]} className="flex-1 px-6 pt-8">
        <Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">Bom dia</Text>
        <Text className="mt-3 font-loop-regular text-base text-loop-text-secondary">Seu Loop está pronto. Vamos encontrar a melhor próxima ação?</Text>
      </SafeAreaView>
    </View>
  );
}
