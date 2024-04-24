import React from "react";
import './package.css';
import video from '../../Assets/video01.mp4';
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { Link } from 'react-router-dom';
import PackageListing, { Data } from '../PackageListing/PackageListing'; // Import PackageListing and Data

const Package = () => {
    return (
        <section className="package">
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop type="video/mp4"></video>

            <div className="packageContent container">
                <div className="textDiv">
                    <span className="smallText">
                        Our Packages
                    </span>

                    <h1 className="title">
                        Explore Malaysia!
                    </h1>
                </div>

                <div className="cardDiv grid">
                    <div className="destinationInput">
                        <label htmlFor="city">Search your destination:</label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter name here..."/>
                            <GrLocation className="icon"/>
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">Select your date:</label>
                        <div className="input flex">
                            <input type="date"/>
                        </div>
                    </div>

                    <div className="priceInput">
                        <div className="label_total_flex">
                            <label htmlFor="price">Max price:</label>
                            <h3 className="total">RM5000</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="5000" min="0"/>
                        </div>
                    </div>

                    {/* <div className="searchOptions flex">
                        <HiFilter className="icon"/>
                        <span>MORE FILTERS</span>
                    </div> */}
                </div>
            </div>

            <PackageListing /> {/* Render PackageListing component */}

        </section>
    )
}

export default Package;