var db = require('../db');
var Promise = require('bluebird');

var messageId = 0;
var roomId = 0;
var createdAt = 'asd';
var text = 'test';

module.exports = {
  messages: {
    get: function () {
      // a function which produces all the messages
      return db.initialize.then(function(conn) {
        return conn.query('select m.id as objectId, m.text, u.name as username, r.name as roomname, '
          + 'm.createdAt from messages m inner join users u on m.user_id = u.id '
          + 'inner join rooms r on m.room_id = r.id order by m.id asc');
      });
         // run get on all userIds (to fill in with username)
         // run get on all roomIds (to fill in with roomname)
      // 
      // 
    }, 
    
    post: function (message) {

      var usernamePromise = module.exports.users.get(message.username)
        .then(function(userNameAndId) {
          if (userNameAndId) {
            return userNameAndId;
          } else {
            return module.exports.users.post(message.username)
              .then(function(successobj) {
                return module.exports.users.get(message.username); 
              });
          }
        });

      var roomnamePromise = module.exports.rooms.get(message.roomname)
        .then(function(roomNameAndId) {
          if (roomNameAndId) {
            return roomNameAndId;
          } else {
            return module.exports.rooms.post(message.roomname)
              .then(function(successobj) {
                return module.exports.rooms.get(message.roomname); 
              });
          }
        });

      Promise.join(usernamePromise, roomnamePromise, db.initialize, function(userObj, roomObj, conn) {
        return conn.query('insert into messages (text, user_id, room_id) values (?, ?, ?)', [message.text, userObj.id, roomObj.id]);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (username) {
      return new Promise((resolve, reject) => {
        db.initialize.then(function(conn) {
          conn.query('select * from users where name =?', [username], function(err, data) {
            if (err) { 
              reject(err); 
            } else {
              if (data.length > 0) {
                resolve(data[0]);
              } else {
                resolve(false);
              }
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
          conn.query('select * from rooms where name =?', [roomname], function(err, data) {
            if (err) { 
              reject(err); 
            } else {
              if (data.length > 0) {
                resolve(data[0]);
              } else {
                resolve(false);
              }
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

