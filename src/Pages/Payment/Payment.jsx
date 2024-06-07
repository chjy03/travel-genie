import React, { useState, useEffect } from 'react';
import './payment.css';
import Modal from '../../Components/Modal/Modal';

const Payment = () => {
  const [bookingPackages, setBookingPackages] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await fetch('http://localhost:5000/api/bookingPage');
        if (!bookingResponse.ok) {
          throw new Error('Failed to fetch booking packages');
        }
        const bookingData = await bookingResponse.json();
        setBookingPackages(bookingData);

        const packagesResponse = await fetch('http://localhost:5000/api/manage-package');
        if (!packagesResponse.ok) {
          throw new Error('Failed to fetch packages');
        }
        const packagesData = await packagesResponse.json();

        // Filter packages based on booking packages and unpaid status
        const filteredPackages = packagesData.filter(pkg => 
          bookingData.some(bp => (bp.packageId === pkg.id && bp.status === 'unpaid'))
        );
        setPackages(filteredPackages);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const total = packages.reduce((acc, pkg) => acc + pkg.price, 0);
    setTotalCost(total.toFixed(2));
  }, [packages]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or animation
  }

  if (error) {
    return <div>Error: {error}</div>; // You can customize the error message or UI here
  }

  const toggleModal = (content = '') => {
    setIsModalOpen(!isModalOpen);
    setModalContent(content.toString());
  };

  const handleCheckout = () => {
    window.location.href = "/card"; // Navigate to the checkout page
  };

  return (
    <section className='payment'>
      <div className="pageTitle">
        <h1 className="title">Payment</h1>
      </div>
      <div className="container">
        <div className="packages">
          <h2>Travel Packages</h2>
          <div id="booking-list">
            {packages.map((pkg) => (
              <div key={pkg.id} className='pkg'>
                <div className='wrapper'>
                  <img src={pkg.imgSrc} alt={pkg.title} style={{ height: 120, width: 150 }} />&nbsp;&nbsp;
                  <p>
                    {pkg.title}: RM{pkg.price}
                  </p>
                </div>
                <button onClick={() => toggleModal(`Destination: ${pkg.location}\nCost: RM${pkg.price}\nDescription: ${pkg.description}`)}>
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="total-cost">
          <h2>Total Cost</h2>
          <div id="total-cost-value">RM{totalCost}</div>
          <button id="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={modalContent}
      />
    </section>
  );
};

export default Payment;
