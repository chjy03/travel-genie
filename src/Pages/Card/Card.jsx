// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Card.css'
// import video from '../../Assets/video.mp4'

// const Card = () => {
//   const [paymentMessage, setPaymentMessage] = useState('');
//   const navigate = useNavigate(); // Use the `useNavigate` hook for navigation

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Simulate payment processing with a delay
//     setTimeout(() => {
//       setPaymentMessage('Payment successful!');}, 2000);
//   };

//   const handleBack = () => {
//     navigate('/payment'); // Navigate back to the payment route
//   };

//   useEffect(() => {
//     // Run when the component is mounted
//   }, []); // Empty dependency array

//     return (
//         <section className = 'card'>
//             <div className = "overlay"></div>
//             <video src = {video} muted autoPlay loop type="video/mp4"></video>

//             <div className='cardContent container'>
//                 <div className='textDiv'>
//                     <span className='smallText'>
//                         For payment
//                     </span>
//                     <h1 className='cardTitle'>
//                         Please enter your card details
//                     </h1>
//                 </div>

//                 <div className='cardDiv grid'>
//                     <form id="payment-form" onSubmit={handleFormSubmit}>
//                     <div className='detailInput'>
//                         <label htmlFor='cardNo'>Card Number:</label>
//                         <div className='input flex'>
//                             <input type='text' placeholder="Enter card number" required />
//                         </div>
//                     </div>

                    
//                     <div className='dateInput'>
//                         <label htmlFor='date'>Expiry date:</label>
//                         <div className='input flex'>
//                             <input type='text' placeholder="MM/YY" required />
//                         </div>
//                     </div>

//                     <div className='CVVInput'>
//                         <label htmlFor='CVV'>CVV:</label>
//                         <div className='input flex'>
//                             <input type='text' placeholder="3 digits" required />
//                         </div>
//                     </div>

//                     <button type="submit">Pay Now</button>
//                     <div id="message">{paymentMessage}</div>
//                     <button id="back-btn" onClick={handleBack}>Back</button>
//                     </form>
//                 </div>

                

//             </div>
//         </section>
//     )
// }

// export default Card;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = () => {
  const [paymentMessage, setPaymentMessage] = useState('');
  const [bookingId, setBookingId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the booking ID with unpaid status when the component mounts
    const fetchUnpaidBookingId = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookingPage');
        const bookingData = await response.json();

        // Filter the booking with unpaid status
        const unpaidBooking = bookingData.find(booking => booking.status === 'unpaid');
        
        if (unpaidBooking) {
          setBookingId(unpaidBooking._id);
        } else {
          setPaymentMessage('No unpaid booking found.');
        }
      } catch (error) {
        console.error('Error fetching booking ID:', error);
        setPaymentMessage('Error fetching booking ID. Please try again later.');
      }
    };

    fetchUnpaidBookingId();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!bookingId) {
      setPaymentMessage('No unpaid booking found.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/bookingPage/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'paid' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }

      alert('Payment Successful!');
      setTimeout(() => {
        navigate('/purchases'); // Navigate to purchases page
      }, 2000);
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/payment'); // Navigate back to the payment route
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.trim();
    if (!/^\d{2}\/\d{2}$/.test(value)) {
      setPaymentMessage('Please enter Expiry Date in MM/YY format.');
    } else {
      setPaymentMessage('');
    }
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.trim();
    if (value.length > 3 || !/^\d{3}$/.test(value)) {
      setPaymentMessage('CVV must be exactly 3 digits.');
    } else {
      setPaymentMessage('');
    }
  };

  return (
    <section className='card'>
      <div className="overlay"></div>

      <div className='cardContent container'>
        <div className='textDiv'>
          <span className='smallText'>For payment</span>
          <h1 className='cardTitle'>Please enter your card details</h1>
        </div>

        <div className='cardDiv grid'>
          <form id="payment-form" onSubmit={handleFormSubmit}>
            <div className='detailInput'>
              <label htmlFor='cardNo'>Card Number:</label>
              <div className='input flex'>
                <input type='text' placeholder="Enter card number" required />
              </div>
            </div>

            <div className='dateInput'>
              <label htmlFor='date'>Expiry date:</label>
              <div className='input flex'>
                <input
                  type='text'
                  placeholder="MM/YY"
                  onChange={handleExpiryChange}
                  required
                />
              </div>
            </div>

            <div className='CVVInput'>
              <label htmlFor='CVV'>CVV:</label>
              <div className='input flex'>
                <input
                  type='text'
                  placeholder="3 digits"
                  onChange={handleCVVChange}
                  required
                />
              </div>
            </div>
            <div className="button-container">
              <button id="back-btn" onClick={handleBack}>Back</button>
              <button id='pay-btn' type="submit">Pay Now</button>
            </div>
            {paymentMessage && <div id="message">{paymentMessage}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Card;

