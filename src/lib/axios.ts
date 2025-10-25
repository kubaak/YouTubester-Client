import axios from 'axios';
import { authService } from '../services/auth';

// Create axios instance with base configuration
var apiClient = axios.create({
  baseURL: 'http://localhost:5094',
  timeout: 10000,
});

// Request interceptor to add authentication token
apiClient.interceptors.request.use(
  (config) => {
    var token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401) {
      // Clear authentication data
      authService.clearAuth();
      
      // Redirect to login page if not already there
      var currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;