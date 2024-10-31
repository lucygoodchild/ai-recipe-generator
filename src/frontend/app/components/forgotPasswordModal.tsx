import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import Input from "./Input";
import "./forgotPasswordModal.css";
import router from "next/router";

interface ForgotPasswordModalProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLFormElement>;
  onEmailBlur: React.ChangeEventHandler<HTMLInputElement>;
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | null;
  emailError: string | null;
}

const ForgotPasswordModal = ({
  onClick,
  onSubmit,
  onEmailBlur,
  onEmailChange,
  error,
  emailError,
}: ForgotPasswordModalProps) => {
  const onButtonClose = () => {
    router.push("/login");
  };
  return (
    <div className="forgot-password-popup">
      <div className="forgot-password-form">
        <button className="close-button" onClick={onButtonClose}>
          <IoMdClose />
        </button>
        <form className="form" onSubmit={onSubmit}>
          <Input
            id="forgot-password-email-input"
            type="email"
            onChange={onEmailChange}
            placeHolderText="email address"
            onBlur={onEmailBlur}
          ></Input>
          {emailError && <p className="error">{emailError}</p>}
          <Button
            onClick={onClick}
            text="Reset password"
            disabled={!!emailError || !!error}
          ></Button>
          {error && <p className="error">{error}</p>}
          <p className="message">
            Remembered your password? <a href="/login">Login</a>
          </p>
          <p className="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
