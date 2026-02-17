/**
 * Text Component
 * Consistent typography with theme integration
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography, colors, TypographyKey } from '../../theme';

interface TextProps extends RNTextProps {
  variant?: TypographyKey;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const Text = ({
  variant = 'bodyMedium',
  color = colors.gray[900],
  align = 'left',
  style,
  children,
  ...props
}: TextProps) => {
  const textStyle = [
    styles.base,
    typography[variant],
    { color, textAlign: align },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.gray[900],
  },
});
