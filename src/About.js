import React from 'react';
import './About.css'; // Importing a separate CSS file for About component
import { Link } from 'react-router-dom';

function About() {
    return (
        <section id="about" className="about-section">
            <h2>About PropMatch</h2>
            <p>PropMatch is your ultimate gateway to the real estate world. We are revolutionizing how people buy and sell properties by creating a one-stop platform that connects buyers and sellers effortlessly.</p>
            
            <div className="about-subsection">
                <h3>Our Services</h3>
                <p>At PropMatch, we offer a wide range of services including personalized property recommendations for buyers, advanced marketing tools for sellers, and comprehensive legal and financial assistance.</p>
            </div>

            <div className="about-subsection">
                <h3>Why Choose Us?</h3>
                <p>We stand out in the real estate market due to our innovative matching technology, exceptional customer service, and a commitment to transparency and security in all transactions.</p>
            </div>

            <div className="about-subsection">
                <h3>Customer Attraction Strategies</h3>
                <p>To attract and retain our valued customers, we offer first-time user benefits, a rewarding referral program, and actively engage with the community through workshops and events.</p>
            </div>
            <div className="buttons-container">
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <button className="big-button">Sign Up</button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button className="big-button">Log In</button>
                </Link>
            </div>
        
        </section>
    );
}

export default About;
