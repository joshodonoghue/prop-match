import React, { useState } from 'react';
import './Signup.css'; // Assuming you have a corresponding CSS file

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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

        if (!values.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        // Repeat similar checks for lastName, email, and username

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
        const newErrors = validate(formData); // Assuming you have a validate function for form data
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:3001/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const result = await response.json();
                console.log(result); // You can handle the response here
                // Maybe redirect to login page or show success message
            } catch (error) {
                console.error('Registration error:', error);
                // Handle errors in registration (show error message to the user)
            }
        } else {
            setErrors(newErrors); // Handle form validation errors
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <table>
                    <tbody>
                        {/* First Name Field */}
                        <tr>
                            <td><label htmlFor="firstName">First Name:</label></td>
                            <td>
                                <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={handleChange} />
                                {errors.firstName && <p>{errors.firstName}</p>}
                            </td>
                        </tr>
                        {/* Last Name Field */}
                        <tr>
                            <td><label htmlFor="lastName">Last Name:</label></td>
                            <td>
                                <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={handleChange} />
                                {errors.lastName && <p>{errors.lastName}</p>}
                            </td>
                        </tr>
                        {/* Email Field */}
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td>
                                <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} />
                                {errors.email && <p>{errors.email}</p>}
                            </td>
                        </tr>
                        {/* Username Field */}
                        <tr>
                            <td><label htmlFor="username">Username:</label></td>
                            <td>
                                <input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
                                {errors.username && <p>{errors.username}</p>}
                            </td>
                        </tr>
                        {/* Password Field */}
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td>
                                <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                                {errors.password && <p>{errors.password}</p>}
                            </td>
                        </tr>
                        {/* Confirm Password Field */}
                        <tr>
                            <td><label htmlFor="confirmPassword">Confirm Password:</label></td>
                            <td>
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                            </td>
                        </tr>
                        {/* Submit Button */}
                        <tr>
                            <td colSpan="2">
                                <button type="submit" className="submit-button">Sign Up</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}


export default Signup;