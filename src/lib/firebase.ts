// Firebase configuration
// You need to replace these values with your Firebase project config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDVbMgxL94eSyHrnks7gUdWK8kgaNSRUF4",
  authDomain: "varakrishnainfra.firebaseapp.com",
  projectId: "varakrishnainfra",
  storageBucket: "varakrishnainfra.firebasestorage.app",
  messagingSenderId: "428693020552",
  appId: "1:428693020552:web:a31d44439594ef9267243d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
