// app/components/ProtectedRoute.tsx
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/authContext";
import LoadingSpinner from "./LoadingSpinner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);
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
