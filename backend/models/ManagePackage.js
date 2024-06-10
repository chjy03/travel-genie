//models
//ManagePackage.js
const mongoose = require('mongoose');

const managePackageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  imgSrc: {
    type: [String],
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
    type: Number,
    required: true
  },
  dayDuration: {
    type: Number,
    required: true
  },
  nightDuration: {
    type: Number
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
  }],
  itinerary: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('ManagePackage', managePackageSchema);

// const mongoose = require('mongoose');

// const dateRangeSchema = new mongoose.Schema({
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
// });

// const managePackageSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     imgSrc: { type: String, required: true },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     dayDuration: { type: Number, required: true },
//     nightDuration: { type: Number, required: true },
//     location: { type: String, required: true },
//     numberOfDates: { type: Number, required: true },
//     dateRanges: [dateRangeSchema],
//     itinerary: { type: [String], required: true },
// });

// const ManagePackage = mongoose.model('ManagePackage', managePackageSchema);

// module.exports = ManagePackage;
