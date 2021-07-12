const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ConvosJoinedSchema = new mongoose.Schema({
  convo_id: {
    type: String
  },
  joined_date: {
    type: String
  }
})

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
  },
  convos_joined: [ConvosJoinedSchema]

})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model('user',UserSchema);

module.exports = User;