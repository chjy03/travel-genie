// import React from "react";
// import './package.css';
// import video from '../../Assets/video01.mp4';
// import { GrLocation } from "react-icons/gr";
// import PackageListing, { Data } from '../PackageListing/PackageListing'; // Import PackageListing and Data

// const Package = () => {
//     return (
//         <section className="package">
//             <div className="overlay"></div>
//             <video src={video} muted autoPlay loop type="video/mp4"></video>

//             <div className="packageContent container">
//                 <div className="textDiv">
//                     <span className="smallText">
//                         Our Packages
//                     </span>

//                     <h1 className="title">
//                         Explore Malaysia!
//                     </h1>
//                 </div>

//                 <div className="cardDiv grid">
//                     <div className="destinationInput">
//                         <label htmlFor="city">Search your destination:</label>
//                         <div className="input flex">
//                             <input type="text" placeholder="Enter name here..."/>
//                             <GrLocation className="icon"/>
//                         </div>
//                     </div>

//                     <div className="dateInput">
//                         <label htmlFor="date">Select your date:</label>
//                         <div className="input flex">
//                             <input type="date"/>
//                         </div>
//                     </div>

//                     <div className="priceInput">
//                         <div className="label_total_flex">
//                             <label htmlFor="price">Max price:</label>
//                             <h3 className="total">RM5000</h3>
//                         </div>
//                         <div className="input flex">
//                             <input type="range" max="5000" min="0"/>
//                         </div>
//                     </div>

                    
//                 </div>
//             </div>

//             <PackageListing /> {/* Render PackageListing component */}

//         </section>
//     )
// }

// export default Package;

import React, { useState, useEffect } from "react";
import './package.css';
import video from '../../Assets/video01.mp4';
import { GrLocation } from "react-icons/gr";
import PackageListing from '../PackageListing/PackageListing';

const Package = () => {
    const [packages, setPackages] = useState([]);
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [maxPrice, setMaxPrice] = useState(5000);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`/api/package/search?destination=${destination}&date=${date}&maxPrice=${maxPrice}`);
                const data = await response.json();
                setPackages(data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, [destination, date, maxPrice]);

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
                            <input 
                                type="text" 
                                placeholder="Enter name here..."
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                            <GrLocation className="icon"/>
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">Select your date:</label>
                        <div className="input flex">
                            <input 
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="priceInput">
                        <div className="label_total_flex">
                            <label htmlFor="price">Max price:</label>
                            <h3 className="total">RM{maxPrice}</h3>
                        </div>
                        <div className="input flex">
                            <input 
                                type="range" 
                                max="5000" 
                                min="0" 
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <PackageListing packages={packages} /> {/* Pass packages to PackageListing component */}
        </section>
    );
};

export default Package;
