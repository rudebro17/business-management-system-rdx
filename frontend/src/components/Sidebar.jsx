import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const allNavItems = [
    {
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: user?.role === 'admin' ? '/admin-dashboard' : user?.role === 'manager' ? '/manager-dashboard' : '/employee-dashboard',
      roles: ['admin', 'manager', 'employee']
    },
    {
      label: 'Tasks',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      path: '/tasks',
      roles: ['admin', 'manager', 'employee']
    },
    {
      label: 'Users',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/users',
      roles: ['admin', 'manager']
    },
    {
      label: 'Activity Logs',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      path: '/activity-logs',
      roles: ['admin']
    }
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(user?.role));

  const isActive = (path) => location.pathname === path;

  const roleColors = {
    admin: 'bg-red-500',
    manager: 'bg-blue-500',
    employee: 'bg-green-500'
  };

  return (
    <div className={`flex flex-col bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-indigo-400">BMS</span>
            <span className="text-white">App</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-gray-700 transition-colors ml-auto"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {collapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${roleColors[user?.role] || 'bg-indigo-500'} flex items-center justify-center text-white font-bold text-sm uppercase flex-shrink-0`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full text-white ${roleColors[user?.role] || 'bg-indigo-500'} capitalize`}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            title={collapsed ? item.label : ''}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              isActive(item.path)
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-700">
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : ''}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-150`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
