const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schedule = require("../models/Schedule");
const Destination = require("../models/Destination");

// Create schedule
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { startDate, endDate, duration, selectedDestinations } = req.body;

    // Create a new instance of Schedule
    const Schedule = new Schedule({
      startDate,
      endDate,
      duration,
      selectedDestinations,
    });

    // Save the new Schedule to the database
    const savedSchedule = await newSchedule.save();
    console.log("New schedule saved:", savedSchedule);

    // Send a response with the new schedule
    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).send("Server error");
  }
});

// GET schedule data
router.get("/", async (req, res) => {
  try {
    // Fetch the schedule data
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate(
      "selectedDestinations"
    );
    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to fetch destinations by IDs
router.post("/destinations", async (req, res) => {
  const { selectedDestinations } = req.body;
  try {
    const destinations = await Destination.find({title: { $in: selectedDestinations }, });
    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ error: "Error fetching destinations" });
  }
});

module.exports = router;
