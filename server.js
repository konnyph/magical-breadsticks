const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql2')
const { json } = require('express');
// Adding express-session (kh)
// const session = require('express-session');
// Adding const to use routes and config(kh)
const routes = require('./routes');
const sequelize = require('./config/connection');


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
// turn on routes(kh)
app.use(routes);

// app.use() for session(kh)
// app.use(session({
//   secret: 'Magical Breadsticks',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// app.listen(port, () =>
//   console.log(`Listening at http://localhost:${port}`)
// );

// connection to db and server(kh)
sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});
