var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('auth/login', { title: 'Log in' });
});

/* GET sign in page. */
router.get('/signup', function (req, res, next) {
  res.render('auth/signup', { title: 'sign Up' });
});
module.exports = router;
