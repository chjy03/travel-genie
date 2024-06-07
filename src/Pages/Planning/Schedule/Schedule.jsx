// src/Pages/Schedule/Schedule.js
import React from "react";
import { useLocation } from "react-router-dom";
import "./schedule.css";
import { MdCircle } from "react-icons/md";

const Schedule = () => {
 const location = useLocation();
 console.log(location.state); // Check the value of location.state
 const { selectedDestinations, startDate, endDate } = location.state || {};
 console.log(selectedDestinations); // Check the value of selectedDestinations

 return (
   <section className="schedule">
     <div className="pageTitle">
       <h1 className="title">Your Travel Schedule</h1>
       <h1 className="pageTitleTagLine">Enjoy Your trip!</h1>
     </div>

     <div className="timeline">
       <div className="container left-container">
         <MdCircle className="circle" />
         <div className="dest-box">
           <h3>Destination</h3>
           <small>
             <time>10:00</time> to <time>21:00</time>
           </small>
           <p>Description</p>
           <span className="left-container-arrow"></span>
         </div>
       </div>

       <div className="container right-container">
         <MdCircle className="circle" />
         <div className="dest-box">
           <h3>Destination</h3>
           <small>
             <time>10:00</time> to <time>21:00</time>
           </small>
           <p>Description</p>
           <span className="right-container-arrow"></span>
         </div>
       </div>

       <div className="container left-container">
         <MdCircle className="circle" />
         <div className="dest-box">
           <h3>Destination</h3>
           <small>
             <time>10:00</time> to <time>21:00</time>
           </small>
           <p>Description</p>
           <span className="left-container-arrow"></span>
         </div>
       </div>

       <div className="container right-container">
         <MdCircle className="circle" />
         <div className="dest-box">
           <h3>Destination</h3>
           <small>
             <time>10:00</time> to <time>21:00</time>
           </small>
           <p>Description</p>
           <span className="right-container-arrow"></span>
         </div>
       </div>
     </div>
   </section>
 );
};

export default Schedule;



//  {selectedDestinations &&
//            selectedDestinations.map((destination, index) => (
//              <div key={index} className="timeline-item">
//                <div className="timeline-icon">
//                  <span>{index + 1}</span>
//                </div>
//                <div className="timeline-content">
//                  <h2>{destination}</h2>
//                  <p>
//                    {`Scheduled on: ${
//                      startDate && endDate
//                        ? `${new Date(
//                            startDate
//                          ).toLocaleDateString()} - ${new Date(
//                            endDate
//                          ).toLocaleDateString()}`
//                        : "Dates not set"
//                    }`}
//                  </p>
//                </div>
//              </div>
//            ))}
