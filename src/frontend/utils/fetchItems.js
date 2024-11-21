import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "../../../env.local" });

export const fetchItems = async (type, userId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/items/${type}?userId=${userId}`
    );
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
