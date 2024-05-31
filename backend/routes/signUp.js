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
        timeZoneName: 'short',
        timeZone: 'Asia/Kuala_Lumpur'
    };

    const malaysiaTime = new Intl.DateTimeFormat('en-US', options).format(date);
    const timezoneOffset = date.getTimezoneOffset();
    const offsetSign = timezoneOffset > 0 ? '-' : '+';
    const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
    const offsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
    const timezoneOffsetStr = `${offsetSign}${offsetHours}:${offsetMinutes}`;

    return `${malaysiaTime} GMT${timezoneOffsetStr} (Malaysia Time)`;
};

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
            createdAt: getFormattedDate(new Date()),  // Format date as string
            updatedAt: getFormattedDate(new Date())   // Format date as string
        });

        await newUser.save();

        console.log('New user created successfully:', newUser);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error signing up' });
    }
});

module.exports = router;
