const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
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
        type: String, 
    },
    updatedAt: {
        type: String, 
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: String
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
