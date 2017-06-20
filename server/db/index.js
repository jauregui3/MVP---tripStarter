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

var Note = db.define('Note', {
  note: Sequelize.STRING
})


Place.belongsTo(User);
User.hasMany(Place);

Note.belongsTo(Place);
Note.belongsTo(User);
Place.hasMany(Note);
User.hasMany(Note);


// User.belongsTo(Place);
// Place.hasMany(User);


User.sync();
Place.sync();
Note.sync();

exports.User = User;
exports.Place = Place;
exports.Note = Note;