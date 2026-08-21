import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-css/components';

export function WelcomeStep() {
  return (
    <>
      <Image
        accessibilityLabel="Ilustração de onboarding"
        resizeMode="contain"
        source={require("@/assets/images/onboarding/onboarding-step1.png")}
        style={styles.illustration}
      />

      <Text className="font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
        Bem-vindo ao{"\n"}Loop!
      </Text>

      <Text className="mt-4 max-w-[340px] font-loop-regular text-base leading-6 text-loop-text-secondary">
        O app que transforma o tempo disponível na melhor ação para o momento
        que você vive.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  illustration: {
    height: 208,
    marginBottom: 24,
    width: '100%',
  },
});
