import { toast } from "react-toastify";

export const updateItem = async (itemId, quantity, measurement, userId) => {
  try {
    const response = await fetch(`/api/v1/items/${itemId}?userId=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        measurement: measurement,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error updating item: Status ${response.status}`);
    }

    const data = await response.json();
    toast.success(`${data.data.item.name} updated successfully!`);
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong. Please try again!`);
    return null;
  }
};
