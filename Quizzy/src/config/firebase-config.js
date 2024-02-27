import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJL-A1KCgT8HHVsw7GqQNZly-UAkh9Hig",
  authDomain: "quizzy-application-f0713.firebaseapp.com",
  projectId: "quizzy-application-f0713",
  storageBucket: "quizzy-application-f0713.appspot.com",
  messagingSenderId: "502954704886",
  appId: "1:502954704886:web:99f3ed6c93927faa0e11d7",
  databaseURL:
    "https://quizzy-application-f0713-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
