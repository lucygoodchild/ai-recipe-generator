export const fetchRecipes = async (
  itemObject,
  setRecipesOutput,
  setError,
  favouriteRecipes
) => {
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
      // Filter out recipes that already exist in the user's favourites
      /*const filteredRecipes = dataToReturn[0].filter(
        (recipe) =>
          !favouriteRecipes.some(
            (favRecipe) => favRecipe.title === recipe.title
          )
      );*/

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
