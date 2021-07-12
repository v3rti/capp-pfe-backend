const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/',async (req,res) => {

  const {currUsername} = req.body;

  try{
    const result = await User.findOne({username: currUsername});
    res.json(result.convos_joined);

  }catch(err){
    res.json({message: err.message})
  }

})

module.exports = router;