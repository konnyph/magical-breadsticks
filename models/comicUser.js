const { Model, DataTypes } = require('sequelize');
// Model and Datatypes from inside of sequalize
const sequelize = require('../config/connection');


class comicUser extends Model {}
comicUser.init(
    
    {
      comicInput: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
      }
    },

      

{
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: true,
    underscored: true,
    modelName: 'comicUser'
  }
);

module.exports = comicUser;
