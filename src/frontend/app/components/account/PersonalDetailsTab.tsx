import React, { useContext, useEffect, useState } from "react";
import "./PersonalDetailsTab.css";
import Input from "../Input";
import Button from "../Button";
import { AuthContext } from "../../contexts/authContext";
import { fetchUsersPersonalDetails } from "./../../../utils/fetchPersonalDetails";
import {
  updateName,
  updateEmail,
} from "./../../../utils/updatePersonalDetails";
import LoadingSpinner from "../LoadingSpinner";

const PersonalDetailsTab = () => {
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: "name",
    email: "email",
  });
  const [disableUpdateNameButton, setDisableUpdateNameButton] = useState(false);
  const [disableUpdateEmailButton, setDisableUpdateEmailButton] =
    useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalDetails = async (userId: string | null) => {
      try {
        const personalDetails = await fetchUsersPersonalDetails(userId);
        setPersonalDetails({
          ...personalDetails,
          name: personalDetails.name,
          email: personalDetails.email,
        });
      } catch (e) {}
    };

    setLoading(true);
    fetchPersonalDetails(userId);
    setLoading(false);
  }, [userId]);

  const handleUpdateNameClick = async () => {
    try {
      await updateName(personalDetails.name, userId);
    } catch (e) {}
  };

  const handleUpdateEmailClick = async () => {
    try {
      await updateEmail(personalDetails.email, userId);
    } catch (e) {}
  };

  const handleNameChange = (e: { target: { value: any } }) => {
    setPersonalDetails({ ...personalDetails, name: e.target.value });
  };

  const handleEmailChange = (e: { target: { value: any } }) => {
    setPersonalDetails({ ...personalDetails, email: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailBlur = () => {
    if (!personalDetails.email) {
      setDisableUpdateEmailButton(true);
      setNameError("Please enter an email address");
    } else if (!validateEmail(personalDetails.email)) {
      setDisableUpdateEmailButton(true);
      setEmailError("Please enter a valid email address");
    } else {
      setDisableUpdateEmailButton(false);
    }
  };

  const handleNameBlur = () => {
    if (!personalDetails.name) {
      setDisableUpdateNameButton(true);
      setNameError("Please enter a name");
    } else {
      setDisableUpdateNameButton(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="personal-details-content">
      <h5> Update your name</h5>
      <div className="details">
        <Input
          id="personal-details-name-input"
          onChange={handleNameChange}
          placeHolderText={personalDetails.name}
          onBlur={handleNameBlur}
          type="text"
        ></Input>
        {emailError && <p className="error">{nameError}</p>}
        <Button
          onClick={handleUpdateNameClick}
          text="update"
          disabled={disableUpdateNameButton}
        ></Button>
      </div>
      <h5> Update your email</h5>
      <div className="details">
        <Input
          id="personal-details-email-input"
          onChange={handleEmailChange}
          placeHolderText={personalDetails.email}
          onBlur={handleEmailBlur}
          type="email"
        ></Input>
        {emailError && <p className="error">{emailError}</p>}
        <Button
          onClick={handleUpdateEmailClick}
          text="update"
          disabled={disableUpdateEmailButton}
        ></Button>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;
