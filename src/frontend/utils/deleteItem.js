import { toast } from "react-toastify";

export const deleteItem = async (itemId, userId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/items/${itemId}?userId=${userId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }

    toast.success(`Item deleted successfully!`);
  } catch (error) {
    console.error("Error:", error);
    toast.error(`Uh oh something went wrong. Please try again!`);
  }
};
