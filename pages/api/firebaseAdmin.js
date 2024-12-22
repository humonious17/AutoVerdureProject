import admin from "firebase-admin";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDF8C6kkHyW7HAXJt_aouMceH-O-IQlemQ",
  authDomain: "elegant-works-429712-a7.firebaseapp.com",
  projectId: "elegant-works-429712-a7",
  storageBucket: "elegant-works-429712-a7.appspot.com",
  messagingSenderId: "39593396169",
  appId: "1:39593396169:web:db2619ae24cc9ccfdc0a18",
};

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();

module.exports = { auth, admin, db, storage };
