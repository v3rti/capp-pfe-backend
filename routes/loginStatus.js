const express = require('express');
const jwt = require('jsonwebtoken');


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


module.exports = router;