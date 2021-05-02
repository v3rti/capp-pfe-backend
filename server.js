const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



const convoRoutes = require('./routes/convos');
const usersRoutes = require('./routes/users');


const app = express();

app.use(bodyParser.json());

//Import Routes


app.use('/convos',convoRoutes);
app.use('/users', usersRoutes);
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