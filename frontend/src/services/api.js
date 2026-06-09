const API_URL = import.meta.env.VITE_API_URL || '';
import axios from 'axios';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration / auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized error occurs, clear auth data and redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Dispatch custom event to notify components about logout if needed
      window.dispatchEvent(new Event('auth-unauthorized'));
      
      // We check if we are already on login or register page to avoid infinite redirect loops
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
