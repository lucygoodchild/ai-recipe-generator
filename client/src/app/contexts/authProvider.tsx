import React, { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Checking JWT token in cookies...");
    const token = getJwtTokenFromCookies();
    console.log("JWT token found:", token); // Debugging log
    if (token) {
      try {
        const decodedToken: { id: string; exp: number } = jwtDecode(token);
        console.log("Decoded JWT token:", decodedToken);

        if (decodedToken.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
          setUserId(decodedToken.id);
        } else {
          console.warn("JWT token has expired");
          logout();
        }
      } catch (error) {
        console.error("Invalid JWT token:", error);
        logout();
      }
    }
  }, []);

  const getJwtTokenFromCookies = () => {
    const cookieString = document.cookie || "";
    return cookieString
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
  };

  const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
