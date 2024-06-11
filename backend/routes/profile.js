// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Profile = require('../models/Profile');

// // Function to get the current date and time in Malaysia's timezone
// const getFormattedDate = (timestamp) => {
//   let date = new Date(timestamp);
//   // If hour is 24 or greater, set it to 00
//   if (date.getHours() >= 24) {
//       date.setHours(0);
//   }

//   const options = {
//       weekday: 'short',
//       month: 'short',
//       day: '2-digit',
//       year: 'numeric',
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       timeZoneName: 'short',
//       timeZone: 'Asia/Kuala_Lumpur'
//   };

//   let malaysiaTime = date.toLocaleString('en-US', options);
//   malaysiaTime = malaysiaTime.replace(/,/g, ''); 
//   malaysiaTime = malaysiaTime.replace(/\sGMT\+8/g, '');

//   const timezoneOffset = date.getTimezoneOffset();
//   const offsetSign = timezoneOffset > 0 ? '-' : '+';
//   const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
//   const offsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
//   const timezoneOffsetStr = `${offsetSign}${offsetHours}${offsetMinutes.replace(':', '')}`;

//   return `${malaysiaTime} GMT${timezoneOffsetStr} (Malaysia Time)`;
// };


// Route to handle report submission
// router.get('/me', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'userType']);

//     if (!profile) {
//       return res.status(400).send({ error: 'There is no profile for this user' });
//     }

//     // Save the report to the database
//     await profile.save();

//     console.log('Get the profile successfully:', profile);

//     // Send response
//     res.status(201).send(profile);
//   } catch (error) {
//     console.error('Error getting profile:', error);
//     res.status(500).send({ error: 'Error getting profile. Please try again later.' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Replace with your actual User model path

// // Example route to get user profile by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const userId = req.params.id; // Ensure you are getting the 'id' from request parameters
//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         const user = await User.findById(userId); // Replace with your method to fetch the user
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(user);
//     } catch (error) {
//         console.error("Error getting profile:", error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed to point to your User model
const bcrypt = require('bcrypt');

// Route to get user profile by ID
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware');

// router.get('/:id', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.params.id; // Get the user ID from the request parameters

//         // Log the user ID to the console
//         console.log("Current user ID:", userId);

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         const user = await User.findById(userId); // Fetch the user by ID from the database
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(user); // Respond with the user details
//     } catch (error) {
//         console.error("Error getting profile:", error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// Route to update user profile by ID
// router.put('/:userId', async (req, res) => {
//   try {
//       const userId = req.params.id; // Get the user ID from the request parameters
//       const { name, email, password } = req.body; // Destructure the details from the request body

//       if (!userId) {
//           return res.status(400).json({ message: 'User ID is required' });
//       }

//       let user = await User.findById(userId); // Fetch the user by ID from the database
//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       // Update user details
//       user.name = name || user.name;
//       user.email = email || user.email;

//       if (password) {
//           const salt = await bcrypt.genSalt(10);
//           user.password = await bcrypt.hash(password, salt);
//       }

//       await user.save(); // Save the updated user details to the database

//       res.json(user); // Respond with the updated user details
//   } catch (error) {
//       console.error("Error updating profile:", error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

// Route to update user profile by ID
router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // Get the user ID from the request parameters
        console.log('Profile user id', userId);
        const { name, email, password } = req.body; // Destructure the details from the request body

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        let user = await User.findById(userId); // Fetch the user by ID from the database
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save(); // Save the updated user details to the database

        res.json(user); // Respond with the updated user details
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Profile = require('../models/Profile');

// // Function to get the current date and time in Malaysia's timezone
// const getFormattedDate = (timestamp) => {
//   let date = new Date(timestamp);
//   // If hour is 24 or greater, set it to 00
//   if (date.getHours() >= 24) {
//       date.setHours(0);
//   }

//   const options = {
//       weekday: 'short',
//       month: 'short',
//       day: '2-digit',
//       year: 'numeric',
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       timeZoneName: 'short',
//       timeZone: 'Asia/Kuala_Lumpur'
//   };

//   let malaysiaTime = date.toLocaleString('en-US', options);
//   malaysiaTime = malaysiaTime.replace(/,/g, ''); 
//   malaysiaTime = malaysiaTime.replace(/\sGMT\+8/g, '');

//   const timezoneOffset = date.getTimezoneOffset();
//   const offsetSign = timezoneOffset > 0 ? '-' : '+';
//   const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
//   const offsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
//   const timezoneOffsetStr = `${offsetSign}${offsetHours}${offsetMinutes.replace(':', '')}`;

//   return `${malaysiaTime} GMT${timezoneOffsetStr} (Malaysia Time)`;
// };


// // Route to handle report submission
// router.get('/me', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'userType']);

//     if (!profile) {
//       return res.status(400).send({ error: 'There is no profile for this user' });
//     }

//     // Save the report to the database
//     await profile.save();

//     console.log('Get the profile successfully:', profile);

//     // Send response
//     res.status(201).send(profile);
//   } catch (error) {
//     console.error('Error getting profile:', error);
//     res.status(500).send({ error: 'Error getting profile. Please try again later.' });
//   }
// });

// module.exports = router;




