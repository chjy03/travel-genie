import React, { useState } from 'react';
import './forgotPassword.css';
import { Link } from 'react-router-dom';
import forgotPasswordImage from '../../../Assets/image1.png';
import { FaArrowLeft } from 'react-icons/fa'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading spinner

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading spinner

        try {
            const response = await axios.post('http://localhost:5000/api/forgotPassword', { email });
            setLoading(false); // Stop loading spinner

            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });

            setEmail(''); // Clear the email input field
        } catch (error) {
            setLoading(false); // Stop loading spinner

            console.error('Error sending reset link:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error sending reset link. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
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
                        {loading && <ClipLoader size={35} color={"#123abc"} />} {/* Loading spinner */}
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
