import { toast } from "react-toastify";

export const addItem = async (item, collection, userId) => {
  try {
    const response = await fetch(`/api/v1/items/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item,
        quantity: "",
        measurement: "",
        userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    toast.success(`${item} added successfully!`);
    return data.data;
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      toast.error(`An item with this name already exists!`);
    }
    toast.error(`Uh oh something went wrong. Please try again!`);
    return err;
  }
};
