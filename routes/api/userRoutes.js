const router = require('express').Router();
const user = require('../../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    user.findAll({
      // Order by title in ascending order
      order: ['id'],
    //   where: {
    //   },
    }).then((userData) => {
      res.json(userData);
    });
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


      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
=======
  router.post('/login', async (req, res) => {
    try {
      const userData = await user.findOne({
        where: {
          email: req.body.email,
          // we don't need this here
          // password: req.body.password
        },
      });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await bcrypt.compare(req.body.password, userData.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
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
    router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

  module.exports=router
