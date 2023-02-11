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
      password: await bcrypt.hash(req.body.password, 8)
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err.errors[0].message);
      });
  });

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
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
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
