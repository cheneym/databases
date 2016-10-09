// var mysql = require('promise-mysql');
var Promise = require('bluebird');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
// exports.initialize = mysql.createConnection({
//   user: 'root',
//   password: 'yes',
//   database: 'chat'
// });

// connect = dbConnection.connect();
// exports.end = dbConnection.end();

var Sequelize = require('sequelize');
var db = new Sequelize('chatbox', 'root', 'yes');

exports.User = db.define('User', {
  name: Sequelize.STRING
});

exports.Room = db.define('Room', {
  name: Sequelize.STRING
});

exports.Message = db.define('Message', {
  text: Sequelize.STRING,
});

exports.Message.belongsTo(exports.User);
exports.Message.belongsTo(exports.Room);

// db.sync();