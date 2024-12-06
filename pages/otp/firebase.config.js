import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF8C6kkHyW7HAXJt_aouMceH-O-IQlemQ",
  authDomain: "elegant-works-429712-a7.firebaseapp.com",
  projectId: "elegant-works-429712-a7",
  storageBucket: "elegant-works-429712-a7.appspot.com",
  messagingSenderId: "39593396169",
  appId: "1:39593396169:web:db2619ae24cc9ccfdc0a18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
