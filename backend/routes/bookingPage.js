const express = require('express');
const router = express.Router();
const BookingPage = require('../models/BookingPage');

// Route to handle booking submission
router.post('/', async (req, res) => {
  try {
    // Destructuring the data from the request body
    const { packageId, selectedDate, persons, status = 'unpaid' } = req.body;
    
    // Create a new BookingPage instance
    const bookingPage = new BookingPage({
      packageId,
      selectedDate,
      persons, // Here, `persons` is the array of form data
      status   // Default to 'unpaid' if not provided
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

// Route to get all bookings
router.get('/', async (req, res) => {
  try {
    const bookingPage = await BookingPage.find().select('packageId selectedDate status');
    res.json(bookingPage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a booking by packageId
router.get('/:packageId', async (req, res) => {
  try {
    const bookingPage = await BookingPage.findOne({ packageId: req.params.packageId });
    if (!bookingPage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(bookingPage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
