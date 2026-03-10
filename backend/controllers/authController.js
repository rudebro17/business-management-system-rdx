const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../firebase'); // adjust path if needed to reach root firebase.js

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Find user by email in Firestore. Adjust collection name if different.
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();

        if (snapshot.empty) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        let userData;
        let userId;

        snapshot.forEach(doc => {
            userData = doc.data();
            userId = doc.id;
        });

        // Compare password with hashed password stored in db
        // Note: Make sure passwords in DB are actually bcrypt hashed. 
        // For testing/mocking, if plain text, you might need to adjust this depending on DB state.
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const payload = {
            id: userId,
            name: userData.name,
            role: userData.role // Expected roles: 'admin', 'manager', 'employee'
        };

        const secret = process.env.JWT_SECRET || 'fallback_secret_key';
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        res.json({
            token,
            user: payload
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    loginUser
};
