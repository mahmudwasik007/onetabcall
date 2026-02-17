/**
 * Location Services
 * Handle geolocation and country detection using Expo Location
 */

import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface LocationResult {
  success: boolean;
  location?: LocationData;
  error?: string;
}

/**
 * Request location permission (cross-platform)
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (err) {
    console.error('Location permission error:', err);
    return false;
  }
};

/**
 * Get current location
 */
export const getCurrentLocation = async (): Promise<LocationResult> => {
  try {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return {
        success: false,
        error: 'Location permission denied',
      };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 10000,
    });

    return {
      success: true,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy || 0,
        timestamp: location.timestamp,
      },
    };
  } catch (error: any) {
    console.error('Location error:', error);
    return {
      success: false,
      error: error.message || 'Failed to get location',
    };
  }
};

/**
 * Simple country detection from coordinates
 * In production, use a proper geocoding service API
 */
export const detectCountryFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  // Simple region-based detection (fallback)
  // In production, use Google Maps Geocoding API or similar

  // North America
  if (latitude >= 15 && latitude <= 72 && longitude >= -168 && longitude <= -52) {
    if (latitude <= 32 && longitude >= -118) return 'MX'; // Mexico
    return 'US'; // USA/Canada
  }

  // Europe
  if (latitude >= 36 && latitude <= 71 && longitude >= -10 && longitude <= 40) {
    if (latitude >= 49 && latitude <= 55 && longitude >= -8 && longitude <= 2) return 'GB'; // UK
    if (latitude >= 47 && latitude <= 55 && longitude >= 6 && longitude <= 15) return 'DE'; // Germany
    return 'GB'; // Default to UK for Europe
  }

  // South Asia
  if (latitude >= 8 && latitude <= 35 && longitude >= 68 && longitude <= 88) {
    if (longitude >= 68 && longitude <= 75) return 'PK'; // Pakistan
    return 'IN'; // India
  }

  // East Asia
  if (latitude >= 20 && latitude <= 46 && longitude >= 100 && longitude <= 145) {
    if (longitude >= 126 && longitude <= 131) return 'KR'; // South Korea
    if (longitude >= 130 && longitude <= 146) return 'JP'; // Japan
    return 'CN'; // China
  }

  // Australia
  if (latitude >= -44 && latitude <= -10 && longitude >= 113 && longitude <= 154) {
    return 'AU';
  }

  // Middle East
  if (latitude >= 12 && latitude <= 42 && longitude >= 34 && longitude <= 63) {
    if (longitude >= 51 && longitude <= 56) return 'AE'; // UAE
    return 'SA'; // Saudi Arabia
  }

  // Default fallback
  return 'XX'; // Unknown
};

/**
 * Format location for display
 */
export const formatLocationDisplay = (
  location: LocationData,
  countryCode: string
): string => {
  // In production, reverse geocode to get actual city/area name
  const lat = location.latitude.toFixed(4);
  const lng = location.longitude.toFixed(4);
  return `${countryCode} (${lat}, ${lng})`;
};

/**
 * Get mock location for testing
 */
export const getMockLocation = (countryCode: string): LocationData => {
  const mockLocations: Record<string, LocationData> = {
    US: { latitude: 40.7128, longitude: -74.0060, accuracy: 10, timestamp: Date.now() }, // New York
    GB: { latitude: 51.5074, longitude: -0.1278, accuracy: 10, timestamp: Date.now() },  // London
    IN: { latitude: 28.6139, longitude: 77.2090, accuracy: 10, timestamp: Date.now() },  // Delhi
    PK: { latitude: 24.8607, longitude: 67.0011, accuracy: 10, timestamp: Date.now() },  // Karachi
    AU: { latitude: -33.8688, longitude: 151.2093, accuracy: 10, timestamp: Date.now() }, // Sydney
  };
  return mockLocations[countryCode] || mockLocations.US;
};
