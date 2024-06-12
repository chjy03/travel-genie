const express = require('express');
const router = express.Router();
const BookingPage = require('../models/BookingPage');

// Route to handle booking submission
router.post('/', async (req, res) => {
  try {
    const { packageId, selectedDate, totalPersons, persons, totalCost, status = 'unpaid' } = req.body;

    const bookingPage = new BookingPage({
      packageId,
      selectedDate,
      totalPersons,
      persons,
      totalCost,
      status
    });

    await bookingPage.save();

    console.log('Booking submitted successfully:', bookingPage);

    res.status(201).send(bookingPage);
  } catch (error) {
    console.error('Error submitting booking:', error);
    res.status(500).send({ error: 'Error submitting booking. Please try again later.' });
  }
});

// Route to get all bookings
router.get('/', async (req, res) => {
  try {
    const bookingPage = await BookingPage.find().select('packageId selectedDate totalPersons totalCost status');
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

// Update booking status to 'paid'
router.put('/:_id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params._id;

    const bookingPage = await BookingPage.findById(bookingId);
    if (!bookingPage) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    bookingPage.status = status;
    await bookingPage.save();

    res.json({ message: 'Booking status updated successfully' });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Error updating booking status' });
  }
});

// Route to update booking status to 'cancelled'
router.put('/:_id/cancel', async (req, res) => {
  try {
    const bookingId = req.params._id;
    console.log(`Received request to cancel booking with ID: ${bookingId}`);

    const bookingPage = await BookingPage.findById(bookingId);
    if (!bookingPage) {
      console.log(`Booking with ID: ${bookingId} not found`);
      return res.status(404).json({ message: 'Booking not found' });
    }

    bookingPage.status = 'cancelled';
    await bookingPage.save();
    console.log(`Booking with ID: ${bookingId} cancelled successfully`);

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

// Route to fetch totalPersons by packageId
router.get('/:_id/totalPersons', async (req, res) => {
  const bookingId = req.params._id;

  try {
    const booking = await BookingPage.findOne({ _id: bookingId });
    if (!booking) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json({ totalPersons: booking.totalPersons });
  } catch (error) {
    console.error('Error fetching totalPersons:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update totalCost
router.put('/:_id/totalCost', async (req, res) => {
  const bookingId = req.params._id;
  const { totalCost } = req.body;

  try {
    const bookingPage = await BookingPage.findById(bookingId);
    if (!bookingPage) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    bookingPage.totalCost = totalCost;
    await bookingPage.save();

    res.json({ message: 'Total cost updated successfully' });
  } catch (error) {
    console.error('Error updating total cost:', error);
    res.status(500).json({ message: 'Error updating total cost' });
  }
});

module.exports = router;
