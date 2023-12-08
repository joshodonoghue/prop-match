// server/models/User.js
const { connection } = require('../utils/db');

const createUser = async (userData) => {
    const { firstName, lastName, email, username, passwordHash } = userData;
    const query = 'INSERT INTO users (firstName, lastName, email, username, passwordHash) VALUES (?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
        connection.query(query, [firstName, lastName, email, username, passwordHash], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId); // returns the ID of the newly created user
            }
        });
    });
};
