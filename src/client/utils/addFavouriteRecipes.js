import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "./../../.env.local" });

export const addFavouriteRecipes = async (recipe, userId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/favourite-recipes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...recipe, userId }),
      }
    );

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
