const { Model, DataTypes } = require('sequelize');
// Model and Datatypes from inside of sequalize
const sequelize = require('../config/connection');

// Create a new Sequelize model for books
class UserCreate extends Model {}

UserCreate.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
      isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7]
      }
    },
    userComicInput: {
      type: DataTypes.STRING,
      allowNull: true,

    }
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = UserCreate;
