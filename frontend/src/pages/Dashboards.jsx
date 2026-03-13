import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import { getDashboardStats, getAdminStats, getRecentActivity } from '../services/dashboardService';
import { getAllTasks, getMyTasks } from '../services/tasksService';
import StatCard from '../components/StatCard';
import RecentActivityTable from '../components/RecentActivityTable';
import AppLayout from '../components/AppLayout';

// =================== ADMIN DASHBOARD ===================
export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [adminStats, logs] = await Promise.all([
          getAdminStats(),
          getRecentActivity()
        ]);
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
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Overview</h1>
            <p className="text-gray-500 mt-1 text-sm">Monitor all activity across your organization</p>
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Manage Tasks
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Employees"
                value={stats?.totalEmployees || 0}
                color="bg-purple-500"
                icon={
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                }
              />
              <StatCard
                title="Total Tasks"
                value={stats?.totalTasks || 0}
                color="bg-blue-500"
                icon={
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                }
              />
              <StatCard
                title="Completed Tasks"
                value={stats?.completedTasks || 0}
                color="bg-green-500"
                icon={
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                }
              />
              <StatCard
                title="Pending Tasks"
                value={stats?.pendingTasks || 0}
                color="bg-yellow-500"
                icon={
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                }
              />
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/tasks')}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group text-left"
              >
                <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Create Task</p>
                  <p className="text-sm text-gray-500">Assign work to team members</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/users')}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group text-left"
              >
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-500">Add or remove team members</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/activity-logs')}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group text-left"
              >
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Activity Logs</p>
                  <p className="text-sm text-gray-500">View all system actions</p>
                </div>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                <button
                  onClick={() => navigate('/activity-logs')}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View all →
                </button>
              </div>
              <RecentActivityTable logs={recentLogs} />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

// =================== MANAGER DASHBOARD ===================
export const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allTasks, logs] = await Promise.all([
          getAllTasks(),
          getRecentActivity()
        ]);
        setTasks(allTasks);
        setRecentLogs(logs);
      } catch (error) {
        console.error("Failed to fetch manager data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'inprogress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Team Overview</h1>
            <p className="text-gray-500 mt-1 text-sm">Monitor your team's progress and assignments</p>
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Assign Task
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <StatCard
                title="To Do"
                value={todoCount}
                icon={<div className="bg-gray-100 p-3 rounded-lg"><svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></div>}
              />
              <StatCard
                title="In Progress"
                value={inProgressCount}
                icon={<div className="bg-blue-100 p-3 rounded-lg"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>}
              />
              <StatCard
                title="Completed"
                value={completedCount}
                icon={<div className="bg-green-100 p-3 rounded-lg"><svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>}
              />
            </div>

            {/* Task progress bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Task Progress</h2>
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-sm">No tasks yet. Start by assigning some!</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Overall Completion</span>
                    <span className="font-semibold">{tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700"
                      style={{ width: tasks.length > 0 ? `${(completedCount / tasks.length) * 100}%` : '0%' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pt-1">
                    <span><span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1"></span>To Do: {todoCount}</span>
                    <span><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>In Progress: {inProgressCount}</span>
                    <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>Done: {completedCount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Recent Team Activity</h2>
              </div>
              <RecentActivityTable logs={recentLogs} />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

// =================== EMPLOYEE DASHBOARD ===================
export const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getMyTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch employee tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'inprogress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const priorityColors = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200'
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-600',
    inprogress: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700'
  };

  const statusLabels = {
    todo: 'To Do',
    inprogress: 'In Progress',
    completed: 'Completed'
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">Welcome back, <span className="font-semibold text-indigo-600">{user?.name}</span></p>
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Kanban View
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <StatCard
                title="To Do"
                value={todoCount}
                icon={<div className="bg-gray-100 p-3 rounded-lg"><svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></svg></div>}
              />
              <StatCard
                title="In Progress"
                value={inProgressCount}
                icon={<div className="bg-blue-100 p-3 rounded-lg"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>}
              />
              <StatCard
                title="Completed"
                value={completedCount}
                icon={<div className="bg-green-100 p-3 rounded-lg"><svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>}
              />
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">My Assigned Tasks</h2>
                <span className="text-sm text-gray-500">{tasks.length} total</span>
              </div>
              {tasks.length === 0 ? (
                <div className="p-12 text-center">
                  <svg className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500 font-medium">No tasks assigned yet</p>
                  <p className="text-gray-400 text-sm mt-1">Contact your manager to get tasks assigned</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {tasks.map(task => (
                    <li key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{task.title}</p>
                          {task.description && (
                            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                          )}
                          {task.deadline && (
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Due: {new Date(task.deadline).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${priorityColors[task.priority] || priorityColors.Medium}`}>
                            {task.priority || 'Medium'}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status] || statusColors.todo}`}>
                            {statusLabels[task.status] || 'To Do'}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};
