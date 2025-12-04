import React, { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { checkUserAuth } from "../../utils/checkUserAuth";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkUserAuth();
      console.log("checking auth", result);
      if (result.isLoggedIn) {
        setIsLoggedIn(true);
        setUserId(result.user._id);
        console.log("User ID:", result.user._id);
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    verifyAuth();
  }, []);

  const logout = async () => {
    try {
      // Call server logout endpoint to properly invalidate session
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/v1/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      // Clear client-side state regardless of server response
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      setUserId(null);
    } catch (error) {
      // Even if server call fails, clear client-side state
      console.error('Logout error:', error);
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      setUserId(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logout, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
