import React, { useEffect, useState } from "react";
import { addFavouriteRecipes } from "./../../utils/addFavouriteRecipes";
import { fetchFavouriteRecipes } from "./../../utils/fetchFavouriteRecipes";
import { removeFavouriteRecipes } from "./../../utils/removeFavouriteRecipes";
import { useFavouriteRecipes } from "../contexts/favRecipesContext";
import { useAuth } from "../contexts/authContext";
import { IoMdClose } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { MdExpandMore } from "react-icons/md";
import IconButton from "./IconButton";
import ToolTip from "./ToolTip";
import "./RecipesModal.css";

interface Recipe {
  _id?: string;
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
  const { isLoggedIn, userId } = useAuth();
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState<number | null>(
    null,
  );
  const [onMouseOver, setOnMouseOver] = useState(
    new Array(recipes.length).fill(false),
  );
  const toggleRecipe = (index: number) => {
    setExpandedRecipeIndex(expandedRecipeIndex === index ? null : index);
  };
  const [addToFavourites, setAddToFavourites] = useState(
    new Array(recipes.length).fill(false),
  );
  const { setFavRecipes, addFavRecipe, removeFavRecipe, favouriteRecipes } =
    useFavouriteRecipes();

  useEffect(() => {
    // Fetch all favourite recipes on component mount and set in global state
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchFavouriteRecipes(userId);
      setFavRecipes(fetchedRecipes);
    };

    if (isLoggedIn) {
      loadRecipes();
    }
  }, [isLoggedIn, userId]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
        const newRecipe = await addFavouriteRecipes(recipe, userId);
        // update global state with added recipe
        addFavRecipe(newRecipe);
      } else {
        // find the recipe in fav recipes array (using title as there cannot be duplicates)
        const chosenRecipe = favouriteRecipes.find(
          (selectedRecipe) => recipe.title === selectedRecipe.title,
        );
        // Remove from favourites
        if (chosenRecipe) {
          const removedSuccess = await removeFavouriteRecipes(
            chosenRecipe._id,
            userId,
          );
          // update global state
          if (removedSuccess) {
            removeFavRecipe(chosenRecipe._id);
          }
        }
      }

      setAddToFavourites(newAddToFavourites);
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoMdClose />
        </button>
        <div className="modal-header">
          <h2 className="title">Your AI Generated Recipes</h2>
          <p className="recipe-text">
            Click each recipe title for more details!
          </p>
        </div>
        <div className="recipes">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className={`recipe-item ${expandedRecipeIndex === index ? "expanded" : ""}`}
            >
              <div className="recipe-header">
                <button
                  onClick={() => toggleRecipe(index)}
                  className="recipe-title-button"
                  aria-expanded={expandedRecipeIndex === index}
                  aria-controls={`recipe-details-${index}`}
                >
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <MdExpandMore className="expand-icon" />
                </button>
                <ToolTip
                  text={
                    !addToFavourites[index]
                      ? "Add recipe to favourites"
                      : "Remove recipe from favourites"
                  }
                  children={
                    <IconButton
                      onClick={() => handleAddToFavouritesClick(index)}
                      className="favourite-button"
                      aria-label={
                        addToFavourites[index]
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      children={
                        addToFavourites[index] || onMouseOver[index] ? (
                          <FaHeart className="heart-icon filled" />
                        ) : (
                          <FaRegHeart className="heart-icon" />
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
                    />
                  }
                />
              </div>
              <div
                id={`recipe-details-${index}`}
                className="recipe-details"
                aria-hidden={expandedRecipeIndex !== index}
              >
                <div className="recipe-section">
                  <h4 className="section-title">Ingredients</h4>
                  <ul className="ingredients-list">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="ingredient-item">
                        <span className="ingredient-bullet">•</span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="recipe-section">
                  <h4 className="section-title">Instructions</h4>
                  <ol className="instructions-list">
                    {recipe.instructions.map((instruction, i) => (
                      <li key={i} className="instruction-item">
                        <span className="instruction-number">{i + 1}</span>
                        <span className="instruction-text">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
