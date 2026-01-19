import React, { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { checkUserAuth } from "../../utils/checkUserAuth";
import { logoutUser } from "../../utils/logoutUser";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const logout = async () => {
    logoutUser();

    // Clear client-side state regardless of server response
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
