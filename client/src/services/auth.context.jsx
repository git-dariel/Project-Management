import React, { createContext, useContext, useState, useEffect } from "react";
import userService from "@/services/user.service";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        userService.setAuthToken(token); // Ensure the token is set for axios
        try {
          await userService.currentUser(); // Attempt to fetch the current user
          setIsLoggedIn(true); // Valid token and user exists
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token"); // Remove invalid token
          setIsLoggedIn(false); // Invalid token or user does not exist
        }
      }
      setIsLoading(false);
    };

    checkCurrentUser();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await userService.loginUser(credentials);
      if (data && data.accessToken) {
        localStorage.setItem("token", data.accessToken); // Store token upon successful login
        userService.setAuthToken(data.accessToken); // Set the token for axios headers
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    userService.setAuthToken(null); // Clear the token from axios headers
    localStorage.removeItem("token"); // Remove token from storage
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
