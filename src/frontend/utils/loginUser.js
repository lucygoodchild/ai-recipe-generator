import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "./../.env.local" });

export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    toast.success("Logged in successfully!");
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong logging in. Please try again!`);
    return err;
  }
};
