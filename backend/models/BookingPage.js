const mongoose = require('mongoose');

const bookingPageSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true
  },
  selectedDate: {
    type: Date,
    required: true
  },
  persons: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    icPassport: {
      type: String,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  }
});

const BookingPage = mongoose.model('BookingPage', bookingPageSchema);

module.exports = BookingPage;

