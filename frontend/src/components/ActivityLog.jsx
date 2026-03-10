import React, { useState, useEffect } from 'react';
import { fetchLogs } from '../services/logs';

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLogs = async () => {
            try {
                const data = await fetchLogs();
                setLogs(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getLogs();
    }, []);

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading activity logs...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg border border-red-200">{error}</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">System Activity Logs</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Recent actions performed across the application.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No activity logs found.</td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {log.userEmail}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {log.resource}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" title={log.details}>
                                        {log.details || '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityLog;
