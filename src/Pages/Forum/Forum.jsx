// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AddForumButton from './userExperience/addForumButton';
// import ForumForm from './userExperience/forumForm';
// import NewsAndPromotions from './newsAndPromotions/news';
// import ReviewForm from './reviews/reviewForm';
// import './forum.css';

// const ForumPage = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [headerHeight, setHeaderHeight] = useState(0);
//     const [posts, setPosts] = useState([]);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [reviewText, setReviewText] = useState('');

//     useEffect(() => {
//         const header = document.querySelector('.header');
//         if (header) {
//             setHeaderHeight(header.offsetHeight);
//         }

//         // Fetch posts from backend
//         axios.get('/api/posts')
//             .then(response => {
//                 setPosts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching posts:', error);
//             });
//     }, []);

//     const handleAddForumClick = () => {
//         setShowForm(true);
//         setSelectedPost(null);
//     };

//     const handleFormSave = (formData) => {
//         const { title, content, photos } = formData;

//         axios.post('htt/api/posts', { title, content, photos })
//             .then(response => {
//                 setPosts([...posts, response.data]);
//                 setShowForm(false);
//             })
//             .catch(error => {
//                 console.error('Error adding post:', error);
//             });
//     };

//     const handleFormCancel = () => {
//         setShowForm(false);
//     };

//     const handleBackToPosts = () => {
//         setSelectedPost(null);
//     };

//     const addReviewToPost = (postId) => {
//         if (reviewText.trim()) {
//             axios.patch(`/api/posts/${postId}`, { text: reviewText })
//                 .then(response => {
//                     const updatedPosts = posts.map(post => {
//                         if (post._id === postId) {
//                             return response.data;
//                         }
//                         return post;
//                     });
//                     setPosts(updatedPosts);
//                     setSelectedPost(response.data);
//                     setReviewText('');
//                 })
//                 .catch(error => {
//                     console.error('Error adding review:', error);
//                 });
//         }
//     };

//     const renderPostDetails = () => (
//         <div>
//             <div className='post'>
//                 <h2>{selectedPost.title}</h2>
//                 <p>{selectedPost.content}</p>
//             </div>

//             {/* Use ReviewForm component here */}
//             <ReviewForm
//                 selectedPost={selectedPost}
//                 addReviewToPost={addReviewToPost}
//                 setReviewText={setReviewText}
//                 reviewText={reviewText}
//             />
//             <button onClick={handleBackToPosts}>Back to Posts</button>
//         </div>
//     );

//     return (
//         <section className="forum-page" style={{ paddingTop: `${headerHeight}px` }}>
//             <h1>News and Promotions</h1>
//             <NewsAndPromotions />
//             {showForm ? (
//                 <ForumForm onSave={handleFormSave} onCancel={handleFormCancel} />
//             ) : selectedPost ? (
//                 renderPostDetails()
//             ) : (
//                 <>
//                     <div className="forum-header">
//                         <h1>Forum</h1>
//                         <AddForumButton onClick={handleAddForumClick} />
//                     </div>
//                     <div className="forum-grid">
//                         {posts.map(post => (
//                             <div key={post._id} className="post-preview">
//                                 <div className="post-header">
//                                     <h3>{post.title}</h3>
//                                 </div>
//                                 <div className="post-body">
//                                     <p>{post.content}</p>
//                                 </div>
//                                 <div className="post-actions">
//                                     <button onClick={() => setSelectedPost(post)}>View Details</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </section>
//     );
// };

// export default ForumPage;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ForumForm = ({ onSave, onCancel }) => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [photos, setPhotos] = useState([]);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const fileUrls = files.map(file => URL.createObjectURL(file));
//         setPhotos(fileUrls);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = { title, content, photos };
//             const response = await axios.post('/api/posts', formData);
//             onSave(response.data); // Pass saved post data back to parent component
//             setTitle('');
//             setContent('');
//             setPhotos([]);
//         } catch (error) {
//             console.error('Error creating post:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
//             <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
//             <input type="file" onChange={handleFileChange} multiple />
//             <button type="submit">Submit</button>
//             <button type="button" onClick={onCancel}>Cancel</button>
//         </form>
//     );
// };

// export default ForumForm;

//2

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './forum.css';
// import ReviewForm from './reviews/reviewForm';

// const NewsAndPromotions = () => {
//     return (
//         <div className="news-section">
//             <h2>News and Promotions</h2>
//             <p>Latest news and promotions will be displayed here...</p>
//         </div>
//     );
// };

