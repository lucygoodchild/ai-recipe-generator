const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item must have a name"],
    unique: true,
    trim: true,
  },
  type: String,
  quantity: {
    type: String,
    trim: true,
  },
  measurement: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User much have an ID"],
  },
});

//Pre-validate middleware to check if the item already exists with userId?
itemSchema.pre("validate", async function (next) {
  if (this.isModified("name") || this.isNew) {
    const existingItem = await mongoose.models.Item.findOne({
      name: this.name,
      userId: this.userId,
    });
    if (existingItem) {
      const error = new Error(
        "Item with this name already exists for this user. Edit the amount of the existing item"
      );
      error.name = "ValidationError";
      return next(error);
    }
  }
  next();
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
