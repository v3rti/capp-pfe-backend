const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation')
const {requireAuth} = require('../middleware/authentication');

// Get back all convos

router.get('/', requireAuth, async (req,res) => {
  try{
    const convos = await Conversation.find();
    res.json(convos)
    
  }catch(err){
    res.json({message: err.message})
  }
})

// Submit Convos

router.post('/',async (req,res) => {
  console.log(req.body);
  const convo = new Conversation({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    cuid: req.body.cuid
  })
  try{
    const savedConvo = await convo.save()
    res.json(savedConvo)
  }
  catch(err){
    res.json({message: err})
  }
})

// specific convo
router.get('/:postId', requireAuth, async (req,res) => {
  try{
  const convo = await Conversation.findOne({cuid: req.params.postId});
  res.json(convo);
  }catch(err){
    res.json({message: err});
  }
})


module.exports = router;


