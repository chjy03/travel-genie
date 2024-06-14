import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./schedule.css";
import { MdCircle } from "react-icons/md";

const Schedule = () => {
  const { userID } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/schedule/${userID}`);
        // Set the fetched schedule and destinations to the state
        setSchedule(response.data.schedule);
        setDestinations(response.data.destinations);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
        if (userID) {
        fetchSchedule();
        }
  }, [userID]);

  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <section className="schedule">
      <div className="pageTitle">
        <h1 className="title">Your Travel Schedule</h1>
         <h1 className="pageTitleTagLine">Enjoy Your {schedule.duration} day(s) trip!</h1>
      </div>

      <div className="timeline">
        {destinations.map((destination, index) => (
          <div
            key={destination._id}
            className={`dest-container ${
              index % 2 === 0 ? "left-container" : "right-container"
            }`}
          >
            <MdCircle className="circle" />
            <div className="dest-box">
              <h3>{destination.title}</h3>
              <small>
                <time>{destination.operatingTime.open}</time> to{" "}
                <time>{destination.operatingTime.close}</time>
              </small>
              <p>{destination.description}</p>
              <span
                className={`${index % 2 === 0? "left-container-arrow": "right-container-arrow"
                }`}
              ></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Schedule;

