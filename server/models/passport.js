var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('./user.js');


//passport configuration here
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '1824156720958521',
    clientSecret: '232b64b86ff73de1bf8b3d310ca5882f',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['email', 'displayName', 'picture']
},
    function (accessToken, refreshToken, profile, done) {
        console.log( JSON.stringify(profile));
        console.log("FACEBOOK")
        //code to check database goes here
        User.findOne({ 'socialId': profile.id }, function (err, user) {
            if (err) {
                return done(err);
            }
            //If no user was found, create a new user with details from the facebook profile
            if (!user) {
                user = new User({
                    socialId: profile.id,
                    name: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : "",
                    myPic: profile.photos[0].value,
                    gender: profile.gender,
                    provider: 'facebook',
                    loginCount: 0
                });
            } else {
                //else, a user exists so let's add one to their login count
                user.loginCount++;
            }
           
            //finally let's save and call "done"
            user.save(function (err, newUser) {
                if (err) {
                    return done(err);
                } else {
                    // token
                    var token = jwt.sign({
                        id: newUser.id,
                        name: newUser.name,
                    }, 'thisIsTopSecret', { expiresIn: "7d" });
                    return done(null,{token: token, name: newUser.name});
                } 
            });
            
        });
        //code to create JWT goes here
         
        // return done(null, profile)
    }
))




module.exports = passport;
