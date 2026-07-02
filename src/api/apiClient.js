import axios from 'axios';
import { API_BASE } from './Variables';
import { store } from '../redux/store';
import { logout } from '../redux/userSlice';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to automatically add JWT authorization token
apiClient.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const token = user?.accessToken || user?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Error parsing user from localStorage in request interceptor:', err);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to automatically unwrap the .NET ApiResponse wrapper
apiClient.interceptors.response.use(
  (response) => {
    // Check if the response matches the standard .NET ApiResponse structure
    if (
      response.data &&
      typeof response.data === 'object' &&
      response.data.hasOwnProperty('success') &&
      response.data.hasOwnProperty('data')
    ) {
      // Return the inner unwrapped payload
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Check if the error status is 401 Unauthorized (e.g. token expired/invalid)
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login if not already on the login page
      store.dispatch(logout());
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // If the error response itself is wrapped in ApiResponse, try to extract its error message
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
