const mongoose = require("mongoose");
const User = require("./../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: users });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }

  // Check if req.query.userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
    return next(new AppError("Invalid user ID.", 400));
  }

  const filteredBody = filterObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.query.userId },
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getPersonalDetailsOfUser = catchAsync(async (req, res, next) => {
  const personalDetails = await User.findById(req.params.id);
  if (!personalDetails) {
    return next(new AppError("User not found.", 404));
  }
  res.status(200).json({ status: "success", data: personalDetails });
});
