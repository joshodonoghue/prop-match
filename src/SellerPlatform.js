import React from 'react';
import './SellerPlatform.css'; // Ensure this CSS file is created and


// Component for the navigation bar
const Navbar = () => (
  <div className="navbar">
    <a href="#home">Home</a>
    <a href="#products">Products</a>
    <a href="#orders">Orders</a>
    <a href="#analytics">Analytics</a>
    <a href="#settings">Settings</a>
  </div>
);

// Component for the secondary navigation
const SecondaryNav = () => (
  <div className="secondary-nav">
    <div className="box">
      <h3>User Total</h3>
      <p>14,800</p>
    </div>
    <div className="box">
      <h3>New Users</h3>
      <p>541</p>
    </div>
    <div className="box">
      <h3>Enquiry Messages</h3>
      <p>166</p>
    </div>
    {/* Additional boxes as needed */}
  </div>
);

// Transaction component to display transaction details
const Transaction = ({ transactionNumber, transactionDate, bookingId,
amountPaid, amountReceived, serviceFees, serviceProvider }) => (
  <div className="transaction">
    <h3>Transaction Number: {transactionNumber}</h3>
    <p>Date: {transactionDate}</p>
    <p>Booking ID: {bookingId}</p>
    <p>Amount Paid: ${amountPaid}</p>
    <p>Amount Received: ${amountReceived}</p>
    <p>Service Fees: ${serviceFees}</p>
    <p>Service Provider: {serviceProvider}</p>
  </div>
);

// Main content component that includes the transaction details
const MainContent = () => (
  <div className="main-content">
    <div className="transaction-showcase">
      <Transaction
        transactionNumber="TX12345678"
        transactionDate="2023-04-01"
        bookingId="BK123"
        amountPaid="150.00"
        amountReceived="145.00"
        serviceFees="5.00"
        serviceProvider="PayPal"
      />
      {/* Repeat the Transaction component as needed */}
    </div>
    {/* Other components or content can go here */}
  </div>
);

// SellerPlatform component that combines all the above
const SellerPlatform = () => (
  <div className="seller-platform">
    <Navbar />
    <SecondaryNav />
    <MainContent />
    {/* Additional components and content */}
  </div>
);

export default SellerPlatform;
