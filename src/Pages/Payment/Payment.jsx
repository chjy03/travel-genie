import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payment.css';
import Modal from '../../Components/Modal/Modal';

const Payment = () => {
  const [bookingPackages, setBookingPackages] = useState([]);
  const [packages, setPackages] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const [bookingId, setBookingId] = useState('');
  const navigate = useNavigate();

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

        const filteredPackages = packagesData.filter(pkg => 
          bookingData.some(bp => (bp.packageId === pkg.id && bp.status === 'unpaid'))
        );
        setPackages(filteredPackages);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCancelMessage('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUnpaidBookingId = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookingPage');
        const bookingData = await response.json();

        const unpaidBooking = bookingData.find(booking => booking.status === 'unpaid');
        
        if (unpaidBooking) {
          setBookingId(unpaidBooking._id);
        } else {
          setCancelMessage('No unpaid booking found.');
        }
      } catch (error) {
        console.error('Error fetching booking ID:', error);
        setCancelMessage('Error fetching booking ID. Please try again later.');
      }
    };

    fetchUnpaidBookingId();
  }, []);

  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0;
      packages.forEach(pkg => {
        const booking = bookingPackages.find(bp => bp.packageId === pkg.id && bp.status === 'unpaid');
        if (booking) {
          total += pkg.price * booking.totalPersons;
        }
      });
      setTotalCost(total.toFixed(2));
    };

    calculateTotalCost();
  }, [packages, bookingPackages]);

  const toggleModal = (pkgId = '') => {
    if (pkgId) {
      const booking = bookingPackages.find(bp => bp.packageId === pkgId && bp.status === 'unpaid');
      const pkg = packages.find(p => p.id === pkgId);

      if (pkg && booking) {
        const content = `Destination: ${pkg.location || 'N/A'}\nSelected Date: ${new Date(booking.selectedDate).toLocaleDateString()}`;
        setModalContent(content);
      } else {
        setModalContent('Details not available');
      }
    } else {
      setModalContent('');
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookingPage/${bookingId}/totalCost`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalCost })
      });

      if (response.ok) {
        navigate("/card");
      } else {
        console.error('Failed to update the total cost.');
      }
    } catch (error) {
      console.error('Error updating total cost:', error);
    }
  };

  const handleCancel = async () => {
    console.log(`Attempting to cancel booking with ID: ${bookingId}`);
    try {
      const response = await fetch(`http://localhost:5000/api/bookingPage/${bookingId}/cancel`, {
        method: 'PUT',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Booking cancellation response:', data);
        alert('Booking cancelled successfully.');
        setBookingPackages(prev => prev.filter(bp => bp._id !== bookingId));
        setPackages(prev => prev.filter(pkg => bookingPackages.some(bp => bp.packageId !== pkg.id)));
        setTotalCost(0);
        navigate('/package');
      } else {
        const responseText = await response.text();
        console.error('Failed to cancel the booking:', responseText);
        setCancelMessage('Failed to cancel the booking. Please try again later.');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setCancelMessage('Error cancelling booking. Please try again later.');
    }
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
                <button onClick={() => toggleModal(pkg.id)}>
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
          <button id="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>

      {cancelMessage && <div className="cancel-message">{cancelMessage}</div>}

      <Modal 
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        content={modalContent}
      />
    </section>
  );
};

export default Payment;
