import { toast } from "react-toastify";

export const updateName = async (name, userId) => {
  try {
    const response = await fetch(`/api/v1/users/update-me?userId=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error updating: Status ${response.status}`);
    }

    const data = await response.json();
    toast.success(`Name updated successfully!`);
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong. Please try again!`);
    return null;
  }
};

export const updateEmail = async (email, userId) => {
  try {
    const response = await fetch(`/api/v1/users/update-me?userId=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error updating: Status ${response.status}`);
    }

    const data = await response.json();
    toast.success(`Email updated successfully!`);
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong. Please try again!`);
    return null;
  }
};
