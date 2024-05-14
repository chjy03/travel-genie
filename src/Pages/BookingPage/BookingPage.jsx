//Connect to MongoDB

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
      window.location.href = "/payment"; // Redirect to payment page
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
            <span style={{ color: 'blue' }}>Read more</span>
          </label>
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;
