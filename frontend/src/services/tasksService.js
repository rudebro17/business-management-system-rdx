import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getAuthHeaders());
  return response.data;
};

export const getAllTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const getMyTasks = async () => {
  const response = await axios.get(`${API_URL}/my`, getAuthHeaders());
  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status }, getAuthHeaders());
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
