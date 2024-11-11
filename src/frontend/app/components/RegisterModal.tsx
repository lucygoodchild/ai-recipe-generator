import Button from "./Button";
import Input from "./Input";
import "./RegisterModal.css";

interface RegisterModalProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLFormElement>;
  onNameChange: React.ChangeEventHandler<HTMLInputElement>;
  onNameBlur: React.ChangeEventHandler<HTMLInputElement>;
  onEmailBlur: React.ChangeEventHandler<HTMLInputElement>;
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  onPasswordConfirmChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | null;
  nameError: string | null;
  emailError: string | null;
  passwordError: string | null;
  passwordConfirmError: string | null;
}

const RegisterModal = ({
  onClick,
  onSubmit,
  onNameBlur,
  onNameChange,
  onEmailBlur,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  error,
  nameError,
  emailError,
  passwordError,
  passwordConfirmError,
}: RegisterModalProps) => {
  return (
    <div className="register-page">
      <div className="form">
        <form className="register-form" onSubmit={onSubmit}>
          <Input
            id="register-form-name-input"
            type="text"
            onChange={onNameChange}
            placeHolderText="name"
            onBlur={onNameBlur}
          ></Input>
          {nameError && <p className="error">{nameError}</p>}
          <Input
            id="register-form-email-input"
            type="email"
            onChange={onEmailChange}
            placeHolderText="email address"
            onBlur={onEmailBlur}
            autoComplete="username"
          ></Input>
          {emailError && <p className="error">{emailError}</p>}
          <Input
            id="register-form-password-input"
            type="password"
            onChange={onPasswordChange}
            placeHolderText="password"
            autoComplete="new-password"
          ></Input>
          <Input
            id="register-form-confirmPassword-input"
            type="password"
            onChange={onPasswordConfirmChange}
            placeHolderText="confirm password"
            autoComplete="new-password"
          ></Input>
          {passwordConfirmError && (
            <p className="error">{passwordConfirmError}</p>
          )}
          <Button
            onClick={onClick}
            text="register"
            disabled={
              !!emailError ||
              !!passwordError ||
              !!nameError ||
              !!passwordConfirmError
            }
          ></Button>
          {error && <p className="error">{error}</p>}
          <p className="message">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
