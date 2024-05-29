const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct


// router.post('/', async (req, res) => {
//     try {
//         // Extract user information from request body
//         const { name, email, password, userType } = req.body;
    
//         // Check if the email already exists
//         const existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             // If user already exists, return an error response
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         // If email is unique, create a new user
//         const newUser = await User.create(req.body);

//         // Save the new user to the database
//         await newUser.save();

//         console.log('User registered successfully:', newUser);
//         res.status(201).json(newUser);    

//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Route to handle signUp submission
router.post('/', async (req, res) => {
    try {
        // Destructuring the data from the request body
        const { name, email, password, userType } = req.body; // Keep the field name consistent
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, userType});
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }catch(error){
        res.status(500).json({error: "Error signing up"});
    }
});

//     if (!name || !email ||!password || !userType) {
//       return res.status(400).send({ error: 'Please fill in all the details' });
//     }

//     // Create a new Report instance
//     const newUser = new User({
//       name, email, password: hashedPassword, userType // Use consistent field name
//     });

//     // Save the report to the database
//     await newUser.save();

//     console.log('User created successfully:', newUser);

//     // Send response
//     res.status(201).send(newUser);
//   } catch (error) {
//     console.error('Error register:', error);
//     res.status(500).send({ error: 'Error register. Please try again later.' });
//   }
// });

module.exports = router;
