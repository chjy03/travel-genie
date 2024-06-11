const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

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


// POST new users
// router.post('/', async (req, res) => {
//     try {
//         const { name, email, password, userType } = req.body;

//         if (!name || !email || !password || !userType) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Validate password
//         const validatePassword = (password) => {
//             const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//             return passwordRegex.test(password);
//         };

//         if (!validatePassword(password)) {
//             return res.status(400).json({
//                 error: 'Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
//             });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             userType,
           
//         });

//         console.log(newUser.createdAt);
//         await newUser.save();

//         console.log('New user created successfully:', newUser);
//         res.status(201).json({ message: "User created successfully", user: newUser });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Error signing up' });
//     }
// });
// POST new users
router.post('/', async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;

        if (!name || !email || !password || !userType) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate password
        const validatePassword = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            return passwordRegex.test(password);
        };

        if (!validatePassword(password)) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
        });

        // Save the new user to the database
        await newUser.save();

        // Generate a string representation of the userId
        const userId = newUser._id.toString();

        console.log('New user created successfully:', newUser);
        res.status(201).json({ message: "User created successfully", userId: userId, user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error signing up' });
    }
});


// GET registered users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        console.log('Existing Users:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Unable to get users:', error);
        res.status(500).json({ error: 'Unable to get users' });
    }
});

module.exports = router;


// const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const router = express.Router();

// // Function to get the current date and time in Malaysia's timezone
// const getFormattedDate = (timestamp) => {
//     let date = new Date(timestamp);
//     // If hour is 24 or greater, set it to 00
//     if (date.getHours() >= 24) {
//         date.setHours(0);
//     }

//     const options = {
//         weekday: 'short',
//         month: 'short',
//         day: '2-digit',
//         year: 'numeric',
//         hour12: false,
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         timeZoneName: 'short',
//         timeZone: 'Asia/Kuala_Lumpur'
//     };

//     let malaysiaTime = date.toLocaleString('en-US', options);
//     malaysiaTime = malaysiaTime.replace(/,/g, ''); 
//     malaysiaTime = malaysiaTime.replace(/\sGMT\+8/g, '');

//     const timezoneOffset = date.getTimezoneOffset();
//     const offsetSign = timezoneOffset > 0 ? '-' : '+';
//     const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
//     const offsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
//     const timezoneOffsetStr = `${offsetSign}${offsetHours}${offsetMinutes.replace(':', '')}`;

//     return `${malaysiaTime} GMT${timezoneOffsetStr} (Malaysia Time)`;
// };


// // POST new users
// router.post('/', async (req, res) => {
//     try {
//         const { name, email, password, userType } = req.body;

//         if (!name || !email || !password || !userType) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Validate password
//         const validatePassword = (password) => {
//             const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//             return passwordRegex.test(password);
//         };

//         if (!validatePassword(password)) {
//             return res.status(400).json({
//                 error: 'Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
//             });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             userType,
           
//         });

//         console.log(newUser.createdAt);
//         await newUser.save();

//         console.log('New user created successfully:', newUser);
//         res.status(201).json({ message: "User created successfully", user: newUser });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Error signing up' });
//     }
// });

// // GET registered users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         console.log('Existing Users:', users);
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Unable to get users:', error);
//         res.status(500).json({ error: 'Unable to get users' });
//     }
// });

// module.exports = router;
