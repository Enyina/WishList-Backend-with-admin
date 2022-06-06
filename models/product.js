const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "Page Title exits, choose another "],
  },
  slug: {
    type: String,
    unique: [true, "Page slug exits, choose another "],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const product = mongoose.model("product", productSchema);

module.exports = product;
