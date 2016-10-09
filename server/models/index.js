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
      // return db.initialize.then(function(conn) {
      //   return conn.query('select m.id as objectId, m.text, u.name as username, r.name as roomname, '
      //     + 'm.createdAt from messages m inner join users u on m.user_id = u.id '
      //     + 'inner join rooms r on m.room_id = r.id order by m.id asc');
      // });
      return db.Message.findAll({
        attributes: ['id', 'createdAt', 'text'],
        include: [ 
          {
            model: db.User, 
            attributes: ['name']
          },
          {
            model: db.Room,
            attributes: ['name']
          }]
      });
    }, 
    
    post: function (message) {
      // message.text
      // message.roomname
      // message.username
      var userPromise = db.User.findOrCreate({
        where: {
          name: message.username
        }
      });

      var roomPromise = db.Room.findOrCreate({
        where: {
          name: message.roomname
        }
      });

      return Promise.join(userPromise, roomPromise, function(userInstance, roomInstance) {
        db.Message.create({
          text: message.text,
          UserId: userInstance[0].get('id'),
          RoomId: roomInstance[0].get('id')
        }).then(function() {
          console.log('success');
          return;
        }).catch(function(err) {
          console.log('wahh wahhhhh', err);
          return;
        });
      });
    }
  },

  users: {
    get: function() {
      return db.initialize.then(function(conn) {
        return conn.query('select name from users order by id asc');
      });
    },

    post: function (username) {
      return module.exports.users.getOne(username).then(function(exist) {
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
    getOne: function (roomname) {
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

    get: function() {
      return db.initialize.then(function(conn) {
        return conn.query('select name from rooms order by id asc');
      });
    },

    post: function (roomname) {
      return module.exports.rooms.getOne(roomname).then(function(exist) {
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

