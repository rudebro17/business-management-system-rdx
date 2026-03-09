const admin = require("firebase-admin");

if (!process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_PATH in .env.local");
}

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;