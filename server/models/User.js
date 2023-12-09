// server/models/User.js
const { connection } = require('../utils/db');

const createUser = async (userData) => {
    // Adjust these fields to match your database column names
    const { first_name, last_name, email, username, password } = userData;
    const query = 'INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
        connection.query(query, [first_name, last_name, email, username, password], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId); // Returns the ID of the newly created user
            }
        });
    });
};

module.exports = { createUser };
