import React, { useState } from 'react';
import './forumForm.css';

const ForumForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      title,
      content,
    });
    // Reset the form fields
    setTitle('');
    setContent('');
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
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel} >Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ForumForm;


