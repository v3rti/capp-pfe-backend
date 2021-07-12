const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


router.get('/',(req,res,next) => {
  jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET, (err,decodedToken) => {
    if(err){
      res.status(400).send("No user logged in");
      next();
    }else{
      res.status(200).json(decodedToken);
      next();
    }
  })
})


router.post('/currentUser', async (req,res,next) => {
  
  const {email} = req.body;
  if(email){
    try{
      const convosJoined = await User.findOne({email: email});
      res.json(convosJoined.convos_joined);
    
    }catch(err){
      res.status(400).json({message: err});
      console.log(err);
    }
  }

})




module.exports = router;