const express = require('express');
const router = express.Router();
const { 
    createTask, 
    getAllTasks, 
    getMyTasks, 
    updateTaskStatus, 
    deleteTask 
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure user is admin or manager
const requireAdminOrManager = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins or Managers only' });
    }
};

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private (Admin/Manager)
router.post('/', authMiddleware, requireAdminOrManager, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Private (Admin/Manager)
router.get('/', authMiddleware, requireAdminOrManager, getAllTasks);

// @route   GET /api/tasks/my
// @desc    Get user's assigned tasks
// @access  Private 
router.get('/my', authMiddleware, getMyTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task status
// @access  Private 
router.put('/:id', authMiddleware, updateTaskStatus);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private (Admin/Manager)
router.delete('/:id', authMiddleware, requireAdminOrManager, deleteTask);

module.exports = router;
