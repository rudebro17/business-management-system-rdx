const express = require('express');
const router = express.Router();
const { getDashboardStats, getAdminStats, getRecentActivity } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure user has 'admin' role
const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

// @route   GET /api/dashboard/stats
// @desc    Get dashboard stats for current user
// @access  Private
router.get('/stats', authMiddleware, getDashboardStats);

// @route   GET /api/dashboard/admin-stats
// @desc    Get system-wide stats
// @access  Private (Admin Only)
router.get('/admin-stats', authMiddleware, requireAdmin, getAdminStats);

// @route   GET /api/dashboard/recent-activity
// @desc    Get recent system activity
// @access  Private
// Allowing all logged in users to hit this for now, though dashboard controller only limits to 5.
router.get('/recent-activity', authMiddleware, getRecentActivity);

module.exports = router;
