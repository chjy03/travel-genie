import React from 'react';
import './Modal.css';

export default function Modal({ isOpen, toggleModal, content }) {
  // Adjust the body class based on the modal's state
  if (isOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const contentLines = content.split('\n'); // Split content on newline character

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Package Details</h2>
            {contentLines.map((line, index) => (
                <p key={index}>{line}</p> // Render each line separately
            ))}
            <button id="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}