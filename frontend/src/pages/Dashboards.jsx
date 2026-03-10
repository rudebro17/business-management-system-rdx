import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/auth';
import { getDashboardStats, getAdminStats, getRecentActivity } from '../services/dashboardService';
import StatCard from '../components/StatCard';
import RecentActivityTable from '../components/RecentActivityTable';
import ActiveUsersList from '../components/ActiveUsersList';

const DashboardLayout = ({ title, children, requiredRole }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 underline">Return to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">BMS<span className="text-gray-800">App</span></span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-gray-700">
                Welcome back, <span className="font-bold text-indigo-600">{user.name}</span> ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
         {children}
      </main>
    </div>
  );
};

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminStats = await getAdminStats();
        const logs = await getRecentActivity();
        setStats(adminStats);
        setRecentLogs(logs);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard" requiredRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Overview</h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Total Employees" 
                value={stats?.totalEmployees || 0} 
                color="bg-purple-500" 
              />
              <StatCard 
                title="Total Tasks" 
                value={stats?.totalTasks || 0} 
                color="bg-blue-500" 
              />
              <StatCard 
                title="Completed Tasks" 
                value={stats?.completedTasks || 0} 
                color="bg-green-500" 
              />
              <StatCard 
                title="Pending Tasks" 
                value={stats?.pendingTasks || 0} 
                color="bg-yellow-500" 
              />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <RecentActivityTable logs={recentLogs} />
              </div>
              <div className="lg:col-span-1">
                <ActiveUsersList activeCount={6} /> {/* Mock active users as per requirements */}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export const ManagerDashboard = () => {
  return (
    <DashboardLayout title="Manager Dashboard" requiredRole="manager">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Overview</h2>
        <p className="text-gray-500 text-lg">Team summaries, performance metrics, and task approvals will appear here.</p>
      </div>
    </DashboardLayout>
  );
};

export const EmployeeDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch employee stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout title="Employee Dashboard" requiredRole="employee">
      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">My Profile</h1>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
             <StatCard 
                title="Tasks Assigned" 
                value={stats?.tasksAssigned || 0} 
                color="bg-blue-500" 
              />
              <StatCard 
                title="Completed Tasks" 
                value={stats?.tasksCompleted || 0} 
                color="bg-green-500" 
              />
              <StatCard 
                title="Pending Tasks" 
                value={stats?.tasksPending || 0} 
                color="bg-yellow-500" 
              />
          </div>
        )}
        
        <div className="bg-white shadow rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Tasks</h2>
            <p className="text-gray-500">Your assigned tasks and pending items will list here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};
