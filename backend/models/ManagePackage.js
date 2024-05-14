const mongoose = require('mongoose');

const managePackageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  numberOfDates: {
    type: Number,
    required: true
  },
  dateRanges: [{
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  }]
});

module.exports = mongoose.model('ManagePackage', managePackageSchema);