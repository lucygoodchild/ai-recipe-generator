import React, { useContext } from "react";
import Hamburger from "hamburger-react";
import Dropdown from "react-dropdown";
import router from "next/router";
import "react-dropdown/style.css";
import "./HamburgerMenu.css";
import { AuthContext } from "../contexts/authContext";

const HamburgerMenu = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [showOnLeft, setShowOnLeft] = React.useState(false);
  const { logout } = useContext(AuthContext);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const options = [
    { value: "favourites", label: "Favourites" },
    { value: "account", label: "Account" },
    { value: "logout", label: "Logout" },
  ];

  const paths = (option: any) => {
    switch (option.value) {
      case "favourites":
        return router.push("/favRecipes");
      case "account":
        return router.push("/account");
      case "logout":
        logout();
        return;
      default:
        return router.push("/home");
    }
  };

  const onChange = (option: any) => {
    console.log("Option selected:", option);
    paths(option);
    // Close the hamburger menu after selection
    setOpen(false);
  };

  React.useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const dropdownWidth = 180; // min-width of dropdown
      const spaceOnRight = window.innerWidth - rect.right;

      // If there's not enough space on the right, show on left
      setShowOnLeft(spaceOnRight < dropdownWidth + 16);
    }
  }, [isOpen]);

  return (
    <div className="hamburger-menu-wrapper" ref={wrapperRef}>
      <div className="hamburger-menu-container">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          direction="right"
          rounded
          size={18}
        />
      </div>

      {isOpen && (
        <div className={`dropdown-container ${showOnLeft ? "show-left" : ""}`}>
          <Dropdown
            className="hamburger-dropdown"
            options={options}
            onChange={onChange}
            placeholder="Go to..."
          />
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
