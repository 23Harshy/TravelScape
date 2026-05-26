// Import Joi
const Joi = require("joi");

/* ======================================================
   LISTING VALIDATION SCHEMA
====================================================== */

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    // Destination title
    title: Joi.string().required(),

    // Description
    description: Joi.string().required(),

    // State
    state: Joi.string().required(),

    // Region
    region: Joi.string().allow(""),

    // Destination category
    category: Joi.string().allow(""),

    // Best season
    bestSeason: Joi.string().allow(""),

    // Trek difficulty
    trekDifficulty: Joi.string().allow(""),

    // Estimated budget
    estimatedCost: Joi.number().min(0).allow(null),

    // Altitude
    altitude: Joi.string().allow(""),

    // Activities
    activities: Joi.alternatives().try(
      Joi.string(),

      Joi.array().items(Joi.string()),
    ),

    // Travel route info
    howToReach: Joi.string().allow(""),
  }).required(),
});

/* ======================================================
   REVIEW VALIDATION SCHEMA
====================================================== */

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    // Review comment
    comment: Joi.string().required(),

    // Rating
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
