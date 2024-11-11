import Button from "./Button";
import Input from "./Input";
import "./LoginModal.css";

interface LoginModalProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLFormElement>;
  onEmailBlur: React.ChangeEventHandler<HTMLInputElement>;
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  onForgotPasswordClick: React.MouseEventHandler<HTMLAnchorElement>;
  error: string | null;
  emailError: string | null;
  passwordError: string | null;
}

const LoginModal = ({
  onClick,
  onSubmit,
  onEmailBlur,
  onEmailChange,
  onPasswordChange,
  onForgotPasswordClick,
  error,
  emailError,
  passwordError,
}: LoginModalProps) => {
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={onSubmit}>
          <Input
            id="login-form-email-input"
            type="email"
            onChange={onEmailChange}
            placeHolderText="email address"
            onBlur={onEmailBlur}
            autoComplete="username"
          ></Input>
          {emailError && <p className="error">{emailError}</p>}
          <Input
            id="login-form-password-input"
            type="password"
            onChange={onPasswordChange}
            placeHolderText="password"
            autoComplete="current-password"
          ></Input>
          {passwordError && <p className="error">{passwordError}</p>}
          <Button
            onClick={onClick}
            text="login"
            disabled={!!emailError || !!passwordError}
          ></Button>
          {error && <p className="error">{error}</p>}
          <p className="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
          <p className="message">
            Forgot password?{" "}
            <a href="#" onClick={onForgotPasswordClick}>
              Click here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
