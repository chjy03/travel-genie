//routes
//managePackage.js
const express = require('express');
const router = express.Router();
const ManagePackage = require('../models/ManagePackage');

// Add a travel package
router.post('/', async (req, res) => {
  const { id, imgSrc, title, description, price, dayDuration, nightDuration, location, numberOfDates, dateRanges, itinerary } = req.body;

  const managePackage = new ManagePackage({
    id,
    imgSrc,
    title,
    description,
    price,
    dayDuration,
    nightDuration,
    location,
    numberOfDates,
    dateRanges,
    itinerary
  });

  try {
    const newManagePackage = await managePackage.save();
    res.status(201).json(newManagePackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch all manage packages with specific fields
router.get('/', async (req, res) => {
  try {
    const managePackages = await ManagePackage.find().select('id imgSrc title location description price dayDuration nightDuration numberOfDates dateRanges itinerary');
    res.json(managePackages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const managePackage = await ManagePackage.findOne({ id: req.params.id });
    if (!managePackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(managePackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
