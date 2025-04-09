import { toast } from "react-toastify";

export const addFavouriteRecipes = async (recipe, userId) => {
  try {
    const response = await fetch(`/api/v1/favourite-recipes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...recipe, userId }),
    });

    if (!response.ok) {
      throw new Error(
        `Error adding recipe to favourites: Status ${response.status}`
      );
    }

    const data = await response.json();
    toast.success("Recipe added to favourites!");
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong. Please try again!`);
  }
};
