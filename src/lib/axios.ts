import axios from 'axios';

// Create axios instance with base configuration
// We rely on same-origin requests, so no hard-coded baseURL is needed
var apiClient = axios.create({
  timeout: 10000,
});

// Response interceptor to handle authentication errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      var currentPathWithQuery = `${window.location.pathname}${window.location.search}`;
      if (!currentPathWithQuery.startsWith('/login')) {
        window.location.href = `/login?returnUrl=${encodeURIComponent(currentPathWithQuery)}`;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
