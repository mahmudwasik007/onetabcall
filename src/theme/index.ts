/**
 * One Tap Call - Theme Index
 * Central export for all theme configuration
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';

// Animation timing constants
export const animations = {
  timing: {
    fast: 200,
    standard: 300,
    slow: 400,
  },
  easing: {
    standard: 'ease-in-out',
    decelerate: 'ease-out',
    accelerate: 'ease-in',
  },
} as const;

// Touch target sizes (minimum accessibility standards)
export const touchTargets = {
  minimum: 44,      // iOS/Android minimum
  recommended: 60,  // Better for emergency situations
  large: 80,        // For primary actions
  xlarge: 240,      // For call button
} as const;
