import React, { useState } from 'react';
import './navbar.css';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { IoPersonCircle } from 'react-icons/io5';

const Navbar = () => {
    const [active, setActive] = useState(false); // Use boolean state to toggle

    // Function to toggle navBar visibility
    const toggleNav = () => {
        setActive(!active); // Toggle the state between true and false
    };

    return (
        <section className='navBarSection'>
            <header className="header flex">

                <div className="logoDiv">
                    <a href="/" className='logo flex'>
                        <h1><MdOutlineTravelExplore className="icon" /> TravelGenie.</h1>
                    </a>
                </div>

                <div className={`navBar ${active ? 'activeNavbar' : ''}`}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="/home" className="navLink">
                                Home
                            </a>
                        </li>

                        <li className="navItem">
                            <a href="/packages" className="navLink">
                                Packages
                            </a>
                        </li>

                        <li className="navItem">
                            <a href="/planning" className="navLink">
                                Planning
                            </a>
                        </li>

                        <li className="navItem">
                            <a href="/payment" className="navLink">
                                Payment
                            </a>
                        </li>
                        
                        <li className="navItem">
                            <a href="/forum" className="navLink">
                                Forum
                            </a>
                        </li>

                        <button className='btn'> 
                            <a href="/">BOOK NOW</a>
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
