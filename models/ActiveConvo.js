const mongoose = require('mongoose');


const UsersJoinedSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  username: {
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
  message: [String],
  messageDate: [Date]
})

const ActiveConvoSchema = new mongoose.Schema({
  cuid: {
    type: String,
  },
  users_joined: UsersJoinedSchema,
  chats: ChatMessagesSchema
})

const ActiveConversations = mongoose.model('ActiveConversation',ActiveConvoSchema);

module.exports = ActiveConversations;