var db = require('../db');
var Promise = require('bluebird');

var messageId = 0;
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
    get: function (username) {
      return new Promise((resolve, reject) => {
        db.initialize.then(function(conn) {
          conn.query('select name from users where name =?', [username], function(err, data) {
            if (err) { 
              reject(err); 
            } else {
              resolve(data.length !== 0);
            }
          });
        });
      });
    },
    post: function (username) {
      return module.exports.users.get(username).then(function(exist) {
        if (exist) {
          throw new Error('did not work');
          //if there is a user, we hopefully won't run the promises below these
        } else {
          return db.initialize;
        }
      }).then(function(conn) {    
        return conn.query('insert into users (name) values (?)', [username]);
      }).then(function(successobj) {
        console.log('we succeeded');
        return successobj;
      }).catch(function(err) {
        console.log('we found an err');
        return err;
      });
    },
  },

  rooms: {
    get: function (roomname) {
      return new Promise((resolve, reject) => {
        db.initialize.then(function(conn) {
          conn.query('select name from rooms where name =?', [roomname], function(err, data) {
            if (err) { 
              reject(err); 
            } else {
              resolve(data.length !== 0);
            }
          });
        });
      });
    },
    post: function (roomname) {
      return module.exports.rooms.get(roomname).then(function(exist) {
        if (exist) {
          throw new Error('did not work');
          //if there is a user, we hopefully won't run the promises below these
        } else {
          return db.initialize;
        }
      }).then(function(conn) {    
        return conn.query('insert into rooms (name) values (?)', [roomname]);
      }).then(function(successobj) {
        console.log('we succeeded');
        return successobj;
      }).catch(function(err) {
        console.log('we found an err');
        return err;
      });
    }
  }
};

