if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ======================================================
// IMPORTS
// ======================================================

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const helmet = require("helmet");

const ExpressError = require("./utils/expressError");

const User = require("./models/user");

// ======================================================
// ROUTES
// ======================================================

const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const app = express();

// ======================================================
// DATABASE CONNECTION
// ======================================================

const dbUrl =
  process.env.ATLAS_DB_URL || "mongodb://127.0.0.1:27017/wonderlust";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });

// ======================================================
// VIEW ENGINE
// ======================================================

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

// ======================================================
// HELMET SECURITY
// ======================================================

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// ======================================================
// SESSION STORE
// ======================================================

const store = MongoStore.create({
  mongoUrl: dbUrl,

  crypto: {
    secret: process.env.SECRET,
  },

  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

// ======================================================
// SESSION CONFIG
// ======================================================

const sessionOptions = {
  store,

  secret: process.env.SECRET,

  resave: false,

  saveUninitialized: false,

  cookie: {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,

    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));

// ======================================================
// FLASH MESSAGES
// ======================================================

app.use(flash());

// ======================================================
// PASSPORT AUTH
// ======================================================

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

// ======================================================
// GLOBAL LOCALS
// ======================================================

app.use((req, res, next) => {
  // Success messages
  res.locals.success = req.flash("success");

  // Error messages
  res.locals.error = req.flash("error");

  // Current logged-in user
  res.locals.currUser = req.user;

  next();
});

// ======================================================
// ROUTES
// ======================================================

app.use("/", userRouter);

app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter);

// ======================================================
// HOME ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// ======================================================
// 404 ERROR HANDLER
// ======================================================

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode).render("error.ejs", {
    err,
    message,
  });
});

// ======================================================
// SERVER
// ======================================================

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
