import { useEffect, useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type SplashScreenProps = {
  onFinish: () => void;
};

const INITIAL_HOLD_DURATION = 150;
const MARK_ANIMATION_DURATION = 400;
const WORDMARK_DURATION = 280;
const BRAND_HOLD_DURATION = 350;
const EXIT_DURATION = 220;

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const reduceMotion = useReducedMotion();
  const isMounted = useRef(true);
  const hasFinished = useRef(false);
  const onFinishRef = useRef(onFinish);
  const markScale = useSharedValue(1);
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
  }, [compositionOpacity, compositionScale, markRotation, markScale, wordmarkOpacity, wordmarkTranslateY]);

  useEffect(() => {
    const finish = () => {
      if (!isMounted.current || hasFinished.current) {
        return;
      }

      hasFinished.current = true;
      onFinishRef.current();
    };

    if (reduceMotion) {
      wordmarkOpacity.value = withDelay(INITIAL_HOLD_DURATION, withTiming(1, { duration: WORDMARK_DURATION }));
      wordmarkTranslateY.value = withDelay(INITIAL_HOLD_DURATION, withTiming(0, { duration: WORDMARK_DURATION }));
      compositionOpacity.value = withDelay(
        INITIAL_HOLD_DURATION + WORDMARK_DURATION + BRAND_HOLD_DURATION,
        withTiming(0, { duration: EXIT_DURATION }, (finished) => {
          if (finished) {
            runOnJS(finish)();
          }
        }),
      );
      return;
    }

    markScale.value = withDelay(
      INITIAL_HOLD_DURATION,
      withSequence(
        withTiming(1.025, { duration: 180, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: MARK_ANIMATION_DURATION - 180, easing: Easing.inOut(Easing.cubic) }),
      ),
    );
    markRotation.value = withDelay(
      INITIAL_HOLD_DURATION,
      withSequence(
        withTiming(3, { duration: 180, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: MARK_ANIMATION_DURATION - 180, easing: Easing.inOut(Easing.cubic) }),
      ),
    );
    wordmarkOpacity.value = withDelay(
      INITIAL_HOLD_DURATION + MARK_ANIMATION_DURATION,
      withTiming(1, { duration: WORDMARK_DURATION, easing: Easing.out(Easing.cubic) }),
    );
    wordmarkTranslateY.value = withDelay(
      INITIAL_HOLD_DURATION + MARK_ANIMATION_DURATION,
      withTiming(0, { duration: WORDMARK_DURATION, easing: Easing.out(Easing.cubic) }),
    );
    compositionScale.value = withDelay(
      INITIAL_HOLD_DURATION + MARK_ANIMATION_DURATION + WORDMARK_DURATION + BRAND_HOLD_DURATION,
      withTiming(0.985, { duration: EXIT_DURATION, easing: Easing.inOut(Easing.cubic) }),
    );
    compositionOpacity.value = withDelay(
      INITIAL_HOLD_DURATION + MARK_ANIMATION_DURATION + WORDMARK_DURATION + BRAND_HOLD_DURATION,
      withTiming(0, { duration: EXIT_DURATION, easing: Easing.inOut(Easing.cubic) }, (finished) => {
        if (finished) {
          runOnJS(finish)();
        }
      }),
    );
  }, [compositionOpacity, compositionScale, markRotation, markScale, reduceMotion, wordmarkOpacity, wordmarkTranslateY]);

  const compositionStyle = useAnimatedStyle(() => ({
    opacity: compositionOpacity.value,
    transform: [{ scale: compositionScale.value }],
  }));
  const markStyle = useAnimatedStyle(() => ({
    transform: [{ scale: markScale.value }, { rotate: `${markRotation.value}deg` }],
  }));
  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkOpacity.value,
    transform: [{ translateY: wordmarkTranslateY.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center bg-loop-background">
      <Animated.View className="items-center" style={compositionStyle}>
        <Animated.View style={markStyle}>
          <Image accessibilityLabel="Símbolo Loop" source={require('@/assets/images/brand/loop-mark.png')} style={styles.mark} />
        </Animated.View>
        <Animated.View style={[styles.wordmark, wordmarkStyle]}>
          <Image accessibilityLabel="Loop" source={require('@/assets/images/brand/loop-wordmark-light.png')} style={styles.wordmarkImage} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    height: 136,
    width: 136,
  },
  wordmark: {
    marginTop: 12,
    position: 'absolute',
    top: 136,
  },
  wordmarkImage: {
    height: 43,
    width: 128,
  },
});
