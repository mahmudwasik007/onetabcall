/**
 * Emergency Numbers Database
 * Country-specific emergency service numbers
 * Supports both local fallback data and Firebase Firestore
 */

import {
  fetchEmergencyNumbersFromFirestore,
  getEmergencyNumberByCountryFromFirestore,
} from '../services/firebaseEmergencyNumbers';

export type ServiceType = 'police' | 'fire' | 'medical';

export interface EmergencyNumber {
  country: string;
  countryCode: string;
  services: {
    police: string;
    fire: string;
    medical: string;
  };
  unified?: string; // Some countries have a unified emergency number
}

export const emergencyNumbers: EmergencyNumber[] = [
  // Europe (Unified 112)
  {
    country: 'United Kingdom',
    countryCode: 'GB',
    unified: '112',
    services: { police: '999', fire: '999', medical: '999' },
  },
  {
    country: 'Germany',
    countryCode: 'DE',
    unified: '112',
    services: { police: '110', fire: '112', medical: '112' },
  },
  {
    country: 'France',
    countryCode: 'FR',
    unified: '112',
    services: { police: '17', fire: '18', medical: '15' },
  },
  {
    country: 'Italy',
    countryCode: 'IT',
    unified: '112',
    services: { police: '113', fire: '115', medical: '118' },
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    unified: '112',
    services: { police: '091', fire: '080', medical: '061' },
  },

  // North America
  {
    country: 'United States',
    countryCode: 'US',
    unified: '911',
    services: { police: '911', fire: '911', medical: '911' },
  },
  {
    country: 'Canada',
    countryCode: 'CA',
    unified: '911',
    services: { police: '911', fire: '911', medical: '911' },
  },
  {
    country: 'Mexico',
    countryCode: 'MX',
    unified: '911',
    services: { police: '911', fire: '911', medical: '911' },
  },

  // Asia
  {
    country: 'India',
    countryCode: 'IN',
    unified: '112',
    services: { police: '100', fire: '101', medical: '102' },
  },
  {
    country: 'China',
    countryCode: 'CN',
    services: { police: '110', fire: '119', medical: '120' },
  },
  {
    country: 'Japan',
    countryCode: 'JP',
    services: { police: '110', fire: '119', medical: '119' },
  },
  {
    country: 'South Korea',
    countryCode: 'KR',
    services: { police: '112', fire: '119', medical: '119' },
  },
  {
    country: 'Pakistan',
    countryCode: 'PK',
    unified: '15',
    services: { police: '15', fire: '16', medical: '1122' },
  },
  {
    country: 'Bangladesh',
    countryCode: 'BD',
    unified: '999',
    services: { police: '999', fire: '999', medical: '999' },
  },

  // Middle East
  {
    country: 'United Arab Emirates',
    countryCode: 'AE',
    unified: '999',
    services: { police: '999', fire: '997', medical: '998' },
  },
  {
    country: 'Saudi Arabia',
    countryCode: 'SA',
    services: { police: '999', fire: '998', medical: '997' },
  },

  // Oceania
  {
    country: 'Australia',
    countryCode: 'AU',
    unified: '000',
    services: { police: '000', fire: '000', medical: '000' },
  },
  {
    country: 'New Zealand',
    countryCode: 'NZ',
    unified: '111',
    services: { police: '111', fire: '111', medical: '111' },
  },

  // Africa
  {
    country: 'South Africa',
    countryCode: 'ZA',
    services: { police: '10111', fire: '10177', medical: '10177' },
  },
  {
    country: 'Nigeria',
    countryCode: 'NG',
    services: { police: '199', fire: '199', medical: '199' },
  },

  // South America
  {
    country: 'Brazil',
    countryCode: 'BR',
    services: { police: '190', fire: '193', medical: '192' },
  },
  {
    country: 'Argentina',
    countryCode: 'AR',
    services: { police: '911', fire: '100', medical: '107' },
  },
];

// Default fallback for unknown locations
export const defaultEmergencyNumber: EmergencyNumber = {
  country: 'Unknown',
  countryCode: 'XX',
  unified: '112', // Most international standard
  services: { police: '112', fire: '112', medical: '112' },
};

/**
 * Get emergency numbers by country code
 */
export const getEmergencyNumbersByCountry = (
  countryCode: string
): EmergencyNumber => {
  const numbers = emergencyNumbers.find(
    (entry) => entry.countryCode === countryCode
  );
  return numbers || defaultEmergencyNumber;
};

/**
 * Get specific service number
 */
export const getServiceNumber = (
  countryCode: string,
  serviceType: ServiceType
): string => {
  const numbers = getEmergencyNumbersByCountry(countryCode);
  return numbers.services[serviceType];
};

/**
 * Get display name for service type
 */
export const getServiceDisplayName = (serviceType: ServiceType): string => {
  const names: Record<ServiceType, string> = {
    police: 'Police',
    fire: 'Fire Service',
    medical: 'Hospital / Ambulance',
  };
  return names[serviceType];
};

/**
 * Get service icon name (for icon libraries)
 */
export const getServiceIcon = (serviceType: ServiceType): string => {
  const icons: Record<ServiceType, string> = {
    police: 'shield-check',
    fire: 'fire',
    medical: 'heart-pulse',
  };
  return icons[serviceType];
};

/**
 * Fetch all emergency numbers - tries Firestore first, falls back to local data
 */
export const fetchAllEmergencyNumbers = async (): Promise<
  EmergencyNumber[]
> => {
  try {
    const data = await fetchEmergencyNumbersFromFirestore();
    if (data.length > 0) return data;
  } catch {
    // Firestore unavailable, use local fallback
  }
  return emergencyNumbers;
};

/**
 * Fetch emergency numbers by country - tries Firestore first, falls back to local
 */
export const fetchEmergencyNumbersByCountry = async (
  countryCode: string
): Promise<EmergencyNumber> => {
  try {
    return await getEmergencyNumberByCountryFromFirestore(countryCode);
  } catch {
    // Firestore unavailable, use local fallback
  }
  return getEmergencyNumbersByCountry(countryCode);
};

/**
 * Fetch specific service number - tries Firestore first, falls back to local
 */
export const fetchServiceNumber = async (
  countryCode: string,
  serviceType: ServiceType
): Promise<string> => {
  try {
    const numbers =
      await getEmergencyNumberByCountryFromFirestore(countryCode);
    return numbers.services[serviceType];
  } catch {
    // Firestore unavailable, use local fallback
  }
  return getServiceNumber(countryCode, serviceType);
};
