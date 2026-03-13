const dotenv = require("dotenv");
dotenv.config({ path: "../../.env.local" });

export const fetchFavouriteRecipes = async (userId) => {
  try {
    const response = await fetch(`/api/v1/favourite-recipes?userId=${userId}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch favourite recipes: Status ${response.status}`,
      );
    }
    let recipes = await response.json();
    return Array.isArray(recipes.data) ? recipes.data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
