// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { connection } = require('../utils/db');
const argon2 = require('argon2');

router.post('/register', authController.register); // Using the register function from authController

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username], async (err, results) => {
            if (err) {
                throw err;
            }

            if (results.length === 0) {
                return res.status(400).json({ message: 'Invalid username' });
            }

            const user = results[0];
            console.log("Retrieved user data:", user); // For debugging

            // Use the correct field name for the password hash
            const passwordMatch = await argon2.verify(user.password_hash, password);
            console.log(passwordMatch)

            if (!passwordMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            // Login successful
            res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
