import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PersonalDetailsTab from "../app/components/account/PersonalDetailsTab";
import ChangePasswordTab from "../app/components/account/ChangePasswordTab";
import DeleteAccountTab from "../app/components/account/DeleteAccountTab";
import "./account.css";

const Account = () => {
  const [activeTab, setActiveTab] = useState("personal-details");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal-details":
        return <PersonalDetailsTab></PersonalDetailsTab>;
      case "change-password":
        return <ChangePasswordTab></ChangePasswordTab>;
      case "delete-account":
        return <DeleteAccountTab></DeleteAccountTab>;
      default:
        return null;
    }
  };

  return (
    <div className="account-page">
      <h1>Account Settings</h1>
      <h4>Update your details below</h4>
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={activeTab === "personal-details" ? "active" : ""}
            onClick={() => {
              if (activeTab !== "personal-details") {
                setActiveTab("personal-details");
              } else {
                setActiveTab("");
              }
            }}
          >
            <IoIosArrowDown />
            <h2>personal details</h2>
          </button>
          {activeTab === "personal-details" && (
            <div className="tab-content">{renderTabContent()}</div>
          )}
          <button
            className={activeTab === "change-password" ? "active" : ""}
            onClick={() => {
              if (activeTab !== "change-password") {
                setActiveTab("change-password");
              } else {
                setActiveTab("");
              }
            }}
          >
            <IoIosArrowDown />
            <h2>change password</h2>
          </button>
          {activeTab === "change-password" && (
            <div className="tab-content">{renderTabContent()}</div>
          )}
          <button
            className={activeTab === "delete-account" ? "active" : ""}
            onClick={() => {
              if (activeTab !== "delete-account") {
                setActiveTab("delete-account");
              } else {
                setActiveTab("");
              }
            }}
          >
            <IoIosArrowDown />
            <h2>delete account</h2>
          </button>
          {activeTab === "delete-account" && (
            <div className="tab-content">{renderTabContent()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
