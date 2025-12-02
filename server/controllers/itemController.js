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

exports.addItem = catchAsync(async (req, res) => {
  const newItem = await Item.create({
    ...req.body,
    type: req.params.type,
  });
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
  const updatedItem = await Item.findOneAndUpdate(
    { _id: req.params.id, userId: req.query.userId },
    req.body,
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
