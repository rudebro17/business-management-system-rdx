require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcrypt');
const db = require('./firebase');

async function seedTestUser() {
    console.log("Seeding test user...");
    try {
        const passwordHash = await bcrypt.hash('admin123', 10);
        
        const testUser = {
            name: "Test Admin",
            email: "admin@example.com",
            password: passwordHash,
            role: "admin",
            createdAt: new Date().toISOString()
        };

        // Check if user already exists
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', 'admin@example.com').get();

        if (!snapshot.empty) {
            console.log("Test user already exists. Updating password and role...");
            const docId = snapshot.docs[0].id;
            await usersRef.doc(docId).update(testUser);
            console.log("Updated existing test user.");
        } else {
            await usersRef.add(testUser);
            console.log("Created new test admin user.");
        }
        
        console.log("\n--- TEST CREDENTIALS ---");
        console.log("Email: admin@example.com");
        console.log("Password: admin123");
        console.log("------------------------\n");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding user:", error);
        process.exit(1);
    }
}

seedTestUser();
