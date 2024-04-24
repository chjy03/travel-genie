import React, { useState } from 'react';
import './signUp.css';
import { FaCircleUser } from 'react-icons/fa6';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Tourist'); // Default user type

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
        setUserType('Tourist'); // Reset user type to default

        // Redirect to the home page ("/home") after successful signup
        // You can use the Link component from react-router-dom for navigation
        // This assumes you have a route set up for the home page ("/home")
        // Replace '/home' with the appropriate route if needed
        window.location.href = '/home';
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
                    {/* Use Link component to navigate to home page after signup */}
                    <Link to="/home" className="submit" onClick={handleSubmit}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
