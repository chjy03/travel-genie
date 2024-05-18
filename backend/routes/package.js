const express = require('express');
const router = express.Router();
const Package = require('../models/ManagePackage');

// Search and filter travel packages
router.get('/search', async (req, res) => {
  const { destination, date, maxPrice } = req.query;

  const filter = {};

  if (destination) {
    filter.location = new RegExp(destination, 'i'); // Case-insensitive search
  }

  if (date) {
    filter.dateRanges = {
      $elemMatch: {
        startDate: { $lte: new Date(date) },
        endDate: { $gte: new Date(date) }
      }
    };
  }

  if (maxPrice) {
    filter.price = { $lte: Number(maxPrice) };
  }

  try {
    const packages = await Package.find(filter);
    res.json(packages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
