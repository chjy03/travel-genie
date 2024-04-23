// import React from "react";
// import './packageListing.css';
// import img1 from '../../Assets/img1.jpg';
// import img2 from '../../Assets/img2.jpg';
// import img3 from '../../Assets/img3.jpg';
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// export const Data = [ // Export Data array
//   {
//     "id": 1,
//     "imgSrc": img1,
//     "name": "Malaysia Adventure",
//     "destination": "Kuala Lumpur",
//     "description": "Explore the vibrant city of Kuala Lumpur and its surrounding attractions.",
//     "price": 500
//   },
//   {
//     "id": 2,
//     "imgSrc": img2,
//     "name": "Island Paradise",
//     "destination": "Langkawi",
//     "description": "Relax on the beautiful beaches of Langkawi and enjoy water sports activities.",
//     "price": 700
//   },
//   {
//     "id": 3,
//     "imgSrc": img3,
//     "name": "Cultural Heritage Tour",
//     "destination": "Penang",
//     "description": "Discover the rich cultural heritage of Penang through its architecture and cuisine.",
//     "price": 600
//   }
// ];

// const PackageListing = () => {
//     return (
//         <section className="packageListing container section">
//             <div className="secTitle">
//                 <h3 className="title">
//                     Most visited destinations
//                 </h3>
//             </div>

//             <div className="secContent grid">
//                 {
//                     Data.map(({id, imgSrc, name, destination, description, price}) => {
//                         return(
//                             <div key={id} className="singleDestination">
//                                 <div className="imageDiv">
//                                     <img src={imgSrc} alt={name}/>
//                                 </div>

//                                 <div className="cardInfo">
//                                     <h4 className="destination">{destination}</h4>
//                                     <span className="continent flex">
//                                         <HiOutlineLocationMarker className="icon"/>
//                                         <span className="name">{destination}</span>
//                                     </span>

//                                     <div className="fees flex">
//                                         <div className="description">
//                                             <span>{description}<small>+1</small></span>
//                                         </div>
//                                         <div className="price">
//                                             <h5>{price}</h5>
//                                         </div>
//                                     </div>

//                                     <Link to={`/package/${id}`} className="btn flex"> {/* Use Link to navigate */}
//                                         DETAILS
//                                     </Link>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </section>
//     )
// }

// export default PackageListing;

import React from "react";
import './packageListing.css';
import img1 from '../../Assets/img1.jpg';
import img2 from '../../Assets/img2.jpg';
import img3 from '../../Assets/img3.jpg';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export const Data = [ // Export Data array
  {
    "id": 1,
    "imgSrc": img1,
    "name": "Malaysia Adventure",
    "destination": "Kuala Lumpur",
    "description": "Explore the vibrant city of Kuala Lumpur and its surrounding attractions.",
    "price": 500
  },
  {
    "id": 2,
    "imgSrc": img2,
    "name": "Island Paradise",
    "destination": "Langkawi",
    "description": "Relax on the beautiful beaches of Langkawi and enjoy water sports activities.",
    "price": 700
  },
  {
    "id": 3,
    "imgSrc": img3,
    "name": "Cultural Heritage Tour",
    "destination": "Penang",
    "description": "Discover the rich cultural heritage of Penang through its architecture and cuisine.",
    "price": 600
  }
];

const PackageListing = () => {
    return (
        <section className="packageListing container section">
            <div className="secTitle">
                <h3 className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {
                    Data.map(({id, imgSrc, name, destination, description, price}) => {
                        return(
                            <div key={id} className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgSrc} alt={name}/>
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destination">{destination}</h4>
                                    <div className="fees flex">
                                        <div className="price">
                                            <h5>RM {price}</h5>
                                        </div>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon"/>
                                            <span className="name">{destination}</span>
                                        </span>
                                    </div>
                                    <div className="description">
                                        <span>{description}</span>
                                    </div>

                                    <Link to={`/package/${id}`} className="btn flex"> {/* Use Link to navigate */}
                                        DETAILS
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default PackageListing;

