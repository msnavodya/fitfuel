const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const outPath = path.resolve(process.cwd(), 'src', 'config', 'env.js');
const content = `// Auto-generated from .env — DO NOT COMMIT
const env = {
  EXPO_CLIENT_ID: process.env.EXPO_CLIENT_ID || '',
  IOS_CLIENT_ID: process.env.IOS_CLIENT_ID || '',
  ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID || '',
  WEB_CLIENT_ID: process.env.WEB_CLIENT_ID || '',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:4242',
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || ''
};

module.exports = env;
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content);
console.log('Wrote', outPath);
