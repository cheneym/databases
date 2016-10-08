var mysql = require('promise-mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
exports.initialize = mysql.createConnection({
  user: 'root',
  password: 'yes',
  database: 'chat'
});

// connect = dbConnection.connect();
// exports.end = dbConnection.end();