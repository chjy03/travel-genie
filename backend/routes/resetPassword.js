const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure this path is correct
const router = express.Router();

const SECRET_KEY = 'secret'; // You should use an environment variable for this in a real app

// Configure your email transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cindy.hii007@gmail.com',
        pass: 'lclnkufqkcsdvsms'
    }
});

// Reset Password Route
router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() } // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ error: "Password reset token is invalid or has expired." });
        }

        // Update the user's password
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // Remove the reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password has been reset successfully." });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Error resetting password' });
    }
});

module.exports = router;
