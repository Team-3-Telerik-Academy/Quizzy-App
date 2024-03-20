import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

/**
 * Firebase configuration object.
 *
 * @typedef {Object} FirebaseConfig
 * @property {string} apiKey - The API key for Firebase.
 * @property {string} authDomain - The authentication domain for Firebase.
 * @property {string} projectId - The project ID for Firebase.
 * @property {string} storageBucket - The storage bucket for Firebase.
 * @property {string} messagingSenderId - The messaging sender ID for Firebase.
 * @property {string} appId - The app ID for Firebase.
 * @property {string} databaseURL - The database URL for Firebase.
 */

/**
 * Firebase configuration.
 *
 * @type {FirebaseConfig}
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
