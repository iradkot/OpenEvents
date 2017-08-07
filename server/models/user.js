var mongoose = require('mongoose');
var event = require('./event.js');
//schema of the individual user 
var userSchema = new mongoose.Schema({
  socialId: String,
  name: String,
  age: Number,
  provider: String,
  gender: String,
  myPic: String,
  email: mongoose.Schema.Types.Mixed,
  password: mongoose.Schema.Types.Mixed,
  events_signed: [{type:mongoose.Schema.Types.ObjectId, ref: 'event'}],
  myevents:[{type:mongoose.Schema.Types.ObjectId, ref: 'event'}],
  loginCount: Number,
});

var User = mongoose.model('user', userSchema)

module.exports = User;

