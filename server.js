const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');


const convoRoutes = require('./routes/convos');
const usersRoutes = require('./routes/users');
const activeConvosRoutes = require('./routes/activeConvos');
const loginStatusRoutes = require('./routes/loginStatus');
const searchUserConvosRoutes = require('./routes/searchUserConvos');

const app = express();

app.use(bodyParser.json());

//Import Routes

app.use(cookieParser())
app.use('/status',loginStatusRoutes);
app.use('/convos', convoRoutes);
app.use('/users', usersRoutes);
app.use('/activeConvos',activeConvosRoutes);

//Routes

app.get('/',(req,res) => {
  res.send('We are on home');
})



// Connect to DB
const connString = process.env.CONNECTION_STRING

mongoose.connect(connString,
  { useNewUrlParser: true ,useUnifiedTopology: true },
  () => console.log("connected to db"))

app.listen(8000,() => {console.log('listening on port 8000')})