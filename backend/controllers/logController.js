const { logActivity } = require('../utils/logger');
const db = require('../../firebase');

const getLogs = async (req, res) => {
    try {
        // Query logs ordered by timestamp descending
        const logsRef = db.collection('logs');
        const snapshot = await logsRef.orderBy('timestamp', 'desc').limit(100).get();

        const logs = [];
        snapshot.forEach(doc => {
            logs.push({ id: doc.id, ...doc.data() });
        });

        res.json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: 'Failed to fetch logs' });
    }
};

module.exports = {
    getLogs
};
