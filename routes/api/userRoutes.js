const express = require('express');

const app = express();
const router = express.Router();
const user = require('../../models/User');
const bcrypt = require('bcrypt');
const sessions = require('express-session');
const path = require('path')
// const comicUser = require('../../models/comicUser');

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
      res.res.sendFile(path.join(__dirname,'..', '..' , 'public' , 'incorrectLogin.html'));
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
      await user.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    })
      .then((result) => {
        res.sendFile(path.join(__dirname,'..', '..' , 'public' , 'comicindex.html'));
      })
      .catch((err) => {
        res.json(err.errors[0].message);
      });
  });

  module.exports = router

// INSERTING a route.get for comic route
// ============SENDING DATA AS JSON=================
// router.get('/comic', async (req, res) => {
//   try {
//     const comicData = await comicUser.findAll({
//       include: [
//         {
//           model: user,
//           attributes: ['id'],
//         },
//       ],
//     });

//     const comicUserInput = comicData.map((comicUser) =>
//       comicUser.get({ plain: true })
//     );

//     res.json(comicUserInput);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// app.get('/comic', async(req, res) => {
//   try {
//     const comicData = await comicUser.findAll({
//       include: [
//         {
//           model: user,
//           attributes: ['id'],
//         },
//       ],
//     });

//     const comicUserInput = comicData.map((comicUser) =>
//       comicUser.get({ plain: true })
//     );

//     res.json(comicUserInput);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
// CREATE A EVENT LISTENER FOR THE SUBMIT BUTTON
// document.getElementById('storySubmit').addEventListener('click', function(event) {
//   event.preventDefault(); // prevent the default form submission
//   window.location.href = '/api/user/comic'; // redirect the user to the desired route
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


