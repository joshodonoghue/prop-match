const mysql = require('mysql');
require('dotenv').config();

// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'yourpassword',
    database: process.env.DB_NAME || 'my_project_database',
    port: process.env.DB_PORT || 3306
});

const connectDB = () => {
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            process.exit(1);
        }
        console.log('Successfully connected to MySQL database!');
    });
};

module.exports = { connectDB, connection };
