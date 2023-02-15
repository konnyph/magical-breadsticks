const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_URI)
// Create a connection object
// const sequelize = new Sequelize(
//   // Database name
//   `${process.env.DB_NAME}`,
//   // User
//   `${process.env.DB_USERNAME}`,
//   // Password
//   `${process.env.DB_PW}`,
//   {
//     // Database location
//     host: `${process.env.JAWS_HOST}`,
//     dialect: 'mysql',
//     port: `${process.env.JAWS_PORT}`
//   }
// );

module.exports = sequelize;