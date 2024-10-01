import React from "react";
import "./ToolTip.css";

interface ToolTipProps {
  text: string;
  children: React.ReactNode;
}

const ToolTip = ({ text, children }: ToolTipProps) => {
  return (
    <div className="tooltip">
      <span className="tool-tip-text">{text}</span>
      {children}
    </div>
  );
};

export default ToolTip;
