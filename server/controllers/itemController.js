const AppError = require("../utils/appError");
const Item = require("../models/itemModel");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

exports.getAllItems = catchAsync(async (req, res, next) => {
  const items = await Item.find({ userId: req.query.userId });
  res.status(200).json({ status: "success", data: items });
});

exports.getItemsOfType = catchAsync(async (req, res, next) => {
  const items = await Item.find({
    type: req.params.type,
    userId: new mongoose.Types.ObjectId(req.query.userId),
  });
  res.status(200).json({ status: "success", data: items });
});

// exports.getItem = async (req, res, next) => {
//   const item = await Item.findById(req.params.id);

//   if (!item) {
//     return next(new Error("No item found with that ID", 404));
//   }

//   res.status(200).json({
//     status: "success",
//     data: {
//       item,
//     },
//   });
// };

exports.addItem = catchAsync(async (req, res, next) => {
  const { name, quantity, measurement, userId } = req.body;
  const { type } = req.params;

  // Input validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return next(new AppError('Item name is required and must be a non-empty string', 400));
  }

  if (!userId || typeof userId !== 'string') {
    return next(new AppError('User ID is required', 400));
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError('Invalid user ID format', 400));
  }

  if (!type || typeof type !== 'string') {
    return next(new AppError('Item type is required', 400));
  }

  // Validate type is one of allowed values
  const allowedTypes = ['cupboard', 'fridge', 'freezer'];
  if (!allowedTypes.includes(type)) {
    return next(new AppError('Item type must be one of: cupboard, fridge, freezer', 400));
  }

  // Sanitize inputs
  const sanitizedData = {
    name: name.trim(),
    quantity: quantity ? quantity.toString().trim() : '',
    measurement: measurement ? measurement.toString().trim() : '',
    userId,
    type,
  };

  const newItem = await Item.create(sanitizedData);
  res.status(201).json({ status: "success", data: newItem });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const userId = req.query.userId;

    // Check if the provided IDs are valid ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(itemId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return next(new AppError("Invalid item or user ID", 400));
    }

    const item = await Item.findOneAndDelete(
      { _id: itemId, userId: userId },
      {
        new: true,
      }
    );

    if (!item) {
      return next(new AppError("No item found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const { name, quantity, measurement } = req.body;
  const { id } = req.params;
  const { userId } = req.query;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid item ID format', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError('Invalid user ID format', 400));
  }

  // Build update object with only allowed fields
  const updateData = {};

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      return next(new AppError('Item name must be a non-empty string', 400));
    }
    updateData.name = name.trim();
  }

  if (quantity !== undefined) {
    updateData.quantity = quantity ? quantity.toString().trim() : '';
  }

  if (measurement !== undefined) {
    updateData.measurement = measurement ? measurement.toString().trim() : '';
  }

  const updatedItem = await Item.findOneAndUpdate(
    { _id: id, userId: userId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedItem) {
    return next(
      new AppError("No item found with that ID for the specified user", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      item: updatedItem,
    },
  });
});

exports.syncItems = catchAsync(async (req, res, next) => {
  const items = req.body.items;

  if (!items || !Array.isArray(items)) {
    return next(new AppError("Invalid items data", 400));
  }

  try {
    // Save items to the database
    await Item.insertMany(items, { new: true });

    res.status(200).json({
      status: "success",
      data: items,
    });
  } catch (error) {
    next(error);
  }
});
