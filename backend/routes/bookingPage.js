const express = require('express');
const router = express.Router();
const BookingPage = require('../models/BookingPage');

// Route to handle booking submission
router.post('/', async (req, res) => {
  try {
    // Destructuring the data from the request body
    const { packageId, selectedDate, persons } = req.body;
    
    // Create a new BookingPage instance
    const bookingPage = new BookingPage({
      packageId,
      selectedDate,
      persons
    });

    // Save the booking to the database
    await bookingPage.save();

    console.log('Booking submitted successfully:', bookingPage);

    // Send response
    res.status(201).send(bookingPage);
  } catch (error) {
    console.error('Error submitting booking:', error);
    res.status(500).send({ error: 'Error submitting booking. Please try again later.' });
  }
});

module.exports = router;

