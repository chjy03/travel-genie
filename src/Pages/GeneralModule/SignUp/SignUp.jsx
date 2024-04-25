import React, { useState } from 'react';
import './signUp.css';
import { FaCircleUser } from 'react-icons/fa6';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('tourist'); // Default user type

    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    // Function to handle user type selection
    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation and submission logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('User Type:', userType);

        // Clear form fields after submission (optional)
        setName('');
        setEmail('');
        setPassword('');
        setUserType('tourist'); // Reset user type to default

        // Redirect to the landing page ("/landing") after successful signup
        navigate('/logIn'); // Use navigate function to navigate to the landing page
    };

    return (
        <div className="signUp">
            <div className="homeCard grid">
                <div className="title">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <FaCircleUser className="inputIcon" />
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <GrMail className="inputIcon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <GoPasskeyFill className="inputIcon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="userType">Choose User Type:</label>
                        <select
                            id="userType"
                            name="userType"
                            value={userType}
                            onChange={handleUserTypeChange}
                        >
                            <option value="tourist">Tourist</option>
                            <option value="travelAgency">Travel Agency</option>
                        </select>
                    </div>
                </div>
                <div className="submit-container">
                    {/* Use button element to handle form submission */}
                    <button className="submit" onClick={handleSubmit}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
