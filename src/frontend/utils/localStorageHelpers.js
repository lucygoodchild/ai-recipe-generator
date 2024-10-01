// Retrieve items from local storage
export const getItemsFromLocalStorage = () => {
  const items = localStorage.getItem("items");
  return items ? JSON.parse(items) : [];
};

// Store items in local storage
export const saveItemsToLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

export const getSortedItemsFromLocalStorage = () => {
  const items = getItemsFromLocalStorage();
  if (!items) return { fridgeItems: [], cupboardItems: [], freezerItems: [] };

  const fridgeItems = items.filter((item) => item.type === "fridge");
  const cupboardItems = items.filter((item) => item.type === "cupboard");
  const freezerItems = items.filter((item) => item.type === "freezer");

  return { cupboardItems, fridgeItems, freezerItems };
};

// Remove items from local storage
export const clearItemsFromLocalStorage = () => {
  localStorage.removeItem("items");
};

// Add item
export const addItemToLocalStorage = (item) => {
  const newItem = { ...item };

  const items = getItemsFromLocalStorage();
  items.push(newItem);
  saveItemsToLocalStorage(items);

  return newItem;
};

// Edit item
export const editItemFromLocalStorage = (itemId, quantity, measurement) => {
  const items = getItemsFromLocalStorage();
  const itemIndex = items.findIndex((item) => item._id === itemId);

  if (itemIndex > -1) {
    // Update the specific fields
    items[itemIndex] = {
      ...items[itemIndex],
      quantity: quantity,
      measurement: measurement,
    };
    saveItemsToLocalStorage(items);
  }
};

// Delete item
export const deleteItemFromLocalStorage = (name) => {
  const items = getItemsFromLocalStorage();
  const updatedItems = items.filter((item) => name !== item.name);
  saveItemsToLocalStorage(updatedItems);
};
