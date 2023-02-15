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

let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3001;
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.get('/', (req, res) => res.sendFile((`${__dirname}/public/index.html`)));
app.use(routes);



sequelize.sync({ force: false}).then(() => {
    app.listen(port, () => console.log('Now listening'));
  });