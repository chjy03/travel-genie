const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures email is unique
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['tourist', 'travelAgency'],
        default: 'tourist'
    },
    createdAt: {
        type: String, // You can also use Date type if preferred
        required: true
    },
    updatedAt: {
        type: String, // You can also use Date type if preferred
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

// Create user model
const User = mongoose.model('User', userSchema);

module.exports = User;
