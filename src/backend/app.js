const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const itemRouter = require("./routes/itemRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", //"*" for prod
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

//set security http headers
app.use(helmet());

//dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//limit requests from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "Too many requests from this IP address, please try again in an hour!",
});
app.use("/api", limiter);

//body parser
app.use(express.json({ limit: "10kb" }));

//data sanitisation against noSQL query injection
app.use(mongoSanitize());

//data sanitisation against XSS
app.use(xss());

//serving static files
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/items", itemRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server :(`), 404);
}); //error is passed to next middleware where it is handled

app.use(globalErrorHandler);

module.exports = app;
