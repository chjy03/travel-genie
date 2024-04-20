import React, { useState } from 'react';
import './navbar.css';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { IoPersonCircle } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../../Assets/logo.jpg';

const Navbar = () => {
    const [active, setActive] = useState(false);

    // Function to toggle navBar visibility
    const toggleNav = () => {
        setActive(!active);
    };

    // Function to close navBar when a nav item is clicked
    const closeNav = () => {
        setActive(false);
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

                        <li className="navItem">
                            <NavLink to="/packages" className="navLink" onClick={closeNav}>
                                Packages
                            </NavLink>
                        </li>

                        <li className="navItem">
                            <NavLink to="/planning" className="navLink" onClick={closeNav}>
                                Planning
                            </NavLink>
                        </li>

                        <li className="navItem">
                            <NavLink to="/payment" className="navLink" onClick={closeNav}>
                                Payment
                            </NavLink>
                        </li>
                        
                        <li className="navItem">
                            <NavLink to="/forum" className="navLink" onClick={closeNav}>
                                Forum
                            </NavLink>
                        </li>

                        <button className='btn'> 
                            <Link to="/signUp" onClick={closeNav}>SIGN UP</Link>
                        </button>

                        <li className="navItem" onClick={toggleNav}>
                            <IoPersonCircle className='personIcon'/>
                        </li>
                        
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
