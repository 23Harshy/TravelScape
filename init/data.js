// Travel destination sample data

const sampleListings = [
  {
    title: "Tungnath Trek",

    description:
      "Tungnath is one of the highest Shiva temples in the world, surrounded by breathtaking Himalayan views and scenic trekking routes.",

    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      filename: "tungnathimage",
    },

    state: "Uttarakhand",

    region: "Rudraprayag",

    bestSeason: "March to June",

    trekDifficulty: "Moderate",

    estimatedCost: 5000,

    altitude: "12073 ft",

    activities: ["Trekking", "Camping", "Photography"],

    howToReach:
      "Reach Chopta via road from Rishikesh. Trek starts from Chopta.",
  },

  {
    title: "Munsiyari",

    description:
      "Munsiyari is a hidden gem in Uttarakhand known for snow peaks, peaceful valleys, and adventure trekking experiences.",

    image: {
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
      filename: "munsiyariimage",
    },

    state: "Uttarakhand",

    region: "Pithoragarh",

    bestSeason: "October to March",

    trekDifficulty: "Easy",

    estimatedCost: 7000,

    altitude: "7200 ft",

    activities: ["Nature Walk", "Camping", "Photography"],

    howToReach:
      "Nearest railway station is Kathgodam. Taxi and buses available.",
  },

  {
    title: "Spiti Valley",

    description:
      "Spiti Valley offers cold desert landscapes, monasteries, rugged mountain roads, and unforgettable road trips.",

    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      filename: "spitivalleyimage",
    },

    state: "Himachal Pradesh",

    region: "Lahaul-Spiti",

    bestSeason: "May to September",

    trekDifficulty: "Moderate",

    estimatedCost: 15000,

    altitude: "12500 ft",

    activities: ["Road Trip", "Camping", "Bike Riding"],

    howToReach: "Accessible via Manali or Shimla routes during summer season.",
  },

  {
    title: "Valley of Flowers",

    description:
      "A UNESCO World Heritage Site famous for colorful alpine flowers and stunning Himalayan beauty.",

    image: {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      filename: "valleyofflowersimage",
    },

    state: "Uttarakhand",

    region: "Chamoli",

    bestSeason: "July to September",

    trekDifficulty: "Moderate",

    estimatedCost: 8000,

    altitude: "14100 ft",

    activities: ["Trekking", "Nature Photography", "Camping"],

    howToReach: "Start journey from Govindghat and trek towards Ghangaria.",
  },

  {
    title: "Auli",

    description:
      "Auli is a famous skiing destination surrounded by snow-covered Himalayan peaks and cable car rides.",

    image: {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      filename: "auliimage",
    },

    state: "Uttarakhand",

    region: "Chamoli",

    bestSeason: "December to February",

    trekDifficulty: "Easy",

    estimatedCost: 10000,

    altitude: "9200 ft",

    activities: ["Skiing", "Snow Camping", "Photography"],

    howToReach: "Nearest town is Joshimath. Ropeway available to Auli.",
  },
];

// Export data
module.exports = { data: sampleListings };
