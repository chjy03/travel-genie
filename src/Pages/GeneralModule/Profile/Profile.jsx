import React, { useState } from 'react';
import './profile.css';
import profileImage from '../../../Assets/scenery1.jpg';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here, e.g., API call
        console.log(formData);

        // Show alert to indicate successful information change
        window.alert('Profile information has been updated successfully.');

        // Reset form fields after submission if needed
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <section className="profile">
            <div className="profileContainer">
                <div className="profileContent">
                    <div className="profileImage">
                        <img src={profileImage} alt="Profile" />
                    </div>
                    <div className="profileDetails">
                        <h1>Profile Details</h1>
                        <p>Update your profile information below.</p>
                        <form className="forgotPasswordForm" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Mario"
                                    required
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="mario@gmail.com"
                                    required
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="**********"
                                    required
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="**********"
                                    required
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
