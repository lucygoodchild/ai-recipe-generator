import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "./../.env.local" });

export const registerUser = async (name, email, password, passwordConfirm) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, passwordConfirm }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    toast.success("Registered successfully!");
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error("Uh oh registration failed. Please try again!");
    return err;
  }
};
