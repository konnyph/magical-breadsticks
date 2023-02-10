require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URI)

const connection = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.project2_db, process.env.root, process.env.DB_Password, 
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
