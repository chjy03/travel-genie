//success
// // models/Post.js
// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     reviews: [{ type: String }], // Array to store reviews
// });

// module.exports = mongoose.model('Post', postSchema);

// models/post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    reviews: [
        {
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
