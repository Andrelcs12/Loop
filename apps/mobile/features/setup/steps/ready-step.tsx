import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text, View } from "react-native-css/components";

import { semanticColors } from "@loop/design-tokens";

export function ReadyStep() {
  return (
    <View className="flex-1 justify-center">
      <Animated.View entering={FadeInDown.duration(420)} className="h-20 w-20 items-center justify-center rounded-full bg-loop-primary/15">
        <MaterialIcons color={semanticColors.primary} name="check-circle" size={44} />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(100).duration(420)}>
        <Text className="mt-8 font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">Tudo pronto!</Text>
        <Text className="mt-4 max-w-[330px] font-loop-regular text-base leading-6 text-loop-text-secondary">O Loop está configurado e pronto para te ajudar a aproveitar melhor o seu dia.</Text>
      </Animated.View>
    </View>
  );
}
