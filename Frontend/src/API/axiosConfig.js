import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the token in Axios headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization']; // Remove Authorization header if no token
  }
};

// Export functions for use in your app
export {
  api,
  setAuthToken
};
