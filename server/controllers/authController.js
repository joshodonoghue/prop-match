const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { connection } = require('../utils/db'); // Ensure this path is correct

exports.register = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { first_name, last_name, email, username, password } = req.body;

        // Log and check the received password
        console.log("Received password:", password);
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Check if email or username already exists
        connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email or username already in use' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const query = 'INSERT INTO users (first_name, last_name, email, username, password_hash) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [first_name, last_name, email, username, hashedPassword], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });

    } catch (error) {
        // General error handling
        res.status(500).json({ message: error.message });
    }
};
