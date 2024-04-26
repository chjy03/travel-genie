import React, { useState } from 'react';
import './Purchases.css'; // Assuming there's a CSS file for styling
import Langkawi from '../../Assets/img2.jpg'
import KualaLumpur from '../../Assets/img1.jpg'
import Penang from '../../Assets/img3.jpg'

const Purchases = () => {
  // Sample data for past purchases
  const samplePurchases = [
    { date: '2024-01-15', time: '09:00', image: KualaLumpur, package: 'Kuala Lumpur', quantity: 1,cost: 500, startDate: '2024-05-01', endDate: '2024-05-05'},
    { date: '2024-02-20', time: '11:30', image: Langkawi, package: 'Langkawi', quantity: 1, cost: 700, startDate: '2024-06-15', endDate: '2024-06-19' },
    { date: '2024-03-25', time: '14:00', image: Penang, package: 'Penang', quantity: 1, cost: 600, startDate: '2024-07-10', endDate: '2024-07-14' },
  ];

  const [pastPurchases, setPastPurchases] = useState(samplePurchases);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    const filteredPurchases = samplePurchases.filter((purchase) => {
      return startDate <= purchase.startDate && purchase.endDate <= endDate;
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
                <div className='clarification'>Use the filter to find the start date of your package</div>
            </div>
            
            <div className='wrapper'></div>
            <div className="filter-section">
              
            <label htmlFor="start-date">Between</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            <label htmlFor="end-date">to</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button id='filter-btn' onClick={handleFilter}>Filter</button>
                <button id='all-btn' onClick={handleAll}>Display All</button>
        </div>&nbsp;&nbsp;
        
        
      <table id="past-purchases-table">
        <thead>
          <tr>
            <th>Date Purchased</th>
            <th>Time</th>
            <th>Image</th>
            <th>Travel Package</th>
            <th>Start Date</th>
            <th>End Date</th>
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
              <td>{purchase.startDate}</td>
              <td>{purchase.endDate}</td>
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