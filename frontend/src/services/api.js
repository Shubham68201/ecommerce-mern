import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
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

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject({
      message,
      status: error.response?.status
    });
  }
);

export default API;