const express = require('express');
const ActiveConversations = require('../models/ActiveConvo');

const router = express.Router();


router.get('/',(req,res) => {
  res.send('Welcome to the Active Convos Page');
})


router.post('/', async (req,res) => {
  const {cuid,users_joined,chats} = req.body;
  
  const aConvo = new ActiveConversations({
    cuid,
    users_joined,
    chats
  })
  try {
  const savedAConvo = await aConvo.save();
  res.json(savedAConvo);
  }catch(err){
    res.json({message: err});
  }

})

router.put('/:id', async (req,res) => {
  const {message,sender,date} = req.body;
  const xd = {
    message: message,
    messageDate: date,
    senderUsername: sender
  }
  try{
    const result = await ActiveConversations.updateOne(
      { cuid: req.params.id}, 
      { $push: { chats: xd } }
  );
  res.json(result);
  }catch(err){
    res.json({message: err})
    console.log(err);
  }
 
})

router.put('/userjoin/:id', async (req,res) => {
  const {fullName,username,date} = req.body;
  const xd = {
    fullName,
    username,
    joinedDate: date
  }
  try{
    const result = await ActiveConversations.updateOne(
      { cuid: req.params.id}, 
      { $push: { users_joined: xd } }
  );
  res.json(result);
  }catch(err){
    res.json({message: err})
    console.log(err);
  }
 
})


module.exports = router;