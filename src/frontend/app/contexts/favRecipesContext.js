import React, { createContext, useState, useContext } from "react";

const FavouriteRecipesContext = createContext();

export const FavouriteRecipesProvider = ({ children }) => {
  // Initialize state with an empty array
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // Function to add a recipe
  const addFavRecipe = (recipe) => {
    setFavoriteRecipes((prevRecipes) => {
      // Ensure prevRecipes is always an array
      if (!Array.isArray(prevRecipes)) {
        console.error("prevRecipes is not an array:", prevRecipes);
        return [recipe];
      }
      return [...prevRecipes, recipe];
    });
  };

  // Function to remove a recipe by ID
  const removeFavRecipe = (id) => {
    setFavoriteRecipes((prevRecipes) => {
      if (!Array.isArray(prevRecipes)) {
        console.error("prevRecipes is not an array:", prevRecipes);
        return [];
      }
      return prevRecipes.filter((recipe) => recipe.id !== id);
    });
  };

  // Function to set the entire list of recipes
  const setFavRecipes = (recipes) => {
    if (!Array.isArray(recipes)) {
      console.error("setFavRecipes expects an array:", recipes);
      return;
    }
    setFavoriteRecipes(recipes);
  };

  return (
    <FavouriteRecipesContext.Provider
      value={{ favoriteRecipes, addFavRecipe, removeFavRecipe, setFavRecipes }}
    >
      {children}
    </FavouriteRecipesContext.Provider>
  );
};

// Custom hook for using the context
export const useFavouriteRecipes = () => {
  return useContext(FavouriteRecipesContext);
};
