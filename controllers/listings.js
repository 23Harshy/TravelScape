// Import Listing model
const Listing = require("../models/listing");

/* =======================================================
   SHOW ALL DESTINATIONS
======================================================= */
module.exports.index = async (req, res) => {
  // Fetch all destinations from database
  const allListings = await Listing.find({});

  // Render index page
  res.render("listings/index.ejs", {
    allListings,
  });
};

/* =======================================================
   RENDER NEW DESTINATION FORM
======================================================= */
module.exports.renderNewForm = (req, res) => {
  // Render create form page
  res.render("listings/new.ejs");
};

/* =======================================================
   SHOW SINGLE DESTINATION DETAILS
======================================================= */
module.exports.showListing = async (req, res) => {
  // Get destination ID from URL
  const { id } = req.params;

  // Find listing and populate reviews + owner
  const listing = await Listing.findById(id)

    // Populate reviews
    .populate({
      path: "reviews",

      // Populate review author
      populate: {
        path: "author",
      },
    })

    // Populate destination owner
    .populate("owner");

  // If destination not found
  if (!listing) {
    req.flash("error", "Travel destination not found!");

    return res.redirect("/listings");
  }

  // Render show page
  res.render("listings/show.ejs", {
    listing,
  });
};

/* =======================================================
   CREATE NEW DESTINATION
======================================================= */
module.exports.createListing = async (req, res) => {
  // Get uploaded image data from Cloudinary
  let url = req.file.path;
  let filename = req.file.filename;

  /* -------------------------------------------
       Convert activities string into array

       Example:
       "Trekking, Camping"

       becomes:

       ["Trekking", "Camping"]
    -------------------------------------------- */
  if (req.body.listing.activities) {
    req.body.listing.activities = req.body.listing.activities
      .split(",")
      .map((activity) => activity.trim());
  }

  // Create new listing object
  const newListing = new Listing(req.body.listing);

  // Save image details
  newListing.image = {
    url,
    filename,
  };

  // Save current logged-in user as owner
  newListing.owner = req.user._id;

  // Save listing into database
  await newListing.save();

  // Success flash message
  req.flash("success", "New travel destination added successfully!");

  // Redirect to listings page
  res.redirect("/listings");
};

/* =======================================================
   RENDER EDIT DESTINATION FORM
======================================================= */
module.exports.renderEditForm = async (req, res) => {
  // Get listing ID
  const { id } = req.params;

  // Find listing
  const listing = await Listing.findById(id);

  // If destination not found
  if (!listing) {
    req.flash("error", "Destination not found!");

    return res.redirect("/listings");
  }

  /* -------------------------------------------
       Resize image for preview
    -------------------------------------------- */
  let originalImageUrl = listing.image.url;

  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  // Render edit page
  res.render("listings/edit.ejs", {
    listing,
    originalImageUrl,
  });
};

/* =======================================================
   UPDATE DESTINATION
======================================================= */
module.exports.updateListing = async (req, res) => {
  // Get listing ID
  const { id } = req.params;

  /* -------------------------------------------
       Convert activities into array
    -------------------------------------------- */
  if (req.body.listing.activities) {
    req.body.listing.activities = req.body.listing.activities
      .split(",")
      .map((activity) => activity.trim());
  }

  // Update destination data
  let listing = await Listing.findByIdAndUpdate(
    id,

    // Updated form data
    { ...req.body.listing },

    // Return updated document
    { new: true },
  );

  /* -------------------------------------------
       Update image if new image uploaded
    -------------------------------------------- */
  if (typeof req.file !== "undefined") {
    // New image details
    let url = req.file.path;
    let filename = req.file.filename;

    // Save new image
    listing.image = {
      url,
      filename,
    };

    // Save updated listing
    await listing.save();
  }

  // Success message
  req.flash("success", "Travel destination updated successfully!");

  // Redirect to show page
  res.redirect(`/listings/${id}`);
};

/* =======================================================
   DELETE DESTINATION
======================================================= */
module.exports.destroyListing = async (req, res) => {
  // Get listing ID
  const { id } = req.params;

  // Delete listing
  await Listing.findByIdAndDelete(id);

  // Success message
  req.flash("success", "Travel destination deleted successfully!");

  // Redirect to listings page
  res.redirect("/listings");
};
