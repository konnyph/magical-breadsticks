const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql2')
const { json }  = require('express');
const sessions = require('express-session');
const cookieParser= require('cookie-parser')
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
const dotenv = require('dotenv').config();
const oneDay = 1000 * 60 * 60 * 24;
const API_KEY = process.env.API_KEY;
var sessionState;
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false 
// }));

// app.use(session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

// Splash Page direct
// app.get('/',(req,res) => {
//   session=req.session;
//   if(session.userid){
//       res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//   }else
//   res.sendFile(`${__dirname}/public/index.html`)
// });
app.get('/', (req, res) => res.sendFile((`${__dirname}/public/index.html`)));
app.use(routes);



sequelize.sync({ force: false}).then(() => {
    app.listen(port, () => console.log('Now listening'));
  });