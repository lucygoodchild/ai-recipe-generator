export const fetchRecipes = async (itemObject, setRecipesOutput, setError) => {
  const items = [
    ...itemObject.cupboardItems.map((item) =>
      `${item.name} ${item.quantity}  ${item.measurement}`.trimEnd()
    ),
    ...itemObject.fridgeItems.map((item) =>
      `${item.name} ${item.quantity}  ${item.measurement}`.trimEnd()
    ),
    ...itemObject.freezerItems.map((item) =>
      `${item.name} ${item.quantity}  ${item.measurement}`.trimEnd()
    ),
  ];

  console.log(items);

  try {
    const response = await fetch("/api/generateRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes. Status ${response.status}`);
    }

    const data = await response.json();
    const parseData = JSON.parse(data);
    const dataToReturn = Object.values(parseData);

    // Check if data is an array and has the correct structure
    if (Array.isArray(dataToReturn[0])) {
      setRecipesOutput(dataToReturn[0]);
    } else {
      console.error("Error: incorrect format of recipes.");
      setError("Error generating recipes. Please try again.");
    }
  } catch (error) {
    console.error(error);
    setError("Error generating recipes. Please try again.");
  }
};
