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
  totalPersons:{
    type: Number,
    default: 1
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
  totalCost: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['unpaid', 'paid', 'cancelled'],
    default: 'unpaid'
  }
});

const BookingPage = mongoose.model('BookingPage', bookingPageSchema);

module.exports = BookingPage;

