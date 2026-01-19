import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import Input from "../Input";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import "./DeleteAccountTab.css";

const DeleteAccountTab = () => {
  const [loading, setLoading] = useState(false);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="personal-details-content">
      <h5 className="delete-account-text">
        {" "}
        Enter your current password to delete your account
      </h5>
      <Input
        id="delete-account-password-input"
        onChange={() => {}}
        placeHolderText="current password"
        onBlur={() => {}}
        type="password"
        autoComplete="current-password"
      ></Input>
      <div className="delete-account-btn">
        <Button onClick={() => {}} text="delete account"></Button>
      </div>
    </div>
  );
};

export default DeleteAccountTab;
