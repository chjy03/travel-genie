import React from 'react'
import './footer.css'
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="footer">
            <div className="setContainer container grid">
                <div className="logoDiv">
                     
                    <div className="footerLinks">
                        <span className="linkTitle">
                                About Us
                        </span>
                        <p>Our Slogan</p> 
                        <h5>"Travel as you wish"</h5>
                    </div>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                            Helpful Links
                        </span>
                        <li>
                            <a href="#">Support</a>
                        </li>
                        <li>
                            <a href="#">Travel & Conditions</a>
                        </li>
                        <li>
                            <a href="#">Privacy</a>
                        </li>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Contact Us
                    </span>
                    <span className="phone">+111 432 567</span>
                    <a href="mailto:travel_genie@gmail.com" class="email">travel_genie@gmail.com</a>
                </div>

                <div className="footerLogo">
                        <span className="linkTitle">
                                Follow Us
                        </span>
                        <a href="#" className='socials flex'>
                            <FaFacebookF className='icon'/>
                            <RiInstagramFill className='icon'/>
                            <BsTwitter className='icon'/>
                        </a>
                </div> 

                {/* Copyright Section */}
                <div className="copyright">
                    &copy; {new Date().getFullYear()} TravelGenie. All Rights Reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer