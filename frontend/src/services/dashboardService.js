import axios from 'axios';

// Assuming the base URL is configured globally or from env, 
// using a relative path like /api if there's a proxy, or hardcoded for development
const API_URL = 'http://localhost:5000/api/dashboard';

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
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
