import { Image, StyleSheet, View } from 'react-native';

type BrandLogoProps = { size?: number; wordmark?: boolean };

export function BrandLogo({ size = 112, wordmark = false }: BrandLogoProps) {
  return (
    <View style={styles.container}>
      <Image accessibilityLabel="Símbolo Loop" source={require('@/assets/images/brand/loop-mark.png')} style={{ height: size, width: size }} />
      {wordmark ? <Image accessibilityLabel="Loop" source={require('@/assets/images/brand/loop-wordmark-light.png')} style={[styles.wordmark, { width: size * 1.78 }]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  wordmark: { height: 38, marginTop: 18, resizeMode: 'contain' },
});
