const express = require('express');
const mysql = require('mysql');
require('dotenv').config({ path: '../.env' });
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');



// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'yourpassword',
    database: process.env.DB_NAME || 'my_project_database',
    port: process.env.DB_PORT || 3306
});

// Connect to the MySQL database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        process.exit(1);
    }
    console.log('Successfully connected to MySQL database!');
});

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Define a simple route for testing
app.get('/', (req, res) => res.send('Hello from Backend'));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
