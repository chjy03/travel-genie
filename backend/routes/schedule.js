const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const Destination = require("../models/Destination");

// POST new schedule
router.post('/', async (req, res) => {
  const schedule = new Schedule({
    userId: req.body.userId,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    duration: req.body.duration,
    selectedDestinations: req.body.selectedDestinations,
  });

  try {
    // Save the new Schedule to the database
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json("Server error");
  }
});

// GET schedule data for a user
router.get('/:userId', async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ userId: req.params.userId });
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Fetch destination details based on the selected destinations in the schedule
    const destinations = await Destination.find({
      title: { $in: schedule.selectedDestinations },
    });

    res.json({ schedule, destinations });
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;