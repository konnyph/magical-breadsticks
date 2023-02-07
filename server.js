const express = require('express');
const app = express();
const path = require('path');
const dataBase = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));