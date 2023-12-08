const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { firstName, lastName, email, username, password } = req.body;

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            passwordHash: hashedPassword,
        });

        // Save new user
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        // Enhanced error handling
        if (error.code === 11000) {
            // Duplicate key error (this might happen if unique index constraint is violated in MongoDB)
            res.status(400).json({ message: 'Email or username already exists' });
        } else {
            // General error handling
            res.status(500).json({ message: error.message });
        }
    }
};
