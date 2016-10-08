var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('we received a get');
      res.writeHead(200, {'Content-Type': 'application/json'}); 
      res.end(JSON.stringify({results: [{username: 'cheney', text: 'w/e', roomname: 'lobby'}]}));
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.url);
      req.on('data', function(data) {
        var result = JSON.parse(data.toString());
        //console.log(result);
        // models.messages.post(result);
        console.log(result.roomname);
        models.rooms.post(result.roomname);
        // models.users.get('helloworld');
      });

      req.on('end', function(err, data) {
        res.writeHead(201);
        res.end('why?');
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {

    }
  }
};

