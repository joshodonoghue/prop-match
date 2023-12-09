import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './Header';
import About from './About';
import Signup from './Signup'; // Make sure this component is imported
import Login from './Login';
import LoggedInPage from './LoggedInPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />

                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logged-in" element={<LoggedInPage />} />
                    {/* Define other routes here */}
                </Routes>

                {/* If you want the Sign Up link/button to be available on all pages, 
                    place it outside of the Routes component. Otherwise, include it 
                    as part of the UI in a specific route's component (e.g., in the About component). */}
            </div>
        </Router>
    );
}

export default App;
