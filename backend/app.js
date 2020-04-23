const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const kitchensRouter = require("./routes/kitchens");
const bookingsRouter = require("./routes/bookings");

app.set("view engine", "pug");

// Middlewares
<<<<<<< HEAD
=======
app.use(cors({ origin: "http://localhost:4000" }));
>>>>>>> master
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4000" }));

// Mount Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/kitchens", kitchensRouter);
app.use("/bookings", bookingsRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// ----- Add custom error handlers. -----

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === "production";
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
