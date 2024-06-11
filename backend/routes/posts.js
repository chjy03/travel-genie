// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');

// // POST a new post
// router.post('/', async (req, res) => {
//     const { title, content } = req.body;

//     try {
//         const newPost = new Post({
//             title,
//             content,
//         });

//         const savedPost = await newPost.save();
//         res.status(201).json(savedPost);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); // Import multer
// const path = require('path');
// const Post = require('../models/Post'); // Adjust path as per your project structure

// // Multer storage configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Directory where files will be uploaded
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// const upload = multer({ storage }); // Initialize multer with storage configuration

// // POST endpoint to handle file upload and create a new post
// router.post('/', upload.single('photo'), async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const photoUrl = req.file ? `http://localhost:5000/${req.file.path}` : '';

//     const newPost = new Post({
//       title,
//       content,
//       photoUrl,
//     });

//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
//   } catch (error) {
//     console.error('Error adding post:', error);
//     res.status(500).json({ error: 'Failed to add post' });
//   }
// });

// module.exports = router;

// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// PATCH to add a review to a post
router.patch('/:postId', async (req, res) => {
    const { text } = req.body;
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.reviews.push(text); // Add review text to reviews array
        const savedPost = await post.save();

        res.json(savedPost);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

module.exports = router;
