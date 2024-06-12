import React, { useState, useEffect } from 'react';
import './profile.css';
import profileImage from '../../../Assets/tourist.png';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [originalFormData, setOriginalFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/userData/${userId}`);
                const userData = {
                    name: response.data.name,
                    email: response.data.email
                };
                setFormData(userData);
                setOriginalFormData(userData);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if the email contains '@' and 'gmail'
        const isValidEmail = formData.email.includes('@') && formData.email.includes('gmail.com');
        if (!isValidEmail) {
            alert('Please enter a valid Gmail address.');
            return;
        }
    
        // Check if the password fields have been changed before validation
        if (formData.password !== originalFormData.password || formData.confirmPassword !== originalFormData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            if (!validatePassword(formData.password)) {
                alert('Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
                return;
            }
        }
    
        try {
            const updatedUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };
            await axios.put(`http://localhost:5000/api/profile/${userId}`, updatedUser);
            alert('Profile information has been updated successfully.');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    
    

    const handleCancel = () => {
        setFormData(originalFormData);
        setIsEditing(false);
    };

    return (
        <section className="profile">
            <div className="profileContainer">
                <div className="profileContent">
                    <h2>
                        You're a 
                        <span className={userType === 'tourist' ? 'tourist' : 'travel-agency'}>
                            {userType === 'tourist' ? ' Tourist' : ' Travel Agency'}
                        </span>
                    </h2>
                    <div className="profileImage">
                        <img src={profileImage} alt="Profile" />
                    </div>
                </div>
                <div className="profileDetails">
                    <h1>Profile Details</h1>
                    <p>Update your profile information below.</p>
                    {isEditing ? (
                        <form className="profileForm" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
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
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                        </form>
                    ) : (
                        <div className="profileView">
                            <p><strong>Name:</strong> {formData.name}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Profile;






