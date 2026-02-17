/**
 * Call Confirmation Screen
 * Final screen with large call button and safety warning
 */

import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '../components/atoms';
import {
  colors,
  spacing,
  screenPadding,
  shadows,
} from '../theme';
import {
  ServiceType,
  getServiceDisplayName,
} from '../utils/emergency-numbers';

interface CallScreenProps {
  serviceType: ServiceType;
  emergencyNumber: string;
  countryCode: string;
  onBack: () => void;
}

export const CallScreen: React.FC<CallScreenProps> = ({
  serviceType,
  emergencyNumber,
  countryCode,
  onBack,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Continuous pulse animation for call button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleCallPress = () => {
    // Show confirmation alert
    Alert.alert(
      'Emergency Call',
      `Are you sure you want to call ${getServiceDisplayName(serviceType)}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Call Now',
          style: 'destructive',
          onPress: makeEmergencyCall,
        },
      ]
    );
  };

  const makeEmergencyCall = async () => {
    const phoneUrl = Platform.OS === 'ios'
      ? `telprompt:${emergencyNumber}`
      : `tel:${emergencyNumber}`;

    try {
      const canOpen = await Linking.canOpenURL(phoneUrl);
      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Cannot make phone calls on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate call');
      console.error('Call error:', error);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getServiceIcon = (): keyof typeof MaterialCommunityIcons.glyphMap => {
    const iconMap: Record<ServiceType, keyof typeof MaterialCommunityIcons.glyphMap> = {
      police: 'shield-car',
      fire: 'fire-truck',
      medical: 'ambulance',
    };
    return iconMap[serviceType];
  };

  const getServiceColor = () => {
    switch (serviceType) {
      case 'police':
        return colors.services.police;
      case 'fire':
        return colors.services.fire;
      case 'medical':
        return colors.services.medical;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <View style={styles.backRow}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary[500]} />
              <Text variant="h3" color={colors.primary[500]} style={styles.backText}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Service Info */}
          <View style={styles.serviceInfo}>
            <View
              style={[
                styles.serviceIconSmall,
                { backgroundColor: `${getServiceColor()}20` },
              ]}
            >
              <MaterialCommunityIcons name={getServiceIcon()} size={40} color={getServiceColor()} />
            </View>
            <Text variant="h2" align="center" style={styles.serviceName}>
              {getServiceDisplayName(serviceType)}
            </Text>
            <View style={styles.locationRow}>
              <MaterialCommunityIcons name="map-marker" size={18} color={colors.gray[500]} />
              <Text
                variant="bodyLarge"
                color={colors.gray[500]}
                style={styles.locationText}
              >
                {countryCode}
              </Text>
            </View>
          </View>

          {/* Emergency Number Display */}
          <View style={styles.numberDisplay}>
            <Text variant="emergencyNumber" color={colors.gray[900]} align="center">
              {emergencyNumber}
            </Text>
          </View>

          {/* Large Call Button */}
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
          >
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
              }}
            >
              <TouchableOpacity
                style={styles.callButton}
                onPress={handleCallPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
              >
                <MaterialCommunityIcons name="phone" size={56} color={colors.white} />
                <Text
                  variant="h3"
                  color={colors.white}
                  style={styles.callButtonText}
                >
                  Call Now
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* Warning Message */}
          <View style={styles.warningContainer}>
            <View style={styles.warningRow}>
              <MaterialCommunityIcons name="alert" size={18} color={colors.status.danger} />
              <Text variant="bodyMedium" color={colors.status.danger} style={styles.warningText}>
                Use only in real emergencies
              </Text>
            </View>
            <Text
              variant="bodySmall"
              color={colors.gray[500]}
              align="center"
              style={styles.warningSubtext}
            >
              False emergency calls may be punishable by law
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            variant="bodySmall"
            color={colors.gray[500]}
            align="center"
          >
            Tap the button above to start the call
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: screenPadding.horizontal,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.sm,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: spacing.xs,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  serviceIconSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  serviceName: {
    marginBottom: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  locationText: {
    marginLeft: spacing.xs,
  },
  numberDisplay: {
    backgroundColor: colors.gray[50],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 20,
    marginBottom: spacing['2xl'],
    ...shadows.small,
  },
  callButton: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.callButton,
  },
  callButtonText: {
    marginTop: spacing.sm,
  },
  warningContainer: {
    marginTop: spacing['2xl'],
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    marginLeft: spacing.xs,
  },
  warningSubtext: {
    marginTop: spacing.xs,
  },
  footer: {
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
  },
});
