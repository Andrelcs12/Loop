import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { ComponentProps } from "react";

import { Text, View } from "react-native-css/components";
import Animated, { FadeInDown } from "react-native-reanimated";

import { semanticColors } from "@loop/design-tokens";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

const instructions: {
  icon: IconName;
  text: string;
}[] = [
  {
    icon: "add-task",
    text: "Adicione suas tarefas e compromissos",
  },
  {
    icon: "schedule",
    text: "Diga quanto tempo você tem",
  },
  {
    icon: "bolt",
    text: "Receba a melhor ação para o momento",
  },
  {
    icon: "check-circle",
    text: "Comece, conclua e avance",
  },
];

export function HowItWorksStep() {
  return (
    <View className="flex-1">
      <Text className="font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
        É simples assim:
      </Text>

      <Text className="mt-4 max-w-[330px] font-loop-regular text-base leading-6 text-loop-text-secondary">
        O Loop organiza o caminho entre o que você precisa fazer e a próxima
        ação.
      </Text>

      <View className="mt-8">
        {instructions.map((item, index) => {
          const isLast = index === instructions.length - 1;

          return (
            <Animated.View
              key={item.text}
              entering={FadeInDown.delay(100 + index * 100).duration(320)}
              className="flex-row"
            >
              <View className="mr-4 items-center">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-loop-primary/15">
                  <MaterialIcons
                    name={item.icon}
                    size={22}
                    color={semanticColors.primary}
                  />
                </View>

                {!isLast ? (
                  <View className="my-2 h-10 w-[2px] bg-loop-border" />
                ) : null}
              </View>

              <View className="flex-1 pb-5 pt-2">
                <Text className="font-loop-medium text-base leading-6 text-loop-text-primary">
                  {item.text}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}
