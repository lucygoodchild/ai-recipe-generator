import React, { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is logged in when the component mounts
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (token) {
      try {
        const decodedToken: { userId: string } = jwtDecode(token);
        setIsLoggedIn(true);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Invalid JWT token:", error);
      }
    }
  };

  const logout = () => {
    // Clear the JWT cookie
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Set isLoggedIn to false
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logout, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
