import * as admin from "firebase-admin";

import serviceAccount from "../firebase-sdk-config.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: "https://tests-frati.firebaseio.com",
    storageBucket: "gs://tests-frati.appspot.com",
  });
}

export default admin;
