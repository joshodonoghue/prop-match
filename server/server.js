// server/server.js
const express = require('express');
const { connectDB } = require('./utils/db');
const authRoutes = require('./routes/authRoutes');



// Load environment variables
require('dotenv').config({ path: '../.env' });

// Connect to Database
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

// Middleware to parse JSON bodies


// Define a simple route for testing
app.get('/', (req, res) => res.send('Hello from Backend'));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
