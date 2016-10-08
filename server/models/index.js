var db = require('../db');
// var Promise = require('bluebird');

var messageId = 0;
var userId = 6;
var roomId = 0;
var createdAt = 'asd';
var text = 'test';

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    
    post: function (message) {
      // console.log(db);
      // var userPostPromise = function(user) {
      //   return new Promise((resolve, reject) => {
      //     if (error) {
      //       reject('nooo');
      //     } else {
      //       resolve(users.post(result.username));
      //     }
      //   );
      // };
      // when user post completes, call the rest of everything. 
      //  

      // userPostPromise(message.username)
      // var dbConnection = db.initialize;
      //separate message into text, username roomname
      //text    free
      //user_id ----> use username to find corresponding userId if any (users.get), otherwise
        //users.post
      //room_id ----> use roomname to find roomId if any , otherwise
        //rooms.post
      //createdAt ----> Create date for current message
      //messageId free, increment by 1

      //write to db
      // dbConnection.query(`INSERT INTO messages
      //   VALUES ($(messageId), $(text), $(userId), $(roomId), $(createdAt)`);
      // dbConnection.query('select * from messages');


      // db.add
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (username, cb) {
      dbConnection = db.initialize;
      var exist = false;
      dbConnection.query('select name from users where name ="' + username + '"', function(err, data) {
        if (err) { return err; }
        exist = data.length !== 0;
        cb(exist);
      });
    },
    post: function (username) {
      dbConnection = db.initialize;
      module.exports.users.get(username, function (exist) {
        if (exist) {
        } else {
          dbConnection.query('insert into users values (' + userId + ', "' + username + '")', function(err, data) {
            if (err) {
              console.log('we have an error', err);
            } else {
              console.log('we have data', data);
              userId++;
            }
          });
        }
      });
    },
  },

  rooms: {
    get: function() {

    },
    post: function() {

    }
  }
};

