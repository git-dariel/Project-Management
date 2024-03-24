import React, { createContext, useContext, useState, useEffect } from "react";
import userService from "@/services/user.service";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on page load
  useEffect(() => {
    const checkCurrentUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        userService.setAuthToken(token);
        try {
          await userService.currentUser();
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      }
      setIsLoading(false);
    };

    checkCurrentUser();
  }, []);

  // Login user
  const login = async (credentials) => {
    try {
      const data = await userService.loginUser(credentials);
      if (data && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        userService.setAuthToken(data.accessToken);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
    }
  };

  // Logout user
  const logout = () => {
    userService.setAuthToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
