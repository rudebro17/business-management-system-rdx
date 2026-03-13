const db = require('../../firebase');
const { logActivity } = require('../utils/logger');

const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, priority, deadline } = req.body;
        
        if (!title || !assignedTo) {
            return res.status(400).json({ message: 'Title and Assignee are required' });
        }

        const newTask = {
            title,
            description: description || '',
            assignedTo, // The ID or Email of the user assigned to this task
            createdBy: req.user.id,
            priority: priority || 'Medium',
            status: 'todo', // default status
            deadline: deadline || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const taskRef = await db.collection('tasks').add(newTask);
        
        // Log activity (optional, but good for tracking)
        await db.collection('activity_logs').add({
            userId: req.user.id,
            userEmail: req.user.email || req.user.name,
            action: 'CREATE_TASK',
            resourceType: 'task',
            resourceId: taskRef.id,
            timestamp: new Date().toISOString(),
            details: `Created task: ${title}`
        });

        res.status(201).json({ id: taskRef.id, ...newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: 'Failed to create task' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasksSnapshot = await db.collection('tasks').orderBy('createdAt', 'desc').get();
        const tasks = [];
        tasksSnapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching all tasks:", error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};

const getMyTasks = async (req, res) => {
    try {
        // Find tasks assigned to logged-in user
        // Assuming user.id or user.email matches the assignedTo string. Let's use id or name.
        // During seed, test user has no specific id assigned externally, we get it dynamically.
        // It's safer to query where assignedTo == req.user.id.
        const tasksSnapshot = await db.collection('tasks').where('assignedTo', '==', req.user.id).get();
        const tasks = [];
        tasksSnapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching my tasks:", error);
        res.status(500).json({ message: 'Failed to fetch my tasks' });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // e.g., 'todo', 'inprogress', 'completed'

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const taskRef = db.collection('tasks').doc(id);
        const taskDoc = await taskRef.get();

        if (!taskDoc.exists) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ideally, check if req.user is admin/manager, OR if req.user is assigned to this task.
        const taskData = taskDoc.data();
        if (req.user.role === 'employee' && taskData.assignedTo !== req.user.id) {
            return res.status(403).json({ message: 'Access denied: You can only update your own tasks' });
        }

        await taskRef.update({ 
            status,
            updatedAt: new Date().toISOString()
        });

        // Log activity
        await db.collection('activity_logs').add({
            userId: req.user.id,
            userEmail: req.user.email || req.user.name,
            action: 'UPDATE_TASK',
            resourceType: 'task',
            resourceId: id,
            timestamp: new Date().toISOString(),
            details: `Updated task status to: ${status}`
        });

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: 'Failed to update task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        
        const taskRef = db.collection('tasks').doc(id);
        const taskDoc = await taskRef.get();

        if (!taskDoc.exists) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await taskRef.delete();

        // Log activity
        await db.collection('activity_logs').add({
            userId: req.user.id,
            userEmail: req.user.email || req.user.name,
            action: 'DELETE_TASK',
            resourceType: 'task',
            resourceId: id,
            timestamp: new Date().toISOString(),
            details: `Deleted task: ${taskDoc.data().title}`
        });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getMyTasks,
    updateTaskStatus,
    deleteTask
};
