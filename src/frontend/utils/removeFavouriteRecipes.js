import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "./../../.env.local" });

export const removeFavouriteRecipes = async (recipeId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/favourites/${recipeId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error removing recipe from favourites: Status ${response.status}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    toast.error(`Uh oh something went wrong. Please try again!`);
  }
};
