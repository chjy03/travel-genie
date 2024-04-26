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
import './Card.css'


const Card = () => {
  const [paymentMessage, setPaymentMessage] = useState('');
  const navigate = useNavigate(); // Use the `useNavigate` hook for navigation

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    alert('Payment Successful!');
  };

  const handleBack = () => {
    navigate('/payment'); // Navigate back to the payment route
  };

  useEffect(() => {
    // Run when the component is mounted
  }, []); // Empty dependency array to run only once when the component mounts

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
                <input type='text' placeholder="MM/YY" required />
              </div>
            </div>

            <div className='CVVInput'>
              <label htmlFor='CVV'>CVV:</label>
              <div className='input flex'>
                <input type='text' placeholder="3 digits" required />
              </div>
            </div>
            <div class="button-container">
                <button id="back-btn" onClick={handleBack}>Back</button>
                <button id='pay-btn'type="submit">Pay Now</button>
            </div>
          </form>
            
        </div>
      </div>
    </section>
  );
};

export default Card;
