import React, { forwardRef } from "react";
import "./Input.css";

interface InputProps {
  id: string;
  placeHolderText: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      placeHolderText,
      type,
      onChange,
      onBlur,
      autoComplete,
      onFocus,
      readonly,
    },
    ref,
  ) => {
    return (
      <input
        type={type}
        id={id}
        placeholder={placeHolderText}
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
        autoComplete={autoComplete}
        onFocus={onFocus}
        readOnly={readonly}
      ></input>
    );
  },
);

export default Input;
