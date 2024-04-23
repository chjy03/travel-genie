// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './bookingPage.css';

// const BookingPage = () => {
//   const { id } = useParams();

//   const [selectedDate, setSelectedDate] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [totalPersons, setTotalPersons] = useState(1);

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePhoneChange = (e) => {
//     setPhone(e.target.value);
//   };

//   const handleTotalPersonsChange = (e) => {
//     setTotalPersons(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can handle form submission here
//     console.log('Form submitted:', { id, selectedDate, name, email, phone, totalPersons });
//   };

//   return (
//     <div className="bookingPage">
//       <h2>Booking Page for Package ID: {id}</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="date">Select Date:</label>
//         <input type="date" id="date" value={selectedDate} onChange={handleDateChange} required />

//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" value={name} onChange={handleNameChange} required />

//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" value={email} onChange={handleEmailChange} required />

//         <label htmlFor="phone">Phone:</label>
//         <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />

//         <label htmlFor="totalPersons">Total Persons:</label>
//         <input
//           type="number"
//           id="totalPersons"
//           value={totalPersons}
//           min="1"
//           onChange={handleTotalPersonsChange}
//           required
//         />

//         <button type="submit">Book Now</button>
//       </form>
//     </div>
//   );
// };

// export default BookingPage;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

  const handleSubmit = (e) => {
    e.preventDefault();
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

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;
