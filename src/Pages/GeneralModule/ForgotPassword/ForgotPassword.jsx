import React, { useState } from 'react';
import './forgotPassword.css';
import { Link } from 'react-router-dom';
import forgotPasswordImage from '../../../Assets/image1.png';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'; 
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading spinner
    const [message, setMessage] = useState(''); // State to manage the response message
    const [success, setSuccess] = useState(false); // State to manage success flag

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading spinner
        setMessage(''); // Clear previous messages
        setSuccess(false); // Reset success state

        try {
            const response = await axios.post('http://localhost:5000/api/forgotPassword', { email });
            setLoading(false); // Stop loading spinner
            setMessage(response.data.message); // Set success message
            setSuccess(true); // Set success state to true
            window.alert(response.data.message); // Show alert with success message
        } catch (error) {
            setLoading(false); // Stop loading spinner
            console.error('Error sending reset link:', error);
            setMessage('Error sending reset link. Please try again.'); // Set error message
            setSuccess(false); // Ensure success state is false on error
            window.alert('Error sending reset link. Please try again.'); // Show alert with error message
        }
    };

    return (
        <section className='forgotPassword'>
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordContent'>
                    <div className='forgotPasswordText'>
                        <h1>Forgot Password?</h1>
                        <div className="underline"></div>
                        <p>Enter your email address below to receive a password reset link.</p>
                        <form className='forgotPasswordForm' onSubmit={handleSubmit}>
                            <div className='formGroup'>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Enter your email'
                                    required
                                    className='emailInput'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button type='submit' disabled={loading}>Send Reset Link</button>
                        </form>
                        {loading && !success && <ClipLoader size={35} color={"#123abc"} />} {/* Loading spinner */}
                        {!loading && success && <FaCheckCircle size={35} color={"#28a745"} />} {/* Tick icon */}
                        <p className='backToLogin'>
                            <Link to='/login' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                                <FaArrowLeft style={{ marginRight: '5px' }} />
                                Back to Login
                            </Link>
                        </p>
                    </div>
                    <div className='forgotPasswordImage'>
                        <img src={forgotPasswordImage} alt='Forgot Password' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;



