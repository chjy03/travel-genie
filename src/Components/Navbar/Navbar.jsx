import React, { useState } from 'react';
import './navbar.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { IoPersonCircle } from 'react-icons/io5';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoImage from '../../Assets/logo.jpg';

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showPackageDropdown, setShowPackageDropdown] = useState(false);
    const [showManagePackageDropdown, setShowManagePackageDropdown] = useState(false);

    // const location = useLocation();

    const toggleNav = () => {
        setActive(!active);
    };

    const closeNav = () => {
        setActive(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleManagePackageDropdown = () => {
        setShowManagePackageDropdown(!showManagePackageDropdown);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            // Perform logout action here (e.g., clear session, redirect, etc.)
            // Redirect to the login page ("/logIn")
            window.location.href = '/logIn';
        }
    };

    // // Determine if we are on the signUp or logIn page
    // const isAuthPage = location.pathname === '/signUp' || location.pathname === '/logIn';

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
                        {/* Conditionally render navigation links */}
                        {/* {!isAuthPage && (
                            <> */}
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
                                            <li>
                                                <NavLink to="/manage-package" className="navLink" onClick={closeNav}>
                                                    Add Travel Packages
                                                </NavLink>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li className="navItem">
                                    <NavLink to="/planning" className="navLink" onClick={closeNav}>
                                        Planning
                                    </NavLink>
                                </li>
                                {/* <li className="navItem">
                                    <NavLink to="/payment" className="navLink" onClick={closeNav}>
                                        Payment
                                    </NavLink>
                                </li> */}
                                <li className="navItem">
                                    <NavLink to="/purchases" className="navLink" onClick={closeNav}>
                                        My Purchases
                                    </NavLink>
                                </li>
                                <li className="navItem">
                                    <NavLink to="/forum" className="navLink" onClick={closeNav}>
                                        Forum
                                    </NavLink>
                                </li>
                                <button className='btn'> 
                                    <Link to="/logIn" onClick={closeNav}>Login</Link>
                                </button>
                                <li className="navItem" onClick={toggleDropdown}>
                                    <IoPersonCircle className='personIcon'/>
                                    {/* Profile dropdown */}
                                    {showDropdown && (
                                        <ul className="dropdownMenu">
                                            <li><NavLink to="/profile" onClick={closeNav} className='dropdownItem'>My Profile</NavLink></li>
                                            <li><NavLink to="/logIn" onClick={handleLogout} className='dropdownItem'>Logout</NavLink></li>
                                        </ul>
                                    )}
                                    <span className="dropdownArrow"></span>
                                </li>
                            {/* </>
                        )} */}
                        {/* Render only the Login button on signUp or logIn page */}
                        {/* {isAuthPage && ( */}
                           
                        {/* )} */}
                    </ul>

                    {/* Close navbar button */}
                    <div onClick={toggleNav} className='closeNavbar'>
                        <AiFillCloseCircle className="icon"/>
                    </div>
                </div>

                {/* Toggle navbar button */}
                <div onClick={toggleNav} className='toggleNavbar'>
                    <TbGridDots className="icon"/>
                </div>
                
            </header>
        </section>
    );
};

export default Navbar;
