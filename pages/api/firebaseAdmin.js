import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEYS
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'auto-verdue-test.appspot.com',
    })
}

const auth = admin.auth(); 
const db = admin.firestore();
const storage = admin.storage();

module.exports = { auth, admin, db, storage };