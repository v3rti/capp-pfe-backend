const express = require('express');
const ActiveConversations = require('../models/ActiveConvo');
const User = require('../models/User')

const router = express.Router();


router.get('/all', async(req,res) => {
  
  const allConvos = await ActiveConversations.find();
  
  res.status(200).json(allConvos);

})


router.get('/messages/:id',async (req,res,next) => {

  const id = req.params.id;

  const messages = await ActiveConversations.findOne({
    cuid: id
  });

  
  if(messages !== null){
    res.status(200).json(messages.chats);
  }
  next();
})

router.get('/messages',async (req,res) => {

  const messages = await ActiveConversations.find();
  
  res.status(200).json(messages);
})


router.post('/createConvo', async (req,res) => {
  const {cuid,owner,isPublic,image,description,title,currentUser} = req.body;
  const ownerJoining = {
    fullName: currentUser.fullName,
    username: currentUser.username,
    joinedDate: Date.now()
  }


  console.log(req.body);
  const aConvo = new ActiveConversations({
    cuid,
    title,
    isPublic,
    owner,
    description,
    image,
    users_joined: ownerJoining
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
  res.status(200).send("sent");
  }catch(err){
    res.status(400).json({message: err})
    console.log(err);
  }
 
})

router.put('/userjoinwait/:id', async (req,res) => {
  const {email,joinedDate} = req.body;
  const member = {email,joinedDate};

  try{
    const result = await ActiveConversations.updateOne(
      { cuid: req.params.id}, 
      { $push: { waiting_list : member } }
  );
  res.status(200).json(result);
  }catch(err){
    res.status(400).json({message: err})
    console.log(err);
  }
})

router.put('/userjoin/:id', async (req,res) => {
  const {fullName,email,joinedDate} = req.body;
  const xd = {
    fullName,
    email,
    joinedDate
  }
  try{
    const result = await ActiveConversations.updateOne(
      { cuid: req.params.id}, 
      { $push: { users_joined: xd } }
  );
  res.status(200).json(result);
  }catch(err){
    res.status(200).json({message: err})
    console.log(err);
  }
})


router.post('/waitinglist', async(req,res,next) => {
  const {convoId,email} = req.body;
  try{
    const result = await ActiveConversations.findOne({cuid: convoId});
    result.waiting_list.map((member) => {
      if(member.email === email){
        res.status(200).send(true);
        return;
      }
    })
    res.send(false);
  }catch(err){
    next();
  }
})

router.post('/owned/', async (req,res) => {
  const {email} = req.body;

  const result = await ActiveConversations.find({owner: email});
  res.json(result);

})

router.post('/ownedWaitingList/', async (req,res) => {
  const {email,convoId} = req.body;

  const result = await ActiveConversations.find({owner: email, cuid: convoId});
  res.json(result.map((conv) => conv.waiting_list));

})


router.post('/waitAccept', async (req,res) => {
  const {convoId,email,joinedDate} = req.body;

  

  try{
    const findFn = await User.findOne({email: email});

    const waitUser = {
      fullName: findFn.fullName,
      email,
      joinedDate
    }

    const addUserConvo = await User.updateOne(
      {email: email},
      { $push: {convos_joined: {convo_id: convoId, joined_date: joinedDate}}});


    const adding = await ActiveConversations.updateOne(
      { cuid: convoId}, 
      { $push: { users_joined: waitUser } }
    );

    const removing = await ActiveConversations.updateOne(
      {cuid: convoId},
      { $pull: { waiting_list: {email: email} } }
    )
      
    res.status(200).send("Accepted!")

  }catch(err){
    res.status(200).json({message: err})
    console.log(err);
  }

  
})

router.post('/waitDenied', async (req,res) => {

  const {convoId,email} = req.body;

  try{
    
    const removing = await ActiveConversations.updateOne(
      {cuid: convoId},
      { $pull: { waiting_list: {email: email} } }
    )
      
    res.status(200).send("Removed/Denied!")

  }catch(err){
    res.status(200).json({message: err})
    console.log(err);
  }
})

router.post('/specificConvo',async (req,res) => {
  
  const {convoId} = req.body;

  try{
    const result = await ActiveConversations.findOne({cuid: convoId});
    res.status(200).json(result.users_joined);
  }catch(err){
    res.status(200).json({message: err.message})
  }
})


module.exports = router;