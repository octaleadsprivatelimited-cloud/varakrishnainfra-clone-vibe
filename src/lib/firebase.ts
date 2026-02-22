// Firebase configuration – use VITE_* env vars in production for security
// Firestore only (no Firebase Storage – all files stored as base64 in Firestore)

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyDVbMgxL94eSyHrnks7gUdWK8kgaNSRUF4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "varakrishnainfra.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "varakrishnainfra",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "428693020552",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:428693020552:web:a31d44439594ef9267243d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
