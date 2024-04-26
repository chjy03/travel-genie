import React, { useState } from 'react';
import './Purchases.css'; // Assuming there's a CSS file for styling
import Langkawi from '../../Assets/img2.jpg'
import KualaLumpur from '../../Assets/img1.jpg'
import Penang from '../../Assets/img3.jpg'

const Purchases = () => {
  // Sample data for past purchases
  const samplePurchases = [
    { date: '2023-01-15', time: '09:00', image: KualaLumpur, package: 'Kuala Lumpur', quantity: 1,cost: 500 },
    { date: '2023-02-20', time: '11:30', image: Langkawi, package: 'Langkawi', quantity: 1, cost: 750 },
    { date: '2023-03-25', time: '14:00', image: Penang, package: 'Penang', quantity: 1, cost: 1000 },
  ];

  const [pastPurchases, setPastPurchases] = useState(samplePurchases);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    const filteredPurchases = samplePurchases.filter((purchase) => {
      return startDate <= purchase.date && purchase.date <= endDate;
    });
    setPastPurchases(filteredPurchases);
  };

  const handleAll = () => {
    setPastPurchases(samplePurchases);
  };

  return (
    <section className='pastPayments'>
        <div className="container">
            <div className="pageTitle">
                <h1 className="title">Past Purchases</h1>
            </div>
            <div className='wrapper'></div>
            <div className="filter-section">
            <label htmlFor="start-date">Start Date:</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            <label htmlFor="end-date">End Date:</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button id='filter-btn' onClick={handleFilter}>Filter</button>
        </div>&nbsp;&nbsp;
        <button id='all-btn' onClick={handleAll}>Display All</button>&nbsp;
        
      <table id="past-purchases-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Image</th>
            <th>Travel Package</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {pastPurchases.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.date}</td>
              <td>{purchase.time}</td>
              <td>
                <img
                  src={purchase.image}
                  alt={purchase.package}
                  style={{ width: '165px', height: '130px' }}
                />
              </td>
              <td>{purchase.package}</td>
              <td>{purchase.quantity}</td>
              <td>RM{purchase.cost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></section>
  );
};

export default Purchases;
