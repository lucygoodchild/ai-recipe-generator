import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/authContext";
import {
  FaHome,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./HamburgerMenu.css";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      // Call the logout function
      await logout();

      await router.push("/home");

      if (typeof window !== "undefined") {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Logout error:", error);
      if (typeof window !== "undefined") {
        window.location.href = "/home";
      }
    }
  };

  const baseMenuItems: MenuItem[] = [
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
  ];

  const menuItems: MenuItem[] = isLoggedIn
    ? [
        ...baseMenuItems,
        {
          id: "logout",
          label: "Logout",
          icon: <FaSignOutAlt />,
          action: handleLogout,
        },
      ]
    : baseMenuItems;

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id !== "logout") {
      setIsOpen(false);
    }
    item.action();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const drawer = document.querySelector(".hamburger-drawer");
      const toggle = document.querySelector(".hamburger-toggle");

      if (
        drawer &&
        !drawer.contains(target) &&
        toggle &&
        !toggle.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)} />
      )}

      <div className="hamburger-menu" ref={menuRef}>
        <button
          className="hamburger-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          className={`hamburger-drawer ${isOpen ? "open" : ""}`}
          aria-hidden={!isOpen}
        >
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id} className="menu-item">
                <button
                  className="menu-button"
                  onClick={() => handleMenuItemClick(item)}
                  aria-label={item.label}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
