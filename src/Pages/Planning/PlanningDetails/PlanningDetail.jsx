import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./planningDetail.css";
import { HiOutlineLocationMarker, HiStar } from "react-icons/hi";

const PlanningDetail = () => {
  const { id } = useParams();
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  


  const leavePage = () => {
    navigate("/planning");
};

  useEffect(() => {
    fetch(`http://localhost:5000/api/planning/detail/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch destination details");
        }
        return response.json();
      })
      .then((data) => {
        setDestinationData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or animation
  }

  if (error) {
    return <div>E rror: {error}</div>; 
  }

  if (!destinationData) {
    return <h2>Destination not found</h2>;
  }
  if (!destinationData.operatingTime) {
    return <h2>Operating Time not available</h2>;
  }

  const {imgSrc,title,location,address,operatingTime,description,rating,} = destinationData;

  return (
    <div className="planningDetail">
      <div className="detailHeader">
        <img src={imgSrc} alt={title} />
        <span className="rating-flex">
          <h2>{title}</h2>
          <HiStar className="rating-Icon" />
          <span className="rating">{rating}</span>
        </span>
        <div className="location flex">
          <HiOutlineLocationMarker className="icon" />
          <h3>{location}</h3>
        </div>
        <h5>{address}</h5>
        <br />
      </div>
      <div className="detailContent">
        <div className="duration">
          <div>
            Operating Time: {operatingTime.open} - {operatingTime.close}
          </div>
          <br />
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
      <button className="backbtn" onClick={leavePage}>
        Back
      </button>
    </div>
  );
};

export default PlanningDetail;
