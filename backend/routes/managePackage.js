const express = require('express');
const router = express.Router();
const ManagePackage = require('../models/ManagePackage');

// Add a travel package
router.post('/', async (req, res) => {
  const { id, imgSrc, title, description, price, duration, location, numberOfDates, dateRanges } = req.body;

  const managePackage = new ManagePackage({
    id,
    imgSrc,
    title,
    description,
    price,
    duration,
    location,
    numberOfDates,
    dateRanges
  });

  try {
    const newManagePackage = await managePackage.save();
    res.status(201).json(newManagePackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
