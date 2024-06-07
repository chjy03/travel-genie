import React from "react";
import  { useState } from "react";
import "./planning.css";
import img from '../../Assets/imgKL.jpg'
import img2 from '../../Assets/imgKL.jpg'
import img3 from '../../Assets/imgKL.jpg'
import img4 from '../../Assets/imgKL.jpg'
import img5 from '../../Assets/imgKL.jpg'
import img6 from '../../Assets/imgKL.jpg'
import img7 from '../../Assets/imgKL.jpg'
import img8 from '../../Assets/imgKL.jpg'
import { HiOutlineLocationMarker, HiXCircle } from "react-icons/hi";
import PlanModal from "../../Components/Modal/PlanModal";

const Planning = () => {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const addToItinerary = (destination) => {
    if (!selectedDestinations.includes(destination)) {
      // If it doesn't exist, add it to the selectedDestinations array
      setSelectedDestinations([...selectedDestinations, destination]);
    } else {
      // If it already exists, you can display a message or handle it as needed
      console.log(`${destination} is already in the itinerary.`);
    }
  };

  const removeFromItinerary = (index) => {
    const updatedDestinations = [...selectedDestinations];
    updatedDestinations.splice(index, 1);
    setSelectedDestinations(updatedDestinations);
  };

  const handleDestinationClick = (destination) => {
    // Navigate to the page showing full details of the destination
    console.log(`Navigating to details page of ${destination}`);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };


  return (
    <section className="planning">
      <div className="pageTitle">
        <h1 className="title">Planning</h1>
        <h1 className="pageTitleTagLine">
          Epic bucket list places to add to your next itinerary!
        </h1>
      </div>

      <div className="container">
        <div className="sideContainer">
          <div className="filters">
            <input type="text" className="search-bar" placeholder="Search..." />
            <div className="filter-checkbox">
              <input type="checkbox" id="filter1" name="filter1" />
              <label htmlFor="filter1">Filter 1</label>
            </div>
            <div className="filter-checkbox">
              <input type="checkbox" id="filter2" name="filter2" />
              <label htmlFor="filter2">Filter 2</label>
            </div>
            <div className="filter-checkbox">
              <input type="checkbox" id="filter2" name="filter2" />
              <label htmlFor="filter2">Filter 3</label>
            </div>
            <div className="filter-checkbox">
              <input type="checkbox" id="filter2" name="filter2" />
              <label htmlFor="filter2">Filter 4</label>
            </div>
            <div className="filter-checkbox">
              <input type="checkbox" id="filter2" name="filter2" />
              <label htmlFor="filter2">Filter 5</label>
            </div>
          </div>

          <div className="selectedDest">
            <h3 className="categoryTitle">Selected Destinations</h3>
            <div className="selectedList">
              {selectedDestinations.map((destination, index) => (
                <div className="selectedItem" key={index}>
                  <span onClick={() => handleDestinationClick(destination)}>
                    {destination}
                  </span>

                  <HiXCircle
                    className="iconRemove"
                    onClick={() => removeFromItinerary(index)}
                  />
                </div>
              ))}
            </div>

            {/* Conditionally render the Plan button */}
            {selectedDestinations.length > 0 && (
              <div className="btn" onClick={handleModalOpen}>
                <a className="btnText">PLAN</a>
              </div>
            )}

            {/* Conditionally render the modal*/}
            {modalOpen && (
              <PlanModal
                onClose={handleModalClose}
                onSubmit={(duration) => {
                  console.log("Duration: ", duration);
                }}
              />
            )}

          </div>
        </div>

        <div className="secContent grid">
          {Data.map(({ id, imgSrc, destTitle, location }) => {
            return (
              <div key={id} className="singleDestination">
                {/* return single id from the map array */}

                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="locationIcon" />
                    <span className="name">{location}</span>
                  </span>

                  <div
                    className="btn flex"
                    onClick={() => addToItinerary(destTitle)}
                  >
                    <a className="btnText">ADD</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Planning;


const Data = [
  {
    id:1,
    imgSrc:img,
    destTitle: 'KLCC visits',
    location: 'Kuala Lumpur',

  },

  {
    id:2,
    imgSrc:img2,
    destTitle: 'Mural Street',
    location: 'Penang',

  },

  {
    id:3,
    imgSrc:img3,
    destTitle: 'Red House',
    location: 'Melaka',

  },

  {
    id:4,
    imgSrc:img4,
    destTitle: 'Bukit Kluang Beach',
    location: 'Terengganu',

  },

  {
    id:5,
    imgSrc:img5,
    destTitle: 'Leaning Tower Teluk Intan',
    location: 'Perak',

  },

  {
    id:6,
    imgSrc:img6,
    destTitle: 'KLCC visits',
    location: 'KualaLumpur',

  },

  {
    id:7,
    imgSrc:img7,
    destTitle: 'KLCC visits',
    location: 'KualaLumpur',
  
  },

  {
    id:8,
    imgSrc:img8,
    destTitle: 'KLCC visits',
    location: 'KualaLumpur',

  }
]

