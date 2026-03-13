import { toast } from "react-toastify";

export const logoutUser = async () => {
  try {
    const response = await fetch("/api/v1/users/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    return;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong logging out. Please try again!`);
    return err;
  }
};
