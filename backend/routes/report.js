const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); // Ensure this path is correct

// Function to get the current date and time in Malaysia's timezone
const getFormattedDate = (timestamp) => {
  let date = new Date(timestamp);
  // If hour is 24 or greater, set it to 00
  if (date.getHours() >= 24) {
      date.setHours(0);
  }

  const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      timeZone: 'Asia/Kuala_Lumpur'
  };

  let malaysiaTime = date.toLocaleString('en-US', options);
  malaysiaTime = malaysiaTime.replace(/,/g, ''); 
  malaysiaTime = malaysiaTime.replace(/\sGMT\+8/g, '');

  const timezoneOffset = date.getTimezoneOffset();
  const offsetSign = timezoneOffset > 0 ? '-' : '+';
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
  const offsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
  const timezoneOffsetStr = `${offsetSign}${offsetHours}${offsetMinutes.replace(':', '')}`;

  return `${malaysiaTime} GMT${timezoneOffsetStr} (Malaysia Time)`;
};

// Route to handle report submission
router.post('/', async (req, res) => {
  try {
    // Destructuring the data from the request body
    const { issueText } = req.body;

    if (!issueText) {
      return res.status(400).send({ error: 'Issue text is required' });
    }

    // Create a new Report instance with the current Malaysia date and time
    const report = new Report({
      issueText,
      issueDate: getFormattedDate(Date.now())
    });

    // Save the report to the database
    await report.save();

    console.log('Report submitted successfully:', report);

    // Send response
    res.status(201).send(report);
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).send({ error: 'Error submitting report. Please try again later.' });
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Report = require('../models/Report'); // Ensure this path is correct

// // Route to handle report submission
// router.post('/', async (req, res) => {
//   try {
//     // Destructuring the data from the request body
//     const { issueText } = req.body; // Keep the field name consistent

//     if (!issueText) {
//       return res.status(400).send({ error: 'Issue text is required' });
//     }

//     // Create a new Report instance
//     const report = new Report({
//       issueText // Use consistent field name
//     });

//     // Save the report to the database
//     await report.save();

//     console.log('Report submitted successfully:', report);

//     // Send response
//     res.status(201).send(report);
//   } catch (error) {
//     console.error('Error submitting report:', error);
//     res.status(500).send({ error: 'Error submitting report. Please try again later.' });
//   }
// });

// module.exports = router;

