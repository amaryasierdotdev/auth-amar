import { createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import { 
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

// Clean, minimal theme focused on neutrals for light/dark mode preparation
const themes = {
  light: {
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
    backgroundTertiary: '#f1f3f4',
    color: '#1a1a1a',
    colorSecondary: '#4a4a4a',
    colorTertiary: '#6a6a6a',
    borderColor: '#e1e5e9',
    borderColorSecondary: '#d1d9e0',
    placeholderColor: '#8e8e93',
    primary: '#007AFF',
    primaryHover: '#0056CC',
    success: '#28a745',
    error: '#ff6b6b',
    warning: '#ffc107',
  },
  dark: {
    background: '#000000',
    backgroundSecondary: '#1c1c1e',
    backgroundTertiary: '#2c2c2e',
    color: '#ffffff',
    colorSecondary: '#ebebf5',
    colorTertiary: '#a1a1a6',
    borderColor: '#38383a',
    borderColorSecondary: '#48484a',
    placeholderColor: '#8e8e93',
    primary: '#007AFF',
    primaryHover: '#0056CC',
    success: '#30d158',
    error: '#ff6961',
    warning: '#ffcc02',
  },
};

// Font configuration with Nunito
const fonts = {
  body: {
    family: 'Nunito',
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
      9: 40,
      10: 48,
    },
    lineHeight: {
      1: 16,
      2: 20,
      3: 24,
      4: 26,
      5: 28,
      6: 32,
      7: 36,
      8: 40,
      9: 48,
      10: 56,
    },
    weight: {
      1: '400', // Regular
      2: '500', // Medium  
      3: '600', // SemiBold
      4: '700', // Bold
    },
    letterSpacing: {
      1: -0.25,
      2: -0.5,
      3: -0.75,
      4: -1,
    },
    face: {
      400: { normal: 'Nunito_400Regular' },
      500: { normal: 'Nunito_500Medium' },
      600: { normal: 'Nunito_600SemiBold' },
      700: { normal: 'Nunito_700Bold' },
    },
  },
  heading: {
    family: 'Nunito',
    size: {
      1: 14,
      2: 16,
      3: 18,
      4: 20,
      5: 24,
      6: 28,
      7: 32,
      8: 40,
      9: 48,
      10: 56,
    },
    lineHeight: {
      1: 18,
      2: 22,
      3: 26,
      4: 28,
      5: 32,
      6: 36,
      7: 40,
      8: 48,
      9: 56,
      10: 64,
    },
    weight: {
      1: '500', // Medium
      2: '600', // SemiBold
      3: '700', // Bold
      4: '700', // Bold
    },
    letterSpacing: {
      1: -0.25,
      2: -0.5,
      3: -0.75,
      4: -1,
    },
    face: {
      500: { normal: 'Nunito_500Medium' },
      600: { normal: 'Nunito_600SemiBold' },
      700: { normal: 'Nunito_700Bold' },
    },
  },
};

// Custom configuration extending the default Tamagui config
const customConfig = {
  ...config,
  themes,
  fonts,
  tokens: {
    ...config.tokens,
    // 8px grid spacing system
    space: {
      0: 0,
      0.5: 4,
      1: 8,
      1.5: 12,
      2: 16,
      2.5: 20,
      3: 24,
      3.5: 28,
      4: 32,
      5: 40,
      6: 48,
      7: 56,
      8: 64,
      9: 72,
      10: 80,
      12: 96,
      16: 128,
      20: 160,
    },
    // Border radius scale
    radius: {
      0: 0,
      1: 4,
      2: 6,
      3: 8,
      4: 12,
      5: 16,
      6: 20,
      round: 1000,
    },
    // Consistent z-index scale
    zIndex: {
      0: 0,
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      5: 500,
    },
  },
};

export const tamaguiConfig = createTamagui(customConfig);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}