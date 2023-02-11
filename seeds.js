const sequelize = require('./config/connection');
const  User  = require('./models/User');
// const sequelize = require('../config/connection');

const userData = [
  {
    email: 'konnyh@gmail.com',
    password: 'lavenderlatte'
  },
  {
    email: 'eugenep@gmail.com',
    password: 'eugene123'
  },
  {
    email: 'timmya@gmail.com',
    password: 'tim123'
  },
  {
    email: 'markg@gmail.com',
    password: 'mark123'
  },
  {
    email: 'abigailh@gmail.com',
    password: 'abi123'
  },
 
];

const seedUser = () => User.bulkCreate(userData);
// seedUser();
const seed = async() => {
    await sequelize.sync({force:true})
    await seedUser()
    process.exit(0)

}
seed();
// module.exports = seedUser;
