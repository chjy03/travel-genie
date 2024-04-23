import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const PaymentPage = () => {
  // State to manage payment message
  const [paymentMessage, setPaymentMessage] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Simulate payment processing
    setTimeout(() => {
      setPaymentMessage('Payment successful!');
    }, 2000);
  };

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1); // Use React Router to navigate to the booking page
  };

  useEffect(() => {
    // This hook will execute once when the component is mounted
  }, []); // Empty dependency array to ensure it runs once

  return (
    <div className="container">
      <h2>Please enter your card details</h2>
      <form id="payment-form" onSubmit={handleFormSubmit}>
        <label htmlFor="card-number">Card Number:</label>
        <input type="text" id="card-number" placeholder="Enter card number" required />
        
        <label htmlFor="expiry">Expiry Date:</label>
        <input type="text" id="expiry" placeholder="MM/YY" required />
        
        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" placeholder="Enter CVV" required />
        
        <button type="submit">Pay Now</button>
      </form>
      
      <div id="message">{paymentMessage}</div>
      
      <button id="back-btn" onClick={handleBack}>Back</button>
    </div>
  );
};

export default PaymentPage;
