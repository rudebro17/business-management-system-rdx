import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchLogs = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        const response = await axios.get(`${API_BASE}/logs`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch logs';
    }
};
