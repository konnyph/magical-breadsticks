const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql2')
const { json }  = require('express');
const session = require('express-session');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
const dotenv = require('dotenv').config();
const user = require('./models/user');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}


// app.use(session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/login.html')));

// Splash Page direct
app.get('/', (req, res) => res.sendFile((`${__dirname}/public/index.html`)));
app.use(routes);


sequelize.sync({ force: false}).then(() => {
    app.listen(port, () => console.log('Now listening'));
  });