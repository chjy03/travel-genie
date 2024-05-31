const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

const SECRET_KEY = 'secret';

// POST LOGIN
router.post('/', async (req, res) => {
    try {
        const { name, password } = req.body;

        console.log('Login attempt:', { name, password });

        const user = await User.findOne({ name });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        console.log('Login successful:', { userId: user._id });

        res.json({ message: "Login successfully", token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
