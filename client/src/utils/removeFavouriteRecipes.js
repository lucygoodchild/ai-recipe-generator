import { toast } from "react-toastify";

export const removeFavouriteRecipes = async (recipeId, userId) => {
  try {
    const response = await fetch(
      `/api/v1/favourites/${recipeId}?userId=${userId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error removing recipe from favourites: Status ${response.status}`
      );
    }

    await response.json();
    toast.success("Recipe removed from favourites");
    return true;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong. Please try again!`);
    return false;
  }
};
