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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
            console.log('Please fill all required fields.');
            alert('Please fill all required fields.');
            return;
        }
    
        axios.post('http://localhost:5000/api/signUp', {name, email, password, userType})
            .then(result => {
                console.log(result);
                if (result.status === 201) {
                    console.log('User registered successfully. Redirecting to login page.');
                    alert('User registered successfully. Redirecting to login page.');
                    navigate('/logIn');
                } else {
                    console.error('Failed to sign up');
                    alert('Failed to sign up. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error signing up:', error);
                alert('Error signing up. Please try again.');
            });
    };


// import React, { useState } from 'react';
// import './signUp.css';
// import { FaCircleUser } from 'react-icons/fa6';
// import { GrMail } from 'react-icons/gr';
// import { GoPasskeyFill } from 'react-icons/go';
// import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
// import axios from 'axios';

// const SignUp = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userType, setUserType] = useState('tourist'); // Default user type

//     const navigate = useNavigate(); // Initialize useNavigate hook for navigation

//     // Function to handle user type selection
//     const handleUserTypeChange = (e) => {
//         setUserType(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!name || !email || !password) {
//             console.log('Please fill all required fields.');
//             alert('Please fill all required fields.');
//             return;
//         }
    
//         axios.post('http://localhost:5000/api/signUp', {name, email, password, userType})
//             .then(result => {
//                 console.log(result);
//                 if (result.status === 201) { // Check for success status code
//                     console.log('User registered successfully. Redirecting to login page.');
//                     alert('User registered successfully. Redirecting to login page.');
//                     navigate('/logIn');
//                 } else {
//                     console.error('Failed to sign up');
//                     alert('Failed to sign up. Please try again.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error signing up:', error);
//                 alert('Error signing up. Please try again.');
//             });
//     };
    

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:5000/api/signUp', {name, email, password, userType});
    //         if (response.status === 201) {
    //             alert('User Created Successfully');
    //             setName('');
    //             setEmail('');
    //             setPassword('');
    //             setUserType('tourist');
    //             navigate('/logIn');
    //         }
    //     } catch (error) {
    //         console.error('Error signing up:', error);
    //         alert('Error signing up ahh. Please try again.');
    //     }
    // };

    // Function to handle form submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Perform form validation and submission logic here
    //     console.log('Name:', name);
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    //     console.log('User Type:', userType);

    //     // Clear form fields after submission (optional)
    //     setName('');
    //     setEmail('');
    //     setPassword('');
    //     setUserType('tourist'); // Reset user type to default

    //     // Redirect to the landing page ("/landing") after successful signup
    //     navigate('/logIn'); // Use navigate function to navigate to the landing page
    // };

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
            </div>
        </div>
    );
};

export default SignUp;
