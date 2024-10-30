const AppError = require("../utils/appError");
const Recipe = require("./../models/recipeModel");
const mongoose = require("mongoose");
const catchAsync = require("./../utils/catchAsync");

exports.getUsersFavouriteRecipes = catchAsync(async (req, res, next) => {
  const favouriteRecipes = await Recipe.find({
    userId: new mongoose.Types.ObjectId(req.user.id),
  });
  res.status(200).json({ status: "success", data: favouriteRecipes });
});

exports.addFavouriteRecipe = catchAsync(async (req, res, next) => {
  const { title, ingredients, instructions } = req.body;

  // Create a new recipe with the user ID
  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    userId: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: newRecipe,
  });
});

exports.removeFavouriteRecipe = catchAsync(async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    // Check if the provided IDs are valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return next(new AppError("Invalid recipe ID", 400));
    }

    const item = await Recipe.findOneAndDelete(
      { _id: recipeId, userId: req.user.id },
      {
        new: true,
      }
    );

    if (!item) {
      return next(new AppError("No recipe found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});
