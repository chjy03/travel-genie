import React, { useState } from 'react';
import './signUp.css';
import { Link } from 'react-router-dom'; 
import { FaCircleUser } from 'react-icons/fa6';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';


const SignUp = () => {
    const [action, setAction] = useState('Sign Up');
    const [userType, setUserType] = useState('Tourist'); // State to manage selected user type

    // Function to handle user type selection
    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    return (
        <div className="signUp">
            <div className="homeCard grid">
                <div className="title">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action === "Sign Up" && (
                        <div className="input">
                            <FaCircleUser className="inputIcon" />
                            <input type="text" placeholder="Name" />
                        </div>
                    )}
                    <div className="input">
                        <GrMail className="inputIcon" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <GoPasskeyFill className="inputIcon" />
                        <input type="password" placeholder="Password" />
                    </div>
                    {/* Dropdown for user type selection */}
                    {action === "Sign Up" && (
                    <div className="input">
                        <label htmlFor="userType">Choose User Type:</label>
                        <select id="userType" name="userType">
                            <option value="tourist">Tourist</option>
                            <option value="travelAgency">Travel Agency</option>
                        </select>
                    </div>
                )}
                </div>
                {/* Link to ForgotPassword page */}
                {action === "Login" && (
                    <div className="forgot-password">
                        Forgot Password? <Link to="/forgotPassword">Click Here!</Link>
                    </div>
                )}
                <div className="submit-container">
                    <div
                        className={action === 'Login' ? 'submit gray' : 'submit'}
                        onClick={() => { setAction("Sign Up") }}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                        onClick={() => { setAction("Login") }}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
