//Package.jsx
// import React, { useState, useEffect } from "react";
// import './package.css';
// import video from '../../Assets/video01.mp4';
// import { GrLocation } from "react-icons/gr";
// import PackageListing from '../PackageListing/PackageListing';

// const Package = () => {
//     const [packages, setPackages] = useState([]);
//     const [destination, setDestination] = useState('');
//     const [date, setDate] = useState('');
//     const [maxPrice, setMaxPrice] = useState(5000);

//     useEffect(() => {
//         const fetchPackages = async () => {
//             try {
//                 const response = await fetch(`/api/package/search?destination=${destination}&date=${date}&maxPrice=${maxPrice}`);
//                 const data = await response.json();
//                 setPackages(data);
//             } catch (error) {
//                 console.error('Error fetching packages:', error);
//             }
//         };

//         fetchPackages();
//     }, [destination, date, maxPrice]);

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
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter name here..."
//                                 value={destination}
//                                 onChange={(e) => setDestination(e.target.value)}
//                             />
//                             <GrLocation className="icon"/>
//                         </div>
//                     </div>

//                     <div className="dateInput">
//                         <label htmlFor="date">Select your date:</label>
//                         <div className="input flex">
//                             <input 
//                                 type="date"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="priceInput">
//                         <div className="label_total_flex">
//                             <label htmlFor="price">Max price:</label>
//                             <h3 className="total">RM{maxPrice}</h3>
//                         </div>
//                         <div className="input flex">
//                             <input 
//                                 type="range" 
//                                 max="5000" 
//                                 min="0" 
//                                 value={maxPrice}
//                                 onChange={(e) => setMaxPrice(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <PackageListing packages={packages} /> {/* Pass packages to PackageListing component */}
//         </section>
//     );
// };

// export default Package;


// can use but don't have search
// import React, { useState, useEffect, useCallback } from "react";
// import './package.css';
// import video from '../../Assets/video01.mp4';
// import { GrLocation } from "react-icons/gr";
// import PackageListing from '../PackageListing/PackageListing';

// const Package = () => {
//     const [packages, setPackages] = useState([]);
//     const [destination, setDestination] = useState('');
//     const [date, setDate] = useState('');
//     const [maxPrice, setMaxPrice] = useState(5000);

//     const fetchPackages = useCallback(async () => {
//         try {
//             const response = await fetch(`/api/manage-package/search?destination=${destination}&date=${date}&maxPrice=${maxPrice}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch packages');
//             }
//             const data = await response.json();
//             setPackages(data);
//         } catch (error) {
//             console.error('Error fetching packages:', error);
//         }
//     }, [destination, date, maxPrice]); 

//     // Call fetchPackages when the component mounts
//     useEffect(() => {
//         fetchPackages();
//     }, [fetchPackages]);

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
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter name here..."
//                                 value={destination}
//                                 onChange={(e) => setDestination(e.target.value)}
//                             />
//                             <GrLocation className="icon"/>
//                         </div>
//                     </div>

//                     <div className="dateInput">
//                         <label htmlFor="date">Select your date:</label>
//                         <div className="input flex">
//                             <input 
//                                 type="date"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="priceInput">
//                         <div className="label_total_flex">
//                             <label htmlFor="price">Max price:</label>
//                             <h3 className="total">RM{maxPrice}</h3>
//                         </div>
//                         <div className="input flex">
//                             <input 
//                                 type="range" 
//                                 max="5000" 
//                                 min="0" 
//                                 value={maxPrice}
//                                 onChange={(e) => setMaxPrice(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Search button to trigger the package fetching */}
//                     <button onClick={fetchPackages} className="searchBtn">Search</button>
//                 </div>
//             </div>

//             <PackageListing packages={packages} /> {/* Pass packages to PackageListing component */}
//         </section>
//     );
// };

// export default Package;

//another version
// import React, { useState, useCallback } from "react";
// import './package.css';
// import video from '../../Assets/video01.mp4';
// import { GrLocation } from "react-icons/gr";
// import PackageListing from '../PackageListing/PackageListing';

// const Package = () => {
//     const [packages, setPackages] = useState([]);
//     const [destination, setDestination] = useState('');
//     const [date, setDate] = useState('');
//     const [maxPrice, setMaxPrice] = useState(5000);

//     const fetchPackages = useCallback(async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/manage-package/search?destination=${destination}&date=${date}&maxPrice=${maxPrice}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch packages');
//             }
//             const data = await response.json();
//             setPackages(data);
//         } catch (error) {
//             console.error('Error fetching packages:', error);
//         }
//     }, [destination, date, maxPrice]);

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
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter name here..."
//                                 value={destination}
//                                 onChange={(e) => setDestination(e.target.value)}
//                             />
//                             <GrLocation className="icon"/>
//                         </div>
//                     </div>

