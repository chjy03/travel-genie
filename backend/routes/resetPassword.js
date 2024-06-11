const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const router = express.Router();

// Reset Password Route
router.post('/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        console.log(`Received token: ${token}`);

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            console.log('Token is invalid or has expired.');
            return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // Clear the reset token and expiration
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Error resetting password. Please try again.' });
    }
});

module.exports = router;



