const express = require("express");
const recipeController = require("../controllers/recipeController");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router();

router
  .route("/favourite-recipes")
  .get(
    authenticationController.protect,
    recipeController.getUsersFavouriteRecipes
  )
  .post(authenticationController.protect, recipeController.addFavouriteRecipe);
router
  .route("/:id")
  .delete(
    authenticationController.protect,
    recipeController.removeFavouriteRecipe
  );

module.exports = router;
