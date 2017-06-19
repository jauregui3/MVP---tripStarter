var db = require('../db');

module.exports = {
  users: {
    get: function(req, res) {
      db.User.findAll()
        .then(function(users) {
          res.json(users);
        });
    },
    post: function(req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .spread(function(user, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  },

  places: {
    get: function(req, res) {
      db.Place.findAll({where: {username: req.body.username}})
        .then(function(places) {
          res.json(places);
        });
    },
    post: function(req, res) {
      db.Place.findOrCreate({where: {city: req.body.city, country: req.body.country}})
        .spread(function(user, created) {
          db.Place.create({
            userid: user.get('id'),
            city: req.body.city,
            country: req.body.country
          }).then(function(place) {
            res.sendStatus(201);
          });
        });
    }
  }
};