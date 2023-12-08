// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/register', authController.register); // Temporarily bypass validation


module.exports = router;
