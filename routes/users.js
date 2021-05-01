const express = require('express');
const User = require('../models/User');

const router = express.Router();


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
    res.json({message: err})
    console.log(err);
  }
  
  
})



module.exports = router;