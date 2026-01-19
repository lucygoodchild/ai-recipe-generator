import React, { useContext, useEffect, useState } from "react";
import { fetchFavouriteRecipes } from "../utils/fetchFavouriteRecipes";
import { useFavouriteRecipes } from "../app/contexts/favRecipesContext";
import { removeFavouriteRecipes } from "../utils/removeFavouriteRecipes";
import { AuthContext } from "../app/contexts/authContext";
import { FaHeart } from "react-icons/fa6";
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
  const { userId, isLoggedIn } = useContext(AuthContext);
  const [expandedRecipes, setExpandedRecipes] = useState<number[]>([]);
  const [removeRecipePopup, setRemoveRecipePopup] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>();

  useEffect(() => {
    const fetchFavRecipes = async () => {
      const recipes = await fetchFavouriteRecipes(userId);
      setFavRecipes(recipes);
    };
    if (isLoggedIn) fetchFavRecipes();
  }, [userId]);

  const toggleRecipe = (index: number) => {
    setExpandedRecipes((prevExpandedRecipes) =>
      prevExpandedRecipes.includes(index)
        ? prevExpandedRecipes.filter((i) => i !== index)
        : [...prevExpandedRecipes, index],
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
        <h1>Your Favourite Recipes</h1>
        <h4>Click on the recipe titles for more details</h4>
        <div className="recipes-container">
          {favouriteRecipes.length === 0 ? (
            <div className="no-recipes-message">
              You have no favourite recipes yet
            </div>
          ) : (
            favouriteRecipes.map((recipe: Recipe, index: number) => (
              <div className="recipe-item" key={recipe._id}>
                <div className="recipe-title">
                  <h2
                    onClick={() => toggleRecipe(index)}
                    className="recipe-title"
                  >
                    {recipe.title}
                  </h2>
                  <ToolTip
                    text="Remove recipe from favourites"
                    children={
                      <IconButton
                        onClick={() => {
                          setCurrentRecipe(recipe);
                          setRemoveRecipePopup(true);
                        }}
                        children={<FaHeart />}
                      />
                    }
                  />
                </div>
                {expandedRecipes.includes(index) && (
                  <div className="recipe-details">
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe.ingredients.map(
                        (ingredient: string, i: number) => (
                          <li key={i}>{ingredient}</li>
                        ),
                      )}
                    </ul>
                    <h4>Instructions:</h4>
                    <ol>
                      {recipe.instructions.map(
                        (instruction: string, i: number) => (
                          <li key={i}>{instruction}</li>
                        ),
                      )}
                    </ol>
                    <div className="removeFav-button"></div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <Popup
          isOpen={removeRecipePopup}
          children={
            <div className="fav-recipes-popup">
              <h3>
                Are you sure you want to remove "{currentRecipe?.title}" from
                your favourite recipes?
              </h3>
              <div className="fav-recipes-popup-buttons">
                <Button
                  text="Yes"
                  onClick={() => {
                    if (currentRecipe) {
                      removeRecipe(currentRecipe._id);
                    }
                    setRemoveRecipePopup(false);
                  }}
                />
                <Button text="No" onClick={() => setRemoveRecipePopup(false)} />
              </div>
            </div>
          }
        />
      </div>
    </ProtectedRoute>
  );
};

export default FavRecipes;
