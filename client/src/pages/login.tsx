import React from "react";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../utils/loginUser";
import { AuthContext } from "../app/contexts/authContext";
import LoginModal from "../app/components/LoginModal";
import LoadingSpinner from "../app/components/LoadingSpinner";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserId } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    }
  }, [isLoggedIn, router]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("An email address is required");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(null); // Clear the error if the email is valid
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleForgotPasswordClick = () => {
    router.push("/forgotPassword");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    const loginResponse = await loginUser(email, password);
    if (loginResponse instanceof Error) {
      setError(loginResponse.toString().split(":")[1].toString());
    } else {
      setIsLoggedIn(true);
      setUserId(loginResponse.user._id);
      router.push("/home");
    }

    setLoading(false);
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <LoginModal
      onEmailBlur={handleEmailBlur}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onForgotPasswordClick={handleForgotPasswordClick}
      onSubmit={handleSubmit}
      error={error}
      passwordError={passwordError}
      emailError={emailError}
      onClick={handleSubmit}
    ></LoginModal>
  );
};

export default LoginPage;
