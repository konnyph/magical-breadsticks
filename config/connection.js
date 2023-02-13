const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

// Create a connection object
const sequelize = new Sequelize(
  // Database name
  'project2_db',
  // User
  `${process.env.DB_userName}`,
  // Password
  `${process.env.DB_PW}`,
  {
    // Database location
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;