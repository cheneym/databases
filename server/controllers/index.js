var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(function(data) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({results: data}));
        });
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

