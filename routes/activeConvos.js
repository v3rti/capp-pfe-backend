const express = require('express');
const ActiveConversations = require('../models/ActiveConvo');

const router = express.Router();


router.get('/',(req,res) => {
  res.send('Welcome to the Active Convos Page');
})


router.post('/',(req,res) => {
  const {cuid,user_joined,chats} = req.body;
  
  const xd = user_joined.map(user => user.fullName)
  res.send(xd);

})


module.exports = router;