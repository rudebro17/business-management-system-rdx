const admin = require("firebase-admin");

let serviceAccount;

// In production (Render), credentials come as a JSON string env var
// In local dev, they come from a file path env var
if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    // Render escapes \n in private_key — restore actual newlines
    if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
} else {
    throw new Error("Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH");
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;