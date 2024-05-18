import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './packageDetail.css';
import img1 from '../../Assets/img1.jpg';
import img2 from '../../Assets/img2.jpg';
import img3 from '../../Assets/img3.jpg';
import { HiOutlineLocationMarker } from "react-icons/hi";

const Data = [
  {
    "id": 1,
    "imgSrc": img1,
    "name": "Malaysia Adventure",
    "destination": "Kuala Lumpur",
    "description": "Explore the vibrant city of Kuala Lumpur and its surrounding attractions.",
    "price": 500,
    "itinerary": [
      "Day 1: Arrival in Kuala Lumpur",
      "Day 2: Visit Batu Caves and explore the Golden Triangle",
      "Day 3: Explore Chinatown and Central Market",
      "Day 4: Visit Petronas Twin Towers and KL Tower",
      "Day 5: Departure from Kuala Lumpur"
    ]
  },
  {
    "id": 2,
    "imgSrc": img2,
    "name": "Island Paradise",
    "destination": "Langkawi",
    "description": "Relax on the beautiful beaches of Langkawi and enjoy water sports activities.",
    "price": 700,
    "itinerary": [
      "Day 1: Arrival in Langkawi",
      "Day 2: Island hopping tour",
      "Day 3: Explore Langkawi Underwater World",
      "Day 4: Relax on Pantai Cenang Beach",
      "Day 5: Departure from Langkawi"
    ]
  },
  {
    "id": 3,
    "imgSrc": img3,
    "name": "Cultural Heritage Tour",
    "destination": "Penang",
    "description": "Discover the rich cultural heritage of Penang through its architecture and cuisine.",
    "price": 600,
    "itinerary": [
      "Day 1: Arrival in Penang",
      "Day 2: Visit Georgetown UNESCO World Heritage Site",
      "Day 3: Explore Penang Hill and Kek Lok Si Temple",
      "Day 4: Enjoy Penang Street Food Tour",
      "Day 5: Departure from Penang"
    ]
  }
];

const PackageDetail = () => { // Destructure the Data prop
  const { id } = useParams();
  const packageData = Data.find((item) => item.id === parseInt(id));

  if (!packageData) {
    return <h2>Package not found</h2>;
  }

  const { imgSrc, name, destination, description, price, itinerary } = packageData;

  return (
    <div className="packageDetail">
      <div className="detailHeader">
        <img src={imgSrc} alt={name} />
        <h2>{name}</h2>
        <div className='location flex'>
          <HiOutlineLocationMarker className="icon"/>
          <h3>{destination}</h3>
        </div>
      </div>
      <div className="detailContent">
        <p>{description}</p>
        <div className="price">Price: RM {price}</div>
        <div className="itinerary">
          <h4>Itinerary:</h4>
          <ul>
            {itinerary && itinerary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Link to={`/booking/${id}`} className="bookNowBtn">Book Now</Link>
      </div>
    </div>
  );
};

export default PackageDetail;

