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

// Forgot Password Route
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "No account with that email address exists." });
        }

        // Generate a token
        const token = crypto.randomBytes(20).toString('hex');

        // Set the token and its expiration date on the user object
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const mailOptions = {
            to: user.email,
            from: 'cindy.hii007@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/resetPassword/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ error: 'Error sending email' });
            }
            res.status(200).json({ message: 'An email has been sent to ' + user.email + ' with further instructions.' });
        });
    } catch (error) {
        console.error('Error in forgot password process:', error);
        res.status(500).json({ error: 'Error processing your request' });
    }
});

// Reset Password Route
// router.post('/', async (req, res) => {
//     try {
//         const user = await User.findOne({
//             resetPasswordToken: req.params.token,
//             resetPasswordExpires: { $gt: Date.now() } // Check if token is not expired
//         });

//         if (!user) {
//             return res.status(400).json({ error: "Password reset token is invalid or has expired." });
//         }

//         // Update the user's password
//         const { password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user.password = hashedPassword;

//         // Remove the reset token fields
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ message: "Password has been reset successfully." });
//     } catch (error) {
//         console.error('Error resetting password:', error);
//         res.status(500).json({ error: 'Error resetting password' });
//     }
// });

module.exports = router;
