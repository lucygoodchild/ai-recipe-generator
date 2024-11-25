import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "./../.env.local" });

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/users/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Forgot password failed");
    }

    const data = await response.json();
    toast.success("A password reset link has been sent to your email!");
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong. Please try again!`);
    return err;
  }
};
