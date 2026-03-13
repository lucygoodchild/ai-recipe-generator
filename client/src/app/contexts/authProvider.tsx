"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./authContext";
import { checkUserAuth } from "../../utils/checkUserAuth";
import { logoutUser } from "../../utils/logoutUser";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userId: null,
    isLoading: true,
    error: null,
  });

  // Check authentication status on mount and after refresh
  const checkAuth = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Check if user is authenticated
      const authData = await checkUserAuth();

      if (authData && authData.userId) {
        setAuthState({
          isLoggedIn: true,
          userId: authData.userId,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          isLoggedIn: false,
          userId: null,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthState({
        isLoggedIn: false,
        userId: null,
        isLoading: false,
        error: "Failed to verify authentication",
      });
    }
  }, []);

  // Check auth on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const setIsLoggedIn = useCallback((value: boolean) => {
    setAuthState((prev) => ({ ...prev, isLoggedIn: value }));
  }, []);

  const setUserId = useCallback((id: string | null) => {
    setAuthState((prev) => ({ ...prev, userId: id }));
  }, []);

  const logout = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Call logout utility
      await logoutUser();

      // Clear client-side state
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setAuthState({
        isLoggedIn: false,
        userId: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear client state even if server logout fails
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setAuthState({
        isLoggedIn: false,
        userId: null,
        isLoading: false,
        error: "Logout failed, but session cleared",
      });
    }
  }, []);

  const login = useCallback(async (userId: string) => {
    setAuthState({
      isLoggedIn: true,
      userId,
      isLoading: false,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        setIsLoggedIn,
        logout,
        userId: authState.userId,
        setUserId,
        isLoading: authState.isLoading,
        error: authState.error,
        checkAuth,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
