import React, { useState } from 'react';
import './Login.css'; // Make sure this CSS file is styled
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
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
        setError(''); // Reset error message

        // Basic validation
        if (!loginData.username || !loginData.password) {
            setError('Username and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/logged-in'); // Redirect to the "Logged In" page
            } else {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data);
            // Handle successful login:
            // - Save the user data or token (if provided) for session management
            // - Redirect the user or update the app state to reflect the login
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
        }
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
