// // src/Pages/Schedule/Schedule.js
// import React from "react";
// import { useLocation } from "react-router-dom";
// import "./schedule.css";
// import { MdCircle } from "react-icons/md";

// const Schedule = () => {
//  const location = useLocation();
//  console.log(location.state); // Check the value of location.state
//  const { selectedDestinations, startDate, endDate } = location.state || {};
//  console.log(selectedDestinations); // Check the value of selectedDestinations

//  return (
//    <section className="schedule">
//      <div className="pageTitle">
//        <h1 className="title">Your Travel Schedule</h1>
//        <h1 className="pageTitleTagLine">Enjoy Your trip!</h1>
//      </div>

//      <div className="timeline">
//        <div className="dest-container left-container">
//          <MdCircle className="circle" />
//          <div className="dest-box">
//            <h3>Destination</h3>
//            <small>
//              <time>10:00</time> to <time>21:00</time>
//            </small>
//            <p>Description</p>
//            <span className="left-container-arrow"></span>
//          </div>
//        </div>

//        <div className="dest-container right-container">
//          <MdCircle className="circle" />
//          <div className="dest-box">
//            <h3>Destination</h3>
//            <small>
//              <time>10:00</time> to <time>21:00</time>
//            </small>
//            <p>Description</p>
//            <span className="right-container-arrow"></span>
//          </div>
//        </div>

//        <div className="dest-container left-container">
//          <MdCircle className="circle" />
//          <div className="dest-box">
//            <h3>Destination</h3>
//            <small>
//              <time>10:00</time> to <time>21:00</time>
//            </small>
//            <p>Description</p>
//            <span className="left-container-arrow"></span>
//          </div>
//        </div>

//        <div className="dest-container right-container">
//          <MdCircle className="circle" />
//          <div className="dest-box">
//            <h3>Destination</h3>
//            <small>
//              <time>10:00</time> to <time>21:00</time>
//            </small>
//            <p>Description</p>
//            <span className="right-container-arrow"></span>
//          </div>
//        </div>
//      </div>
//    </section>
//  );
// };

// export default Schedule;

//siew wen version
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./schedule.css";
// import { MdCircle } from "react-icons/md";

// const Schedule = () => {
//   const location = useLocation();
//   const [destinations, setDestinations] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Make an API call to fetch the destinations
//         const response = await axios.get("http://localhost:5000/api/schedule");
//         // Set the fetched destinations to the state
//         setDestinations(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (location.state && location.state.selectedDestinations) {
//       fetchDestinations();
//     }
//   }, [location.state]); 

//   return (
//     <section className="schedule">
//       <div className="pageTitle">
//         <h1 className="title">Your Travel Schedule</h1>
//         <h1 className="pageTitleTagLine">Enjoy Your trip!</h1>
//         <h2></h2>
//       </div>

//       <div className="timeline">
//         {destinations.map((destination, index) => (
//           <div
//             key={destination._id}
//             className={`dest-container ${
//               index % 2 === 0 ? "left-container" : "right-container"
//             }`}
//           >
//             <MdCircle className="circle" />
//             <div className="dest-box">
//               <h3>{destination.title}</h3>
//               <small>
//                 <time>{destination.operatingTime.open}</time> to{" "}
//                 <time>{destination.operatingTime.close}</time>{" "}
//               </small>
//               <p>{destination.description}</p>
//               <span
//                 className={`${
//                   index % 2 === 0
//                     ? "left-container-arrow"
//                     : "right-container-arrow"
//                 }`}
//               ></span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Schedule;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./schedule.css";
import { MdCircle } from "react-icons/md";

const Schedule = () => {
  const location = useLocation();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Make an API call to fetch the destinations
        const response = await axios.get("http://localhost:5000/api/schedule");
        // Set the fetched destinations to the state
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (location.state && location.state.selectedDestinations) {
      fetchDestinations(); // Corrected function call
    }
  }, [location.state]);

  return (
    <section className="schedule">
      <div className="pageTitle">
        <h1 className="title">Your Travel Schedule</h1>
        <h1 className="pageTitleTagLine">Enjoy Your trip!</h1>
        <h2></h2>
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
                <time>{destination.operatingTime.close}</time>{" "}
              </small>
              <p>{destination.description}</p>
              <span
                className={`${
                  index % 2 === 0
                    ? "left-container-arrow"
                    : "right-container-arrow"
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
