import React from 'react';
import './reviewForm.css';
import axios from 'axios';  // Import axios for HTTP requests

const ReviewForm = ({ selectedPost, setSelectedPost, reviewText, setReviewText }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (reviewText.trim()) {
            try {
                const response = await axios.post(`http://localhost:5000/api/posts/${selectedPost._id}/reviews`, {
                    text: reviewText
                });

                // Update the selectedPost with the new review
                const updatedPost = response.data;
                setSelectedPost(updatedPost);

                // Clear the textarea after submission
                setReviewText('');
            } catch (error) {
                console.error('Error adding review:', error);
            }
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