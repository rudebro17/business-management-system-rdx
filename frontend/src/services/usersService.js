import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllUsers = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, getAuthHeaders());
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
