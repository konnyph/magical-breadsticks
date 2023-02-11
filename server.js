const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql2')
const { json }  = require('express');
// Adding express-session (kh)
const session = require('express-session');
// Adding const to use routes and config(kh)
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
// const connection = require('./config/connection');


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}


// app.use() for session(kh)
const sess = {
  secret: 'magical breadsticks',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/public/login.html')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));



// turn on routes(kh)
app.use(routes);

// connection to db and server(kh)
sequelize.sync({ force: false}).then(() => {
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});
 