import React from 'react';

const ACTION_COLORS = {
  LOGIN: 'bg-blue-100 text-blue-700',
  CREATE_TASK: 'bg-green-100 text-green-700',
  UPDATE_TASK: 'bg-yellow-100 text-yellow-700',
  DELETE_TASK: 'bg-red-100 text-red-700',
  REGISTER_USER: 'bg-purple-100 text-purple-700',
  DELETE_USER: 'bg-red-100 text-red-700',
};

const RecentActivityTable = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 text-sm">
        No recent activity found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-400 font-mono">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                {log.userEmail}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${ACTION_COLORS[log.action] || 'bg-gray-100 text-gray-600'}`}>
                  {log.action?.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="px-6 py-3 text-xs text-gray-500 max-w-xs truncate" title={log.details}>
                {log.details || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
