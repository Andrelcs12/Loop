import { useEffect, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type SplashScreenProps = {
  onFinish: () => void;
};

// ── Timing central: mude aqui, não espalhado pelo componente ──────────────
const INITIAL_HOLD_DURATION = 250; // pausa antes de qualquer animação começar
const MARK_SPIN_DURATION = 600; // giro de 360° + pop de escala do ícone
const WORDMARK_DURATION = 580; // fade/slide do wordmark
const BRAND_HOLD_DURATION = 1250; // tempo em que a marca fica parada, visível
const EXIT_DURATION = 520; // fade de saída

// ── Dimensões centrais: uma única fonte de verdade ─────────────────────────
const MARK_SIZE = 136;
const WORDMARK_WIDTH = 128;
const WORDMARK_HEIGHT = 43;
const GAP_BETWEEN = 12; // espaço entre ícone e wordmark

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const reduceMotion = useReducedMotion();
  const isMounted = useRef(true);
  const hasFinished = useRef(false);
  const onFinishRef = useRef(onFinish);

  const markScale = useSharedValue(reduceMotion ? 1 : 0.85);
  const markRotation = useSharedValue(0);
  const wordmarkOpacity = useSharedValue(0);
  const wordmarkTranslateY = useSharedValue(6);
  const compositionOpacity = useSharedValue(1);
  const compositionScale = useSharedValue(1);

  onFinishRef.current = onFinish;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      cancelAnimation(markScale);
      cancelAnimation(markRotation);
      cancelAnimation(wordmarkOpacity);
      cancelAnimation(wordmarkTranslateY);
      cancelAnimation(compositionOpacity);
      cancelAnimation(compositionScale);
    };
  }, [
    compositionOpacity,
    compositionScale,
    markRotation,
    markScale,
    wordmarkOpacity,
    wordmarkTranslateY,
  ]);

  useEffect(() => {
    const finish = () => {
      if (!isMounted.current || hasFinished.current) return;
      hasFinished.current = true;
      onFinishRef.current();
    };

    if (reduceMotion) {
      // Acessibilidade: sem escala, sem "pop", só opacidade — igual ao original.
      wordmarkOpacity.value = withDelay(
        INITIAL_HOLD_DURATION,
        withTiming(1, { duration: WORDMARK_DURATION }),
      );
      wordmarkTranslateY.value = withDelay(
        INITIAL_HOLD_DURATION,
        withTiming(0, { duration: WORDMARK_DURATION }),
      );
      compositionOpacity.value = withDelay(
        INITIAL_HOLD_DURATION + WORDMARK_DURATION + BRAND_HOLD_DURATION,
        withTiming(0, { duration: EXIT_DURATION }, (finished) => {
          if (finished) runOnJS(finish)();
        }),
      );
      return;
    }

    // Ícone dá um giro completo (360°) enquanto "nasce" com um pop de escala —
    // as duas coisas rodam juntas, no mesmo intervalo, então a sensação é de
    // um único gesto ("gira e assenta"), não duas animações separadas.
    markRotation.value = withDelay(
      INITIAL_HOLD_DURATION,
      withTiming(360, {
        duration: MARK_SPIN_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
    );
    markScale.value = withDelay(
      INITIAL_HOLD_DURATION,
      withSpring(1, { damping: 12, stiffness: 180, mass: 0.6 }),
    );

    // Wordmark só aparece depois que o giro termina — reforça que é uma
    // revelação em duas etapas: ícone gira → marca completa se forma.
    wordmarkOpacity.value = withDelay(
      INITIAL_HOLD_DURATION + MARK_SPIN_DURATION,
      withTiming(1, {
        duration: WORDMARK_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
    );
    wordmarkTranslateY.value = withDelay(
      INITIAL_HOLD_DURATION + MARK_SPIN_DURATION,
      withTiming(0, {
        duration: WORDMARK_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
    );

    compositionScale.value = withDelay(
      INITIAL_HOLD_DURATION +
        MARK_SPIN_DURATION +
        WORDMARK_DURATION +
        BRAND_HOLD_DURATION,
      withTiming(0.985, {
        duration: EXIT_DURATION,
        easing: Easing.inOut(Easing.cubic),
      }),
    );
    compositionOpacity.value = withDelay(
      INITIAL_HOLD_DURATION +
        MARK_SPIN_DURATION +
        WORDMARK_DURATION +
        BRAND_HOLD_DURATION,
      withTiming(
        0,
        { duration: EXIT_DURATION, easing: Easing.inOut(Easing.cubic) },
        (finished) => {
          if (finished) runOnJS(finish)();
        },
      ),
    );
  }, [
    compositionOpacity,
    compositionScale,
    markRotation,
    markScale,
    reduceMotion,
    wordmarkOpacity,
    wordmarkTranslateY,
  ]);

  const compositionStyle = useAnimatedStyle(() => ({
    opacity: compositionOpacity.value,
    transform: [{ scale: compositionScale.value }],
  }));
  const markStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: markScale.value },
      { rotate: `${markRotation.value}deg` },
    ],
  }));
  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkOpacity.value,
    transform: [{ translateY: wordmarkTranslateY.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center bg-loop-background">
      {/*
        FIX: sem `position: absolute` + `top` mágico. Agora é um fluxo normal
        (coluna, centralizado). Como o wordmark já ocupa seu espaço reservado
        mesmo com opacity 0, não há "pulo" de layout quando ele aparece —
        e não existe mais número duplicado pra manter sincronizado.
      */}
      <Animated.View style={[styles.composition, compositionStyle]}>
        <Animated.View style={markStyle}>
          <Image
            accessibilityLabel="Símbolo Loop"
            source={require("@/assets/images/brand/loop-mark.png")}
            style={styles.mark}
          />
        </Animated.View>
        <Animated.View style={wordmarkStyle}>
          {/* Fundo confirmado como escuro, então o wordmark "light" (branco) está correto aqui. */}
          <Image
            accessibilityLabel="Loop"
            source={require("@/assets/images/brand/wordmark-light.png")}
            style={styles.wordmarkImage}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  composition: {
    alignItems: "center",
  },
  mark: {
    height: MARK_SIZE,
    width: MARK_SIZE,
  },
  wordmarkImage: {
    height: WORDMARK_HEIGHT,
    marginTop: GAP_BETWEEN,
    width: WORDMARK_WIDTH,
  },
});
