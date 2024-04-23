import React, { useState, useEffect } from 'react'
import './payment.css'
import Langkawi from '../../Assets/images/Langkawi.jpg'
import Malacca from '../../Assets/images/Malacca.jpg'
import Sabah from '../../Assets/images/Sabah.jpg'

const Payment = () => {
  // Initialize the state for booked packages and total cost
  const [bookedPackages, setBookedPackages] = useState([
    { id: 1, image: Langkawi, name: 'Package 1', cost: 500, quantity: 1 },
    { id: 2, image: Malacca, name: 'Package 2', cost: 750, quantity: 1 },
    { id: 3, image: Sabah, name: 'Package 3', cost: 750, quantity: 1 },
  ]);

  const [totalCost, setTotalCost] = useState(0);

  // Function to calculate total cost and update state
  const calculateTotalCost = () => {
    const total = bookedPackages.reduce(
      (acc, pkg) => acc + pkg.cost * pkg.quantity, 0
    );
    setTotalCost(total.toFixed(2)); // Update the state with the calculated total
  };

  // Function to display booked packages
  const displayBookedPackages = () => {
    return bookedPackages.map((pkg) => (
      <div key={pkg.id}>
        <img src={pkg.image} style={{height:60, width:80}} alt={pkg.name} />
        <p>
          {pkg.name}: ${pkg.cost.toFixed(2)} x {pkg.quantity}&nbsp;
          <button onClick={() => handleReduce(pkg.id)}>-</button>&nbsp;
          <button onClick={() => handleAdd(pkg.id)}>+</button>&nbsp;
          <br></br>
          <button onClick={() => handleDelete(pkg.id)}>Delete</button>
        </p><br></br>
      </div>
    ));
  };

  // Functions to handle increase, decrease, and delete operations
  const handleReduce = (packageId) => {
    setBookedPackages((prevPackages) =>
      prevPackages.map((pkg) => {
        if (pkg.id === packageId && pkg.quantity > 1) {
          pkg.quantity--;
        }
        return pkg;
      })
    );
    calculateTotalCost();
  };

  const handleAdd = (packageId) => {
    setBookedPackages((prevPackages) =>
      prevPackages.map((pkg) => {
        if (pkg.id === packageId) {
          pkg.quantity++;
        }
        return pkg;
      })
    );
    calculateTotalCost();
  };

  const handleDelete = (packageId) => {
    setBookedPackages((prevPackages) =>
      prevPackages.filter((pkg) => pkg.id !== packageId)
    );
  };

  const handleCheckout = () => {
    // Redirect to the payment page
    window.location.href = 'Card.html';
  };

  // Use useEffect to simulate componentDidMount
  useEffect(() => {calculateTotalCost();}, [bookedPackages]); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <section className='payment'>
        <h1>Payment</h1>
        <div class="container">
            <div class="packages">
                <h2>Travel Packages</h2>
                <div id="booking-list">{displayBookedPackages()}</div>
            </div>
            <div class="total-cost">
                <h2>Total Cost</h2>
                <div id="total-cost-value">Total: ${totalCost}</div>
                <button id="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    </section>
  );
};

export default Payment;