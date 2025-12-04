import React, { createContext, useState, useContext, type ReactNode } from "react";

// Type definitions
export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  cuisine?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface FavouriteRecipesContextType {
  favouriteRecipes: Recipe[];
  addFavRecipe: (recipe: Recipe) => void;
  removeFavRecipe: (id: string) => void;
  setFavRecipes: (recipes: Recipe[]) => void;
  isRecipeFavourite: (id: string) => boolean;
  favouriteRecipesCount: number;
}

interface FavouriteRecipesProviderProps {
  children: ReactNode;
}

const FavouriteRecipesContext = createContext<FavouriteRecipesContextType | undefined>(undefined);

export const FavouriteRecipesProvider: React.FC<FavouriteRecipesProviderProps> = ({ children }) => {
  // Initialize state with an empty array
  const [favouriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  // Function to add a recipe
  const addFavRecipe = (recipe: Recipe): void => {
    setFavoriteRecipes((prevRecipes) => {
      // Ensure prevRecipes is always an array
      if (!Array.isArray(prevRecipes)) {
        console.error("prevRecipes is not an array:", prevRecipes);
        return [recipe];
      }

      // Check if recipe already exists to prevent duplicates
      const recipeExists = prevRecipes.some(existingRecipe => existingRecipe.id === recipe.id);
      if (recipeExists) {
        console.warn(`Recipe with id ${recipe.id} is already in favourites`);
        return prevRecipes;
      }

      return [...prevRecipes, recipe];
    });
  };

  // Function to remove a recipe by ID
  const removeFavRecipe = (id: string): void => {
    setFavoriteRecipes((prevRecipes) => {
      if (!Array.isArray(prevRecipes)) {
        console.error("prevRecipes is not an array:", prevRecipes);
        return [];
      }
      return prevRecipes.filter((recipe) => recipe.id !== id);
    });
  };

  // Function to set the entire list of recipes
  const setFavRecipes = (recipes: Recipe[]): void => {
    if (!Array.isArray(recipes)) {
      console.error("setFavRecipes expects an array:", recipes);
      return;
    }
    setFavoriteRecipes(recipes);
  };

  // Helper function to check if a recipe is favourited
  const isRecipeFavourite = (id: string): boolean => {
    return favouriteRecipes.some(recipe => recipe.id === id);
  };

  // Get the count of favourite recipes
  const favouriteRecipesCount = favouriteRecipes.length;

  const contextValue: FavouriteRecipesContextType = {
    favouriteRecipes,
    addFavRecipe,
    removeFavRecipe,
    setFavRecipes,
    isRecipeFavourite,
    favouriteRecipesCount,
  };

  return (
    <FavouriteRecipesContext.Provider value={contextValue}>
      {children}
    </FavouriteRecipesContext.Provider>
  );
};

// Custom hook for using the context with proper error handling
export const useFavouriteRecipes = (): FavouriteRecipesContextType => {
  const context = useContext(FavouriteRecipesContext);

  if (context === undefined) {
    throw new Error(
      "useFavouriteRecipes must be used within a FavouriteRecipesProvider"
    );
  }

  return context;
};
