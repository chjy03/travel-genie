// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import './packageDetail.css';
// import img1 from '../../Assets/img1.jpg';
// import img2 from '../../Assets/img2.jpg';
// import img3 from '../../Assets/img3.jpg';
// import { HiOutlineLocationMarker } from "react-icons/hi";

// const Data = [
//   {
//     "id": 1,
//     "imgSrc": img1,
//     "name": "Malaysia Adventure",
//     "destination": "Kuala Lumpur",
//     "description": "Explore the vibrant city of Kuala Lumpur and its surrounding attractions.",
//     "price": 500,
//     "itinerary": [
//       "Day 1: Arrival in Kuala Lumpur",
//       "Day 2: Visit Batu Caves and explore the Golden Triangle",
//       "Day 3: Explore Chinatown and Central Market",
//       "Day 4: Visit Petronas Twin Towers and KL Tower",
//       "Day 5: Departure from Kuala Lumpur"
//     ]
//   },
//   {
//     "id": 2,
//     "imgSrc": img2,
//     "name": "Island Paradise",
//     "destination": "Langkawi",
//     "description": "Relax on the beautiful beaches of Langkawi and enjoy water sports activities.",
//     "price": 700,
//     "itinerary": [
//       "Day 1: Arrival in Langkawi",
//       "Day 2: Island hopping tour",
//       "Day 3: Explore Langkawi Underwater World",
//       "Day 4: Relax on Pantai Cenang Beach",
//       "Day 5: Departure from Langkawi"
//     ]
//   },
//   {
//     "id": 3,
//     "imgSrc": img3,
//     "name": "Cultural Heritage Tour",
//     "destination": "Penang",
//     "description": "Discover the rich cultural heritage of Penang through its architecture and cuisine.",
//     "price": 600,
//     "itinerary": [
//       "Day 1: Arrival in Penang",
//       "Day 2: Visit Georgetown UNESCO World Heritage Site",
//       "Day 3: Explore Penang Hill and Kek Lok Si Temple",
//       "Day 4: Enjoy Penang Street Food Tour",
//       "Day 5: Departure from Penang"
//     ]
//   }
// ];

// const PackageDetail = () => { // Destructure the Data prop
//   const { id } = useParams();
//   const packageData = Data.find((item) => item.id === parseInt(id));

//   if (!packageData) {
//     return <h2>Package not found</h2>;
//   }

//   const { imgSrc, name, destination, description, price, itinerary } = packageData;

//   return (
//     <div className="packageDetail">
//       <div className="detailHeader">
//         <img src={imgSrc} alt={name} />
//         <h2>{name}</h2>
//         <div className='location flex'>
//           <HiOutlineLocationMarker className="icon"/>
//           <h3>{destination}</h3>
//         </div>
//       </div>
//       <div className="detailContent">
//         <p>{description}</p>
//         <div className="price">Price: RM {price}</div>
//         <div className="itinerary">
//           <h4>Itinerary:</h4>
//           <ul>
//             {itinerary && itinerary.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//         <Link to={`/booking/${id}`} className="bookNowBtn">Book Now</Link>
//       </div>
//     </div>
//   );
// };

// export default PackageDetail;

//connect to mongodb use id
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import './packageDetail.css';
// import { HiOutlineLocationMarker } from "react-icons/hi";

// const PackageDetail = () => {
//   const { id } = useParams();
//   const [packageData, setPackageData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/manage-package/${id}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch package');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setPackageData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a loading spinner or animation
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // You can customize the error message or UI here
//   }

//   if (!packageData) {
//     return <h2>Package not found</h2>;
//   }

//   const { imgSrc, title, location, description, price, dayDuration, nightDuration, itinerary } = packageData;

//   return (
//     <div className="packageDetail">
//       <div className="detailHeader">
//         <img src={imgSrc} alt={title} />
//         <h2>{title}</h2>
//         <div className='location flex'>
//           <HiOutlineLocationMarker className="icon"/>
//           <h3>{location}</h3>
//         </div>
//       </div>
//       <div className="detailContent">
//         <p>{description}</p>
//         <div className="price">Price: RM {price}</div>
//         <div className="duration">
//           <div>Duration: {dayDuration} Days / {nightDuration} Nights</div>
//         </div>
//         <div className="itinerary">
//           <h4>Itinerary:</h4>
//           <ul>
//             {itinerary && itinerary.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//         <Link to={`/booking/${id}`} className="bookNowBtn">Book Now</Link>
//       </div>
//     </div>
//   );
// };

// export default PackageDetail;


