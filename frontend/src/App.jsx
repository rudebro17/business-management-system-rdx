import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AdminDashboard, ManagerDashboard, EmployeeDashboard } from './pages/Dashboards';
import { getCurrentUser } from './services/auth';

// Protected Route Wrapper
const ProtectedRoute = ({ children, requiredRole }) => {
  const user = getCurrentUser();

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role
    // Redirect to their respective dashboard
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
        <Route path="/" element={<Login />} />
        
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

        {/* Catch all route - returns to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
