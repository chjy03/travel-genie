const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); // Ensure this path is correct

// Route to handle report submission
router.post('/', async (req, res) => {
  try {
    // Destructuring the data from the request body
    const { issueText } = req.body; // Keep the field name consistent

    if (!issueText) {
      return res.status(400).send({ error: 'Issue text is required' });
    }

    // Create a new Report instance
    const report = new Report({
      issueText // Use consistent field name
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
