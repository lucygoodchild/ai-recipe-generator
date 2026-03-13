import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../contexts/authContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for client-side hydration
    setIsChecking(false);

    if (!isLoggedIn) {
      // Use window.location for a full page reload with proper CSS
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  if (isChecking || !isLoggedIn) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
