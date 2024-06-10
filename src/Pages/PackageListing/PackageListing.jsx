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
//     "title": "Malaysia Adventure",
//     "location": "Kuala Lumpur",
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
//                     Data.map(({id, imgSrc, title, location, description, price}) => {
//                         return(
//                             <div key={id} className="singleDestination">
//                                 <div className="imageDiv">
//                                     <img src={imgSrc} alt={title}/>
//                                 </div>

//                                 <div className="cardInfo">
//                                     <h4 className="location">{location}</h4>
//                                     <div className="fees flex">
//                                         <div className="price">
//                                             <h5>RM {price}</h5>
//                                         </div>
//                                         <span className="continent flex">
//                                             <HiOutlineLocationMarker className="icon"/>
//                                             <span className="name">{location}</span>
//                                         </span>
//                                     </div>
//                                     <div className="description">
//                                         <span>{description}</span>
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

//cannot delete this version
// import React, { useEffect, useState } from "react";
// import './packageListing.css';
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { Link } from 'react-router-dom';

// const PackageListing = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/manage-package')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch packages');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setPackages(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a loading spinner or animation
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // You can customize the error message or UI here
//   }

//   return (
//     <section className="packageListing container section">
//       <div className="secTitle">
//         <h3 className="title">
//           Most visited destinations
//         </h3>
//       </div>

//       <div className="secContent grid">
//         {packages.map(({id, imgSrc, title, location, description, price }) => (
//           <div key={id} className="singleDestination">
//             <div className="imageDiv">
//               <img src={imgSrc} alt={title} />
//             </div>

//             <div className="cardInfo">
//               <h4 className="location">{title}</h4>
//               <div className="fees flex">
//                 <div className="price">
//                   <h5>RM {price}</h5>
//                 </div>
//                 <span className="continent flex">
//                   <HiOutlineLocationMarker className="icon" />
//                   <span className="name">{location}</span>
//                 </span>
//               </div>
//               <div className="description">
//                 <span>{description}</span>
//               </div>

//               <Link to={`/package/${id}`} className="btn flex">
//                 DETAILS
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default PackageListing;


//version for search
// import React from "react";
// import './packageListing.css';
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { Link } from 'react-router-dom';

// const PackageListing = ({ packages }) => {
//   if (packages.length === 0) {
//     return <div>No packages found</div>; // You can customize this message or UI
//   }

//   return (
//     <section className="packageListing container section">
//       <div className="secTitle">
//         <h3 className="title">
//           Most visited destinations
//         </h3>
//       </div>

//       <div className="secContent grid">
//         {packages.map(({ id, imgSrc, title, location, description, price }) => (
//           <div key={id} className="singleDestination">
//             <div className="imageDiv">
//               <img src={imgSrc} alt={title} />
//             </div>

//             <div className="cardInfo">
//               <h4 className="location">{title}</h4>
//               <div className="fees flex">
//                 <div className="price">
//                   <h5>RM {price}</h5>
//                 </div>
//                 <span className="continent flex">
//                   <HiOutlineLocationMarker className="icon" />
//                   <span className="name">{location}</span>
//                 </span>
//               </div>
//               <div className="description">
//                 <span>{description}</span>
//               </div>

//               <Link to={`/package/${id}`} className="btn flex">
//                 DETAILS
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default PackageListing;


//second version
// import React from "react";
// import './packageListing.css';
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { Link } from 'react-router-dom';

// const PackageListing = ({ packages }) => {
//   return (
//     <section className="packageListing container section">
//       <div className="secTitle">
//         <h3 className="title">
//           Most visited destinations
//         </h3>
//       </div>

//       <div className="secContent grid">
//         {packages.length === 0 ? (
//           <div className="noResultsMessage">No packages found for your search criteria. You can view other packages.</div>
//         ) : (
//           packages.map(({ id, imgSrc, title, location, description, price }) => (
//             <div key={id} className="singleDestination">
//               <div className="imageDiv">
//                 <img src={imgSrc} alt={title} />
//               </div>

//               <div className="cardInfo">
//                 <h4 className="location">{title}</h4>
//                 <div className="fees flex">
//                   <div className="price">
//                     <h5>RM {price}</h5>
//                   </div>
//                   <span className="continent flex">
//                     <HiOutlineLocationMarker className="icon" />
//                     <span className="name">{location}</span>
//                   </span>
//                 </div>
//                 <div className="description">
//                   <span>{description}</span>
//                 </div>

//                 <Link to={`/package/${id}`} className="btn flex">
//                   DETAILS
//                 </Link>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// }

// export default PackageListing;


import React from "react";
import './packageListing.css';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from 'react-router-dom';

const PackageListing = ({ packages }) => {
  return (
    <section className="packageListing container section">
      <div className="secTitle">
        <h3 className="title">
          Most visited destinations
        </h3>
      </div>

      <div className="secContent grid">
        {packages.length === 0 ? (
          <div className="noResultsMessage">No travel packages found. Please have a look at other travel packages.</div>
        ) : (
          packages.map(({ id, imgSrc, title, location, description, price }) => (
            <div key={id} className="singleDestination">
              <div className="imageDiv">
                <img src={imgSrc} alt={title} />
              </div>

              <div className="cardInfo">
                <h4 className="location">{title}</h4>
                <div className="fees flex">
                  <div className="price">
                    <h5>RM {price}</h5>
                  </div>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="icon" />
                    <span className="name">{location}</span>
                  </span>
                </div>
                <div className="description">
                  <span>{description}</span>
                </div>

                <Link to={`/package/${id}`} className="btn flex">
                  DETAILS
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default PackageListing;
