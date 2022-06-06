const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.db_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("server running");
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

module.exports = connectDB;
