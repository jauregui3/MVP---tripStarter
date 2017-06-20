var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
// var http = require('http');
// var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// localhost 127.0.0.1
var session = require('express-session');
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  if (req.session.user === undefined) {
    res.sendFile(path.resolve(__dirname + '/../login.html'));
  } else {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
    // res.render('index', {testKey: req.session.user});
  }
});

app.get('/styles/style.css', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../styles/style.css'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../login.html'));
});

app.post('/login', function(req,res) {
  db.User.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then(function(results) {
    // console.log(results);
    if (results.length > 0) {
      req.session.regenerate(function() {
        req.session.user = results[0].username;
        req.session.userid = results[0].id;
        res.sendFile(path.resolve(__dirname + '/../index.html'));
      });
    } else {
      res.sendFile(path.resolve(__dirname + '/../login.html'));
    }
  });
});

app.get('/logout', function(req, res) {
    req.session.destroy(function() {
      res.sendFile(path.resolve(__dirname + '/../login.html'));
    });
  }
);

app.get('/signup', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../signup.html'));
});

app.post('/signup', function(req, res) {
  // console.log(req.body);
  db.User.findAll({where: {username: req.body.username}})
    .then(function(results) {
      if (results.length > 0) {
        res.sendFile(path.resolve(__dirname + '/../login.html'))
      } else {
        db.User.findOrCreate({
          where: {
            username: req.body.username,
            password: req.body.password
          }
        })
          .spread(function(user, created) {
            res.sendStatus(201);
            res.sendFile(path.resolve(__dirname + '/../index.html'));
          });
      }
    });
});

app.get('/places', function(req, res) {
  db.Place.findAll({where: {userid: req.session.userid}})
    .then(function(result) {
      res.status(200).send(result);
    });
});

app.get('/notes', function(req, res) {
  db.Place.findAll({where: {city: req.body.city}})
    .spread(function(place, created) {
      db.Note.findAll({
        where: {
          UserId: req.session.userid,
          PlaceId: place.dataValues.id
        }})
    })
    .then(function(result) {
      res.status(200).send(result);
    });
});

app.get('/user', function(req, res) {
  // console.log('this is a req', req.session.user);
  var user = req.session.user.toLowerCase();
  db.User.findAll({
    where: {
      username: user
    }})
    .then(function(result) {
      // console.log(result);
      res.status(200).send(result);
    });
});

app.post('/place', function(req, res) {
  // var user = req.session.user.toLowerCase();
  // console.log('this is req to /places', req);
  var user = req.session.user.toLowerCase();
  // console.log(user);
  console.log('this is the id', req.session.userid);
  db.User.findAll({where: {username: user}})
  .spread(function(user, created) {
    console.log('this is the user in user finall', user.dataValues.id);
    db.Place.create({
      UserId: user.dataValues.id,
      city: req.body.city,
      country: req.body.country
    }).then(function(err, results) {
      res.sendStatus(201);
    });
  });
});

app.post('/notes', function(req, res) {
  var user = req.session.user.toLowerCase();
  console.log('this is the id', req.session.userid);
  db.Place.findAll({where: {UserId: req.session.userid}})
  .spread(function(place, created) {
    console.log('this is the user in user finall', user.dataValues.id);
    db.Notes.create({
      PlaceId: place.dataValues.id,
      UserId: req.session.userid,
      note: req.body.note
    }).then(function(err, results) {
      res.sendStatus(201);
    });
  });
});

app.listen(3000, function() {
  console.log('tripStarter is listening on 3000');
});