const bcrypt = require('bcrypt');
const db = require('../../firebase');
const { logActivity } = require('../utils/logger');

// Get all users (admin/manager)
const getUsers = async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').orderBy('name').get();
        const users = [];
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            // Don't return password hash
            users.push({
                id: doc.id,
                name: data.name,
                email: data.email,
                role: data.role,
                createdAt: data.createdAt || null
            });
        });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// Register a new user (admin only)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required: name, email, password, role' });
        }

        const validRoles = ['admin', 'manager', 'employee'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Must be admin, manager, or employee' });
        }

        // Check if user already exists
        const existingUser = await db.collection('users').where('email', '==', email).get();
        if (!existingUser.empty) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date().toISOString(),
            createdBy: req.user.id
        };

        const userRef = await db.collection('users').add(newUser);

        await logActivity(req.user.id, req.user.name, 'REGISTER_USER', 'users', `Registered new user: ${email} with role: ${role}`);

        res.status(201).json({
            id: userRef.id,
            name,
            email,
            role,
            createdAt: newUser.createdAt
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

// Delete a user (admin only)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting themselves
        if (id === req.user.id) {
            return res.status(400).json({ message: 'You cannot delete yourself' });
        }

        const userRef = db.collection('users').doc(id);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        await userRef.delete();

        await logActivity(req.user.id, req.user.name, 'DELETE_USER', 'users', `Deleted user: ${userData.email}`);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

module.exports = { getUsers, registerUser, deleteUser };
