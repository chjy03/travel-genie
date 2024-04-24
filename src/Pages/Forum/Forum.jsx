import React, { useEffect, useState } from 'react';
import AddForumButton from './userExperience/addForumButton';
import ForumForm from './userExperience/forumForm';
import NewsAndPromotions from './newsAndPromotions/news';
import ReviewForm from './reviews/reviewForm';
import './forum.css'

const ForumPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [posts, setPosts] = useState([
      { id: 1, title: 'Very Satisfied with Star Triangle!!', content: 'Trip was well organized by star triangle. Thoroughly enjoyed it . Stays was excellent Sunset cruise and mangrove forest was the highlight', reviews: [] },
      { id: 2, title: 'Johor is fun', content: 'This is the second post', reviews: [] },
      { id: 3, title: 'Penang is fun', content: 'This is the third post', reviews: [] }
  ]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
      const header = document.querySelector('.header');
      if (header) {
          setHeaderHeight(header.offsetHeight);
      }
  }, []);

  const handleAddForumClick = () => {
      setShowForm(true);
      setSelectedPost(null);
  };

  const handleFormSave = (formData) => {
    const { title, content, photos } = formData;
    setShowForm(false);
    setPosts(posts => [
      ...posts,
      {
        title,
        content: content, 
        photos,
        id: posts.length + 1,
        reviews: [],
      }
    ]);
  };  

  const handleFormCancel = () => {
      setShowForm(false);
  };

  const handleBackToPosts = () => {
      setSelectedPost(null);
  };

  const addReviewToPost = (postId) => {
    if (reviewText.trim()) {
        let newSelectedPost = null;
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const newReviews = [...post.reviews, { text: reviewText, timestamp: new Date().getTime() }];
                newSelectedPost = { ...post, reviews: newReviews };
                return newSelectedPost;
            }
            return post;
        });
        setPosts(updatedPosts);
        if (newSelectedPost) {
            setSelectedPost(newSelectedPost);
        }
        setReviewText(''); // Clear review text after submission
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
          <NewsAndPromotions/>
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
                {posts.map((post, index) => (
                  <div key={index} className="post-preview">
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