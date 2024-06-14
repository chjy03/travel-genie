import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./PlanModal.css";

const PlanModal = ({ onClose, selectedDestinations}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const CURRENT_USERID = localStorage.getItem("userId");
  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {

    event.preventDefault();
    const f_startDate = startDate ? startDate.toISOString() : null;
    const f_endDate = endDate ? endDate.toISOString() : null;
    const duration = calculateDuration(startDate, endDate);


    const scheduleData = {
      userId: CURRENT_USERID,
      startDate: f_startDate,
      endDate: f_endDate,
      duration: duration,
      selectedDestinations,
    };
    console.log("Submitting schedule data:", scheduleData);

    try {
      const response = await axios.post( 'http://localhost:5000/api/schedule',scheduleData);
      console.log("Plan submitted successfully:", response.data);
      onClose();
      navigate(`/schedule/${CURRENT_USERID}`);
    } catch (error) {
      if (error.response) {
        console.error("Error submitting plan:", error.response.data);
      } else if (error.request) {
        console.error("Error submitting plan: No response received");
      } else {
        console.error("Error submitting plan:", error.message);
      }
    }
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return null;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header"></div>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h3>Enter Travel Dates</h3>
          <br />
          <div className="date-picker-container">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="date-picker-container">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <br />
          <div className="submit-container">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;



