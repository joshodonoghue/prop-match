// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { connection } = require('../utils/db');
const bcrypt = require('bcryptjs');

router.post('/register', authController.register); // Temporarily bypass validation

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query to find the user by username
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username], async (err, results) => {
            if (err) {
                throw err;
            }

            if (results.length === 0) {
                // User not found
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.passwordHash);

            if (!passwordMatch) {
                // Passwords do not match
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            // Login successful
            res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
            // Implement token generation or session creation as needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
