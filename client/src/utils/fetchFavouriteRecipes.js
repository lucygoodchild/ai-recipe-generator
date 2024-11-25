import { toast } from "react-toastify";

const dotenv = require("dotenv");
dotenv.config({ path: "../../.env.local" });

export const fetchFavouriteRecipes = async (userId) => {
  try {
    const response = await fetch(`/api/v1/favourite-recipes?userId=${userId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch favourite recipes: Status ${response.status}`
      );
    }
    let recipes = await response.json();
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

// const mockResponse = {
//   status: "success",
//   data: [
//     {
//       _id: "672356d5f39b58862c3d7820",
//       title: "Garlic Parmesan Pasta",
//       ingredients: [
//         "Pasta - 8 oz",
//         "Garlic - 3 cloves, minced",
//         "Parmesan cheese - 1/2 cup, grated",
//         "Butter - 2 tbsp",
//         "Red pepper flakes - 1/4 tsp",
//       ],
//       instructions: [
//         "Cook pasta according to package instructions. Drain and set aside.",
//         "In a pan, melt butter over medium heat. Add minced garlic and sauté until fragrant.",
//         "Add cooked pasta to the pan and toss to coat with the garlic butter mixture.",
//         "Sprinkle grated Parmesan cheese, red pepper flakes, and salt to taste. Toss well until cheese is melted.",
//         "Serve hot with extra Parmesan cheese on top.",
//       ],
//       userId: "67221f86ef56215ac4c97461",
//       __v: 0,
//     },
//     {
//       _id: "67235a4df39b58862c3d782d",
//       title: "Jam and Cheese Sandwich",
//       ingredients: [
//         "2 slices bread",
//         "2 tbsp strawberry jam",
//         "1/2 cup cheese",
//       ],
//       instructions: [
//         "Spread jam on one slice of bread.",
//         "Place cheese on top of the jam.",
//         "Cover with the other slice of bread to make a sandwich.",
//         "Optional: Grill the sandwich for a melty, gooey treat. Enjoy!",
//       ],
//       userId: "67221f86ef56215ac4c97461",
//       __v: 0,
//     },
//   ],
// };
