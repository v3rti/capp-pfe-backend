const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please Enter Your Full Name'],
  },
  email:{
    type: String,
    required: [true, 'Please Enter An Email'],
    unique: true,
    lowercase: true,
    
  },
  username: {
    type:String,
    required: [true, 'Please Enter A Username'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Minimum Password Length is 6 Characters']
  }

})

const User = mongoose.model('user',UserSchema);

module.exports = User;