const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "Page Title exits, choose another "],
  },
  slug: {
    type: String,
    unique: [true, "Page slug exits, choose another "],
  },
  content: {
    type: String,
    required: true,
  },
  sorting: {
    type: Number,
  },
});

const page = mongoose.model("page", pageSchema);

module.exports = page;
