// Import listing schema validation
const { listingSchema, reviewSchema } = require("./schema.js");

// Custom Express Error
const ExpressError = require("./utils/ExpressError.js");

// Listing model
const Listing = require("./models/listing");

// Review model
const Review = require("./models/review");

/* ======================================================
   CHECK USER LOGIN
====================================================== */

module.exports.isLoggedIn = (req, res, next) => {
  // If user is not logged in
  if (!req.isAuthenticated()) {
    // Save redirect URL
    req.session.redirectUrl = req.originalUrl;

    // Flash message
    req.flash("error", "You must be logged in to continue.");

    // Redirect to login
    return res.redirect("/login");
  }

  next();
};

/* ======================================================
   SAVE REDIRECT URL
====================================================== */

module.exports.saveRedirectUrl = (req, res, next) => {
  // Save redirect URL in locals
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }

  next();
};

/* ======================================================
   VALIDATE DESTINATION DATA
====================================================== */

module.exports.validateListing = (req, res, next) => {
  // Validate request body
  const { error } = listingSchema.validate(req.body);

  // If validation fails
  if (error) {
    // Create readable error message
    let errMsg = error.details.map((el) => el.message).join(",");

    throw new ExpressError(400, errMsg);
  }

  next();
};

/* ======================================================
   CHECK DESTINATION OWNER
====================================================== */

module.exports.isOwner = async (req, res, next) => {
  // Get listing ID
  const { id } = req.params;

  // Find listing
  const listing = await Listing.findById(id);

  // If current user is not owner
  if (!listing.owner.equals(req.user._id)) {
    req.flash(
      "error",
      "You do not have permission to modify this destination.",
    );

    return res.redirect(`/listings/${id}`);
  }

  next();
};

/* ======================================================
   VALIDATE REVIEW
====================================================== */

module.exports.validateReview = (req, res, next) => {
  // Validate review data
  const { error } = reviewSchema.validate(req.body);

  // If validation fails
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");

    throw new ExpressError(400, errMsg);
  }

  next();
};

/* ======================================================
   CHECK REVIEW AUTHOR
====================================================== */

module.exports.isReviewAuthor = async (req, res, next) => {
  // Get params
  const { id, reviewId } = req.params;

  // Find review
  const review = await Review.findById(reviewId);

  // Check ownership
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You can only delete your own review.");

    return res.redirect(`/listings/${id}`);
  }

  next();
};
