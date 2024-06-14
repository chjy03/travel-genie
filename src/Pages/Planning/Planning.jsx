import React from "react";
import axios from "axios";
import "./planning.css";
import PlanModal from "../../Components/Modal/PlanModal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiXCircle, HiStar } from "react-icons/hi";

const Planning = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");



  // Fetch all destinations data from database
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/planning");
        setDestinations(response.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter destinations based on selected rating and search query
  const filteredDestinations = destinations.filter((destination) => {
    const matchesRating = selectedRating? destination.rating >= selectedRating: true;
    const matchesSearch = searchQuery
      ? destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ): true;

    return matchesRating && matchesSearch;
  });

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Add selected destination to list
  const addToItinerary = (destination) => {
    if (!selectedDestinations.includes(destination)) {

      // not exist => add it to the selectedDestinations array
      setSelectedDestinations([...selectedDestinations, destination]);

    } else {

      //  exists => display a message or handle it as needed
      console.log(`${destination} is already in the itinerary.`);
    }
  };

  const removeFromItinerary = (index) => {
    const updatedDestinations = [...selectedDestinations];
    updatedDestinations.splice(index, 1);
    setSelectedDestinations(updatedDestinations);
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
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="filters">
            {/* Rating filter */}
            <select
              value={selectedRating}
              onChange={handleRatingChange}
              className="rating-filter"
            >
              <option value="">All Ratings</option>
              <option value="1">&gt; 1 Star</option>
              <option value="2">&gt; 2 Stars</option>
              <option value="3">&gt; 3 Stars</option>
              <option value="4">&gt; 4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          <div className="selectedDest">
            <h3 className="categoryTitle">Selected Destinations</h3>
            <div className="selectedList">
              {selectedDestinations.map((destination, index) => (
                <div className="selectedItem" key={index}>
                  <span>
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
                //onSubmit={handleSubmitPlan}
                selectedDestinations={selectedDestinations}
              />
            )}
          </div>
        </div>

        <div className="secContent grid">
          {Array.isArray(filteredDestinations) &&
            filteredDestinations.map((destination) => (
              <div key={destination.id} className="singleDestination">
                <Link to={`/detail/${destination.id}`} className="cardLink">
                  <div className="imageDiv">
                    <img src={destination.imgSrc} alt={destination.title} />
                  </div>
                </Link>
                <div className="cardInfo">
                  <h4 className="destTitle">{destination.title}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="locationIcon" />
                    <span className="name">{destination.location}</span>
                  </span>
                  <span className="continent flex">
                    <HiStar className="ratingIcon" />
                    <span className="rating">{destination.rating}</span>
                  </span>

                  <div
                    className="btn flex"
                    onClick={() => addToItinerary(destination.title)}
                  >
                    <a className="btnText">ADD</a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Planning;