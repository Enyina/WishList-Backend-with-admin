/* eslint-disable no-console */
const app = require("./app");
require("dotenv").config();

process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION!!  SHUTING DOWN......");
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(process.env.port, () => {
  console.log("server working");
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION!!  SHUTING DOWN......");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
