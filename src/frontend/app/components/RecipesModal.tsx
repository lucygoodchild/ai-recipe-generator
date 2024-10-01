import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import IconButton from "./IconButton";
import ToolTip from "./ToolTip";
import "./RecipesModal.css";

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

  if (!isOpen) {
    return null;
  }

  console.log(recipes);

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
                    text={"Add to favourites"}
                    children={
                      <IconButton
                        onClick={() => {}}
                        children={
                          onMouseOver[index] ? <FaHeart /> : <FaRegHeart />
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
