import React, { useState, useEffect } from 'react';
import './signUp.css';
import { FaCircleUser } from 'react-icons/fa6';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('tourist');
    const [users, setUsers] = useState([]); // State to store existing users

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing users when the component mounts
        axios.get('http://localhost:5000/api/signUp')
            .then(response => {
                setUsers(response.data);
                console.log('Existing Users:', response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const validateEmail = (email) => {
        return email.includes('@') && email.includes('gmail');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
            console.log('Please fill all required fields.');
            alert('Please fill all required fields.');
            return;
        }
    
        if (!validateEmail(email)) {
            console.log('Invalid email format. Please include "@" and "gmail" in your email.');
            alert('Invalid email format. Please include "@" and "gmail" in your email.');
            return;
        }
    
        axios.post('http://localhost:5000/api/signUp', { name, email, password, userType })
            .then(result => {
                console.log(result);
                if (result.status === 201) {
                    console.log('User registered successfully. Redirecting to login page.');
                    alert('User registered successfully.');
                    localStorage.setItem('userId', result.data.userId);
                    console.log('Registered userId : ', result.data.userId);
                    navigate('/logIn');
                } else {
                    console.error('Failed to sign up');
                    alert('Failed to sign up. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error signing up:', error);
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert('Error signing up. Please try again.');
                }
            });
    };

    return (
        <div className="signUp">
            <div className="homeCard grid">
                <div className="title">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <FaCircleUser className="inputIcon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <div className="input">
                        <label htmlFor="userType">Choose User Type:</label>
                        <select
                            id="userType"
                            name="userType"
                            value={userType}
                            onChange={handleUserTypeChange}
                        >
                            <option value="tourist">Tourist</option>
                            <option value="travelAgency">Travel Agency</option>
                        </select>
                    </div>
                </div>
                <div className="submit-container">
                    {/* Use button element to handle form submission */}
                    <button className="submit" onClick={handleSubmit}>
                        Sign Up
                    </button>
                </div>
                <div className="login-link">
                        Already have account?  <Link to="/login"> Click Here to Log In!</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
