const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // Get the user ID from the request parameters

        //console.log("Current user ID:", userId);

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId); // Fetch the user by ID from the database
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); // Respond with the user details
    } catch (error) {
        console.error("Error getting profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

