const   Sequelize = require('sequelize');
const mysql = require('mysql2');


const dotenv = require('dotenv').config();
const host = process.env.host;
const database = process.env.database;
const password = process.env.password;
const username = process.env.username;


const db = new Sequelize(database, username, password ,{
  host: host,
  dialect:  'mysql',
});

//const db = new Sequelize('mysql://localhost:3000/maps')
db.authenticate()
.then(() => {
console.log('connected to the database')
})
.catch((err) => {
  console.log('could not connect to database', err)
})




const User = db.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

const Markers = db.define('Markers', {
  latitude: Sequelize.DECIMAL(10, 4)  ,
  longitude: Sequelize.DECIMAL(10, 4)  ,
  imageUrl: Sequelize.STRING(1000),
  description: {
    type: Sequelize.STRING,
    unique:true
  },
  comments: Sequelize.STRING,




});
const Comments = db.define('Comments', {
  description: Sequelize.STRING,

  comments: Sequelize.STRING

});
const Favorites = db.define('Favorites', {
  latitude: Sequelize.DECIMAL(10, 4),
  longitude: Sequelize.DECIMAL(10, 4),
  imageUrl: Sequelize.STRING,
  description: Sequelize.STRING

});
// db.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`);
//   }).catch((err) => {console.log(err)})
module.exports = {
  db,
  User,
  Markers,
  Favorites,
  Comments
};