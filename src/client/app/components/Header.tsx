import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useRouter } from "next/navigation";
import Button from "./Button";
import "./Header.css";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [showButton, setShowButton] = useState(true);
  const [buttonText, setButtonText] = useState("Login");
  const [onHomePath, setOnHomePath] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    setOnHomePath(path === "/home");

    if (path === "/home" && !isLoggedIn) {
      setShowButton(true);
      setButtonText("Login");
    } else if (path === "/home" && isLoggedIn) {
      setShowButton(false);
    } else {
      setShowButton(true);
      setButtonText("Back");
    }
  }, [isLoggedIn, router]);

  const handleButtonClick = () => {
    if (onHomePath) {
      window.location.href = "/login";
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="header">
      {showButton && (
        <Button bgColour="blue" text={buttonText} onClick={handleButtonClick} />
      )}
    </div>
  );
};

export default Header;
