// const router = require('express').Router();
// const { Gallery, Painting } = require('../models');
const router = require('express').Router();
const User = require('../models/User.js');

// GET all for homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
    //   include: [
    //     {
    //       model: Painting,
    //       attributes: ['filename', 'description'],
    //     },
    //   ],
    });

    const users = userData.map((user) =>
      user.get({ plain: true })
    );
    
    res.render('homepage', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });
  
  module.exports = router;