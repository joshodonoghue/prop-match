import React, { useState, useEffect } from 'react';
import './SellerPlatform.css';

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

const Sidebar = () => {
  const [topBuyers, setTopBuyers] = useState([]);

  useEffect(() => {
      const fetchTopBuyers = async () => {
          try {
              const response = await fetch('http://localhost:3001/api/top');
              const data = await response.json();
              setTopBuyers(data); // Set the top buyers data
          } catch (error) {
              console.error('Error fetching top buyers:', error);
          }
      };

      fetchTopBuyers();
  }, []);

  return (
      <div className="side-panel">
          <h1>Top Buyers</h1>
          <ul>
              {topBuyers.map((buyer, index) => (
                  <li key={index}>{buyer.username}</li>
              ))}
          </ul>
      </div>
  );
};

const SecondaryNav = () => {
  const [userCount, setUserCount] = useState(0); // State to store the user count
  const [msct, setmsct] = useState(0);
  const [inprog, setinprog] = useState(0);
  useEffect(() => {
      // Fetch user count from the server
      const fetchUserCount = async () => {
          try {
              const response = await fetch('http://localhost:3001/api/user-count');
              const data = await response.json();
              setUserCount(data.count); // Update the user count state
          } catch (error) {
              console.error('Error fetching user count:', error);
          }
      };
      const fetchmssct = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/msct');
            const data = await response.json();
            setmsct(data.count); // Update the user count state
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };
    const fetchinprog = async () => {
      try {
          const response = await fetch('http://localhost:3001/api/unfilled');
          const data = await response.json();
          setinprog(data.count); // Update the user count state
      } catch (error) {
          console.error('Error fetching prog count:', error);
      }
  };
      fetchUserCount();
      fetchmssct();
      fetchinprog();
  }, []);

  return (
      <div className="secondary-nav">
          <div className="box">
              <h3>User Total</h3>
              <p>{userCount}</p> {/* Display the dynamic user count */}
          </div>
          <div className="box">
              <h3>New Users</h3>
              <p>4</p>
          </div>
          <div className="box">
              <h3>Enquiry Messages</h3>
              <p>{msct}</p>
          </div>
          <div className="box">
              <h3>Inprogress</h3>
              <p>{inprog}</p>
          </div>
      </div>
  );
};

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
const MainContent = () => {
  const [transactions, setTransactions] = useState([]); // State to store the transactions

  useEffect(() => {
      // Fetch transaction data from the server
      const fetchTransactions = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard');
            const data = await response.json();
            console.log(data); // Log the data to see the structure
            setTransactions(data); // Update the transactions state directly with the received data
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

      fetchTransactions();
  }, []);
  return (
    <div className="main-content">
        <div className="transaction-showcase">
            {transactions.map((transaction, index) => (
                <Transaction
                    key={index}
                    transactionNumber={transaction.transaction_number}
                    transactionDate={transaction.transaction_date}
                    bookingId={transaction.booking_id}
                    amountPaid={transaction.amount_paid}
                    amountReceived={transaction.amount_received}
                    serviceFees={transaction.service_fees}
                    serviceProvider={transaction.service_provider}
                />
            ))}
        </div>
        {/* Other components or content can go here */}
    </div>
);
};

// SellerPlatform component that combines all the above
const SellerPlatform = () => (
  <div className="seller-platform">
    <Navbar />
    <SecondaryNav />
    <div className="content-sidebar-wrapper">
      <MainContent />
      <Sidebar />
    </div>
  </div>
);

export default SellerPlatform;
