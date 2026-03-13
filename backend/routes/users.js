const express = require('express');
const router = express.Router();
const { getUsers, registerUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure user is admin
const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

// Middleware to ensure user is admin or manager
const requireAdminOrManager = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins or Managers only' });
    }
};

// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin/Manager)
router.get('/', authMiddleware, requireAdminOrManager, getUsers);

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Private (Admin only)
router.post('/register', authMiddleware, requireAdmin, registerUser);

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, requireAdmin, deleteUser);

module.exports = router;
