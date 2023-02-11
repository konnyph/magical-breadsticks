const router = require('express').Router();
const user = require('../../models/User');
const User = require('../../models/User.js');
const bcrypt = require ('bcrypt');
const { where } = require('sequelize');

// GET all users
router.get('/', async (req, res) => {
  try {
    const user = await User.findall({
    where: {
      email: req.body.email
    }
  });
    await bcrypt.compare(req.body.password, user.password) ? res.json(user):
    res.status(401).json({
      message: `You are not logged in...please try again.`
    })
  } catch (err) {
    // res.status(500).json(err);
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
    res.status(401).json({
      message: `You are not logged in...please try again.`
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    await bcrypt.compare(req.body.password, user.password) ? res.json(user) :
    res.status(401).json({
      message: `You are not logged in...`
      });
    

    // if (!userData) {
    //   res
    //     .status(401)
    //     .json({ message: 'Incorrect email or password. Please try again!' });
    //   return;
    // }

    const validPassword = await userData.checkPassword(req.body.password);

    // if (!validPassword) {
    //   res
    //     .status(400)
    //     .json({ message: 'Incorrect email or password. Please try again!' });
    //   return;
    // }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
