const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Create a MySQL connection pool using mysql2
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'yourpassword',
    database: process.env.DB_NAME || 'my_project_database',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Hello from Backend'));

app.get('/api/dashboard', async (req, res) => {
    try {
        const [results] = await pool.query(`
            SELECT transaction_number, transaction_date, booking_id, amount_paid, 
            amount_received, service_fees, service_provider 
            FROM transactions1;
        `);
        res.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error retrieving data' });
    }
});
app.get('/api/user-count', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS count FROM users');
        res.json({ count: rows[0].count });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error retrieving user count' });
    }
});
app.get('/api/msct', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS count FROM messages');
        res.json({ count: rows[0].count });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error retrieving messages' });
    }
});
 app.get('/api/unfilled', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT COUNT(*) AS count FROM inprogress');
            res.json({ count: rows[0].count });
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: 'Error retrieving messages' });
        }
});


app.get('/api/top', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT username FROM users ORDER BY RAND() LIMIT 6;');
        res.json(rows); // Send the rows as they are
    } catch (error) {
        console.error('Error fetching top users:', error);
        res.status(500).json({ message: 'Error retrieving top users' });
    }
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
