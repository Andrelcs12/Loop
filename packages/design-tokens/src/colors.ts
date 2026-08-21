export const colors = {
  brand: {
    50: "#FFF4EB",
    100: "#FFE4CC",
    200: "#FFC999",
    300: "#FFAA61",
    400: "#FF8A3D",
    500: "#FF7A1A",
    600: "#F96500",
    700: "#D94F00",
    800: "#AD3F00",
    900: "#8B3500",
    950: "#4A1900"
  },
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
    950: "#09090B"
  },
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6"
} as const;

export const semanticColors = {
  background: "#000000",
  surface: colors.neutral[900],
  surfaceSecondary: colors.neutral[800],

  textPrimary: colors.neutral[50],
  textSecondary: colors.neutral[400],
  textMuted: colors.neutral[500],
  textInverse: colors.neutral[950],
  border: colors.neutral[800],

  primary: "#FF6A00",
  primaryHover: colors.brand[400],
  primaryPressed: "#E85F00",
  primarySoft: colors.brand[100],

  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  info: colors.info
} as const;
