const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
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
      type: String,
      required: true,
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
