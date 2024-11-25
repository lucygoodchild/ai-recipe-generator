import { toast } from "react-toastify";

export const fetchItems = async (type, userId) => {
  try {
    const response = await fetch(`/api/v1/items/${type}?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch items: Status ${response.status}`);
    }
    let items = await response.json();
    return items.data;
  } catch (err) {
    console.error(err);
    toast.error(`Failed to fetch ${type} items :(`);
  }
};
