const mongoose = require('mongoose');


const UsersJoinedSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  email: {
    type: String
  },
  joinedDate: {
    type: Date
  }
})

const WaitingList = new mongoose.Schema({
  email: {
    type: String
  },
  joinedDate: {
    type: Date
  }
})

const ChatMessagesSchema = new mongoose.Schema({
  senderUsername: {
    type: String
  },
  message: {
    type: String
  },
  messageDate: {
    type: Date
  },
})


const ActiveConvoSchema = new mongoose.Schema({
  cuid: {
    type: String,
  },
  owner: {
    type: String,
  },
  isPublic: {
    type: Boolean
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  title: {
    type: String
  },
  users_joined: [UsersJoinedSchema],
  chats: [ChatMessagesSchema],
  waiting_list: [WaitingList]
})

const ActiveConversations = mongoose.model('ActiveConversation',ActiveConvoSchema);

module.exports = ActiveConversations;