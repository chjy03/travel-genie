// import React, { useState } from 'react';
// import './reviewForm.css'

// const ReviewForm = ({ selectedPost, addReviewToPost, setReviewText, reviewText }) => {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (reviewText.trim()) {
//             addReviewToPost(selectedPost.id);
//             setReviewText('');  // Clear the textarea after submission
//         }
//     };

//     return (
//         <div className='review-form-container'>
//             <h3>Reviews:</h3>
//             <div className='reviews-container'>
//                 {selectedPost.reviews.map((review, index) => (
//                     <p key={index} className='review-item'>{review.text}</p>  // Assuming reviews are objects with 'text' properties
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="reviewText">Write your review:</label>
//                 <textarea
//                     id="reviewText"
//                     value={reviewText}
//                     onChange={e => setReviewText(e.target.value)}
//                     placeholder="Write your review here..."
//                 />
//                 <button type="submit">Add Review</button>
//             </form>
//         </div>
//     );
// };

// export default ReviewForm;

import React from 'react';
import './reviewForm.css';

const ReviewForm = ({ selectedPost, addReviewToPost, setReviewText, reviewText }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (reviewText.trim()) {
            addReviewToPost();
            setReviewText('');  // Clear the textarea after submission
        }
    };

    return (
        <div className='review-form-container'>
            <h3>Reviews:</h3>
            <div className='reviews-container'>
                {selectedPost.reviews.map((review, index) => (
                    <p key={index} className='review-item'>{review.text}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reviewText">Write your review:</label>
                <textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                />
                <button type="submit">Add Review</button>
            </form>
        </div>
    );
};

export default ReviewForm;

// ReviewForm.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import './reviewForm.css';

// const ReviewForm = ({ selectedPost, updatePost }) => {
//     const [reviewText, setReviewText] = useState('');

//     const handleAddReview = async () => {
//         try {
//             const response = await axios.patch(`http://localhost:5000/api/posts/${selectedPost._id}`, {
//                 text: reviewText,
//             });

//             updatePost(response.data); // Update post state with updated post data
//             setReviewText(''); // Clear review text after adding
//         } catch (error) {
//             console.error('Error adding review:', error);
//             // Handle error, show user feedback, etc.
//         }
//     };

//     return (
//         <div>
//             <textarea
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 placeholder="Write your review..."
//             />
//             <button onClick={handleAddReview}>Add Review</button>
//         </div>
//     );
// };

// export default ReviewForm;

