import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import "./Header.css";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <div className="header">
      <HamburgerMenu />
    </div>
  );
};

export default Header;
