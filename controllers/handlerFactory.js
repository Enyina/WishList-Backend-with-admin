/* eslint-disable new-cap */
/* eslint-disable node/no-unsupported-features/es-syntax */
const appError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new appError("No document with that ID found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null
    });
  });
