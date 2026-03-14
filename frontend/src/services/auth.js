import axios from 'axios';

// Uses VITE_API_URL in production (Vercel), falls back to localhost in dev
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE}/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Something went wrong during login';
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
