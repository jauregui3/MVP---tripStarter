var Sequelize = require('sequelize');
var db = new Sequelize('travelstarter', 'root', '');

var User = db.define('User', {
  username: Sequelize.STRING,
  password:Sequelize.STRING
});

var Place = db.define('Place', {
  city: Sequelize.STRING,
  country: Sequelize.STRING
});


Place.belongsTo(User);
User.hasMany(Place);

// User.belongsTo(Place);
// Place.hasMany(User);


User.sync();
Place.sync();

exports.User = User;
exports.Place = Place;