//                     <div className="dateInput">
//                         <label htmlFor="date">Select your date:</label>
//                         <div className="input flex">
//                             <input 
//                                 type="date"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="priceInput">
//                         <div className="label_total_flex">
//                             <label htmlFor="price">Max price:</label>
//                             <h3 className="total">RM{maxPrice}</h3>
//                         </div>
//                         <div className="input flex">
//                             <input 
//                                 type="range" 
//                                 max="5000" 
//                                 min="0" 
//                                 value={maxPrice}
//                                 onChange={(e) => setMaxPrice(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Search button to trigger the package fetching */}
//                     <button onClick={fetchPackages} className="searchBtn">Search</button>
//                 </div>
//             </div>

//             <PackageListing packages={packages} /> {/* Pass packages to PackageListing component */}
//         </section>
//     );
// };

// export default Package;


//cannot delete this version
// import React, { useState, useCallback } from "react";
// import './package.css';
// import video from '../../Assets/video01.mp4';
// import { GrLocation } from "react-icons/gr";
// import PackageListing from '../PackageListing/PackageListing';

// const Package = () => {
//     const [packages, setPackages] = useState([]);
//     const [destination, setDestination] = useState('');
//     const [date, setDate] = useState('');
//     const [maxPrice, setMaxPrice] = useState(5000);

//     const fetchPackages = useCallback(async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/manage-package/search', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     destination,
//                     date,
//                     maxPrice
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch packages: ${response.statusText}');
//             }

//             const data = await response.json();
//             setPackages(data);
//         } catch (error) {
//             console.error('Error fetching packages:', error);
//         }
//     }, [destination, date, maxPrice]);

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
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter name here..."
//                                 value={destination}
//                                 onChange={(e) => setDestination(e.target.value)}
//                             />
//                             <GrLocation className="icon"/>
//                         </div>
//                     </div>

//                     <div className="dateInput">
//                         <label htmlFor="date">Select your date:</label>
//                         <div className="input flex">
//                             <input 
//                                 type="date"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="priceInput">
//                         <div className="label_total_flex">
//                             <label htmlFor="price">Max price:</label>
//                             <h3 className="total">RM{maxPrice}</h3>
//                         </div>
//                         <div className="input flex">
//                             <input 
//                                 type="range" 
//                                 max="5000" 
//                                 min="0" 
//                                 value={maxPrice}
//                                 onChange={(e) => setMaxPrice(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Search button to trigger the package fetching */}
//                     <button onClick={fetchPackages} className="searchBtn">Search</button>
//                 </div>
//             </div>

//             <PackageListing packages={packages} /> {/* Pass packages to PackageListing component */}
//         </section>
//     );
// };

// export default Package;


//for search version
// import React, { useState, useCallback, useEffect } from "react";
// import './package.css';
// import video from '../../Assets/video01.mp4';
// import { GrLocation } from "react-icons/gr";
// import PackageListing from '../PackageListing/PackageListing';

// const Package = () => {
//     const [allPackages, setAllPackages] = useState([]);
//     const [filteredPackages, setFilteredPackages] = useState([]);
//     const [destination, setDestination] = useState('');
//     const [date, setDate] = useState('');
//     const [maxPrice, setMaxPrice] = useState(5000);

//     // Fetch all packages when the component mounts
//     useEffect(() => {
//         const fetchAllPackages = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/manage-package');
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch packages: ${response.statusText}`);
//                 }
//                 const data = await response.json();
//                 setAllPackages(data);
//                 setFilteredPackages(data); // Set filteredPackages to all packages initially
//             } catch (error) {
//                 console.error('Error fetching packages:', error);
//             }
//         };

//         fetchAllPackages();
//     }, []);

//     const fetchFilteredPackages = useCallback(async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/manage-package/search', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     destination,
//                     date,
//                     maxPrice
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch packages: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setFilteredPackages(data);
//         } catch (error) {
//             console.error('Error fetching packages:', error);
//         }
//     }, [destination, date, maxPrice]);

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
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter name here..."
//                                 value={destination}
//                                 onChange={(e) => setDestination(e.target.value)}
//                             />
//                             <GrLocation className="icon"/>
//                         </div>
//                     </div>

//                     <div className="dateInput">
//                         <label htmlFor="date">Select your date:</label>
//                         <div className="input flex">
//                             <input 
//                                 type="date"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="priceInput">
//                         <div className="label_total_flex">
//                             <label htmlFor="price">Max price:</label>
//                             <h3 className="total">RM{maxPrice}</h3>
//                         </div>
//                         <div className="input flex">
//                             <input 
//                                 type="range" 
//                                 max="5000" 
//                                 min="0" 
//                                 value={maxPrice}
//                                 onChange={(e) => setMaxPrice(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Search button to trigger the package fetching */}
//                     <button onClick={fetchFilteredPackages} className="searchBtn">Search</button>
//                 </div>
//             </div>

//             <PackageListing packages={filteredPackages} /> {/* Pass packages to PackageListing component */}
//         </section>
//     );
// };

// export default Package;

//search version upgraded
// import React, { useState, useCallback, useEffect } from "react";
// import './package.css';
// import video from '../../Assets/video01.mp4';
// import { GrLocation } from "react-icons/gr";
// import PackageListing from '../PackageListing/PackageListing';

// const Package = () => {
//     const [allPackages, setAllPackages] = useState([]);
//     const [filteredPackages, setFilteredPackages] = useState([]);
//     const [destination, setDestination] = useState('');
//     const [date, setDate] = useState('');
//     const [maxPrice, setMaxPrice] = useState(5000);
//     const [error, setError] = useState(null);

//     // Fetch all packages when the component mounts
//     useEffect(() => {
//         const fetchAllPackages = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/manage-package');
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch packages: ${response.statusText}`);
//                 }
//                 const data = await response.json();
//                 setAllPackages(data);
//                 setFilteredPackages(data); // Set filteredPackages to all packages initially
//             } catch (error) {
//                 console.error('Error fetching packages:', error);
//                 setError('Failed to fetch all packages.');
//             }
//         };

