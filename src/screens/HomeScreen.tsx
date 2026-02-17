/**
 * Home Screen
 * Main screen for selecting emergency service type
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '../components/atoms';
import { SearchBar } from '../components/atoms/SearchBar';
import { ServiceCard } from '../components/molecules';
import {
  colors,
  spacing,
  screenPadding,
  componentSpacing,
} from '../theme';
import {
  ServiceType,
  getServiceDisplayName,
} from '../utils/emergency-numbers';

interface HomeScreenProps {
  onServiceSelect: (serviceType: ServiceType) => void;
  manualLocation: string;
  onManualLocationChange: (location: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onServiceSelect,
  manualLocation,
  onManualLocationChange,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  const services: ServiceType[] = ['police', 'fire', 'medical'];

  const handleServicePress = (serviceType: ServiceType) => {
    setSelectedService(serviceType);
    setTimeout(() => {
      onServiceSelect(serviceType);
    }, 200);
  };

  const renderServiceIcon = (serviceType: ServiceType) => {
    const iconMap: Record<ServiceType, keyof typeof MaterialCommunityIcons.glyphMap> = {
      police: 'shield-car',
      fire: 'fire-truck',
      medical: 'ambulance',
    };

    return (
      <MaterialCommunityIcons
        name={iconMap[serviceType]}
        size={36}
        color={colors.primary[500]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[600]} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        overScrollMode="always"
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <View style={styles.heroLogo}>
              <MaterialCommunityIcons name="phone-alert" size={28} color={colors.primary[500]} />
            </View>
            <Text variant="h2" color={colors.white} align="center">
              One Tap Call
            </Text>
            <Text
              variant="bodyMedium"
              color="rgba(255,255,255,0.8)"
              align="center"
              style={styles.heroSubtitle}
            >
              Emergency help is one tap away
            </Text>

            {/* Location Search inside Hero */}
            <SearchBar
              value={manualLocation}
              onChangeText={onManualLocationChange}
              placeholder="Search your location..."
            />
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text variant="h3" style={styles.sectionTitle}>
            Who do you want to call?
          </Text>

          {services.map((serviceType) => (
            <View key={serviceType} style={styles.cardWrapper}>
              <ServiceCard
                serviceType={serviceType}
                title={getServiceDisplayName(serviceType)}
                icon={renderServiceIcon(serviceType)}
                selected={selectedService === serviceType}
                onPress={() => handleServicePress(serviceType)}
              />
            </View>
          ))}

          {/* Footer Info */}
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <MaterialCommunityIcons name="map-marker" size={16} color={colors.gray[500]} />
              <Text
                variant="bodySmall"
                color={colors.gray[500]}
                style={styles.footerText}
              >
                {manualLocation.trim()
                  ? manualLocation
                  : 'Location will be detected automatically'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  hero: {
    backgroundColor: colors.primary[500],
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + spacing.md : spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: screenPadding.horizontal,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  content: {
    paddingHorizontal: screenPadding.horizontal,
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  cardWrapper: {
    marginBottom: componentSpacing.cardGap,
  },
  footer: {
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginLeft: spacing.xs,
  },
});
