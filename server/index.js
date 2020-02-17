const express = require("express");
const bodyParser = require('body-parser');


const login = require('./routers/login').login;
const login_new = require('./routers/login_new').login_new;

const app = express();


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.route('/login').post(login);
app.route('/login/new').post(login_new);



app.listen(3000);

