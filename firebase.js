const admin = require("firebase-admin");

if (!process.env.SERVICE_ACCOUNT_KEY) {
  throw new Error("SERVICE_ACCOUNT_KEY environment variable is not set.");
}
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
