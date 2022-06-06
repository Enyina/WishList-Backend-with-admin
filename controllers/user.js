/* eslint-disable new-cap */
/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require("../models/user");
const appError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = [];
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.boby.confirmPassword) {
    next(
      new appError(
        "This route is not for password updates, use /updateMyPassword"
      ),
      400
    );
  }

  // filter out unwanted field names that are not allowed to be updated on this route
  const filteredBody = filterObj(req.body, "name", "email");

  //update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null
  });
});
