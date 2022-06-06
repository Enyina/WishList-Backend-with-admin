const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  Slug: {
    type: String,
    unique: true,
  },
});

const category = mongoose.model("category", categorySchema);

module.exports = category;
