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
      // var dbConnection = db.initialize;
      //separate message into text, username roomname
      var text = message.text;
      var userId;
      var roomId;
      var usernamePromise = module.exports.users.get(message.username)
        .then(function(userId) {
          if (userId) {
            return userId;
          } else {
            return module.exports.users.post(message.username)
              .then(function(successobj) {
                return module.exports.users.get(message.username); 
              });
          }
        });
      var roomnamePromise = module.exports.rooms.get(message.roomname)
        .then(function(roomId) {
          if (roomId) {
            return roomId;
          } else {
            return module.exports.rooms.post(message.roomname)
              .then(function(successobj) {
                return module.exports.rooms.get(message.roomname); 
              });
          }
        });
      Promise.join(usernamePromise, roomnamePromise, db.initialize, function(userId, roomId, conn) {
        return conn.query('insert into messages (text, user_id, room_id) values (?, ?, ?)', [message.text, userId, roomId]);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (username) {
      return new Promise((resolve, reject) => {
        db.initialize.then(function(conn) {
          conn.query('select id from users where name =?', [username], function(err, data) {
            if (err) { 
              reject(err); 
            } else {
              if (data.length > 0) {
                resolve(data[0].id);
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
          conn.query('select id from rooms where name =?', [roomname], function(err, data) {
            if (err) { 
              reject(err); 
            } else {
              if (data.length > 0) {
                resolve(data[0].id);
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

