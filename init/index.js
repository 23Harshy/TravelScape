require("dotenv").config();
// Import mongoose
const mongoose = require("mongoose");

// Import sample travel destination data
const initData = require("./data");

// Import Listing model
const Listing = require("../models/listing");

// MongoDB connection URL
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const MONGO_URL =
  process.env.ATLAS_DB_URL || "mongodb://127.0.0.1:27017/wanderlust";

/* ======================================================
   CONNECT TO DATABASE
====================================================== */
main()
  .then(() => {
    console.log("MongoDB connected successfully");
  })

  .catch((err) => {
    console.log(err);
  });

// Database connection function
async function main() {
  await mongoose.connect(MONGO_URL);
}

/* ======================================================
   INITIALIZE DATABASE
====================================================== */
const initDB = async () => {
  // Delete old listings
  await Listing.deleteMany({});

  console.log("Old destination data deleted");

  /* -------------------------------------------
       Add owner ID to all destinations

       Replace this owner ID with your own
       MongoDB user ID if needed
    -------------------------------------------- */
  initData.data = initData.data.map((obj) => ({
    ...obj,

    owner: "68dd0d2527d9d6e25e7ea3cf",
  }));

  // Insert new travel destinations
  await Listing.insertMany(initData.data);

  console.log("Travel destination data initialized");
};

// Run initialization
initDB();
