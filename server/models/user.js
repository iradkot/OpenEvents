var mongoose = require('mongoose');
var event = require('./event.js');
//schema of the individual user 
var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  aboutme: String,
  location: {
      city: String,
      street: String,
      num: Number, 
  },
  email: mongoose.Schema.Types.Mixed,
  password: mongoose.Schema.Types.Mixed,
  events_signed: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  myevents:[{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]

});

var User = mongoose.model('user', userSchema)

module.exports = User;

