/**
 * Icon Component
 * Simple icon wrapper for consistent sizing and colors
 * Uses SVG-based icons (Material/Lucide compatible)
 */

import React from 'react';
import { View, Text as RNText, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';

export type IconName = 'police' | 'fire' | 'medical' | 'phone' | 'location' | 'shield' | 'alert';
export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  style?: ViewStyle;
}

const iconSizes = {
  small: 24,
  medium: 48,
  large: 64,
  xlarge: 80,
};

const iconMap: Record<IconName, string> = {
  police: '🚓',
  fire: '🚒',
  medical: '🚑',
  phone: '📞',
  location: '📍',
  shield: '🛡️',
  alert: '⚠️',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  style,
}) => {
  const iconSize = iconSizes[size];

  return (
    <View style={[styles.container, { width: iconSize, height: iconSize }, style]}>
      <RNText style={{ fontSize: iconSize * 0.6 }}>{iconMap[name]}</RNText>
    </View>
  );
};

export const EmojiIcon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  style,
}) => {
  const iconSize = iconSizes[size];

  return (
    <View style={[styles.container, { width: iconSize, height: iconSize }, style]}>
      <RNText style={{ fontSize: iconSize * 0.6 }}>{iconMap[name]}</RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Export common icon components for each service
export const PoliceIcon: React.FC<{ size?: IconSize; color?: string }> = ({
  size = 'medium',
  color = colors.services.police,
}) => <Icon name="police" size={size} color={color} />;

export const FireIcon: React.FC<{ size?: IconSize; color?: string }> = ({
  size = 'medium',
  color = colors.services.fire,
}) => <Icon name="fire" size={size} color={color} />;

export const MedicalIcon: React.FC<{ size?: IconSize; color?: string }> = ({
  size = 'medium',
  color = colors.services.medical,
}) => <Icon name="medical" size={size} color={color} />;

export const PhoneIcon: React.FC<{ size?: IconSize; color?: string }> = ({
  size = 'medium',
  color = colors.white,
}) => <Icon name="phone" size={size} color={color} />;
