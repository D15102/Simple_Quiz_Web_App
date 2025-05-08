var express = require('express');
var router = express.Router();


const userModel = require('./users')

const passport = require('passport')
const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

router.get('/signup', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('signup');
});
router.get('/dashboard', islogin, function (req, res, next) {
  // Get flash messages
  const successMsg = req.flash('success');
  const errorMsg = req.flash('error');

  res.render('dashboard', {
    username: req.user.username,
    email: req.user.email,
    success: successMsg.length > 0 ? successMsg[0] : '',
    error: errorMsg.length > 0 ? errorMsg[0] : ''
  });
});
router.get('/lrquiz', islogin ,function (req, res, next) {
  res.render('lrquiz');
});
router.get('/vrquiz', islogin ,function (req, res, next) {
  res.render('vrquiz');
});
router.get('/spquiz', islogin ,function (req, res, next) {
  res.render('spquiz');
});


router.post('/register', function (req, res) {
  // Check if all fields are filled
  if (!req.body.username || !req.body.email || !req.body.password) {
    req.flash('error', 'All fields are required');
    return res.redirect('/signup');
  }

  const userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
  });

  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        req.flash('success', 'Successfully registered! Welcome to AptiBoost');
        res.redirect('/dashboard');
      });
    })
    .catch(function (err) {
      req.flash('error', err.message || 'Registration failed. Please try again.');
      res.redirect('/signup');
    });
});


router.post('/login',
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true,
    successFlash: 'Successfully logged in! Welcome back to AptiBoost!'
  }),
  function (req, res) { })

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      req.flash('error', 'Logout failed. Please try again.');
      return res.redirect('/dashboard');
    }
    req.flash('success', 'Successfully logged out!');
    res.redirect('/');
  });
})




function islogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}




module.exports = router;
