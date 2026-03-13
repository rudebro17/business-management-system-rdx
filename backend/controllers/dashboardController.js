const db = require('../../firebase');

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Fetch User's Tasks assigned to this user
        const tasksRef = db.collection('tasks');
        const tasksSnapshot = await tasksRef.where('assignedTo', '==', userId).get();
        
        let tasksAssigned = 0;
        let tasksCompleted = 0;
        let tasksPending = 0;

        tasksSnapshot.forEach(doc => {
            tasksAssigned++;
            const data = doc.data();
            if (data.status === 'completed') {
                tasksCompleted++;
            } else {
                tasksPending++;
            }
        });

        // For active users, let's just make a mock logic or fetch users who logged in recently.
        // For simplicity, we can fetch total users and assume a subset are active,
        // or if there is an isOnline flag, use that.
        // We'll mock it to a fixed number for the generic view or fetch recent logs.
        // Let's just say activeUsers is 6 for now as requested by user spec mock, 
        // or actually query users if they have a lastActive field.
        const activeUsersCount = 6; // Mock active users

        res.json({
            tasksAssigned,
            tasksCompleted,
            tasksPending,
            activeUsers: activeUsersCount
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: 'Server error fetching stats' });
    }
};

const getAdminStats = async (req, res) => {
    try {
        // Total Employees
        const usersSnapshot = await db.collection('users').get();
        const totalEmployees = usersSnapshot.size;

        // Total Tasks
        const tasksSnapshot = await db.collection('tasks').get();
        const totalTasks = tasksSnapshot.size;
        
        let completedTasks = 0;
        let pendingTasks = 0;

        tasksSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.status === 'completed') {
                completedTasks++;
            } else {
                pendingTasks++;
            }
        });

        res.json({
            totalEmployees,
            totalTasks,
            completedTasks,
            pendingTasks
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: 'Server error fetching admin stats' });
    }
};

const getRecentActivity = async (req, res) => {
    try {
        // Fetch latest 5 activity logs
        const logsRef = db.collection('activity_logs');
        const snapshot = await logsRef.orderBy('timestamp', 'desc').limit(5).get();
        
        const logs = [];
        snapshot.forEach(doc => {
            logs.push({ id: doc.id, ...doc.data() });
        });

        res.json(logs);
    } catch (error) {
        console.error("Error fetching recent activity:", error);
        res.status(500).json({ message: 'Server error fetching activity' });
    }
};

module.exports = {
    getDashboardStats,
    getAdminStats,
    getRecentActivity
};
