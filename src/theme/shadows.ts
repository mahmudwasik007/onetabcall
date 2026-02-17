/**
 * One Tap Call - Shadow System
 * Elevation styles for cards and buttons
 */

import { ViewStyle } from 'react-native';
import { colors } from './colors';

// Android elevation values
export const elevation = {
  none: 0,
  small: 2,
  medium: 4,
  large: 8,
  xlarge: 12,
} as const;

// iOS shadow configurations
export const shadows: Record<string, ViewStyle> = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: elevation.none,
  },

  small: {
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: elevation.small,
  },

  medium: {
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: elevation.medium,
  },

  large: {
    shadowColor: colors.shadow.strong,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: elevation.large,
  },

  // Special shadow for call button
  callButton: {
    shadowColor: colors.shadow.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: elevation.xlarge,
  },
} as const;

export type Shadows = typeof shadows;
export type ShadowKey = keyof Shadows;
