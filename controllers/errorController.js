/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable node/no-unsupported-features/es-builtins */
const appError = require("../utils/appErrors");

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new appError(message, 400);
};

const handleDuplicatDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Duplicat field value: ${value}. please use another value`;
  return new appError(message, 404);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(val => val.message);
  const message = `Invalid input data, ${errors.join(". ")}`;
  return new appError(message, 400);
};

// const sendErrorDev = (err, res) => {
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     stack: err.stack,
//     error: err,
//   });
// };

const sendErrorProd = (err, res) => {
  // console.log({ stack: err.stack });
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack
    });
  } else {
    // console.error("Error:", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong"
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error;
  // console.log(err.name);
  if (err.name === "CastError") error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicatDB(err);
  if (err.name === "ValidatioError") error = handleValidationErrorDB(err);
  sendErrorProd(error, res);

  //   if (process.env.NODE_ENV === "development") {
  //     console.log(process.env.NODE_ENV);
  //     sendErrorDev(err, res);
  //   }
  //else if (process.env.NODE_ENV === "production") {
  //     let error = { ...err };

  //     if (error.name === "CastError") handleCastErrorDB(error);
  //     sendErrorProd(error, res);
  //   }
};
