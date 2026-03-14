import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/dashboard`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/stats`, getAuthHeaders());
  return response.data;
};

export const getAdminStats = async () => {
  const response = await axios.get(`${API_URL}/admin-stats`, getAuthHeaders());
  return response.data;
};

export const getRecentActivity = async () => {
  const response = await axios.get(`${API_URL}/recent-activity`, getAuthHeaders());
  return response.data;
};
