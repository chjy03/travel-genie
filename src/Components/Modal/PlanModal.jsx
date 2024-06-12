import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./PlanModal.css";

const PlanModal = ({ onClose, onSubmit, selectedDestinations }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const f_startDate = startDate? startDate.toLocaleDateString("en-GB"): null;
    const f_endDate = endDate ? endDate.toLocaleDateString("en-GB") : null;
    const duration = calculateDuration(startDate, endDate);
    onSubmit(f_startDate, f_endDate, duration, selectedDestinations);
    onClose();
    navigate("/schedule");
  };


  const calculateDuration = (start, end) => {
    if (!start || !end) return null;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
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
