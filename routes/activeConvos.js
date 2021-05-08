const express = require('express');
const ActiveConversations = require('../models/ActiveConvo');

const router = express.Router();


router.get('/messages/:id',async (req,res) => {

  const id = req.params.id;

  const messages = await ActiveConversations.findOne({
    cuid: id
  });
  
  res.status(200).json(messages.chats);
})


router.post('/createConvo', async (req,res) => {
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

router.put('/chats/:id', async (req,res) => {
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
  res.status(200).json(result);
  }catch(err){
    res.status(400).json({message: err})
    console.log(err);
  }
 
})

router.put('/userjoin/:id', async (req,res) => {
  const {fullName,username,joinedDate} = req.body;
  const xd = {
    fullName,
    username,
    joinedDate
  }
  try{
    const result = await ActiveConversations.updateOne(
      { cuid: req.params.id}, 
      { $push: { users_joined: xd } }
  );
  res.status(200).json(result);
  }catch(err){
    res.status(400).json({message: err})
    console.log(err);
  }
})


module.exports = router;