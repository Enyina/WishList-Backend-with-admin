/* eslint-disable new-cap */
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
// eslint-disable-next-line no-unused-vars
const validator = require("express-validator");
const MongoStore = require("connect-mongo");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");

// const pages = require("./routes/pages");
const products = require("./routes/products");
const userRouter = require("./routes/userRoutes");
const cart = require("./routes/cart");
const adminPages = require("./routes/adminPages");
const adminCategory = require("./routes/adminCategory");
const adminProduct = require("./routes/adminProduct");
const adminUsers = require("./routes/adminUsers");
const conectDB = require("./config/db");
const appError = require("./utils/appErrors");
const globalErrorHandler = require("./controllers/errorController");

conectDB();
const app = express();
// Set security HTTP headers
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please wait 1 hour and try again"
});
// Limits all /api routes
app.use("/api", limiter);

// set global variable
app.locals.errors = null;

app.use(fileUpload());
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "16kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["price"]
  })
);

app.use(compression());
//session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.db_url }),
    cookie: { secure: true, maxAge: 180 * 60 * 1000 }
  })
);

// app.get("*", (req, res, next) => {
//   req.locals.cart = req.session.cart;
//   next();
// });

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// ///express messages
// app.use(require("connect-flash")());
// app.use(function (req, res, next) {
//   res.locals.messages = require("express-messages")(req, res);
//   next();
// });

// ROUTES
// app.use("/", pages);
app.use("/api/products", products);
app.use("/api/users", userRouter);
app.use("/api/cart", cart);
app.use("/api/admin/pages", adminPages);
app.use("/api/admin/categories", adminCategory);
app.use("/api/admin/products", adminProduct);
app.use("/api/admin/users", adminUsers);

app.all("*", (req, res, next) => {
  // const err = new Error(`could not find ${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next(err);

  next(new appError(`could not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
