// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     reviews: [{
//         text: String,
//         timestamp: {
//             type: Date,
//             default: Date.now
//         }
//     }]
// });

// module.exports = mongoose.model('Post', postSchema);

// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    reviews: [{ type: String }], // Array to store reviews
});

module.exports = mongoose.model('Post', postSchema);

