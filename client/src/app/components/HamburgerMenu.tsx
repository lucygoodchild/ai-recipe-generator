import React from "react";
import router from "next/router";
import Hamburger from "hamburger-react";
import { useAuth } from "../contexts/authContext";
import { FaHome, FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./HamburgerMenu.css";

const HamburgerMenu = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [showOnLeft, setShowOnLeft] = React.useState(false);
  const { logout } = useAuth();
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: <FaHome />,
      action: () => router.push("/home"),
    },
    {
      id: "favourites",
      label: "Favourites",
      icon: <FaHeart />,
      action: () => router.push("/favRecipes"),
    },
    {
      id: "account",
      label: "Account",
      icon: <FaUser />,
      action: () => router.push("/account"),
    },
    {
      id: "logout",
      label: "Logout",
      icon: <FaSignOutAlt />,
      action: () => logout(),
    },
  ];

  const handleMenuItemClick = (item: any) => {
    item.action();
    // Close the hamburger menu after selection
    setOpen(false);
  };

  React.useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const isMobile = window.innerWidth <= 769;
      const rect = wrapperRef.current.getBoundingClientRect();

      if (isMobile) {
        const topPosition = rect.bottom + 8;
        document.documentElement.style.setProperty(
          "--menu-top-position",
          `${topPosition}px`,
        );
        setShowOnLeft(false);
      } else {
        const menuWidth = 120;
        const spaceOnRight = window.innerWidth - rect.left;
        setShowOnLeft(spaceOnRight < menuWidth + 16);
      }
    }
  }, [isOpen]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
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
        <div className={`menu-column ${showOnLeft ? "show-left" : ""}`}>
          <div className="menu-tabs">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="menu-tab"
                onClick={() => handleMenuItemClick(item)}
              >
                <div className="menu-tab-icon">{item.icon}</div>
                <span className="menu-tab-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
