const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Recipe must have a title"],
    unique: true,
    trim: true,
  },
  ingredients: {
    type: Array,
    required: [true, "Recipe must have an ingredient list"],
    trim: true,
  },
  instructions: {
    type: Array,
    required: [true, "Recipe must have an instruction list"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
