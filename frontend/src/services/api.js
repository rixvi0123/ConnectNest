// src/services/api.js
import axios from 'axios';

// Determine API URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // For Vercel deployment
    return '/api';
  }
  // For local development
  return 'http://localhost:5001/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 💥 Handle token expiry globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // force redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
