import React, { useState } from 'react';
import './forumForm.css';

const ForumForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (event) => {
    // This will create a FileList array, which will be stored in the state.
    setPhotos([...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      title,
      content,
      photos
    });
    // Reset the form fields
    setTitle('');
    setContent('');
    setPhotos([]);
    // Optionally close the form if needed, or navigate away
  };

  return (
    <div className="forum-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </label>
        <label>
          Description:
          <textarea 
            type="text"
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </label>
        <label>
          Upload Photos:
          <input 
            type="file" 
            multiple 
            onChange={handlePhotoUpload} 
          />
        </label>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel} >Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ForumForm;


