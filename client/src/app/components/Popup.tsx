import React from "react";
import "./Popup.css";

interface PopupProps {
  children: React.ReactNode;
  isOpen: boolean;
}

function Popup({ isOpen, children }: PopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">{children}</div>
    </div>
  );
}

export default Popup;
