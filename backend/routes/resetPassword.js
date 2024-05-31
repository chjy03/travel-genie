const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const router = express.Router();

// Function to get the current date and time in Malaysia's timezone
const getFormattedDate = (date) => {
    const options = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kuala_Lumpur',
        timeZoneName: 'short',
        hour12: true
    };

    const malaysiaTime = new Intl.DateTimeFormat('en-US', options).format(date);
    const timezoneOffset = date.getTimezoneOffset();
    const offsetSign = timezoneOffset > 0 ? '-' : '+';
    const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
    const offsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
    const timezoneOffsetStr = `${offsetSign}${offsetHours}:${offsetMinutes}`;

    return `${malaysiaTime} GMT${timezoneOffsetStr} (Malaysia Time)`;
};

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

        // Update the updatedAt field explicitly and log formatted date
        const updatedAtTimeStamp = new Date();
        user.updatedAt = updatedAtTimeStamp; // Store as Date object
        console.log("Updated At: " + getFormattedDate(updatedAtTimeStamp)); // Log formatted date

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Error resetting password. Please try again.' });
    }
});

module.exports = router;
