import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AdminDashboard, ManagerDashboard, EmployeeDashboard } from './pages/Dashboards';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import ActivityLogsPage from './pages/ActivityLogsPage';
import { getCurrentUser } from './services/auth';

// Protected Route Wrapper
const ProtectedRoute = ({ children, requiredRole, requiredRoles }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Check for single role restriction
  if (requiredRole && user.role !== requiredRole) {
    const roleRoutes = {
      admin: '/admin-dashboard',
      manager: '/manager-dashboard',
      employee: '/employee-dashboard'
    };
    return <Navigate to={roleRoutes[user.role] || '/'} replace />;
  }

  // Check for multiple role restriction
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    const roleRoutes = {
      admin: '/admin-dashboard',
      manager: '/manager-dashboard',
      employee: '/employee-dashboard'
    };
    return <Navigate to={roleRoutes[user.role] || '/'} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Role-based dashboards */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute requiredRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Tasks - all authenticated users */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        {/* Users management - admin and manager */}
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        {/* Activity Logs - admin only */}
        <Route
          path="/activity-logs"
          element={
            <ProtectedRoute requiredRole="admin">
              <ActivityLogsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
