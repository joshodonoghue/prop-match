import React, { useState } from 'react';
import './Signup.css'; // Ensure this CSS file is created and linked
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.first_name.trim()) {
            errors.first_name = 'First name is required';
        }

        if (!values.last_name.trim()) {
            errors.last_name = 'Last name is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password needs to be 6 characters or more';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate(formData);
    
        if (Object.keys(newErrors).length === 0) {

            try {
                const response = await fetch('http://localhost:3001/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        email: formData.email,
                        username: formData.username,
                        password: formData.password // Assuming backend expects 'password'
                    }),
                });
                console.log(response)
    
                if (response.ok) {
                    // Redirect to the login page
                    navigate('/login');
                } else {
                    // Handle unsuccessful registration
                    const errorData = await response.json();
                    console.error('Registration error:', errorData);
                    // ... handle and display error message
                }
                // Maybe redirect to login page or show success message
            } catch (error) {
                console.error('Registration error:', error);
                // Handle errors in registration
            }
        } else {
            setErrors(newErrors); // Handle form validation errors
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="text" name="first_name" id="firstName" placeholder="First Name" onChange={handleChange} />
                {errors.first_name && <p>{errors.first_name}</p>}
                
                <input type="text" name="last_name" id="lastName" placeholder="Last Name" onChange={handleChange} />
                {errors.last_name && <p>{errors.last_name}</p>}
                
                <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} />
                {errors.email && <p>{errors.email}</p>}
                
                <input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
                {errors.username && <p>{errors.username}</p>}
                
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                {errors.password && <p>{errors.password}</p>}
                
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
