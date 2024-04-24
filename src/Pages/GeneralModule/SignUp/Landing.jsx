import React, { useState } from 'react';
import './landing.css';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';
import landingImage from '../../../Assets/img2.jpg';

const Landing = () => {
    const [action, setAction] = useState('Login');

    const handleActionChange = (newAction) => {
        setAction(newAction);
    };

    return (
        <div className="landing">
            <div className="homeCard grid">
                <div className="title">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>

                <div className="imageContainer">
                    <img src={landingImage} alt="Landing Image" className="landingImage" />
                </div>

                <div className="actionButtons">
                    <button className="actionButton" onClick={() => handleActionChange('Login')}>
                        Login <GrMail />
                    </button>
                    <button className="actionButton" onClick={() => handleActionChange('Signup')}>
                        Signup <GoPasskeyFill />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
