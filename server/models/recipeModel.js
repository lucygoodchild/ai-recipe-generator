const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Recipe must have a title"],
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
    required: [true, "User must have an ID"],
  },
});

//Pre-validate middleware to check if the item already exists with userId?
recipeSchema.pre("validate", async function (next) {
  if (this.isModified("title") || this.isNew) {
    const existingRecipe = await mongoose.models.Recipe.findOne({
      title: this.title,
      userId: this.userId,
    });
    if (existingRecipe) {
      const error = new Error(
        "Recipe with this title is already in recipe favourites for this user"
      );
      error.title = "ValidationError";
      return next(error);
    }
  }
  next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
