import React, { useState } from 'react';
import './logIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all required fields.',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
            return;
        }
    
        try {
            const result = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token, userId, userType, name } = result.data;
            if (result.data.message === "Login successfully") {
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful.',
                    customClass: {
                        confirmButton: 'custom-swal-button'
                    }
                }).then(() => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('name', name);
                    localStorage.setItem('email', email);
                    navigate('/home');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: 'Invalid email or password. <br>Please try again.',
                    customClass: {
                        confirmButton: 'custom-swal-button'
                    }
                });
            }
        } catch (error) {
            console.error('Error login:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: 'Invalid email or password. <br>Please try again.',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
        }
    };
    

    return (
        <div className="login">
            <div className="homeCard grid">
                <div className="title">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
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
                </div>
                <div className="forgot-password">
                    Forgot Password? <Link to="/forgotPassword">Click Here!</Link>
                </div>
                <div className="submit-container">
                    <button className="submit" onClick={handleSubmit}>
                        Log In
                    </button>
                    <div className="signup-link">
                        New here? <Link to="/signUp">Click Here to Sign Up!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
