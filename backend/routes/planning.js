const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// GET all destinations with optional search and rating filters
router.get("/", async (req, res) => {
  try {
    const { search, rating } = req.query;
    let query = {};

    // If search query is provided, add a OR condition to match title, location, or tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // If rating query is provided, add a condition to match destinations with rating greater than or equal to the provided value
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    const destinations = await Destination.find(query);
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Get a specific destination by ID
router.get("/detail/:id", async (req, res) => {
  try {
    const destination = await Destination.findOne({ id: req.params.id });
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;