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
      message: `You are not logged in...`
    })
  } catch (err) {
    // res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
      await user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err.errors[0].message);
      });
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
