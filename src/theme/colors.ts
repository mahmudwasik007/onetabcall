/**
 * One Tap Call - Color System
 * Emergency-focused green & white palette
 */

export const colors = {
  // Primary Colors - Emergency Green
  primary: {
    500: '#00C853', // Main brand color
    600: '#00B248', // Hover/Active states
    700: '#009E3D', // Dark variant
    400: '#00E676', // Light variant
    100: '#B9F6CA', // Very light/backgrounds
  },

  // White & Neutrals
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    300: '#E0E0E0',
    500: '#9E9E9E',
    700: '#616161',
    900: '#212121',
  },

  // Semantic Colors for Emergency Services
  services: {
    police: '#2196F3',      // Blue
    fire: '#F44336',        // Red
    medical: '#FF9800',     // Orange
  },

  // Status Colors
  status: {
    success: '#4CAF50',
    warning: '#FFC107',
    danger: '#F44336',
    info: '#2196F3',
  },

  // Transparent variations
  transparent: {
    white: 'rgba(255, 255, 255, 0.9)',
    black: 'rgba(0, 0, 0, 0.5)',
    primary: 'rgba(0, 200, 83, 0.1)',
  },

  // Shadows (for shadow color)
  shadow: {
    primary: 'rgba(0, 200, 83, 0.4)',
    default: 'rgba(0, 0, 0, 0.08)',
    strong: 'rgba(0, 0, 0, 0.1)',
  },
} as const;

// Gradient definitions for linear-gradient usage
export const gradients = {
  primary: {
    colors: ['#00E676', '#00C853'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  splash: {
    colors: ['#00E676', '#00B248'] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
};

export type Colors = typeof colors;
export type ColorKey = keyof Colors;
