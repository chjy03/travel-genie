import React, { useState, useEffect } from 'react';
import './navbar.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { IoPersonCircle } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoImage from '../../Assets/logo.jpg';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showPackageDropdown, setShowPackageDropdown] = useState(false);
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        console.log("Stored userType:", storedUserType); // Debugging line
        setUserType(storedUserType);
    }, []);

    useEffect(() => {
        console.log("Updated userType:", userType); // Debugging line
    }, [userType]);

    // User ID
    const userId = localStorage.getItem('userId');
    const isLoggedIn = localStorage.getItem('token') !== null; // Check if user is logged in
    useEffect(() => {
        //console.log('User ID:', userId);
    }, [userId]);

    const toggleNav = () => {
        setActive(!active);
    };

    const closeNav = () => {
        setActive(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        if (isLoggedIn) {
            //console.log('User id:', userId);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault(); // Prevent default navigation
    
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1E90FF', // Set custom button color
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            customClass: {
                confirmButton: 'custom-swal-button' // Apply custom class to confirm button
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('userType');
                localStorage.removeItem('userId');
                navigate('/logIn');
            }
        });
    };
    
    

    return (
        <section className='navBarSection'>
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className='logo flex'>
                        <img src={logoImage} alt="TravelGenie Logo" className="icon" />
                        <h1>TravelGenie.</h1>
                    </Link>
                </div>

                <div className={`navBar ${active ? 'activeNavbar' : ''}`}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <NavLink to="/home" className="navLink" onClick={closeNav}>
                                Home
                            </NavLink>
                        </li>
                        <li 
                            className="navItem"
                            onMouseEnter={() => setShowPackageDropdown(true)}
                            onMouseLeave={() => setShowPackageDropdown(false)}
                        >
                            <NavLink to="/package" className="navLink" onClick={closeNav}>
                                Packages
                            </NavLink>
                            {showPackageDropdown && (
                                <ul className="dropdown">
                                    {userType === 'travelAgency' && (
                                        <li>
                                            <NavLink to="/manage-package" className="navLink" onClick={closeNav}>
                                                Add Travel Packages
                                            </NavLink>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>
                        <li className="navItem">
                            <NavLink to="/planning" className="navLink" onClick={closeNav}>
                                Planning
                            </NavLink>
                        </li>
                        {isLoggedIn && (
                            <li className="navItem">
                                <NavLink to="/purchases" className="navLink" onClick={closeNav}>
                                    My Purchases
                                </NavLink>
                            </li>
                        )}
                        <li className="navItem">
                            <NavLink to="/forum" className="navLink" onClick={closeNav}>
                                Forum
                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <li className="navItem" onClick={toggleDropdown}>
                                <IoPersonCircle className='personIcon'/>
                                {/* Profile dropdown */}
                                {showDropdown && (
                                    <ul className="dropdownMenu">
                                        <li><NavLink to={`/userData/${userId}`} onClick={closeNav} className='dropdownItem'>My Profile</NavLink></li>
                                        <li><a href="/" onClick={handleLogout} className='dropdownItem'>Logout</a></li>
                                    </ul>
                                )}
                                <span className="dropdownArrow"></span>
                            </li>
                        ) : (
                            <button className='btn'>
                                <Link to="/logIn" onClick={closeNav}>Login</Link>
                            </button>
                        )}
                    </ul>

                    <div onClick={toggleNav} className='closeNavbar'>
                        <AiFillCloseCircle className="icon"/>
                    </div>
                </div>

                <div onClick={toggleNav} className='toggleNavbar'>
                    <TbGridDots className="icon"/>
                </div>
            </header>
        </section>
    );
};

export default Navbar;
