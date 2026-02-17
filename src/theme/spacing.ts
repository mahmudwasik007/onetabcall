/**
 * One Tap Call - Spacing System
 * 8px base unit for consistent spacing
 */

export const spacing = {
  xs: 4,      // 0.5 unit
  sm: 8,      // 1 unit
  md: 16,     // 2 units
  lg: 24,     // 3 units
  xl: 32,     // 4 units
  '2xl': 48,  // 6 units
  '3xl': 64,  // 8 units
} as const;

// Common padding/margin configurations
export const screenPadding = {
  horizontal: 20,
  vertical: 24,
} as const;

export const componentSpacing = {
  cardGap: 16,
  sectionGap: 24,
  elementGap: 12,
} as const;

// Border radius values
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999, // For circular elements
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;
