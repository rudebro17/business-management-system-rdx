const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure user has 'admin' role
const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

// @route   GET /api/logs
// @desc    Get all activity logs
// @access  Private (Admin Only)
router.get('/', authMiddleware, requireAdmin, getLogs);

module.exports = router;
