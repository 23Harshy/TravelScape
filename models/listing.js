// Import mongoose
const mongoose = require("mongoose");

// Create schema object
const Schema = mongoose.Schema;

// Listing schema for travel destinations
const listingSchema = new Schema(
  {
    // Destination title
    // Example: Tungnath Trek
    title: {
      type: String,
      required: true,
    },

    // Destination description
    description: String,

    // Image object stored from Cloudinary
    image: {
      url: String,
      filename: String,
    },

    // State name
    // Example: Uttarakhand
    state: {
      type: String,
    },

    // Region or district
    // Example: Rudraprayag
    region: {
      type: String,
    },

    // Best time to visit
    // Example: March to June
    bestSeason: {
      type: String,
    },

    // Trek difficulty
    // Easy / Moderate / Hard
    trekDifficulty: {
      type: String,
    },

    // Approx travel budget
    // Example: 5000
    estimatedCost: {
      type: Number,
    },

    // Height from sea level
    // Example: 12073 ft
    altitude: {
      type: String,
    },

    // Activities available
    // Trekking, Camping etc.
    activities: [
      {
        type: String,
      },
    ],

    // How to reach place
    howToReach: {
      type: String,
    },

    // Owner of listing
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    // Reviews
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);

// Delete reviews automatically if listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await mongoose.model("Review").deleteMany({
      _id: { $in: listing.reviews },
    });
  }
});

// Export model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
