const mongoose = require("mongoose");
const Destination = require("../models/Destination");

const scheduleSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  selectedDestinations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
  ],
  userEmail:{
    type: String,
    required: true,
  },
});


const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule; 