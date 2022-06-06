/* eslint-disable new-cap */
/* eslint-disable node/no-unsupported-features/es-syntax */
const slugify = require("slugify");
const Category = require("../models/category");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appErrors");

exports.add_category = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const slug = slugify(title, { lower: true });

  const newCategory = await Category.create({
    title,
    slug
  });
  res.status(201).json({
    status: "success",
    data: { category: newCategory }
  });
});

//////////
exports.getAllCategory = catchAsync(async (req, res, next) => {
  const category = await Category.find({});
  res.status(200).json({
    status: "success",
    result: category.length,
    data: { category }
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    return next(new appError("no category with that ID found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { category },
    message: "delete successfull"
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndDelete({ slug: req.params.slug });

  if (!category) {
    return next(new appError("no category with that ID found", 404));
  }

  res.status(200).json({
    status: "success",
    data: null
  });
});
