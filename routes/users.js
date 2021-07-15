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


router.put('/joins/', async (req,res) => {
  const {convo_id,joined_date,email} = req.body;
  const userjoining = {
    convo_id,
    joined_date
  }
  try{
    const result = await User.updateOne(
      { email }, 
      { $push: { convos_joined: userjoining } }
  );
  res.status(200).json(result);
  }catch(err){
    res.status(400).json({message: err})
    console.log(err);
  }
 
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
    const searchUser = await User.findOne({email: email});

    if(searchUser === undefined || searchUser === null){
      const savedUser = await user.save();
      res.status(200).send("ok");
    }else{
      res.status(200).send("already");
    }
    
  }catch(err){
    res.status(400).json({message: err.message})
  } 
})

router.post('/signuptest',async (req,res) => {
  const {email} = req.body;
  
  try{
    const savedUser = await User.findOne({email: email});
    if(savedUser === undefined || savedUser === null){
      res.status(404).send("lmao");
    }else{
      res.status(200).send(savedUser);
    }
  }catch(err){
    res.status(400).json({message: err.message})
  } 

})


router.post('/login', (req,res) => {
  const {email,password} = req.body;
  
  User.findOne({email : email}, (err,docs) => {
    if(docs){
      bcrypt.compare(password, docs.password, (err,bres) => {
        if(bres){
          const token = jwt.sign({id: docs._id, fullName: docs.fullName, email: docs.email, username: docs.usernamen}, process.env.TOKEN_SECRET);
          res.cookie('jwt', token, { httpOnly: true, maxAge: 1000*60*60*24*3 });
          res.status(200).json(docs)
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

router.get('/logout',(req,res) => {
  res.cookie('jwt','', { maxAge: 1}); 
  res.send();
})



module.exports = router;