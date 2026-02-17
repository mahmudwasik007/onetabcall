/**
 * Location Screen
 * Shows detected location and emergency service number
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Button } from '../components/atoms';
import {
  colors,
  spacing,
  screenPadding,
  shadows,
  borderRadius,
} from '../theme';
import {
  ServiceType,
  getServiceDisplayName,
  fetchServiceNumber,
} from '../utils/emergency-numbers';
import {
  getCurrentLocation,
  detectCountryFromCoordinates,
  LocationData,
} from '../utils/location';

interface LocationScreenProps {
  serviceType: ServiceType;
  onProceed: (emergencyNumber: string, countryCode: string) => void;
  onBack: () => void;
}

export const LocationScreen: React.FC<LocationScreenProps> = ({
  serviceType,
  onProceed,
  onBack,
}) => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [countryCode, setCountryCode] = useState<string>('XX');
  const [emergencyNumber, setEmergencyNumber] = useState<string>('112');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocationAndNumber();
  }, [serviceType]);

  const loadLocationAndNumber = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get current location
      const locationResult = await getCurrentLocation();

      if (locationResult.success && locationResult.location) {
        setLocation(locationResult.location);

        // Detect country from coordinates
        const detectedCountry = await detectCountryFromCoordinates(
          locationResult.location.latitude,
          locationResult.location.longitude
        );
        setCountryCode(detectedCountry);

        // Get emergency number for this service and country (from Firestore with local fallback)
        const number = await fetchServiceNumber(detectedCountry, serviceType);
        setEmergencyNumber(number);
      } else {
        // Use default if location fails
        setError('Could not detect location. Using default emergency number.');
        setCountryCode('XX');
        setEmergencyNumber('112');
      }
    } catch (err) {
      setError('Location error. Using default emergency number.');
      setCountryCode('XX');
      setEmergencyNumber('112');
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text variant="bodyLarge" align="center" style={styles.loadingText}>
            Detecting your location...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
          {/* Service Icon */}
          <View
            style={[
              styles.serviceIconContainer,
              { backgroundColor: `${getServiceColor()}20` },
            ]}
          >
            <MaterialCommunityIcons name={getServiceIcon()} size={56} color={getServiceColor()} />
          </View>

          {/* Service Title */}
          <Text variant="h1" align="center" style={styles.serviceTitle}>
            {getServiceDisplayName(serviceType)}
          </Text>

          {/* Location Info */}
          <View style={styles.infoCard}>
            <Text variant="bodySmall" color={colors.gray[500]} align="center">
              Your Location
            </Text>
            <View style={styles.locationRow}>
              <MaterialCommunityIcons name="map-marker" size={18} color={colors.gray[700]} />
              <Text variant="bodyLarge" style={styles.locationText}>
                {countryCode === 'XX' ? 'Location Unknown' : `Country: ${countryCode}`}
              </Text>
            </View>
            {error && (
              <Text
                variant="bodySmall"
                color={colors.status.warning}
                align="center"
                style={styles.errorText}
              >
                {error}
              </Text>
            )}
          </View>

          {/* Emergency Number */}
          <View style={styles.numberCard}>
            <Text variant="bodySmall" color={colors.gray[500]} align="center">
              Emergency Number
            </Text>
            <Text
              variant="emergencyNumber"
              color={colors.primary[500]}
              align="center"
              style={styles.emergencyNumber}
            >
              {emergencyNumber}
            </Text>
          </View>

          {/* Switch Service Link */}
          <TouchableOpacity onPress={onBack} style={styles.switchButton}>
            <Text variant="bodyMedium" color={colors.primary[500]} align="center">
              Switch to different service
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer with action button */}
        <View style={styles.footer}>
          <Button
            title="Continue to Call"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => onProceed(emergencyNumber, countryCode)}
          />
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
  serviceIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  serviceTitle: {
    marginBottom: spacing.xl,
  },
  infoCard: {
    width: '100%',
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  locationText: {
    marginLeft: spacing.xs,
  },
  errorText: {
    marginTop: spacing.sm,
  },
  numberCard: {
    width: '100%',
    backgroundColor: colors.primary[100],
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  emergencyNumber: {
    marginTop: spacing.sm,
    letterSpacing: 2,
  },
  switchButton: {
    paddingVertical: spacing.md,
  },
  footer: {
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.lg,
  },
});
