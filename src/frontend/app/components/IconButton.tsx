import React from "react";
import "./IconButton.css";

interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
}

function IconButton({
  onClick,
  onMouseOver,
  onMouseOut,
  disabled,
  children,
}: IconButtonProps) {
  return (
    <div className="button-container">
      <button
        className="icon-button"
        type="submit"
        onClick={onClick}
        disabled={disabled}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {children}
      </button>
    </div>
  );
}

export default IconButton;
