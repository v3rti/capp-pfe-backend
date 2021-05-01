const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
  title: {
    type: "String",
    required: true
  },
  description: {
    type: "String",
    required: true
  },
  image: {
    type: "String",
    required: true
  },
  cuid: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Conversation',ConversationSchema);