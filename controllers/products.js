const slugify = require("slugify");
const Product = require("../models/product");
const Category = require("../models/category");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appErrors");

const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const resizeImg = require("resize-img");

exports.createProduct = catchAsync(async (req, res, next) => {
  // let imageFile =
  //   typeof req.files.image !== "undefined" ? req.files.image.name : "";
  //validate title, description, price and image
  let { title, description, price, category } = req.body;
  const slug = slugify(title, { lower: true });
  price = parseFloat(price).toFixed(2);

  const newproduct = await Product.create({
    title,
    slug,
    description,
    price,
    category,
    // image: imageFile,
  });
  res.status(201).json({
    status: "success",
    data: { product: newproduct },
  });
});

/*
 * get all Product
 */
exports.getAllproducts = catchAsync(async (req, res, next) => {
  const product = await Product.find({});
  res.status(200).json({
    status: "success",
    result: product.length,
    data: { product },
  });
});

//get product by id

exports.getOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // if (!product) {
  //   return next(
  //     new appError(`no product with id: ${req.params.id}, found`, 404)
  //   );
  // }

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

//edit product
exports.updateProduct = catchAsync(async (req, res, next) => {
  let imageFile =
    typeof req.files.image !== "undefined" ? req.files.image.name : "";
  //validate title, description, price and image
  let { title, description, price, category } = req.body;
  const slug = slugify(title, { lower: true });
  price = parseFloat(price).toFixed(2);
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { title, slug, description, price, category, imageFile },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return next(new appError("no product with that ID found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { product },
    message: "delete successfull",
  });
});

//delete product
exports.deletProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new appError("no product with that ID found", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

//get by category
exports.product_category = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.category });
  const product = await Product.find({ category: req.params.category });

  if (!product) {
    return next(new appError("no product found", 404));
  }

  if (!category) {
    return next(new appError("no such category found", 404));
  }

  res.status(200).json({
    status: "success",
    results: product.length,
    data: {
      title: category.title,
      product,
    },
  });
});
