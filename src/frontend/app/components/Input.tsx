import React, { forwardRef } from "react";
import "./Input.css";

interface InputProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeHolderText: string;
  type: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, onChange, placeHolderText, type, onBlur, autoComplete }, ref) => {
    return (
      <input
        type={type}
        id={id}
        placeholder={placeHolderText}
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
        autoComplete={autoComplete}
      ></input>
    );
  }
);

export default Input;
