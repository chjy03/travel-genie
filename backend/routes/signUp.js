const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure this path is correct


// Function to get the current date and time in Malaysia's timezone
const getMalaysiaDateTime = () => {
    const date = new Date();
    const options = {
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

// Password validation function
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
};

// POST new users
router.post('/', async (req, res) => {
    try {
        // Destructuring the data from the request body
        const { name, email, password, userType } = req.body;

        if (!name || !email || !password || !userType) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate password
        if (!validatePassword(password)) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            });
        }   

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the current Malaysia date and time
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
            createdAt: getMalaysiaDateTime(), // Add the Malaysia time
            updatedAt: getMalaysiaDateTime()
        });

        // Save the new user to the database
        await newUser.save();

        console.log('New user created successfully:', newUser);

        // Send response
        res.status(201).json({ message: "User created successfully", user: newUser });
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

// POST new users
// router.post('/', async (req, res) => {
//     try {
//         // Destructuring the data from the request body
//         const { name, email, password, userType } = req.body; // Keep the field name consistent
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword, userType});
//         await newUser.save();
//         console.log('New user created successfully:', newUser);
//         res.status(201).json({ message: "User created successfully" });
//     }catch(error){
//         res.status(500).json({error: "Error signing up"});
//     }
// });


// // GET registered users
// router.get('/', async (req, res) => {
//     try{
//         const users = await User.find();
//         console.log('Existing Users:', users);
//         res.status(201).json(users);
//     }catch(error){
//         res.status(500).json({error: "Unable to get users"});
//     }
// });


// module.exports = router;

// POST new users
// router.post('/', async (req, res) => {
//     try {
//         // Destructuring the data from the request body
//         const { name, email, password, userType } = req.body; // Keep the field name consistent
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword, userType });
//         await newUser.save();
//         console.log('New user created successfully:', newUser);
//         res.status(201).json({ message: "User created successfully", user: newUser });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: "Error signing up" });
//     }
// });

// GET registered users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         console.log('Existing Users:', users);
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Unable to get users:', error);
//         res.status(500).json({ error: "Unable to get users" });
//     }
// });

module.exports = router;