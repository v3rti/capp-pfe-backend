const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

function handlingErrors(err){
  console.log(err.message);

  let errors = {email: "",username:"",fullName: "", password: ""};
  
  if(err.message.includes("password")){
    errors.password = "Password minimum length is 6 characters"
  }
  if(err.message.includes("email")){
    errors.email = "Please enter a valid email"
  }
  if(err.message.includes("username")){
    errors.username = "Please enter a valid username";
  }
  if(err.message.includes("fullName")){
    errors.fullName = "Please enter your full name";
  }

  if(err.code === 11000 && err.message.includes("email")){
    errors.email = "Email already used";
  }
  if(err.code === 11000 && err.message.includes("username")){
    errors.username = "Username already used";
  }
  
  return errors;
}


router.get('/',(req,res) => {
  res.send('Hello into users page');
})


router.post('/',async (req,res) => {
  const {fullName, email, username, password} = req.body;

  const user = new User({
    fullName,
    email,
    username,
    password
  })
  
  try{
    const savedUser = await user.save();
    console.log(savedUser);
    res.json(savedUser);
    
  }catch(err){
    const funcError = handlingErrors(err);
    res.status(400).json({errorMsg: funcError})
  }

  
})

router.post('/login', (req,res) => {
  const {email,password} = req.body;
  
  User.findOne({email : email}, (err,docs) => {
    if(docs){
      bcrypt.compare(password, docs.password, (err,bres) => {
        if(bres){
          const token = jwt.sign({id: docs._id}, process.env.TOKEN_SECRET);
          res.cookie('jwt', token, { httpOnly: true });
          res.status(200).send("password matches");
        }else {
          res.status(400).send("password not matching");
        }
      })
    }else {
      console.log(docs);
      res.status(400).send("Sorry but the email you entered does not exist");
    }
  });

})


module.exports = router;