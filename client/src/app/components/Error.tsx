import { IoMdClose } from "react-icons/io";
import "./Error.css";

interface ErrorProps {
  errorText: String;
  onClose: () => void;
}

const Error = ({ errorText, onClose }: ErrorProps) => {
  return (
    <div className="error-pop-up">
      <div className="error-content">
        <button className="close-error-button" onClick={onClose}>
          <IoMdClose />
        </button>
        <div className="error-text">{errorText}</div>
      </div>
    </div>
  );
};

export default Error;