// const ForumForm = ({ onSave, onCancel }) => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [photos, setPhotos] = useState([]);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const fileUrls = files.map(file => URL.createObjectURL(file));
//         setPhotos(fileUrls);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = { title, content, photos };
//             const response = await axios.post('http://localhost:5000/api/posts', formData);
//             onSave(response.data);
//             setTitle('');
//             setContent('');
//             setPhotos([]);
//         } catch (error) {
//             console.error('Error creating post:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
//             <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
//             <input type="file" onChange={handleFileChange} multiple />
//             <button type="submit">Submit</button>
//             <button type="button" onClick={onCancel}>Cancel</button>
//         </form>
//     );
// };

// const ForumPage = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [headerHeight, setHeaderHeight] = useState(0);
//     const [posts, setPosts] = useState([]);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [reviewText, setReviewText] = useState('');

//     useEffect(() => {
//         const header = document.querySelector('.header');
//         if (header) {
//             setHeaderHeight(header.offsetHeight);
//         }

//         axios.get('/api/posts')
//             .then(response => {
//                 setPosts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching posts:', error);
//             });
//     }, []);

//     const handleAddForumClick = () => {
//         setShowForm(true);
//         setSelectedPost(null);
//     };

//     const handleFormSave = (formData) => {
//         const { title, content, photos } = formData;

//         axios.post('/api/posts', { title, content, photos })
//             .then(response => {
//                 setPosts([...posts, response.data]);
//                 setShowForm(false);
//             })
//             .catch(error => {
//                 console.error('Error adding post:', error);
//             });
//     };

//     const handleFormCancel = () => {
//         setShowForm(false);
//     };

//     const handleBackToPosts = () => {
//         setSelectedPost(null);
//     };

//     const addReviewToPost = (postId) => {
//         if (reviewText.trim()) {
//             axios.patch(`/api/posts/${postId}`, { text: reviewText })
//                 .then(response => {
//                     const updatedPosts = posts.map(post => {
//                         if (post._id === postId) {
//                             return response.data;
//                         }
//                         return post;
//                     });
//                     setPosts(updatedPosts);
//                     setSelectedPost(response.data);
//                     setReviewText('');
//                 })
//                 .catch(error => {
//                     console.error('Error adding review:', error);
//                 });
//         }
//     };

//     const renderPostDetails = () => (
//         <div>
//             <div className='post'>
//                 <h2>{selectedPost.title}</h2>
//                 <p>{selectedPost.content}</p>
//             </div>

//             <ReviewForm
//                 selectedPost={selectedPost}
//                 addReviewToPost={addReviewToPost}
//                 setReviewText={setReviewText}
//                 reviewText={reviewText}
//             />
//             <button onClick={handleBackToPosts}>Back to Posts</button>
//         </div>
//     );

//     return (
//         <section className="forum-page" style={{ paddingTop: `${headerHeight}px` }}>
//             <div className="news-and-promotions">
//                 <h1>News and Promotions</h1>
//                 <NewsAndPromotions />
//             </div>
//             <div className="forum-section">
//                 {showForm ? (
//                     <ForumForm onSave={handleFormSave} onCancel={handleFormCancel} />
//                 ) : (
//                     <>
//                         <div className="forum-header">
//                             <h1>Forum</h1>
//                             <button onClick={handleAddForumClick}>Add Post</button>
//                         </div>
//                         <div className="forum-grid">
//                             {posts.map(post => (
//                                 <div key={post._id} className="post-preview">
//                                     <div className="post-header">
//                                         <h3>{post.title}</h3>
//                                     </div>
//                                     <div className="post-body">
//                                         <p>{post.content}</p>
//                                     </div>
//                                     <div className="post-actions">
//                                         <button onClick={() => setSelectedPost(post)}>View Details</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default ForumPage;

