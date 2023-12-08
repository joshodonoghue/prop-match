// In src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // Create and style similarly to Signup.css

function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement login logic here
        // This will involve making an HTTP request to your backend
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit" className="submit-button">Log In</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
