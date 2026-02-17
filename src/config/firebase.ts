import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA71L8F1fdToYPJOWx7TF0v5_XlWKOZE98',
  authDomain: 'onetabcall.firebaseapp.com',
  projectId: 'onetabcall',
  storageBucket: 'onetabcall.firebasestorage.app',
  messagingSenderId: '73749654932',
  appId: '1:73749654932:web:e30544be860edbf9007381',
  measurementId: 'G-9NV0FH2PYZ',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
