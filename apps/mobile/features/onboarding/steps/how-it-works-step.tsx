import { Text, View } from 'react-native-css/components';

const instructions = ['Adicione suas tarefas e compromissos', 'Diga quanto tempo você tem', 'Receba a melhor ação para o momento', 'Comece, conclua e avance'];

export function HowItWorksStep() {
  return (
    <>
      <Text className="font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">É simples assim:</Text>
      <View className="mt-10 gap-4">
        {instructions.map((text, index) => (
          <View key={text} className="flex-row items-center gap-4">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-loop-primary">
              <Text className="font-loop-bold text-sm text-loop-text-inverse">{index + 1}</Text>
            </View>
            <Text className="flex-1 font-loop-medium text-base leading-6 text-loop-text-primary">{text}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
