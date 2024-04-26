import React, { useState, useEffect } from 'react';
import './payment.css';
import Modal from '../../Components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import Langkawi from '../../Assets/img2.jpg';
import KualaLumpur from '../../Assets/img1.jpg';
import Penang from '../../Assets/img3.jpg';

const Payment = () => {
  const navigate = useNavigate();
  const [bookedPackages, setBookedPackages] = useState([
    { id: 1, image: KualaLumpur, name: 'Kuala Lumpur', cost: 500, quantity: 1, startDate: '01-05-2024', endDate: '05-05-2024'},
    { id: 2, image: Langkawi, name: 'Langkawi', cost: 700, quantity: 1, startDate: '15-06-2024', endDate: '19-06-2024'},
    { id: 3, image: Penang, name: 'Penang', cost: 600, quantity: 1, startDate: '10-07-2024', endDate: '14-07-2024'},
  ]);

  const [totalCost, setTotalCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const calculateTotalCost = () => {
    const total = bookedPackages.reduce(
      (acc, pkg) => acc + pkg.cost * pkg.quantity,
      0
    );
    setTotalCost(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotalCost(); // Update total cost when bookedPackages changes
  }, [bookedPackages]);

  const handleDelete = (packageId) => {
    setBookedPackages((prevPackages) =>
      prevPackages.filter((pkg) => pkg.id !== packageId)
    );
    calculateTotalCost(); // Recalculate total after deleting
  };

  const toggleModal = (content = '') => {
    setIsModalOpen(!isModalOpen);
    setModalContent(content.toString());
  };

  const handleCheckout = () => {
    navigate('/card'); // Navigate to the checkout page
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
            {bookedPackages.map((pkg) => (
              <div key={pkg.id} className='pkg'>
                <div className='wrapper'>
                <img src={pkg.image} alt={pkg.name} style={{ height: 120, width: 150 }} />&nbsp;&nbsp;
                <p>
                  {pkg.name}: RM{pkg.cost.toFixed(2)} x {pkg.quantity}
                </p>
                </div>
                <button onClick={() => handleDelete(pkg.id)}>Delete</button>
                <button onClick={() => toggleModal(`Destination: ${pkg.name}\nCost: RM${pkg.cost.toFixed(2)}\nQuantity: ${pkg.quantity}\nStart Date: ${pkg.startDate}\nEnd Date: ${pkg.endDate}`)}>
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