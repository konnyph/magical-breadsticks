const sequelize = require('./config/connection');
const  User  = require('./models/User');

const userData = [
  {
    name: 'KonnyKonny',
    email: 'konnyh@gmail.com',
    password: 'lavenderlatte'
  },
  {
    name: 'EugeneEugene',
    email: 'eugenep@gmail.com',
    password: 'eugene123'
  },
  {
    name: 'timmay',
    email: 'timmya@gmail.com',
    password: 'tim123'
  },
  {
    name: 'MarkyMark',
    email: 'markg@gmail.com',
    password: 'mark123'
  },
  {
    name: 'abigaleabigale',
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
