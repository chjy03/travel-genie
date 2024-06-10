//routes
//managePackage.js
// const express = require('express');
// const router = express.Router();
// const ManagePackage = require('../models/ManagePackage');

// // Add a travel package
// router.post('/', async (req, res) => {
//   const { id, imgSrc, title, description, price, dayDuration, nightDuration, location, numberOfDates, dateRanges, itinerary } = req.body;

//   const managePackage = new ManagePackage({
//     id,
//     imgSrc,
//     title,
//     description,
//     price,
//     dayDuration,
//     nightDuration,
//     location,
//     numberOfDates,
//     dateRanges,
//     itinerary
//   });

//   try {
//     const newManagePackage = await managePackage.save();
//     res.status(201).json(newManagePackage);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Fetch all manage packages with specific fields
// router.get('/', async (req, res) => {
//   try {
//     const managePackages = await ManagePackage.find().select('id imgSrc title location description price dayDuration nightDuration numberOfDates dateRanges itinerary');
//     res.json(managePackages);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const managePackage = await ManagePackage.findOne({ id: req.params.id });
//     if (!managePackage) {
//       return res.status(404).json({ message: 'Package not found' });
//     }
//     res.json(managePackage);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Search and filter packages
// // router.get('/search', async (req, res) => {
// //   const { destination, date, maxPrice } = req.query;
  
// //   // Build the search query
// //   let query = {};
// //   if (destination) {
// //     query.location = new RegExp(destination, 'i'); // Case-insensitive regex search
// //   }
// //   if (maxPrice) {
// //     query.price = { $lte: maxPrice };
// //   }
// //   if (date) {
// //     query.dateRanges = { $elemMatch: { startDate: { $lte: new Date(date) }, endDate: { $gte: new Date(date) } } };
// //   }

// //   try {
// //     const managePackages = await ManagePackage.find(query).select('id imgSrc title location description price dayDuration nightDuration numberOfDates dateRanges itinerary');
// //     res.json(managePackages);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // router.get('/search', async (req, res) => {
// //   const { destination, date, maxPrice } = req.query;

// //   try {
// //       const query = {};
// //       if (destination) query.location = { $regex: new RegExp(destination, 'i') }; // case insensitive match
// //       if (date) {
// //           const parsedDate = new Date(date);
// //           query['dateRanges.startDate'] = { $lte: parsedDate }; // date within range
// //           query['dateRanges.endDate'] = { $gte: parsedDate };
// //       }
// //       if (maxPrice) query.price = { $lte: Number(maxPrice) };

// //       console.log('Query:', query); // Debugging line to log the query

// //       const managePackages = await ManagePackage.find(query).select('id imgSrc title location description price dayDuration nightDuration numberOfDates dateRanges itinerary');

// //       if (managePackages.length === 0) {
// //         return res.status(404).json({ message: 'Package not found' });
// //     }
    
// //       res.json(managePackages);
// //   } catch (err) {
// //       res.status(500).json({ message: err.message });
// //   }
// // });

// router.get('/search', async (req, res) => {
//   console.log('Received search request');
//   let { destination, date, maxPrice } = req.query;
//   console.log('Query Params:', { destination, date, maxPrice });

//   try {
//     if (!destination || !date || !maxPrice) {
//       return res.status(400).json({ message: 'Invalid parameters' });
//     }

//     // Trim newline characters and sanitize inputs
//     destination = destination.trim();
//     date = date.trim();
//     maxPrice = maxPrice.trim();
//     const parsedMaxPrice = Number(maxPrice);

//     if (isNaN(parsedMaxPrice)) {
//       return res.status(400).json({ message: 'Invalid price format' });
//     }

//     const searchDate = new Date(date);
//     if (isNaN(searchDate)) {
//       return res.status(400).json({ message: 'Invalid date format' });
//     }

//     // Constructing the query
//     const query = {
//       location: { $regex: destination, $options: 'i' },
//       'dateRanges.startDate': { $lte: searchDate },
//       'dateRanges.endDate': { $gte: searchDate },
//       price: { $lte: parsedMaxPrice },
//     };
//     console.log('Constructed Query:', JSON.stringify(query, null, 2));

//     // Finding packages based on the query
//     const packages = await ManagePackage.find(query).select('id imgSrc title location description price dayDuration nightDuration numberOfDates dateRanges itinerary');
//     console.log('Packages Found:', packages);

//     if (packages.length === 0) {
//       return res.status(404).json({ message: 'Package not found' });
//     }
//     res.json(packages);
//   } catch (error) {
//     console.error('Error fetching packages:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;


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

// Fetch existing package IDs
router.get('/ids', async (req, res) => {
  try {
    const ids = await ManagePackage.distinct('id');
    console.log('Fetched IDs:', ids);
    res.json(ids);
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

// Search and filter packages
router.post('/search', async (req, res) => {
  console.log('Received search request', req.body);
  let { destination, date, maxPrice } = req.body;
  console.log('Query Params:', { destination, date, maxPrice });

  try {
    if (!destination || !date || !maxPrice) {
      return res.status(400).json({ message: 'Invalid parameters' });
    }

    // Trim newline characters and sanitize inputs
    destination = destination.trim();
    date = date.trim();
    // maxPrice = maxPrice.trim();
    const parsedMaxPrice = Number(maxPrice);

    if (isNaN(parsedMaxPrice)) {
      return res.status(400).json({ message: 'Invalid price format' });
    }

    const searchDate = new Date(date);
    if (isNaN(searchDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Constructing the query
    const query = {
      location: { $regex: destination, $options: 'i' },
      'dateRanges.startDate': { $lte: searchDate },
      'dateRanges.endDate': { $gte: searchDate },
      price: { $lte: parsedMaxPrice },
    };
    console.log('Constructed Query:', JSON.stringify(query, null, 2));

    // Finding packages based on the query
    const packages = await ManagePackage.find(query).select('id imgSrc title location description price dayDuration nightDuration numberOfDates dateRanges itinerary');
    console.log('Packages Found:', packages);

    if (packages.length === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
