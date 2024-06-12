const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  operatingTime: {
    open: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  tags: [String],
  rating: {
    type: Number,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
