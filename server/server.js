var express = require('express');
var db = require('./db');
var path = require('path');
var router = require('./routes.js');
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
    console.log(results);
    if (results.length > 0) {
      req.session.regenerate(function() {
        req.session.user = results[0].username;
        res.sendFile(path.resolve(__dirname + '/../index.html'));
      });
    } else {
      res.sendFile(path.resolve(__dirname + '/../login.html'));
    }
  });
});

app.get('/signup', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../signup.html'));
});

app.post('/signup', function(req, res) {
  console.log(req.body);
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

app.listen(3000, function() {
  console.log('tripStarter is listening on 3000');
});