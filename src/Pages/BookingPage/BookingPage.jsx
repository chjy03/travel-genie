//Connect to MongoDB

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './bookingPage.css';
// import axios from 'axios';

// const BookingPage = () => {
//   const { id } = useParams();

//   const [selectedDate, setSelectedDate] = useState('');
//   const [totalPersons, setTotalPersons] = useState(1);
//   const [formData, setFormData] = useState([
//     {
//       name: '',
//       email: '',
//       phone: '',
//       icPassport: ''
//     }
//   ]);
//   const [policyChecked, setPolicyChecked] = useState(false);
//   const [showPolicyDetails, setShowPolicyDetails] = useState(false);

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleTotalPersonsChange = (e) => {
//     const count = parseInt(e.target.value);
//     setTotalPersons(count < 1 ? 1 : count);
//     setFormData(prevFormData => {
//       const newFormData = [...prevFormData];
//       while (newFormData.length < count) {
//         newFormData.push({ name: '', email: '', phone: '', icPassport: '' });
//       }
//       while (newFormData.length > count) {
//         newFormData.pop();
//       }
//       return newFormData;
//     });
//   };

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     setFormData(prevFormData => {
//       const newFormData = [...prevFormData];
//       newFormData[index][name] = value;
//       return newFormData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedDate || !policyChecked || formData.some(person => !person.name || !person.email || !person.phone || !person.icPassport || !isValidPhoneNumber(person.phone) || !isValidICPassport(person.icPassport))) {
//       alert('Please fill all fields correctly and accept the booking policy.');
//       return;
//     }
//     try {
//       const bookingData = {
//         packageId: id,
//         selectedDate,
//         persons: formData
//       };
//       await axios.post('http://localhost:5000/api/bookingPage', bookingData);
//       console.log('Booking submitted successfully!');
//       alert('Booking submitted successfully!');
//       // Clear form after successful submission
//       setSelectedDate('');
//       setTotalPersons(1);
//       setFormData([
//         {
//           name: '',
//           email: '',
//           phone: '',
//           icPassport: ''
//         }
//       ]);
//       window.location.href = "/payment"; // Redirect to payment page
//     } catch (error) {
//       console.error('Error submitting booking:', error);
//     }
//   };

//   // Function to validate phone number format
//   const isValidPhoneNumber = (phoneNumber) => {
//     const phoneRegex = /^\+?\d{8,15}$/;
//     return phoneRegex.test(phoneNumber);
//   };

//   // Function to validate IC/Passport format
//   const isValidICPassport = (icPassport) => {
//     const icPassportRegex = /^[A-Za-z0-9]{6,}$/;
//     return icPassportRegex.test(icPassport);
//   };

//   const handleReadMoreClick = () => {
//     setShowPolicyDetails(!showPolicyDetails);
//   };

//   return (
//     <div className="bookingPage">
//       <h2>Booking Page for Package ID: {id}</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="date">Select Date:</label>
//         <input type="date" id="date" value={selectedDate} onChange={handleDateChange} required />

//         <label htmlFor="totalPersons">Total Persons:</label>
//         <input
//           type="number"
//           id="totalPersons"
//           value={totalPersons}
//           min="1"
//           onChange={handleTotalPersonsChange}
//           required
//         />

//         {formData.map((person, index) => (
//           <div key={index}>
//             <h3>Person {index + 1}:</h3>

//             <label htmlFor={`name${index}`}>Name:</label>
//             <input
//               type="text"
//               id={`name${index}`}
//               name={`name`}
//               value={person.name}
//               onChange={(e) => handleChange(e, index)}
//               required
//             />

//             <label htmlFor={`email${index}`}>Email:</label>
//             <input
//               type="email"
//               id={`email${index}`}
//               name={`email`}
//               value={person.email}
//               onChange={(e) => handleChange(e, index)}
//               required
//             />

//             <label htmlFor={`phone${index}`}>Phone:</label>
//             <input
//               type="tel"
//               id={`phone${index}`}
//               name={`phone`}
//               value={person.phone}
//               onChange={(e) => handleChange(e, index)}
//               required
//               pattern="[\d]{8,15}"
//               title="Please enter a valid phone number"
//             />

//             <label htmlFor={`icPassport${index}`}>IC/Passport Number:</label>
//             <input
//               type="text"
//               id={`icPassport${index}`}
//               name={`icPassport`}
//               value={person.icPassport}
//               onChange={(e) => handleChange(e, index)}
//               required
//               pattern="[A-Za-z0-9]{6,}"
//               title="Please enter a valid IC/Passport number"
//             />
//           </div>
//         ))}

//         <div className="policyCheck">
//           <input
//             type="checkbox"
//             id="policyCheck"
//             checked={policyChecked}
//             onChange={() => setPolicyChecked(!policyChecked)}
//             required
//           />
//           <label htmlFor="policyCheck">
//             I have read and accept the booking policy. By clicking this, you agree to our booking policy.{' '}
//             <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleReadMoreClick}>
//               {showPolicyDetails ? 'Hide details' : 'Read more'}
//             </span>
//           </label>
//           {showPolicyDetails && (
//             <div className="policyDetails">
//               <p>
//                 <strong>Booking Policy</strong>
//                 <br /><br/>
//                 <strong>Booking Confirmation:</strong> Your booking is confirmed only after full payment has been received and a confirmation email has been sent to the email address provided during the booking process.
//                 <br />
//                 <strong>Payment:</strong> We accept payment via credit/debit card, PayPal, and other approved payment methods as indicated on our website. Full payment is required at the time of booking unless stated otherwise.
//                 <br />
//                 <strong>Cancellation Policy:</strong> Cancellation fees may apply depending on the type of booking, the time of cancellation, and the terms and conditions of the service provider (airline, hotel, etc.). Please refer to your booking confirmation email for specific cancellation policies.
//                 <br />
//                 <strong>Refunds:</strong> Refunds, if applicable, will be processed according to the cancellation policy and will be credited to the original payment method used during the booking. Refund processing times may vary depending on the payment method and the service provider's policy.
//                 <br />
//                 <strong>Changes to Bookings:</strong> Changes to your booking may be allowed depending on availability and the terms and conditions of the service provider. Additional charges may apply for booking changes. Please refer to your booking confirmation email for more information.
//                 <br />
//               <strong>Travel Documents:</strong> It is the responsibility of the traveler to ensure that all travel documents (passport, visa, etc.) are valid and up-to-date. TravelGenie is not responsible for any issues arising due to invalid or missing travel documents.
//               <br />
//               <strong>Travel Insurance:</strong> We highly recommend that you purchase travel insurance to protect yourself against unforeseen circumstances such as trip cancellations, medical emergencies, and lost luggage. TravelGenie does not provide travel insurance, but we can assist you in finding suitable coverage.
//               <br /><br/>
//             </p>
//           </div>
//         )}
//         </div>
//         <button type="submit">Book Now</button>
//       </form>
//     </div>
//   );
// };

// export default BookingPage;

//title changed
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './bookingPage.css';
// import axios from 'axios';

// const BookingPage = () => {
//   const { id } = useParams();
//   const [packageData, setPackageData] = useState(null);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [totalPersons, setTotalPersons] = useState(1);
//   const [formData, setFormData] = useState([
//     {
//       name: '',
//       email: '',
//       phone: '',
//       icPassport: ''
//     }
//   ]);
//   const [policyChecked, setPolicyChecked] = useState(false);
//   const [showPolicyDetails, setShowPolicyDetails] = useState(false);

//   useEffect(() => {
//     const fetchPackageData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/manage-package/${id}`);
//         setPackageData(response.data);
//       } catch (error) {
//         console.error('Error fetching package data:', error);
//       }
//     };

//     fetchPackageData();
//   }, [id]);

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleTotalPersonsChange = (e) => {
//     const count = parseInt(e.target.value);
//     setTotalPersons(count < 1 ? 1 : count);
//     setFormData(prevFormData => {
//       const newFormData = [...prevFormData];
//       while (newFormData.length < count) {
//         newFormData.push({ name: '', email: '', phone: '', icPassport: '' });
//       }
//       while (newFormData.length > count) {
//         newFormData.pop();
//       }
//       return newFormData;
//     });
//   };

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     setFormData(prevFormData => {
//       const newFormData = [...prevFormData];
//       newFormData[index][name] = value;
//       return newFormData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedDate || !policyChecked || formData.some(person => !person.name || !person.email || !person.phone || !person.icPassport || !isValidPhoneNumber(person.phone) || !isValidICPassport(person.icPassport))) {
//       alert('Please fill all fields correctly and accept the booking policy.');
//       return;
//     }
//     try {
//       const bookingData = {
//         packageId: id,
//         selectedDate,
//         persons: formData
//       };
//       await axios.post('http://localhost:5000/api/bookingPage', bookingData);
//       console.log('Booking submitted successfully!');
//       alert('Booking submitted successfully!');
//       // Clear form after successful submission
//       setSelectedDate('');
//       setTotalPersons(1);
//       setFormData([
//         {
//           name: '',
//           email: '',
//           phone: '',
//           icPassport: ''
//         }
//       ]);
//       window.location.href = "/payment"; // Redirect to payment page
//     } catch (error) {
//       console.error('Error submitting booking:', error);
//     }
//   };

//   // Function to validate phone number format
//   const isValidPhoneNumber = (phoneNumber) => {
//     const phoneRegex = /^\+?\d{8,15}$/;
//     return phoneRegex.test(phoneNumber);
//   };

//   // Function to validate IC/Passport format
//   const isValidICPassport = (icPassport) => {
//     const icPassportRegex = /^[A-Za-z0-9]{6,}$/;
//     return icPassportRegex.test(icPassport);
//   };

//   const handleReadMoreClick = () => {
//     setShowPolicyDetails(!showPolicyDetails);
//   };

//   return (
//     <div className="bookingPage">
//       {packageData ? (
//         <h2>Booking Page for {packageData.title}</h2>
//       ) : (
//         <h2>Loading package details...</h2>
//       )}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="date">Select Date:</label>
//         <input type="date" id="date" value={selectedDate} onChange={handleDateChange} required />

//         <label htmlFor="totalPersons">Total Persons:</label>
//         <input
//           type="number"
//           id="totalPersons"
//           value={totalPersons}
//           min="1"
//           onChange={handleTotalPersonsChange}
//           required
//         />

//         {formData.map((person, index) => (
//           <div key={index}>
//             <h3>Person {index + 1}:</h3>

//             <label htmlFor={`name${index}`}>Name:</label>
//             <input
//               type="text"
//               id={`name${index}`}
//               name={`name`}
//               value={person.name}
//               onChange={(e) => handleChange(e, index)}
//               required
//             />

//             <label htmlFor={`email${index}`}>Email:</label>
//             <input
//               type="email"
//               id={`email${index}`}
//               name={`email`}
//               value={person.email}
//               onChange={(e) => handleChange(e, index)}
//               required
//             />

//             <label htmlFor={`phone${index}`}>Phone:</label>
//             <input
//               type="tel"
//               id={`phone${index}`}
//               name={`phone`}
//               value={person.phone}
//               onChange={(e) => handleChange(e, index)}
//               required
//               pattern="[\d]{8,15}"
//               title="Please enter a valid phone number"
//             />

//             <label htmlFor={`icPassport${index}`}>IC/Passport Number:</label>
//             <input
//               type="text"
//               id={`icPassport${index}`}
//               name={`icPassport`}
//               value={person.icPassport}
//               onChange={(e) => handleChange(e, index)}
//               required
//               pattern="[A-Za-z0-9]{6,}"
//               title="Please enter a valid IC/Passport number"
//             />
//           </div>
//         ))}

//         <div className="policyCheck">
//           <input
//             type="checkbox"
//             id="policyCheck"
//             checked={policyChecked}
//             onChange={() => setPolicyChecked(!policyChecked)}
//             required
//           />
//           <label htmlFor="policyCheck">
//             I have read and accept the booking policy. By clicking this, you agree to our booking policy.{' '}
//             <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleReadMoreClick}>
//               {showPolicyDetails ? 'Hide details' : 'Read more'}
//             </span>
//           </label>
//           {showPolicyDetails && (
//             <div className="policyDetails">
//               <p>
//                 <strong>Booking Policy</strong>
//                 <br /><br/>
//                 <strong>Booking Confirmation:</strong> Your booking is confirmed only after full payment has been received and a confirmation email has been sent to the email address provided during the booking process.
//                 <br />
//                 <strong>Payment:</strong> We accept payment via credit/debit card, PayPal, and other approved payment methods as indicated on our website. Full payment is required at the time of booking unless stated otherwise.
//                 <br />
//                 <strong>Cancellation Policy:</strong> Cancellation fees may apply depending on the type of booking, the time of cancellation, and the terms and conditions of the service provider (airline, hotel, etc.). Please refer to your booking confirmation email for specific cancellation policies.
//                 <br />
//                 <strong>Refunds:</strong> Refunds, if applicable, will be processed according to the cancellation policy and will be credited to the original payment method used during the booking. Refund processing times may vary depending on the payment method and the service provider's policy.
//                 <br />
//                 <strong>Changes to Bookings:</strong> Changes to your booking may be allowed depending on availability and the terms and conditions of the service provider. Additional charges may apply for booking changes. Please refer to your booking confirmation email for more information.
//                 <br />
//               <strong>Travel Documents:</strong> It is the responsibility of the traveler to ensure that all travel documents (passport, visa, etc.) are valid and up-to-date. TravelGenie is not responsible for any issues arising due to invalid or missing travel documents.
//               <br />
//               <strong>Travel Insurance:</strong> We highly recommend that you purchase travel insurance to protect yourself against unforeseen circumstances such as trip cancellations, medical emergencies, and lost luggage. TravelGenie does not provide travel insurance, but we can assist you in finding suitable coverage.
//               <br /><br/>
//             </p>
//           </div>
//         )}
//         </div>
//         <button type="submit">Book Now</button>
//       </form>
//     </div>
//   );
// };

// export default BookingPage;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './bookingPage.css';
import axios from 'axios';

const BookingPage = () => {
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState('');
  const [totalPersons, setTotalPersons] = useState(1);
  const [formData, setFormData] = useState([
    {
      name: '',
      email: '',
      phone: '',
      icPassport: ''
    }
  ]);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTotalPersonsChange = (e) => {
    const count = parseInt(e.target.value);
    setTotalPersons(count < 1 ? 1 : count);
    setFormData(prevFormData => {
      const newFormData = [...prevFormData];
      while (newFormData.length < count) {
        newFormData.push({ name: '', email: '', phone: '', icPassport: '' });
      }
      while (newFormData.length > count) {
        newFormData.pop();
      }
      return newFormData;
    });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const newFormData = [...prevFormData];
      newFormData[index][name] = value;
      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !policyChecked || formData.some(person => !person.name || !person.email || !person.phone || !person.icPassport || !isValidPhoneNumber(person.phone) || !isValidICPassport(person.icPassport))) {
      alert('Please fill all fields correctly and accept the booking policy.');
      return;
    }
    try {
      const bookingData = {
        packageId: id,
        selectedDate,
        totalPersons,
        persons: formData
      };
      await axios.post('http://localhost:5000/api/bookingPage', bookingData);
      console.log('Booking submitted successfully!');
      alert('Booking submitted successfully!');
      // Clear form after successful submission
      setSelectedDate('');
      setTotalPersons(1);
      setFormData([
        {
          name: '',
          email: '',
          phone: '',
          icPassport: ''
        }
      ]);
      window.location.href = "/payment";
       // Redirect to payment page
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  // Function to validate phone number format
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?\d{8,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Function to validate IC/Passport format
  const isValidICPassport = (icPassport) => {
    const icPassportRegex = /^[A-Za-z0-9]{6,}$/;
    return icPassportRegex.test(icPassport);
  };

  const handleReadMoreClick = () => {
    setShowPolicyDetails(!showPolicyDetails);
  };

  return (
    <div className="bookingPage">
      <h2>Booking Page for Package ID: {id}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" value={selectedDate} onChange={handleDateChange} required />

        <label htmlFor="totalPersons">Total Persons:</label>
        <input
          type="number"
          id="totalPersons"
          value={totalPersons}
          min="1"
          onChange={handleTotalPersonsChange}
          required
        />

        {formData.map((person, index) => (
          <div key={index}>
            <h3>Person {index + 1}:</h3>

            <label htmlFor={`name${index}`}>Name:</label>
            <input
              type="text"
              id={`name${index}`}
              name={`name`}
              value={person.name}
              onChange={(e) => handleChange(e, index)}
              required
            />

            <label htmlFor={`email${index}`}>Email:</label>
            <input
              type="email"
              id={`email${index}`}
              name={`email`}
              value={person.email}
              onChange={(e) => handleChange(e, index)}
              required
            />

            <label htmlFor={`phone${index}`}>Phone:</label>
            <input
              type="tel"
              id={`phone${index}`}
              name={`phone`}
              value={person.phone}
              onChange={(e) => handleChange(e, index)}
              required
              pattern="[\d]{8,15}"
              title="Please enter a valid phone number"
            />

            <label htmlFor={`icPassport${index}`}>IC/Passport Number:</label>
            <input
              type="text"
              id={`icPassport${index}`}
              name={`icPassport`}
              value={person.icPassport}
              onChange={(e) => handleChange(e, index)}
              required
              pattern="[A-Za-z0-9]{6,}"
              title="Please enter a valid IC/Passport number"
            />
          </div>
        ))}

        <div className="policyCheck">
          <input
            type="checkbox"
            id="policyCheck"
            checked={policyChecked}
            onChange={() => setPolicyChecked(!policyChecked)}
            required
          />
          <label htmlFor="policyCheck">
            I have read and accept the booking policy. By clicking this, you agree to our booking policy.{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleReadMoreClick}>
              {showPolicyDetails ? 'Hide details' : 'Read more'}
            </span>
          </label>
          {showPolicyDetails && (
            <div className="policyDetails">
              <p>
                <strong>Booking Policy</strong>
                <br /><br/>
                <strong>Booking Confirmation:</strong> Your booking is confirmed only after full payment has been received and a confirmation email has been sent to the email address provided during the booking process.
                <br />
                <strong>Payment:</strong> We accept payment via credit/debit card, PayPal, and other approved payment methods as indicated on our website. Full payment is required at the time of booking unless stated otherwise.
                <br />
                <strong>Cancellation Policy:</strong> Cancellation fees may apply depending on the type of booking, the time of cancellation, and the terms and conditions of the service provider (airline, hotel, etc.). Please refer to your booking confirmation email for specific cancellation policies.
                <br />
                <strong>Refunds:</strong> Refunds, if applicable, will be processed according to the cancellation policy and will be credited to the original payment method used during the booking. Refund processing times may vary depending on the payment method and the service provider's policy.
                <br />
                <strong>Changes to Bookings:</strong> Changes to your booking may be allowed depending on availability and the terms and conditions of the service provider. Additional charges may apply for booking changes. Please refer to your booking confirmation email for more information.
                <br />
              <strong>Travel Documents:</strong> It is the responsibility of the traveler to ensure that all travel documents (passport, visa, etc.) are valid and up-to-date. TravelGenie is not responsible for any issues arising due to invalid or missing travel documents.
              <br />
              <strong>Travel Insurance:</strong> We highly recommend that you purchase travel insurance to protect yourself against unforeseen circumstances such as trip cancellations, medical emergencies, and lost luggage. TravelGenie does not provide travel insurance, but we can assist you in finding suitable coverage.
              <br /><br/>
            </p>
          </div>
        )}
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;
