const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    about: {
      type: String,
    },

   rating: {
  type: Number,
  default: 0,
},

totalRatings: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Worker", workerSchema);