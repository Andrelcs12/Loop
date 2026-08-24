import { Image, StyleSheet } from "react-native";

import { Text, View } from "react-native-css/components";

export function WelcomeStep() {
  return (
    <View className="flex-1">
      <View className="items-center">
        <Image
          accessibilityLabel="Ilustração de onboarding"
          resizeMode="contain"
          source={require("@/assets/images/onboarding/onboarding-step1.png")}
          style={styles.illustration}
        />
      </View>

      <Text className="mt-6 font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
        Bem-vindo ao{"\n"}
        <Text className="text-loop-primary">Loop!</Text>
      </Text>

      <Text className="mt-4 max-w-[340px] font-loop-regular text-base leading-6 text-loop-text-secondary">
        O app que transforma o tempo disponível na melhor ação para o momento
        que você vive.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: "100%",
    height: 208,
  },
});
