import React, { forwardRef } from "react";
import "./Input.css";

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeHolderText: string;
  type: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, placeHolderText, type, onBlur }, ref) => {
    return (
      <input
        type={type}
        id="item-input"
        placeholder={placeHolderText}
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
      ></input>
    );
  }
);

export default Input;
