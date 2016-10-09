var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
      
        .then(function(data) {
          // console.log('data user --------------------------------------');
          // data.forEach(function(queryObj) {
          //   queryObj['username'] = queryObj.User.name;
          // });
          // console.log('here!!!!!!!!!!!!!!!', data);
          var jsonData = JSON.parse(JSON.stringify(data));

          var resortedData = jsonData.map(function(message, i) {
            // console.log(' the message is', message, ' room is ', message.Room, ' at ', i);
            
            message.username = message.User.name;
            message.roomname = message.Room.name;
            delete message.Room;
            delete message.User;
            return message;
          });
          console.log('hereeeeeeejfaoejfoiasjfosj', resortedData);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({results: resortedData}));
        })
        .catch(function(err) {
          console.log('got error', err);
        });
      // res.writeHead(200, {'Content-Type': 'application/json'});
      // res.end(JSON.stringify({results: []}));
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body).
        then(function() {
          res.writeHead(201);
          res.end('why?');  
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get()
        .then(function(data) {
          res.writeHead(200, {'Content-Type': 'application/json'}); 
          res.end(JSON.stringify({results: data}));
        });
    },
    post: function (req, res) {
      models.users.post(req.body.username)
        .then(function() {
          res.writeHead(201);
          res.end();
        });
    }
  }
};

