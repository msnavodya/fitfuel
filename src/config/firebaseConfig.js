import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace the values below with your Firebase project config.
// For production, keep these in secure env vars or use secrets manager.
const firebaseConfig = {
  apiKey: 'REPLACE_WITH_API_KEY',
  authDomain: 'REPLACE_WITH_AUTH_DOMAIN',
  projectId: 'REPLACE_WITH_PROJECT_ID',
  storageBucket: 'REPLACE_WITH_STORAGE_BUCKET',
  messagingSenderId: 'REPLACE_WITH_MESSAGING_SENDER_ID',
  appId: 'REPLACE_WITH_APP_ID'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
