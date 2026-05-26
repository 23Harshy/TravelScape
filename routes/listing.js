// Express router
const express = require("express");

const router = express.Router();

// Listing controller
const listingController = require("../controllers/listings");

// Listing model
const Listing = require("../models/listing");

// Middleware
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

// Multer + Cloudinary
const multer = require("multer");

const { storage } = require("../cloudConfig");

const upload = multer({ storage });

/* ======================================================
   SEARCH + FILTER ROUTE
====================================================== */
router.get("/", async (req, res) => {
  // Get search query
  const { search, category } = req.query;

  // Empty filter object
  let filter = {};

  /* -------------------------------------------
       Search by destination title
    -------------------------------------------- */
  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  /* -------------------------------------------
       Filter by category
    -------------------------------------------- */
  if (category) {
    filter.category = category;
  }

  // Fetch filtered destinations
  const allListings = await Listing.find(filter);

  // Render page
  res.render("listings/index.ejs", {
    allListings,
  });
});

/* ======================================================
   CREATE DESTINATION ROUTES
====================================================== */

// New form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create destination
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  listingController.createListing,
);

/* ======================================================
   SINGLE DESTINATION ROUTES
====================================================== */

// Show destination
router.get("/:id", listingController.showListing);

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

// Update destination
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  listingController.updateListing,
);

// Delete destination
router.delete("/:id", isLoggedIn, isOwner, listingController.destroyListing);

// Export router
module.exports = router;
