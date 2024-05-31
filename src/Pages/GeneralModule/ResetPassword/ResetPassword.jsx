import React, { useState } from 'react';
import './resetPassword.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams(); // Get token from the URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/resetPassword/${token}`, { password });
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Error resetting password. Please try again.');
            }
        }
    };

    return (
        <section className='resetPassword'>
            <div className='resetPasswordContainer'>
                <div className='resetPasswordContent'>
                    <div className='resetPasswordText'>
                        <h1>Reset Password</h1>
                        <div className="underline"></div>
                        <p>Enter your new password below to reset your password.</p>
                        <form className='resetPasswordForm' onSubmit={handleSubmit}>
                            <div className='formGroup'>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Enter your new password'
                                    required
                                    className='passwordInput'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='formGroup'>
                                <input
                                    type='password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    placeholder='Confirm your new password'
                                    required
                                    className='passwordInput'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type='submit'>Reset Password</button>
                        </form>
                        <p className='backToLogin'>
                            <Link to='/login' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                                <FaArrowLeft style={{ marginRight: '5px' }} />
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
