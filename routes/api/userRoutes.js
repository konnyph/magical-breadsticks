const express = require('express');
const router = express.Router();
const user = require('../../models/User');
const bcrypt = require('bcrypt');
const sessions = require('express-session');
const path = require('path')
const cookieParser = require("cookie-parser");

const oneDay = 1000 * 60 * 60 * 24;

router.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

router.use(express.static(path.join(__dirname,'..', '..' , 'public')));

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

  router.post('/login',async (req,res) => {

  const userData = await user.findOne({
    where: {
    email: req.body.email,
        },
      });
    // console.log(userData)
    if (userData === null) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
    let validPwd = await bcrypt.compare(
      req.body.password,
      userData.password
    )
    if(validPwd){
        session=req.session;
        session.userid=req.body.username;
        // console.log(req.session)
        res.sendFile(path.join(__dirname,'..', '..' , 'public' , 'comicindex.html'))
    }
    else{
        res.send('Invalid username or password');
    }
})

router.post('/', async (req, res) => {
      await user.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err.errors[0].message);
      });
  });

//   router.post('/login', async (req, res) => {
//     try {
//       const userData = await user.findOne({
//         where: {
//           email: req.body.email,
//           // we don't need this here
//           // password: req.body.password
//         },
//       });
  
//       if (!userData) {
//         res
//           .status(400)
//           .json({ message: 'Incorrect email or password. Please try again!' });
//         return;
//       }
  
//       const validPassword = await bcrypt.compare(req.body.password, userData.password);
  
//       if (!validPassword) {
//         res
//           .status(400)
//           .json({ message: 'Incorrect email or password. Please try again!' });
//         return;
//       }
  
//       // Once the user successfully logs in, set up the sessions variable 'loggedIn'
//       req.session.save(() => {
//         session=req.session;
//         session.userid=req.body.username;
//         console.log(req.session)
//         res.send(`${__dirname}/../../public/comicindex.html`);
  
//         res
//           .status(200)
//           console.log(req.session.loggedIn)
//           .json({ user: userData, message: 'You are now logged in!' });
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });
  
  // Logout
    router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

  module.exports=router
