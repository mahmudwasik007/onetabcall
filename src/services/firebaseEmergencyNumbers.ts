import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import {
  EmergencyNumber,
  emergencyNumbers,
  defaultEmergencyNumber,
} from '../utils/emergency-numbers';

const COLLECTION_NAME = 'emergencyNumbers';

/**
 * Fetch all emergency numbers from Firestore
 */
export const fetchEmergencyNumbersFromFirestore = async (): Promise<
  EmergencyNumber[]
> => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((doc) => doc.data() as EmergencyNumber);
};

/**
 * Fetch emergency numbers for a specific country from Firestore
 */
export const getEmergencyNumberByCountryFromFirestore = async (
  countryCode: string
): Promise<EmergencyNumber> => {
  const docRef = doc(db, COLLECTION_NAME, countryCode);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as EmergencyNumber;
  }
  return defaultEmergencyNumber;
};

/**
 * Seed all hardcoded emergency numbers to Firestore.
 * Call this once to populate the database.
 */
export const seedEmergencyNumbers = async (): Promise<number> => {
  let count = 0;
  for (const entry of emergencyNumbers) {
    await setDoc(doc(db, COLLECTION_NAME, entry.countryCode), {
      country: entry.country,
      countryCode: entry.countryCode,
      services: entry.services,
      ...(entry.unified ? { unified: entry.unified } : {}),
    });
    count++;
  }
  return count;
};
