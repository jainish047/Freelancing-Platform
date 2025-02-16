// contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { getSelfDetails } from "../API/user";

// Create the context
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching user

  // Function to log in the user
  const login = async () => {
    // Fetch user details with the provided token
    try {
      const response = await getSelfDetails();
      setUser(response.data); // Store user details
    } catch (error) {
      console.error("Login error:", error);
      localStorage.removeItem("token"); // Remove invalid token
      setUser(null); // Clear user state
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setUser(null); // Clear user data
  };

  // On initial load, fetch user details if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Fetch user details
      login();
      // axios
      //   .get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
      //   .then((response) => {
      //     setUser(response.data); // Store user details
      //   })
      //   .catch(() => {
      //     localStorage.removeItem('token'); // Remove invalid token
      //   })
      //   .finally(() => {
      //     setIsLoading(false); // Stop loading
      //   });
    } else {
      setIsLoading(false); // No token, stop loading
    }
  }, []);

  // Return loading screen while fetching user details
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your custom loading spinner
  }

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use UserContext easily
export const useUser = () => React.useContext(UserContext);