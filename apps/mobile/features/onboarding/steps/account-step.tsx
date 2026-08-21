import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from 'react-native-css/components';

import { semanticColors } from '@loop/design-tokens';

import { PrimaryButton } from '../components/primary-button';

export function AccountStep() {
  return (
    <>
      <Text className="font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
        Vamos começar{'\n'}sua <Text className="text-loop-primary">jornada!</Text>
      </Text>
      <Text className="mt-4 max-w-[340px] font-loop-regular text-base leading-6 text-loop-text-secondary">
        Crie sua conta para transformar intenção em movimento todos os dias.
      </Text>
      <View className="mt-8 gap-3">
        <PrimaryButton
          icon={<FontAwesome color={semanticColors.textPrimary} name="google" size={20} />}
          label="Continuar com Google"
          onPress={() => undefined}
          variant="secondary"
        />
        <PrimaryButton
          icon={<FontAwesome color={semanticColors.textPrimary} name="apple" size={22} />}
          label="Continuar com Apple"
          onPress={() => undefined}
          variant="secondary"
        />
        <View className="my-2 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-loop-border" />
          <Text className="font-loop-medium text-sm text-loop-text-muted">ou</Text>
          <View className="h-px flex-1 bg-loop-border" />
        </View>
        <PrimaryButton label="Usar e-mail" onPress={() => undefined} />
      </View>
    </>
  );
}
