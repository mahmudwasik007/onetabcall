/**
 * Button Component
 * Reusable button with multiple variants for emergency app
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, shadows, borderRadius, spacing } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'call';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary[500] },
  secondary: { backgroundColor: colors.white, borderWidth: 2, borderColor: colors.primary[500] },
  call: { backgroundColor: colors.primary[500], borderRadius: 9999, ...shadows.callButton },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  small: { height: 44, paddingHorizontal: spacing.md },
  medium: { height: 56, paddingHorizontal: spacing.lg },
  large: { height: 72, paddingHorizontal: spacing.xl },
  xlarge: { width: 240, height: 240 },
};

const textVariantStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: colors.white },
  secondary: { color: colors.primary[500] },
  call: { color: colors.white, fontSize: 20, fontWeight: '700' },
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  small: { fontSize: 14 },
  medium: { fontSize: 16 },
  large: { fontSize: 18 },
  xlarge: { fontSize: 24 },
};

export const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  children,
  fullWidth = false,
  style,
  ...props
}: ButtonProps) => {
  const buttonStyle: ViewStyle[] = [
    styles.base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? styles.fullWidth : {},
    disabled ? styles.disabled : {},
    style as ViewStyle,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    textVariantStyles[variant],
    textSizeStyles[size],
    disabled ? styles.textDisabled : {},
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' ? colors.primary[500] : colors.white}
        />
      ) : (
        <>
          {children}
          {title && <Text style={textStyle}>{title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
    ...shadows.medium,
  },
  text: {
    ...typography.labelLarge,
  },
  disabled: {
    opacity: 0.5,
  },
  textDisabled: {
    opacity: 0.7,
  },
  fullWidth: {
    width: '100%',
  },
});
