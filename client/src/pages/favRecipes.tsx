import React, { useEffect, useState } from "react";
import { fetchFavouriteRecipes } from "../utils/fetchFavouriteRecipes";
import { useFavouriteRecipes } from "../app/contexts/favRecipesContext";
import { removeFavouriteRecipes } from "../utils/removeFavouriteRecipes";
import { useAuth } from "../app/contexts/authContext";
import { FaHeart, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import IconButton from "../app/components/IconButton";
import ToolTip from "../app/components/ToolTip";
import Popup from "../app/components/Popup";
import Button from "../app/components/Button";
import "./favRecipes.css";
import { ProtectedRoute } from "../app/components/ProtectedRoute";

interface Recipe {
  _id: string;
  title: string;
  ingredients: [];
  instructions: [];
  userId: string;
}

const FavRecipes = () => {
  const { setFavRecipes, removeFavRecipe, favouriteRecipes } =
    useFavouriteRecipes();
  const { userId, isLoggedIn } = useAuth();
  const [expandedRecipes, setExpandedRecipes] = useState<string[]>([]);
  const [removeRecipePopup, setRemoveRecipePopup] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavRecipes = async () => {
      setIsLoading(true);
      const recipes = await fetchFavouriteRecipes(userId);
      setFavRecipes(recipes);
      setIsLoading(false);
    };
    if (isLoggedIn) fetchFavRecipes();
  }, [userId]);

  const toggleRecipe = (recipeId: string) => {
    setExpandedRecipes((prevExpandedRecipes) =>
      prevExpandedRecipes.includes(recipeId)
        ? prevExpandedRecipes.filter((id) => id !== recipeId)
        : [...prevExpandedRecipes, recipeId],
    );
  };

  const removeRecipe = async (recipeId: string) => {
    setRemoveRecipePopup(true);
    // remove from DB
    const removeRecipeResponse = await removeFavouriteRecipes(recipeId, userId);
    if (removeRecipeResponse) {
      removeFavRecipe(recipeId);
      //close popup
      setRemoveRecipePopup(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="fav-recipes-page">
        <div className="page-header">
          <h1>Your Favourite Recipes</h1>
          <p className="subtitle">
            Click on the recipe cards to view full details
          </p>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your recipes...</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {favouriteRecipes.length === 0 ? (
              <div className="empty-state">
                <FaHeart className="empty-icon" />
                <h3>No favourite recipes yet</h3>
                <p>Start adding recipes to your favourites to see them here</p>
              </div>
            ) : (
              favouriteRecipes.map((recipe: Recipe) => (
                <div
                  className={`recipe-card ${expandedRecipes.includes(recipe._id) ? "expanded" : ""}`}
                  key={recipe._id}
                >
                  <div
                    className="recipe-header"
                    onClick={() => toggleRecipe(recipe._id)}
                  >
                    <h2 className="recipe-title">{recipe.title}</h2>
                    <div className="recipe-actions">
                      <div className="expand-icon">
                        {expandedRecipes.includes(recipe._id) ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                      <ToolTip
                        text="Remove from favourites"
                        children={
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRecipe(recipe);
                              setRemoveRecipePopup(true);
                            }}
                            children={<FaHeart className="heart-icon filled" />}
                          />
                        }
                      />
                    </div>
                  </div>

                  {expandedRecipes.includes(recipe._id) && (
                    <div className="recipe-content">
                      <div className="recipe-section">
                        <h3>Ingredients</h3>
                        <ul className="ingredients-list">
                          {recipe.ingredients.map(
                            (ingredient: string, i: number) => (
                              <li key={i}>
                                <span className="ingredient-bullet">•</span>
                                {ingredient}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="recipe-section">
                        <h3>Instructions</h3>
                        <ol className="instructions-list">
                          {recipe.instructions.map(
                            (instruction: string, i: number) => (
                              <li key={i}>
                                <span className="step-number">{i + 1}</span>
                                <span className="step-text">{instruction}</span>
                              </li>
                            ),
                          )}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        <Popup
          isOpen={removeRecipePopup}
          children={
            <div className="remove-popup">
              <h3>Remove Recipe</h3>
              <p>
                Are you sure you want to remove{" "}
                <strong>"{currentRecipe?.title}"</strong> from your favourite
                recipes?
              </p>
              <div className="popup-actions">
                <Button
                  text="Remove"
                  onClick={() => {
                    if (currentRecipe) {
                      removeRecipe(currentRecipe._id);
                    }
                    setRemoveRecipePopup(false);
                  }}
                />
                <Button
                  text="Cancel"
                  onClick={() => setRemoveRecipePopup(false)}
                />
              </div>
            </div>
          }
        />
      </div>
    </ProtectedRoute>
  );
};

export default FavRecipes;
