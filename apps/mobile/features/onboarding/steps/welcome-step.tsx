import { Image, Text } from 'react-native-css/components';

export function WelcomeStep() {
  return (
    <>
      <Image
        accessibilityLabel="Ilustração de onboarding"
        className="mb-6 h-52 w-full"
        resizeMode="contain"
        source={require("@/assets/images/onboarding/onboarding-step1.png")}
      />

      <Text className="font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
        Bem-vindo ao{'\n'}Loop!
      </Text>

      <Text className="mt-4 max-w-[340px] font-loop-regular text-base leading-6 text-loop-text-secondary">
        O app que transforma o tempo disponível na melhor ação para o momento
        que você vive.
      </Text>
    </>
  );
}