//can useee

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

        // Fetch posts from backend
        axios.get('http://localhost:5000/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    // Function to handle click on "Add Post" button
    const handleAddForumClick = () => {
        setShowForm(true);
        setSelectedPost(null);
    };

    // Function to handle saving form data
    const handleFormSave = (formData) => {
        const { title, content, photos } = formData;

        axios.post('http://localhost:5000/api/posts', { title, content, photos })
            .then(response => {
                setPosts([...posts, response.data]);
                setShowForm(false);
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
    };

     // Function to handle canceling form submission
    const handleFormCancel = () => {
        setShowForm(false);
    };

    // Function to go back to posts list from post details view
    const handleBackToPosts = () => {
        setSelectedPost(null);
    };

    // Function to add review to a post
    // const addReviewToPost = (postId) => {
    //     if (reviewText.trim()) {
    //         axios.patch('http://localhost:5000/api/posts/${postId}', { text: reviewText })
    //             .then(response => {
    //                 const updatedPosts = posts.map(post => {
    //                     if (post._id === postId) {
    //                         return response.data;
    //                     }
    //                     return post;
    //                 });
    //                 setPosts(updatedPosts);
    //                 setSelectedPost(response.data);
    //                 setReviewText('');
    //             })
    //             .catch(error => {
    //                 console.error('Error adding review:', error);
    //             });
    //     }
    // };
    const addReviewToPost = (postId) => {
        if (reviewText.trim()) {
            axios.patch(`http://localhost:5000/api/posts/${postId}`, { text: reviewText })
                .then(response => {
                    const updatedPosts = posts.map(post => {
                        if (post._id === postId) {
                            return response.data;
                        }
                        return post;
                    });
                    setPosts(updatedPosts);
                    setSelectedPost(response.data);
                    setReviewText('');
                })
                .catch(error => {
                    console.error('Error adding review:', error);
                });
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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NewsAndPromotions from './newsAndPromotions/news'; // Adjust path as per your project structure
// import ReviewForm from './reviews/reviewForm'; // Adjust path as per your project structure
// import './forum.css'; // Adjust path as per your project structure

// const ForumPage = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [headerHeight, setHeaderHeight] = useState(0);
//     const [posts, setPosts] = useState([]);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [reviewText, setReviewText] = useState('');

//     useEffect(() => {
//         const header = document.querySelector('.header');
//         if (header) {
//             setHeaderHeight(header.offsetHeight);
//         }

//         // Fetch posts from backend
//         axios.get('http://localhost:5000/api/posts')
//             .then(response => {
//                 setPosts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching posts:', error);
//             });
//     }, []);

//     // Function to handle form submission
//     const handleFormSave = async (formData) => {
//         const { title, content } = formData;

//         try {
//             // Send POST request to API with form data
//             const response = await axios.post('http://localhost:5000/api/posts', { title, content });

//             // Update posts state with new post data
//             setPosts([...posts, response.data]);
//             setShowForm(false); // Hide form after successful submission
//         } catch (error) {
//             console.error('Error adding post:', error);
//         }
//     };

//     // Function to handle cancel form submission
//     const handleFormCancel = () => {
//         setShowForm(false);
//     };

//     // Function to handle click on "View Details" button
//     const handleViewDetails = (post) => {
//         setSelectedPost(post);
//     };

//     // Function to handle going back to posts list from post details view
//     const handleBackToPosts = () => {
//         setSelectedPost(null);
//     };

//     // Function to add review to a post
//     const addReviewToPost = (postId) => {
//         if (reviewText.trim()) {
//             axios.patch(`http://localhost:5000/api/posts/${postId}`, { text: reviewText })
//                 .then(response => {
//                     const updatedPosts = posts.map(post => {
//                         if (post._id === postId) {
//                             return response.data;
//                         }
//                         return post;
//                     });
//                     setPosts(updatedPosts);
//                     setSelectedPost(response.data);
//                     setReviewText('');
//                 })
//                 .catch(error => {
//                     console.error('Error adding review:', error);
//                 });
//         }
//     };

//     // Function to render post details
//     const renderPostDetails = () => (
//         <div className="post-details">
//             <h2>{selectedPost.title}</h2>
//             <p>{selectedPost.content}</p>
//             <ReviewForm
//                 selectedPost={selectedPost}
//                 addReviewToPost={addReviewToPost}
//                 setReviewText={setReviewText}
//                 reviewText={reviewText}
//             />
//             <button onClick={handleBackToPosts}>Back to Posts</button>
//         </div>
//     );

//     return (
//         <section className="forum-page" style={{ paddingTop: `${headerHeight}px` }}>
//             <h1>News and Promotions</h1>
//             <NewsAndPromotions />
//             {showForm ? (
//                 <form onSubmit={handleFormSave}>
//                     <input type="text" placeholder="Title" required />
//                     <textarea placeholder="Content" required />
//                     <button type="submit">Submit</button>
//                     <button type="button" onClick={handleFormCancel}>Cancel</button>
//                 </form>
//             ) : selectedPost ? (
//                 renderPostDetails()
//             ) : (
//                 <>
//                     <div className="forum-header">
//                         <h1>Forum</h1>
//                         <button onClick={() => setShowForm(true)}>Add Forum</button>
//                     </div>
//                     <div className="forum-grid">
//                         {posts.map(post => (
//                             <div key={post._id} className="post-preview">
//                                 <div className="post-header">
//                                     <h3>{post.title}</h3>
//                                 </div>
//                                 <div className="post-body">
//                                     <p>{post.content}</p>
//                                 </div>
//                                 <div className="post-actions">
//                                     <button onClick={() => handleViewDetails(post)}>View Details</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </section>
//     );
// };

// export default ForumPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NewsAndPromotions from './newsAndPromotions/news'; // Adjust path as per your project structure
// import ReviewForm from './reviews/reviewForm'; // Adjust path as per your project structure
// import './forum.css'; // Adjust path as per your project structure

// const ForumPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [reviewText, setReviewText] = useState('');
//   const [fileInput, setFileInput] = useState(null); // State to handle file input

//   useEffect(() => {
//     // Fetch posts from backend when component mounts
//     fetchPosts();

//     // Calculate and set header height
//     const header = document.querySelector('.header');
//     if (header) {
//       setHeaderHeight(header.offsetHeight);
//     }
//   }, []);

//   // Function to fetch posts from backend
//   const fetchPosts = () => {
//     axios.get('http://localhost:5000/api/posts')
//       .then(response => {
//         setPosts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching posts:', error);
//       });
//   };

//   // Function to handle file input change
//   const handleFileChange = (e) => {
//     setFileInput(e.target.files[0]);
//   };

//   // Function to handle form submission for creating a new post
//   const handleFormSave = async (formData) => {
//     const { title, content } = formData;

//     try {
//       // Prepare form data with image file
//       const formDataWithImage = new FormData();
//       formDataWithImage.append('title', title);
//       formDataWithImage.append('content', content);
//       formDataWithImage.append('photo', fileInput); // Append file to form data

//       // Send POST request to API with form data
//       const response = await axios.post('http://localhost:5000/api/posts', formDataWithImage, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Update posts state with new post data
//       setPosts([...posts, response.data]);
//       setShowForm(false); // Hide form after successful submission
//     } catch (error) {
//       console.error('Error adding post:', error);
//     }
//   };

//   // Function to handle cancel form submission
//   const handleFormCancel = () => {
//     setShowForm(false);
//   };

//   // Function to handle click on "View Details" button
//   const handleViewDetails = (post) => {
//     setSelectedPost(post);
//   };

//   // Function to handle going back to posts list from post details view
//   const handleBackToPosts = () => {
//     setSelectedPost(null);
//   };

//   // Function to add review to a post
//   const addReviewToPost = (postId) => {
//     if (reviewText.trim()) {
//       axios.patch(`http://localhost:5000/api/posts/${postId}/addReview`, { text: reviewText })
//         .then(response => {
//           const updatedPosts = posts.map(post => {
//             if (post._id === postId) {
//               return response.data;
//             }
//             return post;
//           });
//           setPosts(updatedPosts);
//           setSelectedPost(response.data);
//           setReviewText('');
//         })
//         .catch(error => {
//           console.error('Error adding review:', error);
//         });
//     }
//   };

//   // Function to render post details
//   const renderPostDetails = () => (
//     <div className="post-details">
//       <h2>{selectedPost.title}</h2>
//       <p>{selectedPost.content}</p>
//       {selectedPost.photoUrl && <img src={selectedPost.photoUrl} alt="Post" />}
//       <ReviewForm
//         selectedPost={selectedPost}
//         addReviewToPost={addReviewToPost}
//         setReviewText={setReviewText}
//         reviewText={reviewText}
//       />
//       <button onClick={handleBackToPosts}>Back to Posts</button>
//     </div>
//   );

//   return (
//     <section className="forum-page" style={{ paddingTop: `${headerHeight}px` }}>
//       <h1>News and Promotions</h1>
//       <NewsAndPromotions />
//       {showForm ? (
//         <form onSubmit={handleFormSave}>
//           <input type="text" placeholder="Title" required />
//           <textarea placeholder="Content" required />
//           <input type="file" onChange={handleFileChange} required />
//           <button type="submit">Submit</button>
//           <button type="button" onClick={handleFormCancel}>Cancel</button>
//         </form>
//       ) : selectedPost ? (
//         renderPostDetails()
//       ) : (
//         <>
//           <div className="forum-header">
//             <h1>Forum</h1>
//             <button onClick={() => setShowForm(true)}>Add Forum</button>
//           </div>
//           <div className="forum-grid">
//             {posts.map(post => (
//               <div key={post._id} className="post-preview">
//                 <div className="post-header">
//                   <h3>{post.title}</h3>
//                 </div>
//                 <div className="post-body">
//                   <p>{post.content}</p>
//                   {post.photoUrl && <img src={post.photoUrl} alt="Post" />}
//                 </div>
//                 <div className="post-actions">
//                   <button onClick={() => handleViewDetails(post)}>View Details</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default ForumPage;


