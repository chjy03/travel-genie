import React, { useState, useEffect } from 'react';
import './logIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { GrMail } from 'react-icons/gr';
import { GoPasskeyFill } from 'react-icons/go';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]); // State to store existing users
    const navigate = useNavigate();

    // Define the fetchUsers function
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/signUp');
            setUsers(response.data);
            console.log('Existing Users:', response.data); // Log users to console
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        if (userIdFromStorage) {
            console.log('User ID:', userIdFromStorage); // Log userId from localStorage
        }
    }, []);
    

    // useEffect(() => {
    //     // Fetch existing users when the component mounts
    //     fetchUsers();
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            console.log('Please fill all required fields.');
            alert('Please fill all required fields.');
            return;
        }

        try {
            const result = await axios.post('http://localhost:5000/api/login', { email, password });
            console.log(result);
            //const token = result.data.token;
            const { token, userId, userType, name } = result.data;
            if (result.data.message === "Login successfully") {
                console.log('User login successfully. Redirecting to home page.');
                alert('Login successful.');
                localStorage.setItem('token', token);
                setEmail('');
                setPassword('');
                fetchUsers();
                // Store userType in localStorage
                localStorage.setItem('userType', userType);
                localStorage.setItem('userId', userId);
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                navigate('/home');
                //window.location.reload();
                // localStorage.setItem('userData', JSON.stringify(result.data.user));
                // console.log(result.data.user);
                console.log(userId);
            } else {
                console.error('Failed to login');
                alert('Failed to login. Please try again.');
            }
        } catch (error) {
            console.error('Error login:', error);
            alert('Error login. Please try again.');
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



//original version
// import React, { useState, useEffect } from 'react';
// import './logIn.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { GrMail } from 'react-icons/gr';
// import { GoPasskeyFill } from 'react-icons/go';
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [users, setUsers] = useState([]); // State to store existing users
//     const navigate = useNavigate();

//     // Define the fetchUsers function
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/signUp');
//             setUsers(response.data);
//             console.log('Existing Users:', response.data); // Log users to console
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     useEffect(() => {
//         // Fetch existing users when the component mounts
//         fetchUsers();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!email || !password) {
//             console.log('Please fill all required fields.');
//             alert('Please fill all required fields.');
//             return;
//         }

//         try {
//             const result = await axios.post('http://localhost:5000/api/login', { email, password });
//             console.log(result);
//             const token = result.data.token;
//             if (result.data.message === "Login successfully") {
//                 console.log('User login successfully. Redirecting to home page.');
//                 alert('Login successful.');
//                 setEmail('');
//                 setPassword('');
//                 fetchUsers();
//                 navigate('/home');
//                 //window.location.reload();
//                 // localStorage.setItem('userData', JSON.stringify(result.data.user));
//                 // console.log(result.data.user);
//                 localStorage.setItem('token', token);
//             } else {
//                 console.error('Failed to login');
//                 alert('Failed to login. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error login:', error);
//             alert('Error login. Please try again.');
//         }
//     };

//     return (
//         <div className="login">
//             <div className="homeCard grid">
//                 <div className="title">
//                     <div className="text">Login</div>
//                     <div className="underline"></div>
//                 </div>
//                 <div className="inputs">
//                     <div className="input">
//                         <GrMail className="inputIcon" />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input">
//                         <GoPasskeyFill className="inputIcon" />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="forgot-password">
//                     Forgot Password? <Link to="/forgotPassword">Click Here!</Link>
//                 </div>
//                 <div className="submit-container">
//                     <button className="submit" onClick={handleSubmit}>
//                         Log In
//                     </button>
//                     <div className="signup-link">
//                         New here? <Link to="/signUp">Click Here to Sign Up!</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import './logIn.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { GrMail } from 'react-icons/gr';
// import { GoPasskeyFill } from 'react-icons/go';
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     // const [users, setUsers] = useState([]); // State to store existing users
//     const navigate = useNavigate();

    // Define the fetchUsers function
    // const fetchUsers = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/signUp');
    //         setUsers(response.data);
    //         console.log('Existing Users:', response.data); // Log users to console
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //     }
    // };

    // useEffect(() => {
    //     // Fetch existing users when the component mounts
    //     fetchUsers();
    // }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!email || !password) {
//             console.log('Please fill all required fields.');
//             alert('Please fill all required fields.');
//             return;
//         }
    
//         try {
//             const result = await axios.post('http://localhost:5000/api/login', { email, password });
//             console.log(result);
//             const { token, userType, name } = result.data; // Extract userType from the response
//             if (result.data.message === "Login successfully") {
//                 console.log('User login successfully. Redirecting to home page.');
//                 alert('Login successful.');
//                 setEmail('');
//                 setPassword('');
//                 // Store userType in localStorage
//                 localStorage.setItem('userType', userType);
//                 localStorage.setItem('name', name);
//                 localStorage.setItem('email', email);
//                 // fetchUsers();
//                 navigate('/home');
//                 //window.location.reload();
//                 // localStorage.setItem('userData', JSON.stringify(result.data.user));
//                 // console.log(result.data.user);
//                 localStorage.setItem('token', token);
//             } else {
//                 console.error('Failed to login');
//                 alert('Failed to login. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error login:', error);
//             alert('Error login. Please try again.');
//         }
//     };
    

//     return (
//         <div className="login">
//             <div className="homeCard grid">
//                 <div className="title">
//                     <div className="text">Login</div>
//                     <div className="underline"></div>
//                 </div>
//                 <div className="inputs">
//                     <div className="input">
//                         <GrMail className="inputIcon" />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input">
//                         <GoPasskeyFill className="inputIcon" />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="forgot-password">
//                     Forgot Password? <Link to="/forgotPassword">Click Here!</Link>
//                 </div>
//                 <div className="submit-container">
//                     <button className="submit" onClick={handleSubmit}>
//                         Log In
//                     </button>
//                     <div className="signup-link">
//                         New here? <Link to="/signUp">Click Here to Sign Up!</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;



// import React, { useState, useEffect } from 'react';
// import './logIn.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaCircleUser } from 'react-icons/fa6';
// import { GoPasskeyFill } from 'react-icons/go';
// import axios from 'axios';

// const Login = () => {
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [users, setUsers] = useState([]); // State to store existing users
//     const navigate = useNavigate();

//     // Define the fetchUsers function
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/signUp');
//             setUsers(response.data);
//             console.log('Existing Users:', response.data); // Log users to console
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     useEffect(() => {
//         // Fetch existing users when the component mounts
//         fetchUsers();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!name || !password) {
//             console.log('Please fill all required fields.');
//             alert('Please fill all required fields.');
//             return;
//         }

//         try {
//             const result = await axios.post('http://localhost:5000/api/login', { name, password });
//             console.log(result);
//             const token = result.data.token;
//             if (result.data.message === "Login successfully") {
//                 console.log('User login successfully. Redirecting to home page.');
//                 alert('Login successful.');
//                 setName('');
//                 setPassword('');
//                 fetchUsers();
//                 navigate('/home');
//                 window.location.reload();
//                 localStorage.setItem('token', token);
//             } else {
//                 console.error('Failed to login');
//                 alert('Failed to login. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error login:', error);
//             alert('Error login. Please try again.');
//         }
//     };

//     return (
//         <div className="login">
//             <div className="homeCard grid">
//                 <div className="title">
//                     <div className="text">Login</div>
//                     <div className="underline"></div>
//                 </div>
//                 <div className="inputs">
//                     <div className="input">
//                         <FaCircleUser className="inputIcon" />
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div className="input">
//                         <GoPasskeyFill className="inputIcon" />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="forgot-password">
//                     Forgot Password? <Link to="/forgotPassword">Click Here!</Link>
//                 </div>
//                 <div className="submit-container">
//                     <button className="submit" onClick={handleSubmit}>
//                         Log In
//                     </button>
//                     <div className="signup-link">
//                         New here? <Link to="/signUp">Click Here to Sign Up!</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;



// import React, { useState } from 'react';
// import './logIn.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaCircleUser } from 'react-icons/fa6';
// import { GoPasskeyFill } from 'react-icons/go';
// import axios from 'axios';
// // import { GrMail } from 'react-icons/gr';

// const Login = () => {
//     // const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!name || !password) {
//             console.log('Please fill all required fields.');
//             alert('Please fill all required fields.');
//             return;
//         }

//         try {
//             const result = await axios.post('http://localhost:5000/api/login', { name, password });
//             console.log(result);
//             if (result.data.message === "Login successfully") {
//                 console.log('User login successfully. Redirecting to home page.');
//                 alert('User login successfully. Redirecting to home page.');
//                 navigate('/home');
//             } else {
//                 console.error('Failed to login');
//                 alert('Failed to login. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error login:', error);
//             alert('Error login. Please try again.');
//         }
//     };

//     return (
//         <div className="login">
//             <div className="homeCard grid">
//                 <div className="title">
//                     <div className="text">Login</div> {/* Changed to static text */}
//                     <div className="underline"></div>
//                 </div>
//                 <div className="inputs">
//                     <div className="input">
//                         <FaCircleUser className="inputIcon" />
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div className="input">
//                         <GoPasskeyFill className="inputIcon" />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="forgot-password">
//                     Forgot Password? <Link to="/forgotPassword">Click Here!</Link>
//                 </div>
//                 <div className="submit-container">
//                     <button className="submit" onClick={handleSubmit}>
//                         Log In
//                     </button>
//                     <div className="signup-link">
//                         New here? <Link to="/signUp">Click Here to Sign Up!</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
