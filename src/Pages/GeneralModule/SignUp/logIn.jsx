import React, { useState } from 'react';
import './logIn.css';
import { Link } from 'react-router-dom';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';

const Login = () => {
    const [action, setAction] = useState('Login');

    const handleActionChange = (newAction) => {
        setAction(newAction);
    };

    return (
        <div className="login">
            <div className="homeCard grid">
                <div className="title">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <GrMail className="inputIcon" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <GoPasskeyFill className="inputIcon" />
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                <div className="forgot-password">
                    Forgot Password? <Link to="/forgotPassword">Click Here!</Link>
                </div>
                <div className="submit-container">
                    <Link to="/home" className={action === 'Login' ? 'submit' : 'submit gray'} onClick={() => handleActionChange("Login")}>
                        Login
                    </Link>
                    <div className="signup-link">
                        New here? <Link to="/signUp">Click Here to Sign Up!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
