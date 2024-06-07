import React, { useState, useEffect } from 'react';
import './Purchases.css'; // Assuming there's a CSS file for styling

const Purchases = () => {
  const [pastPurchases, setPastPurchases] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Fetch booking data
        const bookingResponse = await fetch('http://localhost:5000/api/bookingPage');
        if (!bookingResponse.ok) {
          throw new Error('Failed to fetch booking data');
        }
        const bookingData = await bookingResponse.json();

        // Filter for paid bookings with unique _id fields
        const uniquePaidBookings = bookingData.filter(booking => booking.status === 'paid');

        // Fetch package data
        const packageResponse = await fetch('http://localhost:5000/api/manage-package');
        if (!packageResponse.ok) {
          throw new Error('Failed to fetch package data');
        }
        const packageData = await packageResponse.json();

        // Combine data
        const purchases = uniquePaidBookings.map(booking => {
          const matchingPackage = packageData.find(pkg => pkg.id === booking.packageId);
          return {
            date: new Date(booking.selectedDate).toLocaleDateString(),
            image: matchingPackage?.imgSrc || '',
            package: matchingPackage?.title || '',
            cost: matchingPackage?.price || 0,
            startDate: new Date(booking.selectedDate).toLocaleDateString()
          };
        });

        setPastPurchases(purchases);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

    const handleFilter = () => {
    const filteredPurchases = pastPurchases.filter((purchase) => {
      return startDate <= purchase.startDate && purchase.startDate <= endDate;
    });
    setPastPurchases(filteredPurchases);
  };

  const handleAll = () => {
    // Re-fetch the purchases to reset the filter
    const fetchPurchases = async () => {
      try {
        const bookingResponse = await fetch('http://localhost:5000/api/bookingPage');
        if (!bookingResponse.ok) {
          throw new Error('Failed to fetch booking data');
        }
        const bookingData = await bookingResponse.json();

        const uniquePaidBookings = bookingData.filter(booking => booking.status === 'paid');

        const packageResponse = await fetch('http://localhost:5000/api/manage-package');
        if (!packageResponse.ok) {
          throw new Error('Failed to fetch package data');
        }
        const packageData = await packageResponse.json();

        const purchases = uniquePaidBookings.map(booking => {
          const matchingPackage = packageData.find(pkg => pkg.id === booking.packageId);
          return {
            date: new Date(booking.selectedDate).toLocaleDateString(),
            image: matchingPackage?.imgSrc || '',
            package: matchingPackage?.title || '',
            cost: matchingPackage?.price || 0,
            startDate: new Date(booking.selectedDate).toLocaleDateString()
          };
        });

        setPastPurchases(purchases);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchPurchases();
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or animation
  }

  if (error) {
    return <div>Error: {error}</div>; // You can customize the error message or UI here
  }

  return (
    <section className='pastPayments'>
      <div className="container">
        <div className="pageTitle">
          <h1 className="title">Purchases</h1>
      </div>&nbsp;&nbsp;
        
        <table id="past-purchases-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Travel Package</th>
              <th>Start Date</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {pastPurchases.map((purchase, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={purchase.image}
                    alt={purchase.package}
                    style={{ width: '165px', height: '130px' }}
                  />
                </td>
                <td>{purchase.package}</td>
                <td>{purchase.startDate}</td>
                <td>RM{purchase.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Purchases;
