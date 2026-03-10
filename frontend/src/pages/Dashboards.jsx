import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/auth';
import ActivityLog from '../components/ActivityLog';

const DashboardLayout = ({ title, children, requiredRole }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  // Simple quick protection for mock purposes
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">BMS App</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user.name} ({user.role})</span>
              <button
                onClick={handleLogout}
                className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
         {children}
      </main>
    </div>
  );
};

export const AdminDashboard = () => (
  <DashboardLayout title="Admin Dashboard" requiredRole="admin">
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Admin Dashboard</h1>
      <ActivityLog />
    </div>
  </DashboardLayout>
);

export const ManagerDashboard = () => (
  <DashboardLayout title="Manager Dashboard" requiredRole="manager">
    <p className="text-gray-500 text-lg">Team summaries, performance metrics, and task approvals will appear here.</p>
  </DashboardLayout>
);

export const EmployeeDashboard = () => (
  <DashboardLayout title="Employee Dashboard" requiredRole="employee">
    <p className="text-gray-500 text-lg">Your assigned tasks, personal performance, and quick links will appear here.</p>
  </DashboardLayout>
);
