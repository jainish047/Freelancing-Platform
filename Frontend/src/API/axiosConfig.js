import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: `https://${process.env.REACT_APP_BACKEND_URL}/api/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Function to set the token in Axios headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization']; // Remove Authorization header if no token
  }
};

// Export functions for use in your app
export {
  api,
  setAuthToken
};
