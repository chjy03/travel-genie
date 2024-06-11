const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');

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
router.get('/me', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'userType']);

    if (!profile) {
      return res.status(400).send({ error: 'There is no profile for this user' });
    }

    // Save the report to the database
    await profile.save();

    console.log('Get the profile successfully:', profile);

    // Send response
    res.status(201).send(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).send({ error: 'Error getting profile. Please try again later.' });
  }
});

module.exports = router;




