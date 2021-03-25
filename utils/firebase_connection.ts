import * as admin from "firebase-admin";

const certConfig = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.stringify(certConfig)),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
  });
}

export default admin;
