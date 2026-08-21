import { Text, View } from 'react-native';

import { FeatureItem } from '../components/feature-item';

export function PromiseStep() {
  return (
    <>
      <Text className="font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
        Em segundos,{'\n'}você sabe o que{'\n'}fazer <Text className="text-loop-primary">agora.</Text>
      </Text>
      <View className="mt-10 gap-4">
        <FeatureItem delay={80} icon="schedule" text="Considera o tempo que você tem" />
        <FeatureItem delay={150} icon="low-priority" text="Prioriza o que realmente importa" />
        <FeatureItem delay={220} icon="play-circle-filled" text="Te mostra a melhor próxima ação" />
      </View>
    </>
  );
}
