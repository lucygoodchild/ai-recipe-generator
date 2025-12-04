const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item must have a name"],
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

// Create compound index for efficient user-specific queries
itemSchema.index({ userId: 1, name: 1 }, { unique: true });

//Pre-validate middleware to check if the item already exists with userId
itemSchema.pre("validate", async function (next) {
  if (this.isModified("name") || this.isNew) {
    const existingItem = await mongoose.models.Item.findOne({
      name: this.name,
      userId: this.userId,
    });
    if (existingItem) {
      quantity = parseFloat(existingItem.quantity) || 0;
      const newQuantity = parseFloat(this.quantity) || 0;
      this.quantity = (quantity + newQuantity).toString();
      this.isNew = false; // Prevent creating a new document
    }
  }
  next();
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
