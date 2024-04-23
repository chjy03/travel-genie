import React from 'react';
import './forgotPassword.css';
import forgotPasswordImage from '../../../Assets/batu caves.jpeg';

const ForgotPassword = () => {
    return (
        <section className='forgotPassword'>
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordContent'>
                    <div className='forgotPasswordText'>
                        <h1>Forgot Password</h1>
                        <p>Enter your email address below to receive a password reset link.</p>
                        <form className='forgotPasswordForm'>
                            <div className='formGroup'>
                                <label htmlFor='email'>Email Address:</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>
                            <button type='submit'>Send Reset Link</button>
                        </form>
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
