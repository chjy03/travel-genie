const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

const SECRET_KEY = 'secret';

// POST LOGIN
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        console.log('Login attempt:', { email, password });

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Fetch additional user information (e.g., userType) from the database
        const { userType } = user;
        const userId = user._id.toString();
        const token = jwt.sign({ userId: user._id, userType }, SECRET_KEY, { expiresIn: "1h" });
        console.log('Login successful:', { userId: user._id, userType, token });

        res.json({ message: "Login successfully", token, userType, userId, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
