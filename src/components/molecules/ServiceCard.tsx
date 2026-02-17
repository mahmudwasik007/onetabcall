/**
 * ServiceCard Component
 * Large, tappable card for emergency service selection
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import { Text } from '../atoms/Text';
import { colors, shadows, borderRadius, spacing } from '../../theme';
import { ServiceType } from '../../utils/emergency-numbers';

interface ServiceCardProps {
  serviceType: ServiceType;
  title: string;
  icon: React.ReactNode;
  selected?: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceType,
  title,
  icon,
  selected = false,
  onPress,
  disabled = false,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const getServiceColor = () => {
    switch (serviceType) {
      case 'police':
        return colors.services.police;
      case 'fire':
        return colors.services.fire;
      case 'medical':
        return colors.services.medical;
      default:
        return colors.gray[500];
    }
  };

  const cardStyle: ViewStyle[] = [
    styles.card,
    ...(selected ? [{
      borderColor: colors.primary[500],
      backgroundColor: colors.primary[100],
    }] : []),
    ...(disabled ? [styles.disabled] : []),
  ];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${getServiceColor()}15` },
          ]}
        >
          {icon}
        </View>
        <Text variant="h3" align="center" style={styles.title}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 120,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.gray[300],
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.medium,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  title: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
