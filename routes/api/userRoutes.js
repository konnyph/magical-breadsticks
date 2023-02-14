const express = require('express');

const app = express();
const router = express.Router();
const user = require('../../models/User');
const bcrypt = require('bcrypt');
const sessions = require('express-session');
const path = require('path')
const cookieParser = require("cookie-parser");
const comic = require('../../models/comicUser');
const comicUser = require('../../models/comicUser');

const oneDay = 1000 * 60 * 60 * 24;

router.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

router.use(express.static(path.join(__dirname,'..', '..' , 'public')));

// Login Route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: {name: req.body.name}});
    if (!userData){
      // return error if username doesn't match
      res.status(401).json({ message: `Login failed. Please try again.`});
      return;
    }
    // use bcrypt.compare to compare the provided password to the hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    // return error if password doesn't match
    if (!validPassword) { 
      res.status(401).json({ message: `Login failed. Please try again.`});
      return;
    }
    // if username and password match
    res.status(200).json({message: 'Welcome back!'});
  } catch (err) { 
    res.status(404).json(err);
  }
});
    
// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    // hash the password from req.body 
    newUser.password = await bcrypt.hash(req.body.password, 10)
    const userData = await User.create(newUser);
      // password: req.body.password
      req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

  module.exports=router

// GET all users
// router.get('/', async (req, res) => {
//   try {
//     const user = await User.findall({
//     where: {
//       email: req.body.email
//     }
//   });
//     await bcrypt.compare(req.body.password, user.password) ? res.json(user):
//     res.status(401).json({
//       message: `You are not logged in...please try again.`
//     })
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
    

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
//     req.session.save(() => {
//       req.session.loggedIn = true;
//       res
//         .status(200)
//         .json({ user: userData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