//         fetchAllPackages();
//     }, []);

//     const fetchFilteredPackages = useCallback(async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/manage-package/search', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     destination,
//                     date,
//                     maxPrice: parseInt(maxPrice, 10) // Ensure maxPrice is a number
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch packages: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setFilteredPackages(data);

//             if (data.length === 0) {
//                 setError('No packages found for your search criteria. You can view other packages.');
//             } else {
//                 setError(null);
//             }
//         } catch (error) {
//             console.error('Error fetching packages:', error);
//             setError('Error fetching packages.');
//         }
//     }, [destination, date, maxPrice]);

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
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter name here..."
//                                 value={destination}
//                                 onChange={(e) => setDestination(e.target.value)}
//                             />
//                             <GrLocation className="icon"/>
//                         </div>
//                     </div>

//                     <div className="dateInput">
//                         <label htmlFor="date">Select your date:</label>
//                         <div className="input flex">
//                             <input 
//                                 type="date"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="priceInput">
//                         <div className="label_total_flex">
//                             <label htmlFor="price">Max price:</label>
//                             <h3 className="total">RM{maxPrice}</h3>
//                         </div>
//                         <div className="input flex">
//                             <input 
//                                 type="range" 
//                                 max="5000" 
//                                 min="0" 
//                                 value={maxPrice}
//                                 onChange={(e) => setMaxPrice(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Search button to trigger the package fetching */}
//                     <button onClick={fetchFilteredPackages} className="searchBtn">Search</button>
//                 </div>
//             </div>

//             {error && <div className="errorMessage">{error}</div>}
//             <PackageListing packages={filteredPackages} /> {/* Pass packages to PackageListing component */}
//         </section>
//     );
// };

// export default Package;


import React, { useState, useCallback, useEffect } from "react";
import './package.css';
import video from '../../Assets/video01.mp4';
import { GrLocation } from "react-icons/gr";
import PackageListing from '../PackageListing/PackageListing';

const Package = () => {
    const [allPackages, setAllPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [maxPrice, setMaxPrice] = useState(5000);
    const [error, setError] = useState(null);

    // Fetch all packages when the component mounts
    useEffect(() => {
        const fetchAllPackages = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/manage-package');
                if (!response.ok) {
                    throw new Error(`Failed to fetch packages: ${response.statusText}`);
                }
                const data = await response.json();
                setAllPackages(data);
                setFilteredPackages(data); // Set filteredPackages to all packages initially
            } catch (error) {
                console.error('Error fetching packages:', error);
                setError('Failed to fetch all packages.');
            }
        };

        fetchAllPackages();
    }, []);

    const fetchFilteredPackages = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/manage-package/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    destination,
                    date,
                    maxPrice: parseInt(maxPrice, 10) // Ensure maxPrice is a number
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch packages: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.length === 0) {
                setError('No packages found for your search criteria. You can view other packages.');
                setFilteredPackages(allPackages); // Show all packages if no search results
            } else {
                setError(null);
                setFilteredPackages(data);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
            setError('Error fetching packages.');
        }
    }, [destination, date, maxPrice, allPackages]);

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

                    {/* Search button to trigger the package fetching */}
                    <button onClick={fetchFilteredPackages} className="searchBtn">Search</button>
                </div>
            </div>

            {error && <div className="errorMessage">{error}</div>}
            <PackageListing packages={filteredPackages} /> {/* Pass packages to PackageListing component */}
        </section>
    );
};

export default Package;

