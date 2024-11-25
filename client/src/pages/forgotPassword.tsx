import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { forgotPassword } from "../utils/forgotPassword";
import LoadingSpinner from "../app/components/LoadingSpinner";
import ForgotPasswordModal from "../app/components/forgotPasswordModal";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError(null);
    setError(null);

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const response = await forgotPassword(email);
    console.log(response);
    if (response instanceof Error) {
      setError(response.toString().split(":")[1].toString());
    } else {
      router.push("/login");
    }

    setLoading(false);
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <ForgotPasswordModal
      onEmailBlur={handleEmailBlur}
      onEmailChange={handleEmailChange}
      onSubmit={handleSubmit}
      error={error}
      emailError={emailError}
      onClick={handleSubmit}
    ></ForgotPasswordModal>
  );
};

export default ForgotPassword;
