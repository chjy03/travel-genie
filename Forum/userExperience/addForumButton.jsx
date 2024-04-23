import React from 'react';
import './addForumButton.css';

const AddForumButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="add-forum-button">
      Add Forum
    </button>
  );
};

export default AddForumButton;
