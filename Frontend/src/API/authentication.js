import axios from "axios";
import { api, setAuthToken } from "./axiosConfig";

// Function to handle login (set token after successful login)
const login = async (user) => {
  console.log(user)
  return api
    .post("/auth/login", user)
    .then((response) => {
      const token = response.data.token; // Assume token is in the response body
      localStorage.setItem("authToken", token); // Store token securely in localStorage
      setAuthToken(token); // Set the token in the Axios headers for future requests
      return response;
    })
    .catch((error) => {
      console.error("Login failed:", error);
      throw error;
    });
};

const signin = async (user) => {
  console.log(user)
  return api
    .post("/auth/signin", user)
    .then((responce)=>{
      return responce
    })
    .catch((error)=>{
      return error
    })
}

const resendVerificationEMail = async (email) => {
  console.log(email)
  return api
    .get("/auth/resendVerificationEMail", {email})
    .then((responce)=>{
      return responce
    })
    .catch((error)=>{
      return error
    })
}

// Function to handle token refresh (if needed)
// const refreshToken = () => {
//   const refreshToken = localStorage.getItem('refreshToken'); // Assume you store refresh token too
//   return axios.post('http://localhost:5000/api/refresh-token', { refreshToken })
//     .then((response) => {
//       const newToken = response.data.token;
//       localStorage.setItem('authToken', newToken); // Store new token
//       setAuthToken(newToken); // Update token in Axios headers
//       return response;
//     })
//     .catch((error) => {
//       console.error('Token refresh failed:', error);
//       throw error;
//     });
// };

// Function to check if the user is authenticated
// const checkAuth = () => {
//   const token = localStorage.getItem('authToken');
//   setAuthToken(token); // Set token in Axios headers if it exists
//   return token;
// };

// Function to handle logout (remove token and clear headers)
const logout = () => {
  localStorage.removeItem("authToken"); // Remove the token from localStorage
  //   localStorage.removeItem('refreshToken'); // Optionally remove refresh token too
  setAuthToken(null); // Remove Authorization header from Axios
};

// Example API call to get protected data
// const getProtectedData = () => {
//   return api
//     .get("protected-route") // Assume there's a protected route
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Error accessing protected data:", error);
//       throw error;
//     });
// };

// Check for existing token on app initialization
// checkAuth();

export {
    login,
    signin,
    resendVerificationEMail
}