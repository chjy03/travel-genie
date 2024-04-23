import React, { useState } from 'react';
import './reviewForm.css'

const ReviewForm = ({ selectedPost, addReviewToPost, setReviewText, reviewText }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (reviewText.trim()) {
            addReviewToPost(selectedPost.id);
            setReviewText('');  // Clear the textarea after submission
        }
    };

    return (
        <div className='review-form-container'>
            <h3>Reviews:</h3>
            <div className='reviews-container'>
                {selectedPost.reviews.map((review, index) => (
                    <p key={index} className='review-item'>{review.text}</p>  // Assuming reviews are objects with 'text' properties
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
