import React, { forwardRef } from "react";
import "./Input.css";

interface InputProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeHolderText: string;
  type: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, onChange, placeHolderText, type, onBlur }, ref) => {
    return (
      <input
        type={type}
        id={id}
        placeholder={placeHolderText}
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
      ></input>
    );
  }
);

export default Input;
