import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddForumButton from './userExperience/addForumButton';
import ForumForm from './userExperience/forumForm';
import NewsAndPromotions from './newsAndPromotions/news';
import ReviewForm from './reviews/reviewForm';
import './forum.css';

const ForumPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const header = document.querySelector('.header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    fetchPosts(); // Fetch posts on component mount
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts'); // Adjust endpoint as per your backend setup
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleFormSave = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData); // Adjust endpoint as per your backend setup
      setPosts([...posts, response.data]); // Add new post to local state
      setShowForm(false); // Hide form after saving
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleAddForumClick = () => {
    setShowForm(true);
    setSelectedPost(null);
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
  };

  const addReviewToPost = async (postId) => {
    if (reviewText.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/posts/${postId}/reviews', { text: reviewText }); // Adjust endpoint for adding reviews
        const updatedPosts = posts.map(post =>
          post._id === postId ? { ...post, reviews: response.data.reviews } : post
        );
        setPosts(updatedPosts);
        setSelectedPost({ ...selectedPost, reviews: response.data.reviews });
        setReviewText(''); // Clear review text after submission
      } catch (error) {
        console.error('Error adding review:', error);
      }
    }
  };

  const renderPostDetails = () => (
    <div>
      <div className='post'>
        <h2>{selectedPost.title}</h2>
        <p>{selectedPost.content}</p>
      </div>

      {/* Use ReviewForm component here */}
      <ReviewForm
        selectedPost={selectedPost}
        addReviewToPost={addReviewToPost}
        setReviewText={setReviewText}
        reviewText={reviewText}
      />
      <button onClick={handleBackToPosts}>Back to Posts</button>
    </div>
  );


  return (
    <section className="forum-page" style={{ paddingTop: `${headerHeight}px` }}>
      <h1>News and Promotions</h1>
      <NewsAndPromotions />
      {showForm ? (
        <ForumForm onSave={handleFormSave} onCancel={handleFormCancel} />
      ) : selectedPost ? (
        renderPostDetails()
      ) : (
        <>
          <div className="forum-header">
            <h1>Forum</h1>
            <AddForumButton onClick={handleAddForumClick} />
          </div>
          <div className="forum-grid">
            {posts.map(post => (
              <div key={post._id} className="post-preview">
                <div className="post-header">
                  <h3>{post.title}</h3>
                </div>
                <div className="post-body">
                  <p>{post.content}</p>
                </div>
                <div className="post-actions">
                  <button onClick={() => setSelectedPost(post)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ForumPage;
