import React, { useState } from "react";
import RegisterModal from "../app/components/RegisterModal";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../app/components/LoadingSpinner";
import { registerUser } from "./../utils/registerUser";
import "./../styles/global.css";
import "./register.css";

interface RegisterPageProps {}

const RegisterPage = ({}: RegisterPageProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateName = (name: string): boolean => {
    return name !== "";
  };

  const validatePasswords = (
    password: string,
    passwordConfirm: string
  ): boolean => {
    return password === passwordConfirm;
  };

  const checkPasswordLength = (password: string): boolean => {
    return password.length >= 8;
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    setError(null);
  };

  const handleNameBlur = () => {
    if (!name) {
      setNameError("A name is required");
    } else if (!validateName(name)) {
      setNameError("Please enter a valid name");
    } else {
      setNameError(null); // Clear the error if the name is valid
    }
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
    if (!checkPasswordLength(e.target.value)) {
      setPasswordConfirmError("Password must be 8 or more characters");
    } else if (!validatePasswords(passwordConfirm, e.target.value)) {
      setPasswordConfirmError("Passwords are not the same");
    } else {
      setPasswordConfirmError(null);
    }
    setError(null);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    if (!checkPasswordLength(e.target.value)) {
      setPasswordConfirmError("Password must be 8 or more characters");
    } else if (!validatePasswords(password, e.target.value)) {
      setPasswordConfirmError("Passwords are not the same");
    } else {
      setPasswordConfirmError(null);
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmError(null);
    setError(null);

    const registerResponse = await registerUser(
      name,
      email,
      password,
      passwordConfirm
    );
    if (registerResponse instanceof Error) {
      setError(registerResponse.toString().split(":")[1].toString());
    } else {
      router.push("/home"); //redirect user on successful registration
    }

    setLoading(false);
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <RegisterModal
      onEmailBlur={handleEmailBlur}
      onEmailChange={handleEmailChange}
      onNameBlur={handleNameBlur}
      onNameChange={handleNameChange}
      onPasswordChange={handlePasswordChange}
      onPasswordConfirmChange={handlePasswordConfirmChange}
      onSubmit={handleSubmit}
      error={error}
      nameError={nameError}
      passwordError={passwordError}
      passwordConfirmError={passwordConfirmError}
      emailError={emailError}
      onClick={handleSubmit}
    ></RegisterModal>
  );
};

export default RegisterPage;
