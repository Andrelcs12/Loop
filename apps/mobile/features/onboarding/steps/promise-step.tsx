import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { ComponentProps } from "react";

import { Text, View } from "react-native-css/components";
import Animated, { FadeInDown } from "react-native-reanimated";

import { semanticColors } from "@loop/design-tokens";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

const TIMELINE_ITEMS = [
  {
    icon: "schedule" as IconName,
    title: "Diga quanto tempo você tem",
    description: "O Loop entende sua janela disponível.",
  },
  {
    icon: "low-priority" as IconName,
    title: "Ele encontra o que mais importa",
    description: "Prioridade, duração e contexto entram na decisão.",
  },
  {
    icon: "play-circle-filled" as IconName,
    title: "Receba sua próxima ação",
    description: "Sem escolher entre dez coisas. Apenas comece.",
  },
];

export function PromiseStep() {
  return (
    <View className="flex-1">
      <Text className="font-loop-bold text-4xl leading-[42px] tracking-[-1px] text-loop-text-primary">
        Em segundos,{"\n"}você sabe o que{"\n"}fazer{" "}
        <Text className="text-loop-primary">agora.</Text>
      </Text>

      <Text className="mt-4 max-w-[330px] font-loop-regular text-base leading-6 text-loop-text-secondary">
        O Loop transforma seu tempo disponível em uma próxima ação clara.
      </Text>

      <View className="mt-10">
        {TIMELINE_ITEMS.map((item, index) => (
          <TimelineItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            delay={100 + index * 120}
            isLast={index === TIMELINE_ITEMS.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

type TimelineItemProps = {
  icon: IconName;
  title: string;
  description: string;
  delay: number;
  isLast: boolean;
};

function TimelineItem({
  icon,
  title,
  description,
  delay,
  isLast,
}: TimelineItemProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(380)}
      className="flex-row"
    >
      <View className="mr-4 items-center">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-loop-primary/15">
          <MaterialIcons name={icon} size={23} color={semanticColors.primary} />
        </View>

        {!isLast ? <View className="my-2 h-4 w-[2px] bg-loop-border" /> : null}
      </View>

      <View className="flex-1 pb-5 pt-1">
        <Text className="font-loop-semibold text-base text-loop-text-primary">
          {title}
        </Text>

        <Text className="mt-1 font-loop-regular text-sm leading-5 text-loop-text-secondary">
          {description}
        </Text>
      </View>
    </Animated.View>
  );
}
