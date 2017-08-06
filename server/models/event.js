var mongoose = require('mongoose');

//schema of the individual user 
var eventSchema = new mongoose.Schema({
  title: String,
  desc: String,
  category: String,
  pic: String,
  location: {
      city: String,
      street: String,
      num: Number, 
  },
  participants_amount: Number,
  participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  date: { type: Date, default: Date.now },
  createdby: mongoose.Schema.Types.Mixed
});

var Event = mongoose.model('event', eventSchema)

module.exports = Event;