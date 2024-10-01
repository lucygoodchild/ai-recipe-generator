import {
  clearItemsFromLocalStorage,
  getItemsFromLocalStorage,
} from "./localStorageHelpers";

export const syncItemsFromLocalStorageWithDB = async (userId) => {
  const items = getItemsFromLocalStorage();

  items.forEach((item) => {
    item.userId = userId;
  });

  // Send items to backend
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: items }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Syncing data failed");
    }

    // Clear local storage after syncing
    clearItemsFromLocalStorage();
  } catch (error) {
    console.error("Failed to sync items with backend", error);
  }
};