//connect using _id
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import './packageDetail.css';
// import { HiOutlineLocationMarker } from "react-icons/hi";

// const PackageDetail = () => {
//   const { id } = useParams();
//   const [packageData, setPackageData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/manage-package/${id}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch package');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setPackageData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a loading spinner or animation
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // You can customize the error message or UI here
//   }

//   if (!packageData) {
//     return <h2>Package not found</h2>;
//   }

//   const { imgSrc, title, location, description, price, dayDuration, nightDuration, itinerary } = packageData;

//   return (
//     <div className="packageDetail">
//       <div className="detailHeader">
//         <img src={imgSrc} alt={title} />
//         <h2>{title}</h2>
//         <div className='location flex'>
//           <HiOutlineLocationMarker className="icon"/>
//           <h3>{location}</h3>
//         </div>
//       </div>
//       <div className="detailContent">
//         <p>{description}</p>
//         <div className="price">Price: RM {price}</div>
//         <div className="duration">
//           <div>Duration: {dayDuration} Days / {nightDuration} Nights</div>
//         </div>
//         <div className="itinerary">
//           <h4>Itinerary:</h4>
//           <ul>
//             {itinerary && itinerary.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//         <Link to={`/booking/${id}`} className="bookNowBtn">Book Now</Link>
//       </div>
//     </div>
//   );
// };

// export default PackageDetail;


//update version fetch from mongodb
//PackageDetail.jsx
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import './packageDetail.css';
// import { HiOutlineLocationMarker } from "react-icons/hi";

// const PackageDetail = () => {
//   const { id } = useParams();
//   const [packageData, setPackageData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/manage-package/${id}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch package');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setPackageData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a loading spinner or animation
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // You can customize the error message or UI here
//   }

//   if (!packageData) {
//     return <h2>Package not found</h2>;
//   }

//   const { imgSrc, title, location, description, price, dayDuration, nightDuration, itinerary } = packageData;

//   return (
//     <div className="packageDetail">
//       <div className="detailHeader">
//         <img src={imgSrc} alt={title} />
//         <h2>{title}</h2>
//         <div className='location flex'>
//           <HiOutlineLocationMarker className="icon"/>
//           <h3>{location}</h3>
//         </div>
//       </div>
//       <div className="detailContent">
//         <p>{description}</p>
//         <div className="price">Price: RM {price}</div>
//         <div className="duration">
//           <div>Duration: {dayDuration} Days / {nightDuration} Nights</div>
//         </div>
//         <div className="itinerary">
//           <h4>Itinerary:</h4>
//           <ul>
//             {itinerary && itinerary.map((item, index) => (
//               <li key={index}>{`Day ${index + 1}: ${item}`}</li>
//             ))}
//           </ul>
//         </div>
//         <Link to={`/booking/${id}`} className="bookNowBtn">Book Now</Link>
//       </div>
//     </div>
//   );
// };

// export default PackageDetail;

//photo slideshow
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import './packageDetail.css';
import { HiOutlineLocationMarker } from "react-icons/hi";

const PackageDetail = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000;

  useEffect(() => {
    fetch(`http://localhost:5000/api/manage-package/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch package');
        }
        return response.json();
      })
      .then(data => {
        setPackageData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (autoScroll) {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === (packageData?.imgSrc?.length || 1) - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? (packageData?.imgSrc?.length || 1) - 1 : currentSlide - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!packageData) {
    return <h2>Package not found</h2>;
  }

  const { imgSrc, title, location, description, price, dayDuration, nightDuration, itinerary } = packageData;

  return (
    <div className="packageDetail">
      <div className="detailHeader">
        <div className="slider">
          <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
          <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
          {imgSrc && imgSrc.map((src, index) => (
            <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
              {index === currentSlide && <img src={src} alt={`Slide ${index}`} />}
            </div>
          ))}
        </div>
        <h2>{title}</h2>
        <div className='location flex'>
          <HiOutlineLocationMarker className="icon" />
          <h3>{location}</h3>
        </div>
      </div>
      <div className="detailContent">
        <p>{description}</p>
        <div className="price">Price: RM {price}</div>
        <div className="duration">
          <div>Duration: {dayDuration} Days / {nightDuration} Nights</div>
        </div>
        <div className="itinerary">
          <h4>Itinerary:</h4>
          <ul>
            {itinerary && itinerary.map((item, index) => (
              <li key={index}>{`Day ${index + 1}: ${item}`}</li>
            ))}
          </ul>
        </div>
        <Link to={`/booking/${id}`} className="bookNowBtn">Book Now</Link>
      </div>
    </div>
  );
};

export default PackageDetail;

