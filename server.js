const express = require('express');
var bodyParser = require('body-parser');
var Promise = require('promise');
var path = require('path');
const app = express();
var authRoutes = require('./routes/authRoutes');
var passport = require('./server/models/passport');
// declaring mongoose name of the db --- SocialEventsDB
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/socialEventsDB', function(){
  console.log("DB connection established!!!");
})
var ObjectId = mongoose.Types.ObjectId;


const User  = require('./server/models/user.js');
const Event = require('./server/models/event.js');

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(express.static('node_modules'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// FACEBOOK
// passport initialize 

app.use(passport.initialize());
app.use('/auth', authRoutes);


// Handles Success / Failure , and Returns data
var handler = function (res,next) {
    return function (err, data) {
        if (err) {
            return next(err) ;
        }
        res.send(data);
    }
}

app.get('/events', function(req,res,next){
    Event.find(handler(res,next));
})
// get event by id
app.get('/event/:_id', function(req, res,next){
  Event.findById(req.params._id, handler(res,next))
})
app.get('/users', function(req,res,next){
    User.find(handler(res,next));
})

//join event
app.post('/joinEvent/:event_id/:user_id', function(req, res) {
  var event_id = req.params.event_id;
  var user_id = req.params.user_id;
  Event.findOne({_id: event_id}).exec(function (err, event) {
    if (err) throw err;
    // event.participants=[]; //to empty the array
    event.participants.push(user_id);
    event.save();
    User.findOne({_id: user_id}).exec(function(err, user) {
      if (err) throw err;
      // user.events_signed = []; //to empty the array
      user.events_signed.push(event_id);
      user.save();
    });
    res.send(true);
  })
})
//leave event
app.post('/leaveEvent/:event_id/:user_id', function(req, res) {
  var event_id = req.params.event_id;
  var user_id = req.params.user_id;
  Event.findOne({_id: event_id}).exec(function (err, event) {
    if (err) throw err;
    var user_part_index = event.participants.indexOf(user_id);
    event.participants.splice(user_part_index,1);
    event.save();
    console.log(user_part_index);
    User.findOne({_id: user_id}).exec(function(err, user) {
      if (err) throw err;
      event_index = user.events_signed.indexOf(event_id);
      user.events_signed.splice(event_index,1);
      user.save();
      res.send(true);
    });
  })
})

/// update Event with given obj like so :{title: title, name: name, etc..}
// app.put('/update_event/:event_id', ensureAuthenticated, function (req, res, next) {
//   var updated_obj = req.body;
//   console.log(updated_obj);
//   Beer.findByIdAndUpdate(req.params.event_id, { $set: updated_obj }, { new: true }, function (err, event) {
//     if (err) {
//       return next(err);
//     } else {
//       res.send(event);
//     }
//   });
// });


 
//delete event
app.delete('/deleteEvent/:eventId', function (req, res) {
    Event.findOne({ _id: req.params.eventId }).remove().exec(handler(res));
});

// get user profile 
app.get('/profile', function(req,res,next){
  console.log(req.query._id);
  User.findById(req.query._id,handler(res,next) )
})
// user authentication
//  checking if user exist in the db 
app.get('/user', function (req, res) {
  //  using for existens
  var exist = false;
  User.findOne({ $and: [{ email: req.query.email }, { password: req.query.password }] },
    function (err, data) {
      if (err) throw err;

      if (data) {
        console.log(data);
        exist = true;
      } else (
        console.log("No data")
      )

      console.log(exist);
      if (exist) {
        res.json(data);
      } else {
        res.send(false);
      }
    });
})
// create the user
app.post('/create_user', function(req, res,next){
  var newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    aboutme: req.body.aboutme,
    location:{
      city: req.body.city,
      street: req.body.street,
      num: req.body.num
    },
    email:  req.body.email ,
    password:  req.body.password 
  })
  console.log(newUser);
  newUser.save(handler(res,next));
  
  
})

// create the event
app.post('/create_event/:id', function(req, res,next){
  var newEvent = new Event({
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category,
    pic: req.body.pic,
    participants_amount: req.body.participants_amount,
    participants: [],
    date: req.body.date,
    createdby: req.params.id
  })

  newEvent.save(function(err,data){
   User.findOneAndUpdate({_id: data.createdby }, {$push : {myevents:data.id}}, handler(res,next))
  });
})

// // update user push event into myevents
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user')
// })
 app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './server/static/index.html'))
})
// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});