import React, { useEffect, useState } from "react";
import { fetchFavouriteRecipes } from "../utils/fetchFavouriteRecipes";
import { useFavouriteRecipes } from "../app/contexts/favRecipesContext";
import Button from "../app/components/Button";
import "./favRecipes.css";
import { IoIosArrowDown } from "react-icons/io";

const FavRecipes = () => {
  const { setFavRecipes, addFavRecipe, removeFavRecipe, favouriteRecipes } =
    useFavouriteRecipes();
  const [expandedRecipes, setExpandedRecipes] = useState<number[]>([]);

  const toggleRecipe = (index: number) => {
    setExpandedRecipes((prevExpandedRecipes) =>
      prevExpandedRecipes.includes(index)
        ? prevExpandedRecipes.filter((i) => i !== index)
        : [...prevExpandedRecipes, index]
    );
  };

  useEffect(() => {
    const fetchFavRecipes = async () => {
      const recipes = await fetchFavouriteRecipes();
      console.log(recipes);
      setFavRecipes(recipes);
    };
    fetchFavRecipes();
  }, [setFavRecipes]);

  return (
    <div className="fav-recipes-page">
      <h1>Your Favourite Recipes</h1>
      <div className="recipes-container">
        {favouriteRecipes.map((recipe, index) => (
          <div className="recipe-item" key={index}>
            <div className="recipe-title">
              <h2
                onClick={() => {
                  toggleRecipe(index);
                }}
                className="recipe-title"
              >
                {recipe.title}
              </h2>
              <IoIosArrowDown />
            </div>
            {expandedRecipes.includes(index) && (
              <div className="recipe-details">
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Instructions:</h4>
                <ol>
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
                <div className="removeFav-button">
                  <Button
                    onClick={() => removeFavRecipe(recipe.id)}
                    text="Remove from Favourites"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavRecipes;
