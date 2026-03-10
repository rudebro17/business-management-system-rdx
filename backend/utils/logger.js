const db = require('../../firebase');

/**
 * Logs an activity to the Firestore database.
 * @param {string} userId - ID of the user performing the action.
 * @param {string} userEmail - Email of the user performing the action.
 * @param {string} action - Action performed (e.g., 'LOGIN', 'CREATE_TASK').
 * @param {string} resource - Resource affected (e.g., 'auth', 'tasks').
 * @param {string} details - Additional details about the action.
 */
const logActivity = async (userId, userEmail, action, resource, details = '') => {
    try {
        const logEntry = {
            userId,
            userEmail,
            action,
            resource,
            details,
            timestamp: new Date().toISOString()
        };

        await db.collection('logs').add(logEntry);
        console.log(`[ACTIVITY LOG] ${userEmail} performed ${action} on ${resource}`);
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
};

module.exports = { logActivity };
