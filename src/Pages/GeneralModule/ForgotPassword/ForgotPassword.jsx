import React from 'react';
import './forgotPassword.css';
import forgotPasswordImage from '../../../Assets/scenery2.jpg';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
    return (
        <section className='forgotPassword'>
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordContent'>
                    <div className='forgotPasswordText'>
                        <h1>Forgot Password?</h1>
                        <div className="underline"></div>
                        <p>Enter your email address below to receive a password reset link.</p>
                        <form className='forgotPasswordForm'>
                            <div className='formGroup'>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Enter your email'
                                    required
                                    className='emailInput'
                                />
                            </div>
                            <button type='submit'>Send Reset Link</button>
                        </form>
                        <p className='backToLogin'>
                            <a href='/login' style={{ display: 'flex', alignItems: 'center' }}>
                                <FaArrowLeft style={{ marginRight: '5px' }} />
                                Back to Login
                            </a>
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
