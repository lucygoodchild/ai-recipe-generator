import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "./../.env.local" });

export const fetchFavouriteRecipes = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/favourite-recipes`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch favourite recipes: Status ${response.status}`
      );
    }
    let recipes = await response.json();
    return recipes.data;
  } catch (err) {
    console.error(err);
    toast.error(`Failed to fetch favourite recipes :(`);
  }
};
