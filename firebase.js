const admin = require("firebase-admin");

// Parse the service account key JSON from the environment variable
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
