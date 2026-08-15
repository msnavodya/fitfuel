import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace the values below with your Firebase project config.
// For production, keep these in secure env vars or use secrets manager.
let firebaseConfig = {
  apiKey: 'REPLACE_WITH_API_KEY',
  authDomain: 'REPLACE_WITH_AUTH_DOMAIN',
  projectId: 'REPLACE_WITH_PROJECT_ID',
  storageBucket: 'REPLACE_WITH_STORAGE_BUCKET',
  messagingSenderId: 'REPLACE_WITH_MESSAGING_SENDER_ID',
  appId: 'REPLACE_WITH_APP_ID'
};

try {
  // if env.js was generated from .env, use those values
  // eslint-disable-next-line global-require
  const env = require('./env');
  if (env) {
    firebaseConfig = {
      apiKey: env.FIREBASE_API_KEY || firebaseConfig.apiKey,
      authDomain: env.FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
      projectId: env.FIREBASE_PROJECT_ID || firebaseConfig.projectId,
      storageBucket: env.FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
      appId: env.FIREBASE_APP_ID || firebaseConfig.appId
    };
  }
} catch (err) {
  // ignore
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
