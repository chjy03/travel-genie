import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './bookingPage.css';

const BookingPage = () => {
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState('');
  const [totalPersons, setTotalPersons] = useState(1);
  const [formData, setFormData] = useState([...Array(totalPersons)].map(() => ({
    name: '',
    email: '',
    phone: '',
    icPassport: ''
  })));
  const [policyChecked, setPolicyChecked] = useState(false);
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTotalPersonsChange = (e) => {
    const value = parseInt(e.target.value);
    setTotalPersons(value);
    setFormData([...Array(value)].map(() => ({
      name: '',
      email: '',
      phone: '',
      icPassport: ''
    })));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index][name] = value;
    setFormData(updatedFormData);
  };

  const handlePolicyCheck = () => {
    setPolicyChecked(!policyChecked);
  };

  const handleReadMoreClick = (e) => {
    e.stopPropagation();
    setShowPolicyDetails(!showPolicyDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!policyChecked) {
      alert('Please accept the booking policy.');
      return;
    }
    // You can handle form submission here
    console.log('Form submitted:', { id, selectedDate, formData });
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

        {[...Array(totalPersons)].map((_, index) => (
          <div key={index}>
            <h3>Person {index + 1}:</h3>

            <label htmlFor={`name${index}`}>Name:</label>
            <input
              type="text"
              id={`name${index}`}
              name={`name${index}`}
              value={formData[index].name}
              onChange={(e) => handleChange(e, index)}
              required
            />

            <label htmlFor={`email${index}`}>Email:</label>
            <input
              type="email"
              id={`email${index}`}
              name={`email${index}`}
              value={formData[index].email}
              onChange={(e) => handleChange(e, index)}
              required
            />

            <label htmlFor={`phone${index}`}>Phone:</label>
            <input
              type="tel"
              id={`phone${index}`}
              name={`phone${index}`}
              value={formData[index].phone}
              onChange={(e) => handleChange(e, index)}
              required
            />

            <label htmlFor={`icPassport${index}`}>IC/Passport Number:</label>
            <input
              type="text"
              id={`icPassport${index}`}
              name={`icPassport${index}`}
              value={formData[index].icPassport}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </div>
        ))}

        <div className="policyCheck">
          <input
            type="checkbox"
            id="policyCheck"
            checked={policyChecked}
            onChange={handlePolicyCheck}
            required
          />
          <label htmlFor="policyCheck">
            I have read and accept the booking policy. By clicking this, you agree to our booking policy.{' '}
            <span style={{ color: 'blue' }} onClick={handleReadMoreClick}>Read more</span>
          </label>
        </div>
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

        <Link to={`/payment`} className="bookNowBtn">Submit</Link>
        {/* <button type="submit">Book Now</button> */}
      </form>
    </div>
  );
};

export default BookingPage;

// import React, { useState } from "react";
// import './managePackage.css';

// const ManagePackage = () => {
//     const [formData, setFormData] = useState({
//         id: '',
//         imgSrc: '',
//         title: '',
//         description: '',
//         price: '',
//         duration: '',
//         location: '',
//         numberOfDates: '', // Added numberOfDates field
//         dateRanges: [], // Added dateRanges array
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "numberOfDates") {
//             setFormData({
//                 ...formData,
//                 [name]: value,
//                 dateRanges: Array.from({ length: parseInt(value, 10) }, () => ({
//                     startDate: '',
//                     endDate: ''
//                 }))
//             });
//         } else if (name.includes('startDate') || name.includes('endDate')) {
//             const index = parseInt(name.split('-')[1]);
//             const updatedDateRanges = [...formData.dateRanges];
//             updatedDateRanges[index] = {
//                 ...updatedDateRanges[index],
//                 [name.split('-')[0]]: value
//             };
//             // Ensure end date cannot be before the start date
//             if (name.includes('startDate')) {
//                 updatedDateRanges[index].startDate = value;
//                 // If end date is before start date, set it to start date
//                 if (updatedDateRanges[index].endDate < value) {
//                     updatedDateRanges[index].endDate = value;
//                 }
//             } else {
//                 updatedDateRanges[index].endDate = value;
//                 // If start date is after end date, set it to end date
//                 if (updatedDateRanges[index].startDate > value) {
//                     updatedDateRanges[index].startDate = value;
//                 }
//             }
//             setFormData({
//                 ...formData,
//                 dateRanges: updatedDateRanges
//             });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Add your logic to submit the form data
//         console.log('Form submitted:', formData);
//     };

//     return (
//         <div className="managePackage"> {/* Add class here */}
//             <h2>Add Travel Package</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="id">ID:</label>
//                     <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="imgSrc">Image URL:</label>
//                     <input type="text" id="imgSrc" name="imgSrc" value={formData.imgSrc} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="title">Title:</label>
//                     <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="description">Description:</label>
//                     <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="price">Price:</label>
//                     <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="duration">Duration:</label>
//                     <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="location">Location:</label>
//                     <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="numberOfDates">Number of Dates Available:</label> {/* Added numberOfDates field */}
//                     <select id="numberOfDates" name="numberOfDates" value={formData.numberOfDates} onChange={handleChange} required >
//                         <option value="">Select number of dates</option>
//                         {[1, 2, 3, 4, 5].map((num) => (
//                             <option key={num} value={num}>{num}</option>
//                         ))}
//                     </select>
//                 </div>
//                 {formData.dateRanges.map((dateRange, index) => (
//                     <div key={index}>
//                         <label htmlFor={`startDate-${index}`}>Start Date:</label>
//                         <input type="date" id={`startDate-${index}`} name={`startDate-${index}`} value={dateRange.startDate} onChange={handleChange} required />
//                         <label htmlFor={`endDate-${index}`}>End Date:</label>
//                         <input type="date" id={`endDate-${index}`} name={`endDate-${index}`} value={dateRange.endDate} onChange={handleChange} min={dateRange.startDate} required />
//                     </div>
//                 ))}
//                 <button type="submit">Add Package</button>
//             </form>
//         </div>
//     );
// };

// export default ManagePackage;


