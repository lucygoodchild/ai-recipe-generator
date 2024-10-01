import React from "react";
import "./Button.css";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: String;
  bgColour?: String;
  disabled?: boolean;
}

function Button({ onClick, text, bgColour, disabled = false }: ButtonProps) {
  const buttonClass = `button ${bgColour || "default-color"}`;
  return (
    <div className="button-container">
      <button
        className={buttonClass}
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        <h3 className="button-text">{text}</h3>
      </button>
    </div>
  );
}

export default Button;
