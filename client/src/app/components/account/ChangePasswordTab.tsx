import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import "./ChangePasswordTab.css";

const ChangePasswordTab = () => {
  const [loading, setLoading] = useState(false);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="personal-details-content">
      <h5> Enter your current password</h5>
      <Input
        id="changePassword-password-input"
        onChange={() => {}}
        placeHolderText="current password"
        onBlur={() => {}}
        type="password"
        autoComplete="current-password"
      ></Input>
      <h5> Enter your new password</h5>
      <Input
        id="changePassword-new-password-input"
        onChange={() => {}}
        placeHolderText="new password"
        onBlur={() => {}}
        type="password"
        autoComplete="new-password"
      ></Input>
      <h5> Confirm your new password</h5>
      <div className="update-password-content">
        <Input
          id="changePassword-confirm-new-password-input"
          onChange={() => {}}
          placeHolderText="confirm new password"
          onBlur={() => {}}
          type="password"
          autoComplete="new-password"
        ></Input>
        <Button onClick={() => {}} text="update password"></Button>
      </div>
    </div>
  );
};

export default ChangePasswordTab;
