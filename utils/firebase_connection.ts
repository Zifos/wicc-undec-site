import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB7L3fYfuluouySkfL8t9S8kgNr_lSZ6Dg",
  authDomain: "tests-frati.firebaseapp.com",
  databaseURL: "https://tests-frati.firebaseio.com",
  projectId: "tests-frati",
  storageBucket: "tests-frati.appspot.com",
  messagingSenderId: "564964559853",
  appId: "1:564964559853:web:85442f642e5685c7e935e4",
  measurementId: "G-4XJ5470PKB",
};

// const certConfig = {
//   privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
// };

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(certConfig),
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
//   });
// }

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
