const express = require('express');
const User = require('../models/User');

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



module.exports = router;