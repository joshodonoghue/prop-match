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
        const newErrors = validate(formData);
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error('Failed to register');
                }

                const result = await response.json();
                console.log(result);
                // Handle success (e.g., redirect or show a success message)
            } catch (error) {
                console.error('Registration error:', error);
                // Handle errors (e.g., show error message)
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
            {errors.firstName && <p>{errors.firstName}</p>}
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            {errors.lastName && <p>{errors.lastName}</p>}
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            {errors.email && <p>{errors.email}</p>}
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            {errors.username && <p>{errors.username}</p>}
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            {errors.password && <p>{errors.password}</p>}
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
