import axios from 'axios';

/**
 * Configure base API settings for axios
 * - Sets baseURL for all requests
 * - Sets default headers
 * - Sets timeout
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000 // 30 seconds
});

/**
 * Request interceptor for API calls
 * - Adds Authorization header with JWT token if available
 * - Can be extended to add other headers or perform actions before request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for API calls
 * - Handles global response processing
 * - Handles authentication errors (401)
 * - Normalizes error responses
 */
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx
    // Return just the data portion of the response by default
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized errors globally
    if (error.response && error.response.status === 401) {
      // Clear any stored authentication data
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRole');
      
      // Dispatch a logout event that can be caught elsewhere in the app
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      
      // Optional: Redirect to login page
      // window.location.href = '/login';
    }
    
    // Normalize error object for consistent error handling
    return Promise.reject({
      message: error.response?.data?.message || error.message || 'Unknown error occurred',
      status: error.response?.status,
      data: error.response?.data,
      originalError: error
    });
  }
);

/**
 * Create a new instance with custom config
 * @param {Object} customConfig - Custom axios config
 * @returns {AxiosInstance} - New axios instance with custom config
 */
export const createApiClient = (customConfig = {}) => {
  return axios.create({
    ...api.defaults,
    ...customConfig
  });
};

/**
 * Get full API URL for a given endpoint
 * @param {String} endpoint - API endpoint
 * @returns {String} - Full API URL
 */
export const getApiUrl = (endpoint) => {
  const baseURL = api.defaults.baseURL;
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseURL}${formattedEndpoint}`;
};

export default api;