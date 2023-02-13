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

// INSERTING a route.get for comic route
// ============SENDING DATA AS JSON=================
router.get('/comic', async (req, res) => {
  try {
    const comicData = await comicUser.findAll({
      include: [
        {
          model: user,
          attributes: ['id'],
        },
      ],
    });

    const comicUserInput = comicData.map((comicUser) =>
      comicUser.get({ plain: true })
    );

    res.json(comicUserInput);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get('/comic', async(req, res) => {
  try {
    const comicData = await comicUser.findAll({
      include: [
        {
          model: user,
          attributes: ['id'],
        },
      ],
    });

    const comicUserInput = comicData.map((comicUser) =>
      comicUser.get({ plain: true })
    );

    res.json(comicUserInput);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// CREATE A EVENT LISTENER FOR THE SUBMIT BUTTON
// document.getElementById('storySubmit').addEventListener('click', function(event) {
//   event.preventDefault(); // prevent the default form submission
//   window.location.href = '/api/user/comic'; // redirect the user to the desired route
// });

// ============SENDING DATA TO HTML(THE BELOW CODE)=====

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
    
//     res.sendFile(path.join(__dirname, '..', '..', 'public', 'comicindex.html'));
    
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
// app.use(express.static(path.join(__dirname, 'public')));

// // Route to serve comicindex.html
// app.get('/api/user/comic', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'comicindex.html'));
// });






// ========================testing comic route end================


  
  // Logout
    router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

  module.exports=router
