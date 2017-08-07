var express = require('express');
var router = express.Router();
var passport = require('../server/models/passport');


router.get('/facebook',
    passport.authenticate('facebook',{ authType: 'rerequest', scope: ['public_profile','email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
  function(req, res) {
    console.log(req.user);
    res.redirect('/authorization/' + req.user.token + "/" + req.user.name + "/" + req.user.id);
  }
);


module.exports = router;
