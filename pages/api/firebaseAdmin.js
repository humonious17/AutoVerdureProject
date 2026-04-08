import admin from "firebase-admin";

try {
  if (!admin.apps.length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEYS;
    if (serviceAccountKey) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
        storageBucket: "elegant-works-429712-a7.appspot.com",
      });
    }
  }
} catch (error) {
  console.error("Firebase admin initialization error", error);
}

let auth = null;
let db = null;
let storage = null;

if (admin.apps.length) {
  auth = admin.auth();
  db = admin.firestore();
  storage = admin.storage();
}

module.exports = { auth, admin, db, storage };
