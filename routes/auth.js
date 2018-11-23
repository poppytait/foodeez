var express = require('express');
var router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('auth/login', { title: 'Log in' });
});

/* GET sign in page. */
router.get('/signup', function (req, res, next) {
  res.render('auth/signup', { title: 'sign Up' });
});

// put here //
router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.redirect('/auth/signup');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({
        email,
        password: hashedPassword
      })
        .then((newUser) => {
          req.session.currentuser = newUser;
          console.log('redirect here');
          res.redirect('/');
        })
        .catch(next);
    })

    .catch(next);
});
module.exports = router;
