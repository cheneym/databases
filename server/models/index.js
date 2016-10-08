var db = require('../db');

var messageId = 0;
var userId = 0;
var roomId = 0;
var createdAt = 0;
var text = '';

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    
    post: function (message) {
      var dbConnection = db.initialize();
      dbConnection.connect();



      //
      dbConnection.query(`INSERT INTO $(messages)
        VALUES ($(messageId), $(text), $(userId), $(roomId), $(createdAt)`);




      dbConnection.end();
      // db.add
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

