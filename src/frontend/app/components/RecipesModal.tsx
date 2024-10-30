import React, { useContext, useEffect, useState } from "react";
import { addFavouriteRecipes } from "./../../utils/addFavouriteRecipes";
import { fetchFavouriteRecipes } from "./../../utils/fetchFavouriteRecipes";
import { removeFavouriteRecipes } from "./../../utils/removeFavouriteRecipes";
import { useFavouriteRecipes } from "../contexts/favRecipesContext";
import { IoMdClose } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import IconButton from "./IconButton";
import ToolTip from "./ToolTip";
import "./RecipesModal.css";
import { AuthContext } from "../contexts/authContext";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeModalProps {
  isOpen: boolean;
  recipes: Recipe[];
  onClose: () => void;
}

const RecipeModal = ({ isOpen, recipes, onClose }: RecipeModalProps) => {
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState<number | null>(
    null
  );
  const [onMouseOver, setOnMouseOver] = useState(
    new Array(recipes.length).fill(false)
  );
  const toggleRecipe = (index: number) => {
    setExpandedRecipeIndex(expandedRecipeIndex === index ? null : index);
  };
  const [addToFavourites, setAddToFavourites] = useState(
    new Array(recipes.length).fill(false)
  );
  const { setFavRecipes, addFavRecipe, removeFavRecipe } =
    useFavouriteRecipes();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all favourite recipes on component mount and set in global state
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchFavouriteRecipes();
      setFavRecipes(fetchedRecipes);
    };
    if (isLoggedIn) {
      loadRecipes();
    }
  }, [isLoggedIn, setFavRecipes]);

  if (!isOpen) {
    return null;
  }

  const handleAddToFavouritesClick = async (index: number) => {
    const newAddToFavourites = [...addToFavourites];
    newAddToFavourites[index] = !newAddToFavourites[index];
    const recipe = recipes[index];

    try {
      if (newAddToFavourites[index]) {
        // Add to favourites
        await addFavouriteRecipes(recipe);
        // update state
        addFavRecipe(recipe);
      } else {
        // need to get id
        // Remove from favourites
        await removeFavouriteRecipes(recipe);
        // update state
        removeFavRecipe(recipe);
      }
      setAddToFavourites(newAddToFavourites);
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="title">Your AI Generated Recipes</h2>
        <h4 className="recipe-text">
          Click each recipe title for more details!
        </h4>
        <div className="recipes">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-item">
              <div className="title-icon-details">
                <div className="title-and-icon">
                  <h3
                    onClick={() => {
                      toggleRecipe(index);
                    }}
                    className="recipe-title"
                  >
                    {recipe.title}
                  </h3>
                  <ToolTip
                    text={
                      !addToFavourites[index]
                        ? "Add recipe to favourites"
                        : "Remove recipe from favourites"
                    }
                    children={
                      <IconButton
                        onClick={() => handleAddToFavouritesClick(index)}
                        children={
                          addToFavourites[index] || onMouseOver[index] ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )
                        }
                        onMouseOver={() => {
                          const newOnMouseOver = [...onMouseOver];
                          newOnMouseOver[index] = true;
                          setOnMouseOver(newOnMouseOver);
                        }}
                        onMouseOut={() => {
                          const newOnMouseOver = [...onMouseOver];
                          newOnMouseOver[index] = false;
                          setOnMouseOver(newOnMouseOver);
                        }}
                      ></IconButton>
                    }
                  ></ToolTip>
                </div>
                {expandedRecipeIndex === index && (
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
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
