import React, { useState, useEffect } from 'react';
import './signUp.css';
import { FaCircleUser } from 'react-icons/fa6';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


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
        return email.includes('@') && email.includes('gmail.com');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
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
    
        if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Invalid email format. Please include "@" and "gmail.com" in your email.',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
            return;
        }
    
        // Check if the username already exists
        const usernameExists = users.some(user => user.name === name);
        // Check if the email already exists
        const emailExists = users.some(user => user.email === email);
    
        if (usernameExists && emailExists) {
            Swal.fire({
                icon: 'error',
                title: 'Username and Email Exist',
                text: 'Please choose another one',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
            return;
        }
    
        if (usernameExists) {
            Swal.fire({
                icon: 'error',
                title: 'Username Exists',
                text: 'Please choose another one',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
            return;
        }
    
        if (emailExists) {
            Swal.fire({
                icon: 'error',
                title: 'Email Exists',
                text: 'Please choose another one',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
            return;
        }
    
        // If username and email are unique, proceed with signup
        axios.post('http://localhost:5000/api/signUp', { name, email, password, userType })
            .then(result => {
                if (result.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        html: 'User registered successful.<br>Redirecting to login page.',
                        customClass: {
                            confirmButton: 'custom-swal-button'
                        }
                    }).then(() => {
                        localStorage.setItem('userId', result.data.userId);
                        navigate('/logIn');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to sign up. Please try again.',
                        customClass: {
                            confirmButton: 'custom-swal-button'
                        }
                    });
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response.data.error,
                        customClass: {
                            confirmButton: 'custom-swal-button'
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error signing up. Please try again.',
                        customClass: {
                            confirmButton: 'custom-swal-button'
                        }
                    });
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
